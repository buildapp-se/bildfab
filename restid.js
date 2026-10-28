// Restid med bil från Bildfabs kontor till en adress. Delas av alla demosidor.
// Demo: OpenStreetMap Nominatim (adress → koordinat) och OSRM:s demoserver (bilväg).
// Båda är gratis men inte till för skarp drift: max 1 anrop/s, ingen garanti. Skarpt: egen proxy med cache, se startsidan.
const KONTOR = { namn: "Brogatan 5, Umeå", lat: 63.8275765, lon: 20.2507526 };
const restidCache = {};

// Lyckas med { min, km, plats } eller kastar Error. min = enkel väg i minuter.
async function restid(adress) {
  const nyckel = adress.trim().toLowerCase();
  if (restidCache[nyckel]) return restidCache[nyckel];
  // viewbox föredrar träffar i Västerbotten när ort saknas, men utesluter inte resten av Sverige
  const g = await fetch("https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=se&viewbox=17,66,22,63&q=" + encodeURIComponent(adress))
    .then(r => { if (!r.ok) throw new Error("Adresstjänsten svarar inte"); return r.json(); });
  if (!g.length) throw new Error("Hittar inte adressen");
  const { lat, lon, display_name } = g[0];
  const r = await fetch(`https://router.project-osrm.org/route/v1/driving/${KONTOR.lon},${KONTOR.lat};${lon},${lat}?overview=false`)
    .then(r => { if (!r.ok) throw new Error("Vägtjänsten svarar inte"); return r.json(); });
  if (r.code !== "Ok" || !r.routes.length) throw new Error("Hittar ingen bilväg");
  return (restidCache[nyckel] = { min: Math.round(r.routes[0].duration / 60), km: r.routes[0].distance / 1000, plats: display_name });
}

const restidText = r => `${r.min} min enkel väg, ${(r.km).toFixed(1).replace(".", ",")} km (tur och retur ${r.min * 2} min)`;

// Kopplar ett adressfält till en rad som visar restiden. Väntar tills användaren slutat skriva (Nominatim tillåter 1 anrop/s).
// notis: text efter restiden, t.ex. för att märka att tjänsten inte klarar det själv.
function kopplaRestid(input, ut, klar, notis = "") {
  let timer, senaste = "";
  input.addEventListener("input", () => {
    clearTimeout(timer);
    const adress = input.value.trim();
    if (adress.length < 6) { ut.textContent = ""; klar(null); return; }
    timer = setTimeout(async () => {
      senaste = adress;
      ut.textContent = "🚗 Räknar restid från kontoret ...";
      try {
        const r = await restid(adress);
        if (senaste !== adress) return;
        ut.textContent = `🚗 Från kontoret (${KONTOR.namn}): ${restidText(r)}${notis}`;
        klar(r);
      } catch (e) {
        if (senaste !== adress) return;
        ut.textContent = `🚗 Restid: ${e.message}. Lägg till ort, t.ex. "Storgatan 22, Umeå".`;
        klar(null);
      }
    }, 900);
  });
}
