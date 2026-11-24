# Backlog

Från granskningen 2026-10-28. P1 rättat samma dag.

## P3
- `uppskattadTid()` i mvp: stäm av timmarna med Bildfab.
- mobil: restid räknas via kontoret, inte mellan jobb. Medvetet tak (`ponytail:` i `mobil/app.html`): mellan jobb kräver ett OSRM-anrop per granne och dag mot en demotjänst med 1 anrop/s. Görs i Worker-bygget, inte i demon.
- Google- och Cal-demon är återskapade efter hjälpsidor, inte jämförda med riktiga konton. Skärmdumpar från ett riktigt konto skulle bekräfta utseendet.

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
