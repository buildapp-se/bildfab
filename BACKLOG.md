# Backlog

Från granskningen 2026-10-28.

## P1
- mvp: ingen krockkontroll, kalendern är en hash, önskade datum i stället för lediga tider. Gör skissen ärlig eller hänvisa till `mobil/` som bygg-själv-demon.
- google: sidan 692 px bred vid 390 px (`.page`/`.week` behöver `minmax(0,1fr)`).
- google + cal: telefonattrappen täcker kvittot i mobilbredd.
- mvp: "Kontor / verksamhet" förvalt även för Mäklare + Bostad.

## P2
- mvp i mobil: sidhuvud spiller över, "Total tid" hamnar under Nästa.
- mvp .ics: saknar VTIMEZONE, ingen radvikning, restid ej med i händelsen, "Flexibelt" blir 09:00.
- google: "Max 60 dagar framåt" gäller inte.
- cal: inget mejl till kunden vid förfrågan/avbokning, månadsbläddring bakåt i tiden, låsskärmen visar Godkänn/Avböj på mejlnotis.
- Schemaändringar varnar inte för befintliga bokningar (cal, google).
- `restid.js`: gammalt svar kan skriva över när adressen kortas.

## P3
- google: inkorgens Ja/Kanske gör inget. cal: badge "2" sträcks i mobil-admin.
- `uppskattadTid()` i mvp: stäm av timmarna med Bildfab.
- mobil: restid räknas via kontoret, inte mellan jobb.
