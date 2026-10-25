// Yeni proje kaydı taslağı. Rehber: docs/yeni-proje-ekleme.md
//
//   npm run yeni-proje
//
// 1. ham-gorseller/ altındaki fotoğraflardan WebP varyantlarını üretir (npm run images ile aynı).
// 2. public/images/<kategori>/<proje-slug>/ klasörü olup kaydı olmayan her proje için
//    src/content/projeler/<proje-slug>.md taslağını fotoğraf listesiyle birlikte yazar.
// Var olan kayıtlara dokunmaz. Taslaktaki başlık ve alt metinleri doldurulmadan derleme hata verir.
import fs from 'node:fs';
import path from 'node:path';
import { main as gorselleriUret, slug } from './optimize-images.mjs';

const HAM = 'ham-gorseller';
const GORSELLER = 'public/images';
const PROJELER = 'src/content/projeler';

// Kategori slug'ları: src/data/site.ts (kategorilerin tek kaynağı)
const kategoriler = [...fs.readFileSync('src/data/site.ts', 'utf8').matchAll(/^\s+slug: '([^']+)',/gm)].map((m) => m[1]);
if (kategoriler.length === 0) throw new Error('src/data/site.ts içinde kategori bulunamadı');

const klasorler = (yol) =>
  fs.existsSync(yol) ? fs.readdirSync(yol, { withFileTypes: true }).filter((o) => o.isDirectory()).map((o) => o.name) : [];

// Yanlış adlı kategori klasörü public/images altına sitede görünmeyen bir klasör olarak çevrilmesin
const yanlis = klasorler(HAM).filter((k) => !kategoriler.includes(slug(k)));
if (yanlis.length) {
  for (const k of yanlis) console.error(`! ${HAM}/${k}: böyle bir kategori yok.`);
  console.error(`Kategori klasörünün adı şunlardan biri olmalı: ${kategoriler.join(', ')}`);
  process.exit(1);
}

await gorselleriUret();

const taslak = (kategori, fotolar) =>
  [
    '---',
    '# Proje adı: sitede başlık olarak görünür (ör. "Kemerli Pod Bungalov").',
    'baslik: ""',
    `kategori: ${kategori}`,
    '# Kapak: projeyi en iyi anlatan dış cephe fotoğrafı; aşağıdaki dosyalardan biri.',
    `kapak: ${fotolar[0]}`,
    '# Konum (ör. "Sapanca, Sakarya"): yalnızca müşteri izin verdiyse yazılır; boşsa sitede gösterilmez.',
    'konum:',
    '# Şu an sitede gösterilmez; sonraki özellikler için hazırlık. Hepsi boş bırakılabilir.',
    '# il: ör. İstanbul (yalnızca müşteri izin verdiyse) · one_cikan: true veya false · etiketler: ör. veranda, asma kat',
    'il:',
    'one_cikan:',
    'etiketler:',
    '# Galeri bu sırayla gösterilir. Alt metinleri fotoğrafı anlatır; her biri farklı olmalı.',
    'fotograflar:',
    ...fotolar.flatMap((f) => [`  - dosya: ${f}`, '    alt: ""']),
    '',
    '# Teknik şartname — boş bırakılan alanlar sitede gösterilmez.',
    '# Örnek: kapali_alan_m2: 85 · kat_sayisi: 1 · oda_sayisi: "2+1" (kesin süre veya fiyat taahhüdü yazılmaz)',
    ...[
      'kapali_alan_m2', 'kat_sayisi', 'oda_sayisi', 'ahsap_turu', 'tasiyici_sistem', 'cati_kaplama',
      'dis_cephe', 'yalitim', 'dograma', 'ic_kaplama', 'teslim_suresi', 'notlar',
    ].map((alan) => `${alan}:`),
    '---',
    '',
  ].join('\n');

const yeniler = [];
const uyarilar = [];

// Adı değişen projelerin fotoğrafları eski klasörde durur (kayıttaki fotograf_klasoru); bu klasörler kayıtlı sayılır
const eskiKlasorler = new Set(
  fs
    .readdirSync(PROJELER)
    .filter((d) => d.endsWith('.md'))
    .flatMap((d) =>
      [...fs.readFileSync(path.join(PROJELER, d), 'utf8').matchAll(/^fotograf_klasoru:\s*(\S+)\s*$/gm)].map((m) => m[1])
    )
);

for (const kategori of kategoriler) {
  for (const proje of klasorler(path.join(GORSELLER, kategori))) {
    const kayit = path.join(PROJELER, `${proje}.md`);
    if (fs.existsSync(kayit) || eskiKlasorler.has(`${kategori}/${proje}`)) continue;

    const fotolar = fs
      .readdirSync(path.join(GORSELLER, kategori, proje))
      .filter((d) => d.endsWith('-600.webp'))
      .map((d) => d.slice(0, -'-600.webp'.length))
      .sort((a, b) => a.localeCompare(b, 'tr', { numeric: true }));
    if (fotolar.length === 0) continue;

    fs.writeFileSync(kayit, taslak(kategori, fotolar));
    yeniler.push(kayit);

    if (fotolar.length < 4) uyarilar.push(`${proje}: ${fotolar.length} fotoğraf var, en az 4 gerekir.`);
    const adsiz = fotolar.filter((f) => !f.startsWith(`${proje}-`));
    if (adsiz.length)
      uyarilar.push(`${proje}: dosya adları "${proje}-01" biçiminde olmalı (galeride aynı ad iki kez olamaz): ${adsiz.join(', ')}`);
  }
}

console.log('');
if (yeniler.length === 0) {
  console.log('Yeni proje bulunamadı. Fotoğrafları ham-gorseller/<kategori>/<proje-slug>/ altına koyup tekrar çalıştırın.');
} else {
  console.log('Taslak kayıt oluşturuldu:');
  for (const k of yeniler) console.log(`  ${k}`);
  console.log('\nŞimdi bu dosyada baslik ve her fotoğrafın alt metnini doldurun, kapak ve sırayı kontrol edin.');
}
for (const u of uyarilar) console.log(`! ${u}`);
