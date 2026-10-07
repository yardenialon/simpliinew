/* =============================================================================
   SEO audit — runs in CI (and locally) over the built HTML to catch SEO
   regressions before they ship. Checks every page for:
     • a non-empty <title> (and flags > 60 chars)
     • a non-empty meta description (and flags length outside ~50–160)
     • a canonical link
     • exactly one <h1>
     • Open Graph title + image
     • every application/ld+json block parses as valid JSON

   Usage:  node scripts/seo-audit.mjs [dir]   (default: dist, falls back to .)
   Exits 1 if any page has a hard error; warnings never fail the build.
   ========================================================================== */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';

const ROOT = process.cwd();
let dir = process.argv[2] || 'dist';
if (!existsSync(resolve(ROOT, dir))) dir = '.'; // fall back to source files
const base = resolve(ROOT, dir);

// Files to skip (orphans / non-page HTML not shipped by the Vite build).
const SKIP = new Set(['SimpliiGood — Real. Super. Food..html']);

function htmlFiles(d) {
  return readdirSync(d)
    .filter((f) => f.toLowerCase().endsWith('.html') && !SKIP.has(f))
    .map((f) => join(d, f))
    .filter((p) => statSync(p).isFile());
}

function count(re, s) { return (s.match(re) || []).length; }
function firstGroup(re, s) { const m = s.match(re); return m ? (m[1] || '').trim() : null; }

const files = htmlFiles(base);
if (!files.length) { console.error(`[seo-audit] no HTML files found in ${dir}`); process.exit(1); }

let hardErrors = 0;
let warnings = 0;
const lines = [];

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  const name = file.replace(base + '/', '').replace(base, '');
  const errs = [];
  const warns = [];

  // Title
  const title = firstGroup(/<title>([\s\S]*?)<\/title>/i, html);
  if (!title) errs.push('missing <title>');
  else if (title.length > 60) warns.push(`title ${title.length} chars (>60)`);

  // Meta description (backreference \1 matches the SAME quote the attribute opened
  // with, so a content value containing an apostrophe isn't truncated).
  let dm = html.match(/<meta[^>]+name=["']description["'][^>]*content=(["'])([\s\S]*?)\1/i)
        || html.match(/<meta[^>]+content=(["'])([\s\S]*?)\1[^>]*name=["']description["']/i);
  const desc = dm ? dm[2].trim() : null;
  if (!desc) errs.push('missing meta description');
  else if (desc.length < 50 || desc.length > 160) warns.push(`description ${desc.length} chars (ideal 50–160)`);

  // Canonical
  if (!/<link[^>]+rel=["']canonical["']/i.test(html)) errs.push('missing canonical');

  // Exactly one H1
  const h1s = count(/<h1[\s>]/gi, html);
  if (h1s === 0) errs.push('no <h1>');
  else if (h1s > 1) warns.push(`${h1s} <h1> tags (expected 1)`);

  // Open Graph
  if (!/property=["']og:title["']/i.test(html)) warns.push('missing og:title');
  if (!/property=["']og:image["']/i.test(html)) warns.push('missing og:image');

  // JSON-LD validity
  const blocks = [...html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/gi)];
  blocks.forEach((b, i) => {
    try { JSON.parse(b[1]); } catch (e) { errs.push(`JSON-LD block ${i + 1} invalid: ${e.message}`); }
  });

  if (errs.length) { hardErrors += errs.length; lines.push(`✗ ${name}`); errs.forEach((e) => lines.push(`    ERROR: ${e}`)); }
  else lines.push(`✓ ${name}${warns.length ? '  (' + warns.length + ' warning' + (warns.length > 1 ? 's' : '') + ')' : ''}`);
  warns.forEach((w) => { warnings++; lines.push(`    warn:  ${w}`); });
}

console.log(`\n[seo-audit] ${files.length} pages checked in "${dir}"\n`);
console.log(lines.join('\n'));
console.log(`\n[seo-audit] ${hardErrors} error(s), ${warnings} warning(s)`);

if (hardErrors > 0) { console.error('[seo-audit] FAILED — fix the errors above.'); process.exit(1); }
console.log('[seo-audit] passed ✅');
