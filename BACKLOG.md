# Backlog

Från granskningen 2026-10-28. P1 rättat samma dag.

## P3
- `uppskattadTid()` i mvp: stäm av timmarna med Bildfab.
- mobil: restid räknas via kontoret, inte mellan jobb. Medvetet tak (`ponytail:` i `mobil/app.html`): mellan jobb kräver ett OSRM-anrop per granne och dag mot en demotjänst med 1 anrop/s. Görs i Worker-bygget, inte i demon.
- Google- och Cal-demon är återskapade efter hjälpsidor, inte jämförda med riktiga konton. Skärmdumpar från ett riktigt konto skulle bekräfta utseendet.

- mobil/ i 390 px: CLS 0,229 (före och efter 2026-11-25). Länkarna i sidhuvudet radbryts från två till tre rader när Roboto Mono ersätter reservtypsnittet (Consolas i Chromium på Windows). Mätt bara i Chromium på Windows; i telefoner är reservtypsnittet ett annat och skiftet är inte mätt. Val: `font-display: optional` (inget skift, men reservtypsnitt vid första besöket på långsamt nät) eller reserverad höjd på raden. Smakfråga, lämnad.

## Rättat 2026-11-25, fart, tillgänglighet och metadata (grenen `speed/2026-11-25`, `851e34d`)
Playwright live i 390 px (4x CPU, Slow 4G) och 1440 px, före och efter deploy.
- mvp: bilderna var 2,9 MB jpg (upp till 3000 px breda för 231 till 356 px stora kort). Nu WebP, 157 KB för korten och den smala heron, width/height, lazy på kort 2 och 3, hero med preload. 390 px: LCP 13 576 ms till 2 780 ms, 3 018 KB till 265 KB.
- Typsnitten från Google Fonts blockerade renderingen (1 begäran per sida). Nu egna filer med preload, 0 blockerande. Startsidan i 390 px: CLS 0,14 till 0.
- mobil/app.html: rubrikraden och flikraden fylls av skriptet efter första målningen och flyttade innehållet. Nu reserverad höjd, CLS i 390 px 0,069 till 0,004 (lokalt, mätt efter typsnittsbytet).
- axe: heading-order (startsidan, mvp, app.html) och region (mvp hero och skissrad, app.html sidhuvud) 0 fynd. Kortrubriker och stegrubriker är h2 med samma utseende.
- Alla sidor: meta description, og:title, og:description, og:image och favicon (loggan). Ingen canonical (noindex), inget manifest (ingen PWA).

## Rättat 2026-11-24, buggjakt 2 (grenen `hunt2/2026-11-24`)
Playwright-skript lokalt: alla 24 vyer i 390 och 1440 px (inga JS-fel, trasiga bilder eller punkt som decimaltecken), plus 10 flödeskontroller, alla gröna efter (4 av dem kördes före rättningen och föll). Restidstesterna 16 av 16; de 2 nya faller på gammal kod.
- restid, alla sidor: nätfel visade "Restid: Failed to fetch" på engelska och ett svar som aldrig kom lät "Räknar restid ..." stå kvar. Nu svenskt fel och 10 s tidsgräns; ortstipset visas bara när adressen inte hittas, annars "Försök igen om en stund."
- cal Tillgänglighet och mobil Mina tider: "Tordag" i stället för Torsdag.
- cal Tillgänglighet i 390 px: 81 px sidledsscroll (schemaraden). Nu 0.
- cal, google, mobil: starttid 23:30 gav sluttiden "24:30". Nu högst 23:59.
- google Bokningsschema: tom titel gav en bokningssida utan rubrik. Tom titel ignoreras.
- mobil: fotografens Ja eller Nej i en inaktuell vy kunde göra en avbokad bokning bekräftad, och mäklarens Avboka kunde skriva över en avböjd. Nu bara från rätt status.
- mobil: bokning utan firma visade "Namn, · 070 ..." och tel-länken hade mellanslag. Rättat.
- mvp: ett utkast på steg 4 vars datum passerat gick att skicka utan datum. Nu kontrolleras alla steg vid Skicka.
- Efter deploy var HTML ny men `restid.js` gammal (Cloudflare-träff, max-age 14400). Sidorna laddar nu `restid.js?v=...`.
- Länkar: alla interna sidor, bilder, typsnitt, Google Kalender, Google Maps, Nominatim och OSRM svarar 200. Okänd sökväg under `buildapp.se/bildfab/` ger 404 från GitHub Pages för buildapp.se, inte från det här repot.

## Rättat 2026-11-24, buggjakt i mvp (grenen `hunt/2026-11-24`)
Playwright-skript i 390 och 1440 px: 10 fel före, 18 av 18 kontroller gröna efter.
- Enter i ett textfält (t.ex. Adress) skickade formuläret och visade "Fyll i företag och namn." på steg 2. Nu betyder Enter Nästa före sista steget.
- Omladdning mitt i flödet tömde allt. Nu sparas steg, fält, valda datum och restid som utkast i localStorage; utkastet töms när förfrågan skickas. Passerade datum släpps vid återställning.
- Negativ yta (-50) visades som "−50 kvm". Nu räknas den som 0 och visas inte.
- `#klar` utan skickad förfrågan (omladdning av tackrutan, direktlänk) visade tom referens och "En kopia skickas till ." Nu visas formuläret.
- Månadspilarna i kalendern var 36 px, nu 44 px.

## Rättat 2026-11-24, UX-granskning (grenen `deep/2026-11-24`)
ux-audit-skriptet på alla sex sidor i 390 px: 6 av 8 på live före, 7 av 8 lokalt efter (kvarvarande Fitts-varning gäller osynliga radio- och kryssrutor inuti 44 px-etiketter, falsklarm).
- google, cal, mobil, mvp: demorad, veckopilar, tidsknappar, segmentknappar, menylänkar och val-piller minst 44 px (var 32 till 39 px).
- mobil `app.html`: påbörjad bokning (kund, paket, adress, dag, tid) överlever omladdning; "Återställ demo" rensar utkastet.
- mvp Fotografvy: 178 px sidledsscroll i 390 px (summeringen med tre `nowrap`-tal bredvid varandra). Nu staplad som sammanfattningsrutan, 0 px.

## Rättat 2026-11-24 (grenen `deep/2026-11-24`)
Verifierat med jsdom-skript (före: 8 fel, efter: 0) och en låtsad klocka fredag 12:00 (före: tom startvecka, efter: vecka 1 med 12 tider).
- cal: kunden får "Förfrågan skickad" direkt vid förfrågan, avbokningar mejlas till båda parter. Mejlnotisen på låsskärmen har inga Godkänn/Avböj-knappar längre, bara "Öppna mejlet" till inkorgen.
- cal och google: Tillgänglighet/Bokningsschema listar framtida bokningar som hamnat utanför schemat eller på en blockerad dag. Bokningarna ligger kvar, som i verktygen.
- google: bokningssidan öppnar på första veckan med en ledig tid (max 8 veckor fram).
- google: inkorgens Ja/Kanske sparar svaret och visar det; bokningen gäller oavsett.

## Rättat 2026-11-04 (grenen `claude/backlog-2026-11-04`)
- mvp .ics: VTIMEZONE för Europe/Stockholm, radvikning vid 75 oktetter, restid och tidsfönster i beskrivningen (även i Google-länken), "Flexibelt" blir en heldagshändelse i stället för 09:00.
- cal: räknarbadgen sträcktes på höjden i mobil-admin. Menyn radbröt etiketterna och gridraden fylldes ut till 110 till 185 px; nu en rad, 44 px höga flikar, badgen 18 px.
