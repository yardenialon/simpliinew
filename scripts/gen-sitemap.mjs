/* =============================================================================
   Auto-generate public/sitemap.xml at build time.
   Runs as the `prebuild` npm script, so `vite build` (local or on Vercel) always
   ships a sitemap with fresh <lastmod> dates — no manual upkeep.

   lastmod per page = that file's last git commit date (real content-change date),
   falling back to today. The script is defensive: on any error it warns and
   exits 0 so it can never break the production build.
   ========================================================================== */
import { execSync } from 'node:child_process';
import { writeFileSync, existsSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const SITE = 'https://www.simpliigood.com';

// Pages that ship in the build (keep in sync with vite.config.mjs `input`),
// with the loc path, SEO priority and change frequency.
const PAGES = [
  { file: 'index.html',           loc: '/',                     priority: '1.0', changefreq: 'weekly'  },
  { file: 'simplii-green.html',   loc: '/simplii-green.html',   priority: '0.9', changefreq: 'weekly'  },
  { file: 'learn.html',           loc: '/learn.html',           priority: '0.8', changefreq: 'monthly' },
  { file: 'where-to-buy.html',    loc: '/where-to-buy.html',    priority: '0.9', changefreq: 'weekly'  },
  { file: 'recipes.html',         loc: '/recipes.html',         priority: '0.8', changefreq: 'monthly' },
  { file: 'spirulina-iron-anemia.html', loc: '/spirulina-iron-anemia.html', priority: '0.8', changefreq: 'monthly' },
  { file: 'spirulina-new-york.html',    loc: '/spirulina-new-york.html',    priority: '0.9', changefreq: 'monthly' },
  { file: 'fresh-vs-powder.html', loc: '/fresh-vs-powder.html', priority: '0.8', changefreq: 'monthly' },
  { file: 'texture.html',         loc: '/texture.html',         priority: '0.7', changefreq: 'monthly' },
  { file: 'food-service.html',    loc: '/food-service.html',    priority: '0.7', changefreq: 'monthly' },
  { file: 'about.html',           loc: '/about.html',           priority: '0.6', changefreq: 'monthly' },
  { file: 'contact.html',         loc: '/contact.html',         priority: '0.6', changefreq: 'yearly'  },
];

const today = new Date().toISOString().slice(0, 10);

function lastmodFor(file) {
  const full = resolve(ROOT, file);
  if (!existsSync(full)) return null; // skip pages that aren't in the repo
  // Prefer the file's last git commit date (real content date).
  try {
    const d = execSync(`git log -1 --format=%cs -- "${file}"`, { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] })
      .toString().trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;
  } catch { /* git not available / shallow clone — fall through */ }
  // Fallback: file mtime, else today.
  try { return statSync(full).mtime.toISOString().slice(0, 10); } catch { return today; }
}

try {
  const urls = PAGES
    .map((p) => ({ ...p, lastmod: lastmodFor(p.file) }))
    .filter((p) => p.lastmod) // drop pages missing from the repo
    .map((p) =>
      `  <url>\n` +
      `    <loc>${SITE}${p.loc}</loc>\n` +
      `    <lastmod>${p.lastmod}</lastmod>\n` +
      `    <changefreq>${p.changefreq}</changefreq>\n` +
      `    <priority>${p.priority}</priority>\n` +
      `  </url>`
    )
    .join('\n');

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${urls}\n` +
    `</urlset>\n`;

  writeFileSync(resolve(ROOT, 'public', 'sitemap.xml'), xml, 'utf8');
  console.log(`[gen-sitemap] wrote public/sitemap.xml with ${PAGES.length} URLs`);
} catch (err) {
  console.warn('[gen-sitemap] skipped (non-fatal):', err && err.message ? err.message : err);
  process.exit(0);
}
