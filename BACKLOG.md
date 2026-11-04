# Backlog

Från granskningen 2026-10-28. P1 rättat samma dag.

## P2
- cal: inget mejl till kunden vid förfrågan/avbokning, låsskärmen visar Godkänn/Avböj på mejlnotis.
- Schemaändringar varnar inte för befintliga bokningar i cal och google (mobil varnar för lediga dagar).
- google: första veckan kan vara helt tom, mäklaren måste hitta ›-pilen.

## P3
- google: inkorgens Ja/Kanske gör inget.
- `uppskattadTid()` i mvp: stäm av timmarna med Bildfab.
- mobil: restid räknas via kontoret, inte mellan jobb.
- Google- och Cal-demon är återskapade efter hjälpsidor, inte jämförda med riktiga konton. Skärmdumpar från ett riktigt konto skulle bekräfta utseendet.

## Rättat 2026-11-04 (grenen `claude/backlog-2026-11-04`)
- mvp .ics: VTIMEZONE för Europe/Stockholm, radvikning vid 75 oktetter, restid och tidsfönster i beskrivningen (även i Google-länken), "Flexibelt" blir en heldagshändelse i stället för 09:00.
- cal: räknarbadgen sträcktes på höjden i mobil-admin. Menyn radbröt etiketterna och gridraden fylldes ut till 110 till 185 px; nu en rad, 44 px höga flikar, badgen 18 px.
