---
reviewedAt: 2026-11-04
---
# Handoff

**Läge:** publicerat på https://buildapp.se/bildfab/ (noindex). Mobildemon verifierad live: bokning, pling, ja, bekräftelse-pling. Övriga sidor laddar utan JS-fel.

**Nästa:** Patrik frågar Bildfab om fotografen måste godkänna varje bokning. Nej: Google Kalender (de har Workspace). Ja: Cal.com. Restid som styr tider: bygga själv. Startsidan är omskriven efter den frågan.

**Lokalt:** `uv run --no-project python -m http.server 8765` i repot. Push som `Elwyndaz` (remote har användarnamnet), även när `gh` har ett annat konto aktivt.

**2026-11-04, förbättringsrunda** (grenen `claude/forbattringar-2026-11-04`, PR #1, inte mergad). Bara buggar och tillgänglighet, inget som ändrar vad demon visar:
- `restid.js`: ett svar som var på väg när adressen kortades eller ändrades skrev ändå restiden och skickade den till bokningen. Nu ogiltigförklaras det (backlogpunkten struken).
- `--muted` är `#6b6d7a` på startsidan, mvp och mobil (var `#808291`/`#82858f`, 3,3 till 3,8:1). Google- och Cal-demon orörda.
- Jämförelsetabellerna, flödesskissen och Google-demons veckovy har `tabindex="0"` och `role="region"`, så att de går att rulla med tangentbordet.

Verifierat lokalt i Chromium: axe-core färgkontrast och scrollable-region-focusable 0 fel på alla sidor (före: 34 och 4 element), inga JS-fel. Kvar enligt axe (moderate): `heading-order`, `region`/`landmark-one-main` i Google- och Cal-demon. Restidstjänsterna gick inte att nå från sessionen, så restiden är provad med fejkade svar. Inget deployat.
