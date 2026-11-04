---
reviewedAt: 2026-11-04
---
# Handoff

**Läge:** publicerat på https://buildapp.se/bildfab/ (noindex). Mobildemon verifierad live: bokning, pling, ja, bekräftelse-pling. Övriga sidor laddar utan JS-fel.

**Nästa:** Patrik frågar Bildfab om fotografen måste godkänna varje bokning. Nej: Google Kalender (de har Workspace). Ja: Cal.com. Restid som styr tider: bygga själv. Startsidan är omskriven efter den frågan.

**Lokalt:** `uv run --no-project python -m http.server 8765` i repot. Push som `Elwyndaz` (remote har användarnamnet), även när `gh` har ett annat konto aktivt.

**2026-11-04, backlog** (grenen `claude/backlog-2026-11-04` ovanpå förbättringsgrenen, PR #4, mergad 2026-11-04):
- mvp `.ics`: VTIMEZONE, radvikning vid 75 oktetter, restid och tidsfönster i beskrivningen (även Google-länken), Flexibelt blir heldagshändelse.
- cal: räknarbadgen och menyn i mobil-admin (menyn var 110 till 185 px hög), Obekräftad-badgens färg skrevs över (4,34:1), rubriknivåer.
- Google och Cal: landmärken (header, main, nav), namn på alla formulärfält i fotografvyn, händelsefärg #0277bd (4,8:1) och Workspace-märket #a15700.
- mobil: innehållet i `main`.

axe (WCAG 2.x A/AA och best practice) 0 fynd i Google- och Cal-demons alla vyer och på mobil, i 390 och 1280 px. Kvar, moderate: `heading-order` och `region` på startsidan, mvp och `mobil/app.html`. Ingen testsvit finns; `.ics` provad i Chromium med en påhittad bokning (längsta rad 75 oktetter). Inget deployat.

**2026-11-04, förbättringsrunda** (grenen `claude/forbattringar-2026-11-04`, PR #1, mergad 2026-11-04). Bara buggar och tillgänglighet, inget som ändrar vad demon visar:
- `restid.js`: ett svar som var på väg när adressen kortades eller ändrades skrev ändå restiden och skickade den till bokningen. Nu ogiltigförklaras det (backlogpunkten struken).
- `--muted` är `#6b6d7a` på startsidan, mvp och mobil (var `#808291`/`#82858f`, 3,3 till 3,8:1). Google- och Cal-demon orörda.
- Jämförelsetabellerna, flödesskissen och Google-demons veckovy har `tabindex="0"` och `role="region"`, så att de går att rulla med tangentbordet.

Verifierat lokalt i Chromium: axe-core färgkontrast och scrollable-region-focusable 0 fel på alla sidor (före: 34 och 4 element), inga JS-fel. Kvar enligt axe (moderate): `heading-order`, `region`/`landmark-one-main` i Google- och Cal-demon. Restidstjänsterna gick inte att nå från sessionen, så restiden är provad med fejkade svar. Inget deployat.

**2026-11-04, mutationstest** (grenen `claude/mutation-2026-11-04`, PR #2, mergad 2026-11-04). Audit-kolumnen Mutation på `restid.js` med Stryker 10.1.1. Ny `test/restid.test.js` (node:test, låtsad fetch och timers, 13 pass och 1 todo). Poäng 0 % före (inga tester), 98,51 % efter; den överlevande är ekvivalent. Ingen produktionskod ändrad. Todo-testet gäller kortad adress, rättat i PR #1: gör om det till ett vanligt test när PR #1 är mergad.
