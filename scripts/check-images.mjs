// Build çıktısındaki (dist/) tüm sayfalarda kırık görsel olup olmadığını denetler.
//
//   npm run build && npm run check:images
//
// Denetlenen başvurular: <img src/srcset>, <source srcset>, ikon <link>'leri, og:image /
// twitter:image, JSON-LD "image"/"logo"/"contentUrl" alanları ve görsele giden <a href>'ler (galeri).
// Her dosya için: var mı, boş mu, gerçekten açılabiliyor mu; srcset'teki "NNNw" değeri
// dosyanın gerçek genişliğiyle aynı mı. Sorun varsa çıkış kodu 1'dir.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DIST = path.resolve(process.argv[2] ?? 'dist');
const GORSEL_UZANTI = /\.(webp|png|jpe?g|gif|avif|svg|ico)$/i;

if (!fs.existsSync(DIST)) {
  console.error(`Build klasörü yok: ${DIST} — önce "npm run build" çalıştırın.`);
  process.exit(1);
}

const sayfalar = [];
(function gez(klasor) {
  for (const o of fs.readdirSync(klasor, { withFileTypes: true })) {
    const p = path.join(klasor, o.name);
    if (o.isDirectory()) gez(p);
    else if (o.name.endsWith('.html')) sayfalar.push(p);
  }
})(DIST);

const nitelik = (etiket, ad) => etiket.match(new RegExp(`\\s${ad}="([^"]*)"`))?.[1];
const coz = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');

const hatalar = [];
const dosyalar = new Map(); // dist içi yol → { sayfalar: Set, srcsetGenislik: Map<genişlik, Set<sayfa>> }
let disBaglanti = 0;
let basvuruSayisi = 0;

for (const sayfa of sayfalar) {
  const html = fs.readFileSync(sayfa, 'utf8');
  const url = '/' + path.relative(DIST, sayfa).split(path.sep).join('/').replace(/index\.html$/, '');
  const koken = nitelik(html.match(/<link rel="canonical"[^>]*>/)?.[0] ?? '', 'href')?.match(/^https?:\/\/[^/]+/)?.[0];

  const ekle = (adres, kaynak, genislik) => {
    if (!adres) return hatalar.push(`${url} → boş görsel adresi (${kaynak})`);
    adres = coz(adres.trim());
    if (koken && adres.startsWith(koken)) adres = adres.slice(koken.length);
    if (/^(https?:)?\/\//.test(adres) || adres.startsWith('data:')) return disBaglanti++;
    const yol = decodeURI(adres.split(/[?#]/)[0]);
    const kayit = dosyalar.get(yol) ?? { sayfalar: new Set(), srcsetGenislik: new Map() };
    kayit.sayfalar.add(url);
    if (genislik) kayit.srcsetGenislik.set(genislik, (kayit.srcsetGenislik.get(genislik) ?? new Set()).add(url));
    dosyalar.set(yol, kayit);
    basvuruSayisi++;
  };
  const srcset = (deger, kaynak) =>
    deger.split(',').forEach((aday) => {
      const [adres, tanim] = aday.trim().split(/\s+/);
      ekle(adres, kaynak, tanim?.endsWith('w') ? Number(tanim.slice(0, -1)) : undefined);
    });

  for (const [img] of html.matchAll(/<img\b[^>]*>/g)) {
    const src = nitelik(img, 'src');
    if (src === undefined && img.includes('data-ik-gorsel')) continue; // galeri ışık kutusu, JS doldurur
    ekle(src, 'img src');
    const ss = nitelik(img, 'srcset');
    if (ss) srcset(ss, 'img srcset');
  }
  for (const [s] of html.matchAll(/<source\b[^>]*>/g)) srcset(nitelik(s, 'srcset') ?? '', 'source srcset');
  for (const [l] of html.matchAll(/<link\b[^>]*>/g))
    if (/rel="[^"]*(icon|apple-touch-icon)[^"]*"/.test(l) || /as="image"/.test(l)) ekle(nitelik(l, 'href'), 'link');
  // og:image:width, og:image:alt gibi ek etiketler adres değildir; yalnızca og:image ve twitter:image
  for (const [m] of html.matchAll(/<meta\b[^>]*(?:property|name)="(?:og:image|twitter:image)"[^>]*>/g))
    ekle(nitelik(m, 'content'), 'og:image');
  for (const [a] of html.matchAll(/<a\b[^>]*href="[^"]*"[^>]*>/g)) {
    const href = nitelik(a, 'href');
    if (GORSEL_UZANTI.test(href.split(/[?#]/)[0])) ekle(href, 'a href');
  }
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    (function yuru(d) {
      if (Array.isArray(d)) return d.forEach(yuru);
      if (d && typeof d === 'object')
        for (const [k, v] of Object.entries(d)) {
          if (['image', 'logo', 'contentUrl'].includes(k) && typeof v === 'string') ekle(v, `JSON-LD ${k}`);
          else yuru(v);
        }
    })(JSON.parse(json));
  }
}

// Her benzersiz dosyayı bir kez aç
for (const [yol, kayit] of dosyalar) {
  const ornekSayfa = [...kayit.sayfalar][0] + (kayit.sayfalar.size > 1 ? ` (+${kayit.sayfalar.size - 1} sayfa)` : '');
  const dosya = path.join(DIST, yol);
  if (!fs.existsSync(dosya) || !fs.statSync(dosya).isFile()) {
    hatalar.push(`${ornekSayfa} → dosya yok: ${yol}`);
    continue;
  }
  if (fs.statSync(dosya).size === 0) {
    hatalar.push(`${ornekSayfa} → boş dosya: ${yol}`);
    continue;
  }
  if (yol.toLowerCase().endsWith('.ico')) {
    const bas = fs.readFileSync(dosya).subarray(0, 4);
    if (!(bas[0] === 0 && bas[1] === 0 && bas[2] === 1 && bas[3] === 0)) hatalar.push(`${ornekSayfa} → geçersiz ICO: ${yol}`);
    continue;
  }
  try {
    const { width } = await sharp(dosya).metadata();
    for (const [w, srcsetSayfalari] of kayit.srcsetGenislik)
      if (w !== width) hatalar.push(`${[...srcsetSayfalari].join(', ')} → srcset ${w}w ama dosya ${width}px: ${yol}`);
  } catch {
    hatalar.push(`${ornekSayfa} → açılamıyor (bozuk dosya): ${yol}`);
  }
}

console.log(
  `${sayfalar.length} sayfa · ${basvuruSayisi} görsel başvurusu · ${dosyalar.size} benzersiz dosya denetlendi` +
    (disBaglanti ? ` · ${disBaglanti} dış adres atlandı` : '')
);
if (hatalar.length) {
  console.error(`\n${hatalar.length} sorun:\n` + hatalar.map((h) => `  ✗ ${h}`).join('\n'));
  process.exit(1);
}
console.log('✓ Kırık görsel yok');
