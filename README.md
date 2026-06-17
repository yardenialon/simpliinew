# SimpliiGood Spirulina Website

Marketing site for **SimpliiGood** (client: Alon Yardeni). Fresh-frozen spirulina, "Real. Super. Food."
This is the **current, live** build (Simplii Green home + Simplii Texture, About, and Food Service pages,
plus the interactive store locator). Live preview: https://simpliigood-spirulina.netlify.app

## What's here
- `index.html` — homepage (Simplii Green). Self-contained: brand tokens + all sections + scripts inline.
- `texture.html` / `about.html` / `food-service.html` — sub-pages sharing `public/site.css` + `public/site.js`.
- `public/` — images, fonts (Franklin Gothic URW), videos, shared CSS/JS, and `stores.js` (264-store data).
- `dist/` — the pre-built static site (this is what deploys). You can open or serve this directly.

## Run it (two ways)

### Fastest: just open the pre-built site
The `dist/` folder is the finished static site. Serve it with any static server:

```bash
cd dist
python3 -m http.server 8091
```
Then open http://localhost:8091

### Develop / rebuild from source
Requires Node.js 18+.

```bash
npm install      # installs Vite + deps
npm run dev      # dev server at http://localhost:8085
npm run build    # rebuilds dist/
```

## Stack
Static HTML + inline CSS + vanilla JS, GSAP/ScrollTrigger + Leaflet via CDN, bundled with Vite (multi-page).
No backend. Deployed on Netlify (static `dist/`).

See `CLAUDE.md` for full structure, brand system, and section-by-section notes.
