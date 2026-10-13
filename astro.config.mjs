// Astro yapılandırması. Kurallar: .claude/skills/seo-kurallar §8
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import { siteAdresi } from './src/data/site.ts';

// sitemap.xml ve robots.txt derleme sonunda dist/'ten üretilir. Sitemap'e yalnızca indekslenmesi istenen
// sayfalar girer: noindex taşıyan sayfalar (Yakında sayfaları, zayıf içerikli projeler) HTML'den okunup
// dışarıda bırakılır; içerik eklenince kendiliğinden girerler. Teşekkürler ve 404 her durumda hariçtir.
const HARIC = ['/404', '/tesekkurler'];
const haricMi = (yol) => HARIC.includes(yol) || yol === '/admin' || yol.startsWith('/admin/');

async function htmlDosyalari(klasor) {
  const liste = [];
  for (const o of await readdir(klasor, { withFileTypes: true })) {
    const p = path.join(klasor, o.name);
    if (o.isDirectory()) liste.push(...(await htmlDosyalari(p)));
    else if (o.name.endsWith('.html')) liste.push(p);
  }
  return liste;
}

const xmlKacis = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const siteHaritasi = {
  name: 'site-haritasi',
  hooks: {
    'astro:build:done': async ({ dir, logger }) => {
      const kok = fileURLToPath(dir);
      const yollar = [];
      for (const dosya of await htmlDosyalari(kok)) {
        const goreli = path.relative(kok, dosya).split(path.sep).join('/');
        const yol = `/${goreli.replace(/(^|\/)index\.html$/, '').replace(/\.html$/, '')}`.replace(/\/$/, '') || '/';
        if (haricMi(yol)) continue;
        if (/<meta name="robots" content="[^"]*noindex/.test(await readFile(dosya, 'utf8'))) continue;
        yollar.push(yol);
      }
      yollar.sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));

      const urlset = yollar.map((y) => `  <url><loc>${xmlKacis(new URL(y, siteAdresi).href)}</loc></url>`).join('\n');
      await writeFile(
        path.join(kok, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlset}\n</urlset>\n`
      );
      await writeFile(
        path.join(kok, 'robots.txt'),
        `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap.xml', siteAdresi).href}\n`
      );
      logger.info(`sitemap.xml (${yollar.length} adres) ve robots.txt yazıldı`);
    },
  },
};

export default defineConfig({
  site: siteAdresi,
  trailingSlash: 'never',
  integrations: [siteHaritasi],
});
