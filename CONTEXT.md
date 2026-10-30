# Bokning för Bildfab

Demos som jämför bokningslösningar för Bildfabriken (bildfab.se, Umeå, 2 fotografer, mest mäklarjobb). Underlag till ägaren, inte en produkt.

| | |
|---|---|
| Host | GitHub Pages, `buildapp.se/bildfab/`, repo `buildapp-se/bildfab` (publikt, krävs för Pages). Alla sidor `noindex, nofollow`. |
| Stack | Statisk HTML + vanilla JS, inget bygge. Demodata i localStorage. |
| Sidor | `index.html` jämförelse och kostnader, `google/` och `cal/` återskapade flöden, `mvp/` förfrågningsskiss, `mobil/` två telefoner (mäklare + fotograf) med pling och ja/nej. |
| Restid | `restid.js`: Nominatim + OSRM-demo, bara för demo. |
| Ramning | Zonen sätter `frame-ancestors 'none'`, så `mobil/index.html` laddar `app.html` som `srcdoc`, inte `src`. Rollen läses från iframens `name`. |
| Bilder | `mvp/assets/` kommer från bildfab.se. Publicerade på Patriks begäran 2026-10-28 för att visa ägaren. |

Rekommendation i sidan: Cal.com Free + "Kräver bekräftelse" (verifiera i riktigt konto), bygga själv på Cloudflare när restid som styr tider behövs.

## Audits
- Secrets: 2026-10-30, pass, gitleaks 0 findings in 5 commits
- Actions: 2026-10-30, n/a, no GitHub Actions workflows
- npm audit: 2026-10-30, n/a, no package.json
- Dependabot: 2026-10-30, pass, 0 open alerts
- Headers (automated): 2026-10-30, pass, 6 of 6 on buildapp.se/bildfab, Observatory B+ on buildapp.se
- WCAG 2.2 AA (automated): 2026-10-30, fail, axe 4.14.0 2 violations on 8 elements on buildapp.se/bildfab (mobile, one page): color-contrast (serious), scrollable-region-focusable (serious)
- UX (automated): 2026-10-30, needs-review, 6 of 6 script checks pass on buildapp.se/bildfab (no --interact); screenshot review not done
