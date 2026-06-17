# SimpliiGood Spirulina — Website (client: Alon Yardeni)

Marketing site for **SimpliiGood** ("Simplii Green" division) — fresh-frozen spirulina cubes.
Single-page, scroll-based, brand-led. Launch target: week of 15 Jun 2026.

## Stack
- Static HTML + inline CSS + vanilla JS + **GSAP/ScrollTrigger via CDN**. No framework on the page.
- Built with **Vite** (multi-page config, but only `index.html` is an input now).
- Deployed on **Vercel** from GitHub (`ShreyasRajthe1st/Alon-s-website`), config in `vercel.json`
  (`buildCommand: npm run build`, `outputDirectory: dist`). Vercel serves `dist/`.

## Structure
- `index.html` — THE site. Self-contained: brand tokens + all sections + scripts inline.
- `public/images/` — chosen, clean-named product/lifestyle photography (copied as-is into `dist/images/`).
- `public/fonts/` — Franklin Gothic URW `.otf` (the real brand typeface), `@font-face` in index.html.
- `Fonts/` — original brand font drop from the client (source of the public/fonts copies).
- `_index.linoxa.bak.html` — the ORIGINAL Webflow "Linoxa" real-estate template build (residue-ridden).
  Kept only as reference. Do NOT deploy or copy from it.
- `about/service/technology/pricing.html` + loose root images — legacy Linoxa pages, NOT built/deployed.

## Brand system (from the client's SimpliiGood Brand Guidelines — non-negotiable)
- **Simplii Yellow `#FEE62D`** = PRIMARY. **Spirulina Green `#154048`** = lead dark.
  **Starburst Green `#31B278`** = secondary. Fruit colors (raspberry `#EF467B`, blueberry, strawberry,
  lime, cherry) = ACCENTS only (CTAs/illustration), never section fills.
- Type: **Franklin Gothic URW** — Heavy for display, Demi for body, Condensed for labels/marquee.
- Voice: hopeful, honest, easy. Tagline **REAL. SUPER. FOOD.** "Sunshine in a cube." Brand name is
  always titlecase **SimpliiGood**.
- Hard rules: yellow + dark green must lead. No black template footers. No "design/spaces" copy.
  No third-party build watermark. Keep packaging shots a single consistent scale (no mismatched composites).

## Page sections (in order)
nav → hero (yellow, image) → marquee → benefits/stats (yellow) → fresh-vs-dried (green) →
"Drop it. Done." use cases (green) → **"See it in action" video band (cream, 2 UGC videos)** →
shop/D2C (cream, **product-spin video**) → sustainability (starburst) → **gallery (green, 8 imgs)** →
testimonials (cream) → B2B/food-service form (green) → store locator (yellow) → footer (green).

## Media (all from Sujal's original repo, optimized; deploy is Netlify only)
- `public/videos/` — `product-spin.mp4` (hero-video.mp4, shop section, CSS-zoomed via `.shop-media.has-video`),
  `in-action.mp4` + `in-action-2.mp4` (UGC Ultra/UgC, the video band). All re-encoded with ffmpeg:
  scaled, audio stripped, `+faststart`; `<video autoplay muted loop playsinline poster=…>`.
- All photos optimized with Pillow to ≤1600px (webp q82 / png). Total deployed weight ~5MB.
- Source originals (5MB+ mp4s, 3-4MB pngs) stay in repo root; only optimized `public/` copies ship.
- If regenerating imagery: use **Google Nano Banana 2** via the funded GEMINI key (see 17 Jun PM update; Magnific MCP is out of credits). Pass `public/images/hero-pack.webp` as a reference so the pouch stays on-brand; keep packaging a single consistent scale.

## Conventions / gotchas
- Reveal animations are **progressive enhancement**: content is visible by default; `.js-on .reveal`
  hides then GSAP/IO adds `.in`. There is a load-time safety net so nothing is ever stuck at opacity 0.
- Counter numbers live in `.count` spans INSIDE `.stat b` / `.bigstat b`. Scope generic description
  rules to `.stat>span` / `.bigstat>span` so they don't shrink the counters.
- The footer watermark is `.footer-wm-wrap .wm` (it's a sibling of `.footer-bottom`, not a child).
- Image guard swaps any failed `<img>` to a brand-gradient SVG data-URI — never ships a broken image.
- B2B form has no backend yet — it prevents default and shows an inline confirmation. Wire to a real
  endpoint (or Formspree/Netlify/Shopify) before relying on leads.

## Dev / build / test
- `npm install && npm run dev` → http://localhost:8085
- `npm run build` → emits `dist/`. Test the **built** `dist/` (that's what deploys):
  `cd dist && python3 -m http.server 8091` then drive it with Playwright (desktop + mobile).
- Before declaring done: 0 console errors, 0 broken images, no `.reveal` stuck at opacity 0,
  and grep `dist/index.html` for residue: `shape your next space`, `Fascreek`, `1430 Broadway`,
  `Disccover`, `purposeful spaces` → all must be 0.

## Update 15 Jun 2026 (PM) — multi-page + scroll-scrubbing + cursor (client approved)
Alon approved the direction and asked for scroll-scrubbing animations. Now a 4-page site:
- `index.html` — Simplii Green home. Adds: Lenis smooth scroll + GSAP ScrollTrigger scrub,
  PINNED HORIZONTAL "Drop it" use-cases (desktop; stacks on mobile via gsap.matchMedia),
  scroll-progress bar, film grain, hero aura + bg word + parallax, custom cursor + magnetic
  buttons, a Simplii Texture teaser (#texture), and the new flatlay image in the in-action band.
- `texture.html` / `about.html` / `food-service.html` — built on shared `public/site.css` +
  `public/site.js` (design system + Lenis/reveals/cursor/forms). Vite builds all 4 (vite.config inputs).
- Footer: "Designed & built by RapidX AI" credit (`.footer-credit`) on every page.
- Nav (all pages): Why Spirulina · How to Use · Food Service · Simplii Texture · Find a Store · About · Shop.
- Images: Texture uses drive "Smoked salmon" photos (texture-*.webp). Sojil's flatlay = flatlay-tray.webp.
- GOTCHA / lesson: never drive a CSS marquee's animationDuration from a scroll onUpdate — it restarts
  the animation each frame and VIBRATES. Removed. Also: don't gate above-the-fold text visibility on a
  JS tween (a masked-line hero entrance left the headline hidden) — hero entrance is CSS-only now.
- Sub-page forms post nowhere yet (data-confirm graceful confirm). Wire to a real endpoint before launch.

## Update 15 Jun (late) — scroll/cursor/nav fixes + per-page enrichment
- SCROLL: removed the mix-blend-mode grain + the custom blend-mode cursor (both forced full-page repaints = "horrendous" scroll jank). Sub-pages now use NATIVE scroll (Lenis removed from public/site.js); home keeps Lenis. Grain is opacity-only now.
- CURSOR: reverted to the native cursor. Instead, CARDS react to the cursor (3D tilt + lift on hover) + magnetic buttons. Logic in public/site.js and index.html inline script (fine-pointer only).
- NAV: dark-hero pages (texture.html, food-service.html) get class "nav nav-light" so the top/non-scrolled nav is readable (yellow brand + cream links). Defined in site.css.
- PLAINNESS: texture/about/food-service enriched (per-page <style> blocks after the site.css link): colored accent cards, full-bleed image bands, numbered process steps, dark stat bands, full-bleed division cards, menu tiles. Built by 3 parallel sub-agents, one per page.
- Atlas Cloud image API (key for Nano Banana 2) rejected every image format (Gemini *-image 400s, gpt-image router down). $0 spent. **RESOLVED 17 Jun PM** — the real cause was the wrong model id in gemini.env (`gemini-3.1-flash-live-preview`, a live model). The working image path is the funded GEMINI key with model `gemini-3-pro-image-preview` (see 17 Jun PM update).

## Update 15 Jun (late PM) — store locator + stats fix
- Store locator (#stores on index.html): real interactive Leaflet map + searchable directory built from Alon's 264-store CSV. Data in `public/stores.js` (window.STORES + window.STORE_STATES, regenerate from the CSV with the python in the daily note). Map = CartoDB Positron tiles + circleMarkers per state (sized by count, click to filter). Panel = search box + state chips + directory with Google Maps "Get directions" links.
- LEAFLET GOTCHA: another global `L` clobbers Leaflet's namespace at runtime, so `window.L` becomes a bare function. FIX: capture `window.LMAP=window.L` in an inline <script> immediately after the Leaflet <script>, and use LMAP. Map is lazy-init via IntersectionObserver (container is inside a .reveal, so init on scroll-in + invalidateSize).
- STATS FIX: site.css `.statrow .st span` was shrinking the `.count` number (same bug pattern as `.stat>span`). Scoped to `.statrow .st>span`. Fixes texture/about/food-service stat numbers.

## Update 17 Jun 2026 — GSAP scroll-scrub blender sequence (Alon's #1 ask, built)
Canonical repo is now **toprmrproducer/simpliigood-website** (Netlify only; old ShreyasRajthe1st/Alon-s-website is dead/outdated). Deploy: `netlify deploy --prod --dir=dist --site=ebef461c-4bd5-4ee6-957f-90bf83f69057`.

NEW: Apple-style canvas image-sequence scroll-scrub inserted right after the hero (`<section id="scrolly" class="scrollyseq">`). Narrative = sun (yellow) -> zoom -> frozen spirulina cube (green) -> cube drops into a blender of fruit (yellow). Exactly Alon's Visual Flow Map storyboard ("1st scroll animation").
- FRAMES: built from Alon's two Veo frame folders in ~/Downloads ("First Video Frames" 254 + "2nd Frames Video"/grinder 102 = 356). Processed via `/tmp/build-seq.sh` (ffmpeg): crop bottom 56px to kill the "Veo" watermark, scale, q-jpeg. Output to `public/images/seq/`:
  - `seq_0001..0356.jpg` (960w desktop, ~33KB ea), `m/m_0001..0119.jpg` (560w, every-3rd, mobile), `poster.jpg` (last blender frame), `manifest.json`. ~9MB total.
- COMPONENT: CSS `.scrollyseq{height:440vh}` + `position:sticky` pin (NO ScrollTrigger pin — avoids Lenis conflict). JS player at bottom of index.html: preloads frames (mobile uses the 119-set), draws cover-fit to canvas on a `ScrollTrigger {scrub:0.5}` keyed to section progress, 3 scroll-synced captions (REAL SUNSHINE / SUNSHINE IN A CUBE / DROP IT IN. BLEND IT UP), load bar, scroll hint.
- PROGRESSIVE ENHANCEMENT: `poster.jpg` <img> is visible by default; canvas fades in (`.ready`) once frame 0 decodes, then poster hides. prefers-reduced-motion keeps the static poster. Never blank.
- PENDING (Alon's 2nd scroll animation): a glass filling with spirulina juice in the "SPIRULINA IS A SOLAR-POWERED NUTRIENT FACTORY" stats section. No frames for it yet — needs a pour clip/sequence.

## Update 17 Jun 2026 (PM) — Nano Banana 2 imagery + fly-in system + footer v2 (client friend approved)
**AI IMAGERY (working path, finally).** Google Nano Banana 2 / Pro via the funded GEMINI key — NOT Magnific (that MCP has Nano Banana 2 but is out of credits: 75 cr/image, ~12 left).
- Model `gemini-3-pro-image-preview` (SOTA, best brand/text fidelity), `generateContent`, ~1300 img-tokens ≈ **$0.13/image** (under the $0.50 cap). Verify the key's image models with `GET .../v1beta/models?key=$GEMINI_API_KEY` (filter name~image).
- Reusable generator: `/tmp/nb.py` (urllib; args: out ratio prompt [refs…]; body = responseModalities IMAGE + imageConfig{aspectRatio,imageSize:2K}, falls back to bare body on 400). `set -a; source ~/.claude/credentials/gemini.env; set +a` before running (vars need exporting). Pass `hero-pack.webp` as a reference for any pouch shot so the brand pack stays faithful.
- 5 new immaculate shots added (Pillow-opt to webp ≤1600/q82): `footer-pack.webp` (4:5 pedestal pack — footer), `cube-macro.webp` (1:1 frozen cube), `smoothie-pour.webp` (4:5 green pour), `flatlay-fresh.webp` (3:2 flatlay), `breakfast-bowl.webp` (3:2 lifestyle). Gallery now shows 4 of them; old slots (pack-splash/wood-product/flatlay-tray/smoothie-bowl) swapped out.

**FLY-IN ANIMATIONS (Alon's ask "why can't images fly in").** New `data-reveal="fly"` + `data-fly="left|right|up|down|zoom"` system in the index.html inline script: a per-element `ScrollTrigger.create` → `gsap.from(el,{x/y/rotation/scale,autoAlpha:0,immediateRender:false,once})`. Content is visible by default (no CSS hide), so JS-off / GSAP-fail still shows everything. Applied to: gallery figures (alternating dirs), the big section media (fresh/shop/sustain/b2b/tt), and the footer copy+media.
- HERO entrance is now a CSS-only fly-in: `@keyframes heroFly{translateX(54px)→0 + fade}` on `.js-on .hero-visual`. The conflicting gsap `.hero-visual` yPercent parallax was REMOVED (a CSS transform animation + gsap transform on the same element fight and the `both` fill freezes the parallax). The inner pack img keeps its `data-speed` parallax (different element). Respects prefers-reduced-motion (existing media query).

**FOOTER v2.** Closing band (`.footer-hero`) now leads with the immaculate `footer-pack.webp` (portrait 4:5, `max-height:564px`) + bigger headline (`clamp(2.9rem,6vw,6rem)`) + Shop CTA + "10 cubes · ships frozen" badge; newsletter band slimmed below; giant animated wordmark unchanged. Inspired by footer.design refs Alon shared (editorial, big type, strong product image).
- Verified live (webkit Playwright): 0 console errors, 0 broken images, 15 fly elements, none stuck invisible, hero `heroFly` active. Deployed commit pending.

## Update 17 Jun 2026 (PM-2) — restructured to the brand DIVISION-CHOOSER (Alon's IA)
Alon flagged the live build opened straight on the Green product page and skipped the **division-chooser landing** the brief locked in, and shared his own mockup. We adopted his IA on OUR engine:
- **`index.html` is now the brand division-chooser** (NOT the Green page anymore): brand hero "Real super food, from your kitchen to industry" → split `.chooser` panels **SIMPLII GREEN | SIMPLII TEXTURE** → `.tech` band ("engineered for scale", `tech-bioreactor.webp`) → `.bstats` strip → `.invest` band ("backing the future", `farm-aerial.webp`) → shared footer. Built on `site.css` + `site.js` + a page `<style>` (same pattern as texture/about/food-service), plus an inline fly-in + panel-entrance script. Dark `--ink` hero/chooser, `--cream` content, `--yellow` accents.
- **`simplii-green.html` = the deep animated Green page** (the old index.html, copied verbatim, scroll-scrub + 264-store locator + fly-ins intact). Brand logo there now → `index.html`.
- ROUTING: chooser Green panel → `simplii-green.html`, Texture panel → `texture.html`. Sub-page nav links repointed `index.html#x` → `simplii-green.html#x` (sed across texture/about/food-service). `vite.config.mjs` input adds `green: simplii-green.html`.
- New imagery via Nano Banana 2 (see [[nano-banana-image-gen]]): `tech-bioreactor.webp`, `farm-aerial.webp`.
- Verified live (webkit) desktop + 390px mobile: 0 console errors, all imgs load, chooser routes into both divisions, panels stack on mobile. Commit 46e0f54.
- OPEN / next: the Green-page scroll-scrub is 119 frames @800w and reads soft/pixelated fullscreen (Alon-flagged). Fix = regen those frames from the source Veo folders (`~/Downloads/First Video Frames` 254 + `~/Downloads/2nd Frames Video` 102) at ~1280w, preserving the bottom-56px "Veo" watermark crop + the sun→cube→blender frame sampling, then rebuild/redeploy. Do NOT change the narrative or the frame cadence.

## Update 17 Jun 2026 (PM-3) — heroscrub sun removed + blender scroll-scrub added (simplii-green.html)
- HEROSCRUB (#hero, the 1st scroll animation): REMOVED the procedural sun. `frame()` now remaps raw scroll `pe=0.30+0.70*p` so the frozen-cube fade-in opens the scene; flood/freeze/fall keep their original threshold timing ("rest unchanged"). Section height trimmed `340vh→240vh` to drop the now-empty sun lead-in so pacing matches. Captions untouched.
- NEW 3rd scroll animation = **blender video scrub** (`<section class="blend" id="blend">`), placed right after the heroscrub cube animation (#hero) and BEFORE the "solar-powered nutrient factory" benefits band (#benefits) — i.e. order is #hero → #blend → #benefits → … → #use. Copied 1:1 from the reference build `SimpliiGood — Real. Super. Food..html` (its 2nd animation). Narrative: CUBE DROP → BLEND IT UP → READY TO BLEND! (3 `.blend-line` captions phased at q<0.34 / <0.66 / else). Yellow section, jar masked (top + side fades) so it floats on the yellow.
  - ASSET: `public/videos/blend-scrub.mp4` (from `~/Downloads/blend-scrub (1).mp4`, h264 1080x810, **all-intra 121 frames** = instant seek, audio stripped, +faststart, lossless `-c:v copy`). Poster `public/images/blend-poster.jpg` = frame 0. ~2.86MB.
  - JS: `.blend-video` is `currentTime`-scrubbed via a scroll→progress rAF loop (eased, throttled seeks; IntersectionObserver gates it; iOS play-then-pause unlock). Uses `var(--ease-out)` (reference used `var(--ease)`).
  - **GOTCHA — local testing**: video scrubbing needs HTTP **Range** (206) support. Python's `http.server` returns 200 + empty `seekable` → `currentTime` stays stuck at 0 and the scrub looks broken (it's NOT). Test the built dist with `npx vite preview --outDir dist` (serves 206) or any range-capable server; Vercel/Netlify support it in prod. Also: headless open-source Chromium can't decode h264 — verify with `chromium.launch({channel:'chrome'})`.
  - Verified (real Chrome + range server): currentTime tracks scroll 0→5.04s, captions phase, mobile 390px jar sizes by height w/ cropped side-margins, 0 console errors (only the pre-existing favicon.ico 404), 0 broken images, poster shows if video can't decode (progressive enhancement).
- FOLLOW-UPS (same day): (1) Removed the heroscrub `.hero-line.l1` caption ("Frozen spirulina / Real. Super. Food.") — the cube animation now opens textless then runs l2 "Sunshine in a cube" → l3 "Drop it like a nutrient bomb"; reduced-motion fallback bumped l1→l2. (2) `.blend-headline` top `clamp(72px,10vh,120px)` → `clamp(116px,13.5vh,168px)` so the CUBE DROP headline clears the fixed nav (gap 7px→38px at 900h); its lower half still graces the jar's masked top fade. (3) MOVED the `.marquee` band from after the static hero to after the blender (#blend → marquee → #benefits). New top-level order: hero#top → heroscrub#hero → blend#blend → marquee → benefits#benefits → fresh → use → …
- (4) Footer wordmark `.footer-wm-wrap .wm` font-size `clamp(3rem,15.5vw,12rem)` → `clamp(2.4rem,12vw,9.4rem)`. At 12rem the "SimpliiGood" mark was exactly container-width (1184px, zero slack) so the GSAP `xPercent:6` parallax shoved its right edge into `overflow:hidden`. Now 902px text in the 1184px box (141px slack/side > the 71px shift) → fits with the animation, no clipping at 1440/1920/390.
- (5) **"Drop it" pin glitch fix (popping up / overlaying on scroll).** Root cause: `ScrollTrigger.refresh()` (fires on load / resize / late asset load) momentarily reads scroll as 0 to measure absolute positions, but Lenis owned the scroll so ST got the wrong value → the pinned horizontal `#hscroll` measured a NEGATIVE `start` (e.g. 8422→ -1200) and unpinned/jumped over the previous section. The Lenis↔ScrollTrigger integration was missing a **scrollerProxy**; added one (`ScrollTrigger.scrollerProxy(document.documentElement,{scrollTop returns window.scrollY / sets via lenis.scrollTo immediate, getBoundingClientRect=viewport})`) right after the Lenis init. Now refresh keeps `start`=8422 / stays `fixed`. Verified: 3× refresh while pinned = no jump, horizontal scroll still translates, reveals fire, 0 errors. (A first attempt — `lenis.stop()/start()` around refreshInit/refresh — did NOT work because ST still measured at scroll 0; the proxy is the correct fix.)
