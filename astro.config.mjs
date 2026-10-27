// Astro yapılandırması. Kurallar: .claude/skills/seo-kurallar §8
import { createHash } from 'node:crypto';
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

// vercel.json'daki Content-Security-Policy (zorunlu mod) satır içi betiklere yalnızca sha256 özetiyle izin verir.
// Derleme sonunda dist/'teki her satır içi betiğin özeti script-src'de aranır; eksikse derleme hata verir, çünkü
// betik canlıda sessizce engellenirdi. Betik değişince yeni özet vercel.json'a yazılır, eskisi silinir. Veri
// blokları (application/json, application/ld+json) çalıştırılmadığı için sayılmaz. Hiçbir sayfada kullanılmayan
// özet yalnızca uyarı verir.
const CALISAN_BETIK = ['', 'module', 'text/javascript', 'application/javascript'];

const cspKontrol = {
  name: 'csp-kontrol',
  hooks: {
    'astro:build:done': async ({ dir, logger }) => {
      const vercel = JSON.parse(await readFile(new URL('./vercel.json', import.meta.url), 'utf8'));
      const csp = vercel.headers.flatMap((k) => k.headers).find((b) => b.key === 'Content-Security-Policy')?.value;
      if (!csp) throw new Error('vercel.json: Content-Security-Policy başlığı bulunamadı');
      const scriptSrc = csp.split(';').map((y) => y.trim()).find((y) => y.startsWith('script-src ')) ?? '';
      const izinli = new Set((scriptSrc.match(/'sha256-[^']+'/g) ?? []).map((o) => o.slice(1, -1)));

      const kok = fileURLToPath(dir);
      const eksik = new Map(); // özet → sayfalar
      const kullanilan = new Set();
      let betikSayisi = 0;
      for (const dosya of await htmlDosyalari(kok)) {
        const html = await readFile(dosya, 'utf8');
        for (const [, nitelikler, icerik] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
          if (/\ssrc\s*=/i.test(nitelikler)) continue;
          const tur = (nitelikler.match(/\stype\s*=\s*["']?([^"'\s>]+)/i)?.[1] ?? '').toLowerCase();
          if (!CALISAN_BETIK.includes(tur)) continue;
          betikSayisi++;
          const ozet = `sha256-${createHash('sha256').update(icerik, 'utf8').digest('base64')}`;
          if (izinli.has(ozet)) kullanilan.add(ozet);
          else eksik.set(ozet, [...(eksik.get(ozet) ?? []), path.relative(kok, dosya).split(path.sep).join('/')]);
        }
      }

      for (const ozet of izinli) if (!kullanilan.has(ozet)) logger.warn(`CSP'de kullanılmayan özet: '${ozet}'`);
      if (eksik.size) {
        const liste = [...eksik].map(([o, s]) => `  '${o}' ← ${s.slice(0, 3).join(', ')}${s.length > 3 ? ` (+${s.length - 3})` : ''}`);
        throw new Error(
          `Satır içi betiğin özeti vercel.json'daki CSP script-src'de yok; canlıda engellenir:\n${liste.join('\n')}\n` +
            'Yeni özeti script-src\'ye ekleyin, değişen betiğin eski özetini silin.'
        );
      }
      logger.info(`CSP: ${betikSayisi} satır içi betik, ${kullanilan.size} özetin hepsi vercel.json'da`);
    },
  },
};

export default defineConfig({
  site: siteAdresi,
  trailingSlash: 'never',
  integrations: [siteHaritasi, cspKontrol],
});
