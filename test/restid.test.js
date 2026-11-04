// Tester för restid.js. Kör: node --test test/
// restid.js är ett vanligt webbläsarskript utan export, så det laddas här med new Function och
// får fetch och timers som parametrar. Varje test får en ny instans med tom cache.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const KALLA = fs.readFileSync(path.join(__dirname, "..", "restid.js"), "utf8");

// svar: lista med { ok, body } i den ordning anropen görs, eller en funktion url -> { ok, body }
// (som får returnera ett löfte, för att hålla inne ett svar) när flera uppslag pågår samtidigt. Anropade URL:er hamnar i urls.
function ladda(svar = []) {
  const urls = [], timers = [];
  const fetch = async (url) => {
    urls.push(url);
    const s = await (typeof svar === "function" ? svar(url) : svar.shift());
    if (!s) throw new Error("oväntat anrop: " + url);
    return { ok: s.ok ?? true, json: async () => s.body };
  };
  const setTimeout = (fn, ms) => { const t = { fn, ms, stoppad: false }; timers.push(t); return t; };
  const clearTimeout = (t) => { if (t) t.stoppad = true; };
  const api = new Function("fetch", "setTimeout", "clearTimeout",
    KALLA + "\nreturn { KONTOR, restidCache, restid, restidText, kopplaRestid };")(fetch, setTimeout, clearTimeout);
  return { ...api, urls, timers, svar };
}

const PLATS = [{ lat: "63.83", lon: "20.26", display_name: "Storgatan 22, Umeå" }];
const VAG = (sek = 750, meter = 4321) => ({ code: "Ok", routes: [{ duration: sek, distance: meter }] });
const lyckat = (sek, meter) => [{ body: PLATS }, { body: VAG(sek, meter) }];

test("restid: adress till koordinat till bilväg, minuter avrundade och km", async () => {
  const r = ladda(lyckat(749, 4321));
  const svar = await r.restid("Storgatan 22, Umeå");
  assert.deepEqual({ ...svar }, { min: 12, km: 4.321, plats: "Storgatan 22, Umeå" });
  assert.equal(r.urls.length, 2);
  assert.equal(r.urls[0], "https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=se&viewbox=17,66,22,63&q=Storgatan%2022%2C%20Ume%C3%A5");
  assert.equal(r.urls[1], `https://router.project-osrm.org/route/v1/driving/${r.KONTOR.lon},${r.KONTOR.lat};20.26,63.83?overview=false`);
});

test("restid: avrundar till närmaste minut, inte nedåt", async () => {
  assert.equal((await ladda(lyckat(750)).restid("Storgatan 22")).min, 13);
  assert.equal((await ladda(lyckat(30)).restid("Storgatan 22")).min, 1);
  assert.equal((await ladda(lyckat(29)).restid("Storgatan 22")).min, 0);
});

test("restid: cachar per adress oavsett skiftläge och mellanslag runt", async () => {
  const r = ladda(lyckat());
  const forsta = await r.restid("Storgatan 22, Umeå");
  const andra = await r.restid("  STORGATAN 22, umeå ");
  assert.equal(andra, forsta);
  assert.equal(r.urls.length, 2, "andra anropet ska inte gå ut på nätet");
  assert.equal(r.restidCache["storgatan 22, umeå"], forsta);
});

test("restid: misslyckade uppslag cachas inte", async () => {
  const r = ladda([{ body: [] }, ...lyckat()]);
  await assert.rejects(r.restid("Storgatan 22"), /Hittar inte adressen/);
  assert.equal((await r.restid("Storgatan 22")).min, 13);
});

test("restid: tydliga fel för varje sätt det kan gå fel", async () => {
  await assert.rejects(ladda([{ ok: false }]).restid("Storgatan 22"), { message: "Adresstjänsten svarar inte" });
  await assert.rejects(ladda([{ body: [] }]).restid("Storgatan 22"), { message: "Hittar inte adressen" });
  await assert.rejects(ladda([{ body: PLATS }, { ok: false }]).restid("Storgatan 22"), { message: "Vägtjänsten svarar inte" });
  await assert.rejects(ladda([{ body: PLATS }, { body: { code: "NoRoute", routes: [] } }]).restid("Storgatan 22"), { message: "Hittar ingen bilväg" });
  await assert.rejects(ladda([{ body: PLATS }, { body: { code: "NoRoute", routes: [{ duration: 1, distance: 1 }] } }]).restid("Storgatan 22"), { message: "Hittar ingen bilväg" });
  await assert.rejects(ladda([{ body: PLATS }, { body: { code: "Ok", routes: [] } }]).restid("Storgatan 22"), { message: "Hittar ingen bilväg" });
});

test("restidText: decimalkomma, en decimal, tur och retur dubblad", () => {
  const { restidText } = ladda();
  assert.equal(restidText({ min: 12, km: 4.321 }), "12 min enkel väg, 4,3 km (tur och retur 24 min)");
  assert.equal(restidText({ min: 0, km: 0 }), "0 min enkel väg, 0,0 km (tur och retur 0 min)");
});

// Ett låtsat adressfält: skriv(text) sätter värdet och skickar input-händelsen.
function falt(r, notis) {
  let lyssnare;
  const input = { value: "", addEventListener: (typ, fn) => { assert.equal(typ, "input"); lyssnare = fn; } };
  const ut = { textContent: "x" };
  const klara = [];
  if (notis === undefined) r.kopplaRestid(input, ut, (v) => klara.push(v));
  else r.kopplaRestid(input, ut, (v) => klara.push(v), notis);
  const skriv = (text) => { input.value = text; lyssnare(); };
  // kör den senaste timern som inte stoppats och vänta tills anropen är klara
  const tick = async () => {
    const t = r.timers.filter((t) => !t.stoppad).pop();
    assert.ok(t, "ingen väntande timer");
    t.stoppad = true;
    const p = t.fn();
    return p;
  };
  return { input, ut, klara, skriv, tick };
}

test("kopplaRestid: under 6 tecken tömmer raden och ger null utan anrop", () => {
  const r = ladda();
  const f = falt(r);
  f.skriv("  Stor  ");
  assert.equal(f.ut.textContent, "");
  assert.deepEqual(f.klara, [null]);
  assert.equal(r.timers.length, 0);
});

test("kopplaRestid: 6 tecken räcker för att börja räkna", () => {
  const r = ladda();
  const f = falt(r);
  f.skriv("Byv 12");
  assert.equal(r.timers.length, 1);
  assert.deepEqual(f.klara, []);
});

test("kopplaRestid: väntar 900 ms efter sista tecknet och visar restiden", async () => {
  const r = ladda(lyckat(749, 4321));
  const f = falt(r);
  f.skriv("Storgat");
  f.skriv(" Storgatan 22 ");
  assert.equal(r.timers.length, 2);
  assert.ok(r.timers[0].stoppad, "förra timern ska stoppas när användaren skriver vidare");
  assert.equal(r.timers[1].ms, 900);
  assert.deepEqual(f.klara, []);
  const p = f.tick();
  assert.equal(f.ut.textContent, "🚗 Räknar restid från kontoret ...");
  await p;
  assert.equal(f.ut.textContent, "🚗 Från kontoret (Brogatan 5, Umeå): 12 min enkel väg, 4,3 km (tur och retur 24 min)");
  assert.equal(f.klara.length, 1);
  assert.equal(f.klara[0].min, 12);
  assert.ok(r.urls[0].endsWith("&q=Storgatan%2022"), "adressen skickas trimmad");
});

test("kopplaRestid: notisen hamnar efter restiden", async () => {
  const r = ladda(lyckat());
  const f = falt(r, " (räknas inte av tjänsten)");
  f.skriv("Storgatan 22");
  await f.tick();
  assert.ok(f.ut.textContent.endsWith("tur och retur 26 min) (räknas inte av tjänsten)"), f.ut.textContent);
});

test("kopplaRestid: fel visas med tips och ger null", async () => {
  const r = ladda([{ body: [] }]);
  const f = falt(r);
  f.skriv("Okändgatan 1");
  await f.tick();
  assert.equal(f.ut.textContent, '🚗 Restid: Hittar inte adressen. Lägg till ort, t.ex. "Storgatan 22, Umeå".');
  assert.deepEqual(f.klara, [null]);
});

test("kopplaRestid: ett gammalt svar skriver inte över en nyare adress", async () => {
  // Storgatan tar 10 min, Kungsgatan 20 min; OSRM-svaret väljs på målets longitud.
  // Storgatans svar hålls inne tills Kungsgatans har visats.
  let slapp;
  const grind = new Promise((ok) => { slapp = ok; });
  const r = ladda((url) => url.includes("nominatim")
    ? (url.includes("Storgatan") ? grind : null) ?? { body: [{ lat: "63.8", lon: "20.2", display_name: "x" }] }
    : { body: VAG(url.includes(";20.1,") ? 600 : 1200) });
  const f = falt(r);
  f.skriv("Storgatan 22");
  const forsta = f.tick();        // första anropet är på väg
  f.skriv("Kungsgatan 50");
  const andra = f.tick();
  await andra;
  assert.match(f.ut.textContent, /: 20 min enkel väg/);
  slapp({ body: [{ lat: "63.8", lon: "20.1", display_name: "x" }] });
  await forsta;                   // första svaret kommer sist men gäller inte längre
  assert.match(f.ut.textContent, /: 20 min enkel väg/);
  assert.deepEqual(f.klara.map((v) => v.min), [20]);
});

test("kopplaRestid: ett gammalt fel skriver inte över en nyare adress", async () => {
  let slapp;
  const grind = new Promise((ok) => { slapp = ok; });
  const r = ladda((url) => url.includes("nominatim")
    ? (url.includes("Ok%C3%A4nd") ? grind : { body: PLATS })
    : { body: VAG(600) });
  const f = falt(r);
  f.skriv("Okändgatan 1");
  const forsta = f.tick();
  f.skriv("Storgatan 22");
  await f.tick();
  slapp({ body: [] });
  await forsta;
  assert.match(f.ut.textContent, /: 10 min enkel väg/);
  assert.deepEqual(f.klara.map((v) => v && v.min), [10]);
});

// BACKLOG P2, rättat i PR #1 (senaste = "" vid varje inmatning).
test("kopplaRestid: svar på väg skriver inte över en kortad adress", async () => {
  const r = ladda(lyckat());
  const f = falt(r);
  f.skriv("Storgatan 22");
  const p = f.tick();
  f.skriv("Stor");
  await p;
  assert.equal(f.ut.textContent, "");
  assert.deepEqual(f.klara, [null]);
});
