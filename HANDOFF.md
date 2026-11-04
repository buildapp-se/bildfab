---
reviewedAt: 2026-11-04
---
# Handoff

**Läge:** publicerat på https://buildapp.se/bildfab/ (noindex). Mobildemon verifierad live: bokning, pling, ja, bekräftelse-pling. Övriga sidor laddar utan JS-fel.

**Nästa:** Patrik frågar Bildfab om fotografen måste godkänna varje bokning. Nej: Google Kalender (de har Workspace). Ja: Cal.com. Restid som styr tider: bygga själv. Startsidan är omskriven efter den frågan.

**Lokalt:** `uv run --no-project python -m http.server 8765` i repot. Push som `Elwyndaz` (remote har användarnamnet), även när `gh` har ett annat konto aktivt.

**2026-11-04, mutationstest** (grenen `claude/mutation-2026-11-04`, PR #2, inte mergad). Audit-kolumnen Mutation på `restid.js` med Stryker 10.1.1. Ny `test/restid.test.js` (node:test, låtsad fetch och timers, 13 pass och 1 todo). Poäng 0 % före (inga tester), 98,51 % efter; den överlevande är ekvivalent. Ingen produktionskod ändrad. Todo-testet gäller kortad adress, rättat i PR #1: gör om det till ett vanligt test när PR #1 är mergad.
