# Backlog

Från granskningen 2026-10-28. P1 rättat samma dag.

## P2
- mvp .ics: saknar VTIMEZONE, ingen radvikning, restid ej med i händelsen, "Flexibelt" blir 09:00.
- cal: inget mejl till kunden vid förfrågan/avbokning, låsskärmen visar Godkänn/Avböj på mejlnotis.
- Schemaändringar varnar inte för befintliga bokningar i cal och google (mobil varnar för lediga dagar).
- `restid.js`: gammalt svar kan skriva över när adressen kortas.
- google: första veckan kan vara helt tom, mäklaren måste hitta ›-pilen.

## P3
- google: inkorgens Ja/Kanske gör inget. cal: badge "2" sträcks i mobil-admin.
- `uppskattadTid()` i mvp: stäm av timmarna med Bildfab.
- mobil: restid räknas via kontoret, inte mellan jobb.
- Google- och Cal-demon är återskapade efter hjälpsidor, inte jämförda med riktiga konton. Skärmdumpar från ett riktigt konto skulle bekräfta utseendet.
