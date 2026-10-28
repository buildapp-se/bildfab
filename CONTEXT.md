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
