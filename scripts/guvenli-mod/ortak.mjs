// Güvenli mod kontrollerinin (form-kontrol, gorsel-kontrol) ortak yardımcıları.
// Kurallar: CLAUDE.md "Güvenli Mod" bölümü, ayrıntı: docs/guvenli-mod/README.md
import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

export const KOK = fileURLToPath(new URL('../../', import.meta.url));
export const DIST = path.join(KOK, 'dist');
export const GUVENLI_MOD = path.join(KOK, 'docs', 'guvenli-mod');

export const secenekVar = (ad) => process.argv.includes(ad);
export const secenekDegeri = (ad) =>
  process.argv.find((a) => a.startsWith(`${ad}=`))?.slice(ad.length + 1);

/** Kontroller her zaman güncel çıktıya bakar: önce `astro build`. --derleme-yok ile mevcut dist/ kullanılır. */
export function derle() {
  if (secenekVar('--derleme-yok')) {
    if (!fs.existsSync(path.join(DIST, 'index.html'))) {
      console.error('dist/ yok. --derleme-yok olmadan çalıştırın ya da önce "npm run build".');
      process.exit(1);
    }
    console.log('Derleme atlandı (--derleme-yok); mevcut dist/ kullanılıyor.');
    return;
  }
  console.log('Site derleniyor (astro build)…');
  const sonuc = spawnSync(process.execPath, [path.join(KOK, 'node_modules', 'astro', 'astro.js'), 'build'], {
    cwd: KOK,
    encoding: 'utf8',
    maxBuffer: 64 * 1024 * 1024,
  });
  if (sonuc.status !== 0) {
    console.error(sonuc.stdout, sonuc.stderr);
    console.error('Derleme başarısız; kontrol yapılamadı.');
    process.exit(1);
  }
}

/** dist/ içindeki tüm HTML dosyaları: [{ url: '/iletisim', dosya: 'C:\…\dist\iletisim\index.html' }] */
export function htmlSayfalari(kok = DIST) {
  const sayfalar = [];
  (function gez(klasor) {
    for (const o of fs.readdirSync(klasor, { withFileTypes: true })) {
      const p = path.join(klasor, o.name);
      if (o.isDirectory()) gez(p);
      else if (o.name.endsWith('.html')) {
        const goreli = path.relative(kok, p).split(path.sep).join('/');
        const url = '/' + goreli.replace(/(^|\/)index\.html$/, '').replace(/\.html$/, '');
        sayfalar.push({ url, dosya: p });
      }
    }
  })(kok);
  return sayfalar.sort((a, b) => a.url.localeCompare(b.url));
}

const TURLER = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

/**
 * dist/ için Vercel'e benzer statik sunucu: /yol → dist/yol, yoksa dist/yol/index.html;
 * bulunamazsa 404 (dist/404.html varsa onu döner). Rastgele boş bir porttan yalnızca 127.0.0.1'de dinler.
 */
export async function sunucuBaslat(kok = DIST) {
  const sunucu = http.createServer((istek, yanit) => {
    let yol;
    try {
      yol = decodeURIComponent(new URL(istek.url, 'http://yerel').pathname);
    } catch {
      yanit.writeHead(400).end();
      return;
    }
    const adaylar = yol.endsWith('/') ? [path.join(yol, 'index.html')] : [yol, path.join(yol, 'index.html')];
    for (const aday of adaylar) {
      const dosya = path.join(kok, aday);
      if (!dosya.startsWith(kok)) break; // dist/ dışına çıkılmaz
      if (fs.existsSync(dosya) && fs.statSync(dosya).isFile()) {
        yanit.writeHead(200, { 'Content-Type': TURLER[path.extname(dosya).toLowerCase()] ?? 'application/octet-stream' });
        fs.createReadStream(dosya).pipe(yanit);
        return;
      }
    }
    const sayfa404 = path.join(kok, '404.html');
    yanit.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    yanit.end(fs.existsSync(sayfa404) ? fs.readFileSync(sayfa404) : 'Bulunamadı');
  });
  await new Promise((tamam) => sunucu.listen(0, '127.0.0.1', tamam));
  return {
    adres: `http://127.0.0.1:${sunucu.address().port}`,
    kapat: () =>
      new Promise((tamam) => {
        sunucu.closeAllConnections();
        sunucu.close(tamam);
      }),
  };
}
