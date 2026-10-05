// Astro yapılandırması. Kurallar: .claude/skills/seo-kurallar §8
import { readFile } from 'node:fs/promises';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Sitemap'e yalnızca indekslenmesi istenen sayfalar girer. noindex taşıyan sayfalar (Yakında sayfaları,
// zayıf içerikli projeler) derleme sonunda HTML'den okunur; bu entegrasyon sitemap'ten önce çalışır.
const noindexSayfalar = new Set();
const noindexTara = {
  name: 'noindex-tara',
  hooks: {
    'astro:build:done': async ({ dir, pages }) => {
      for (const { pathname } of pages) {
        const klasor = pathname && !pathname.endsWith('/') ? `${pathname}/` : pathname;
        const html = await readFile(new URL(`${klasor}index.html`, dir), 'utf8').catch(() => '');
        if (html.includes('<meta name="robots" content="noindex"')) {
          noindexSayfalar.add(`/${pathname}`.replace(/\/$/, '') || '/');
        }
      }
    },
  },
};

export default defineConfig({
  site: 'https://2kahsap.com',
  trailingSlash: 'never',
  integrations: [
    noindexTara,
    sitemap({
      filter: (sayfa) => !noindexSayfalar.has(new URL(sayfa).pathname.replace(/\/$/, '') || '/'),
    }),
  ],
});
