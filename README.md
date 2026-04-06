# Stopper

A minimalist countdown timer PWA — installable on mobile and desktop, works fully offline.

🔗 **[Live demo](https://naaman666.github.io/Stopper)**

---

## Features

- ⏱ Countdown timer with minute/second drum pickers
- 🎨 Purple and green color themes, light/dark mode
- 💾 Up to 10 saveable presets
- 🔊 Hungarian voice countdown for the last 10 seconds (Web Speech API)
- 📳 Vibration feedback on finish (mobile)
- 🔔 Audio beep on finish (Web Audio API)
- ⌚ Drift-compensated timer — stays accurate even after device sleep
- 📲 PWA — installable, works offline via Service Worker
- ♿ Accessible — ARIA labels, screen reader support

## Tech stack

- Vanilla HTML/CSS/JS — no frameworks, no build step
- Single-file app (`index.html`) with inline CSS and JS
- PWA with Service Worker (`sw.js`) and Web App Manifest
- Hosted on GitHub Pages

## File structure

```
index.html      — Full app (HTML + CSS + JS in one file)
manifest.json   — PWA manifest
sw.js           — Service Worker (offline caching)
icon.svg        — App icon
_headers        — Netlify security headers
```

## Local development

No build tools required. Just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server
```

Then open `http://localhost:8000`.

## Contributing

The `main` branch is protected — changes go through pull requests only. Branch naming convention: `claude/...`

---

---

# Stopper (Magyar)

Letisztult visszaszámláló PWA — telepíthető mobilra és asztali gépre, teljesen offline is működik.

🔗 **[Élő demo](https://naaman666.github.io/Stopper)**

---

## Funkciók

- ⏱ Visszaszámláló dob-görgetős perc/másodperc beállítással
- 🎨 Lila és zöld színtéma, világos/sötét mód
- 💾 Akár 10 elmenthető előbeállítás
- 🔊 Magyar hangos visszaszámlálás az utolsó 10 másodpercben (Web Speech API)
- 📳 Rezgés visszajelzés lejáratkor (mobilon)
- 🔔 Hangjelzés lejáratkor (Web Audio API)
- ⌚ Sodráskompenzált időzítő — eszköz alvás után is pontos marad
- 📲 PWA — telepíthető, offline is működik Service Worker-rel
- ♿ Akadálymentesített — ARIA feliratok, képernyőolvasó támogatás

## Technológia

- Vanilla HTML/CSS/JS — framework és build lépés nélkül
- Egyetlen fájlos alkalmazás (`index.html`) inline CSS-sel és JS-sel
- PWA Service Worker-rel (`sw.js`) és Web App Manifest-tel
- GitHub Pages hosztolással

## Fájlstruktúra

```
index.html      — Teljes alkalmazás (HTML + CSS + JS egy fájlban)
manifest.json   — PWA manifest
sw.js           — Service Worker (offline gyorsítótár)
icon.svg        — Alkalmazás ikon
_headers        — Netlify biztonsági fejlécek
```

## Helyi fejlesztés

Nem kell build eszköz. Nyisd meg az `index.html`-t böngészőben, vagy indíts lokális szervert:

```bash
python3 -m http.server
```

Majd nyisd meg: `http://localhost:8000`.

## Közreműködés

A `main` ág védett — változtatások csak pull request-en keresztül kerülhetnek be. Branch névformátum: `claude/...`
