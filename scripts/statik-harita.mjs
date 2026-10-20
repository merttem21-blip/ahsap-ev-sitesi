// İletişim sayfasındaki statik harita görselini üretir (Google haritası yalnızca "Haritayı yükle" ile açılır).
//
//   node scripts/statik-harita.mjs            public/images/harita/ altına yazar
//   node scripts/statik-harita.mjs --onizleme  yalnızca sistemin geçici klasörüne -onizleme.png yazar
//
// Kaynak OpenStreetMap karolarıdır (tile.openstreetmap.org, bir kez indirilir). Görsel sitede barındırılır:
// ziyaretçinin tarayıcısı OpenStreetMap'e ya da Google'a bağlanmaz. Lisans: © OpenStreetMap katkıda bulunanlar
// (ODbL); sayfada görselin üstünde bu atıf ve openstreetmap.org/copyright linki bulunmalıdır.
// Karolar koyu temaya çevrilir (gri, ters, sıcak krem ton). Konum işareti görsele basılmaz; sayfada CSS ile
// konumun üstüne konur (src/pages/iletisim.astro, KONUM_Y). Çıktı adları sitedeki düzenle aynıdır: <ad>-{600,1000,1600}.webp.
// OSM karo kullanım kuralı: uygulamayı tanıtan User-Agent zorunlu, toplu indirme yok (burada 48 karo, bir kez).
import path from 'node:path';
import fs from 'node:fs/promises';
import os from 'node:os';
import sharp from 'sharp';

const HEDEF = path.resolve('public/images/harita');
const AD = 'konum-haritasi';
const GENISLIKLER = [600, 1000, 1600];
const KALITE = 80;

// Merkez: src/data/site.ts → firma.konum (Google İşletme Profili). Konum değişirse burası da güncellenir.
const MERKEZ = { enlem: 40.8762662, boylam: 29.2563865 };
const YAKINLIK = 17; // 1600 px'lik görsel ~1,4 km genişlik gösterir; sayfada küçültülünce mahalle ve ana yollar görünür
const GENISLIK = 1600;
const YUKSEKLIK = 1200; // 4:3; sayfa kutusu mobilde 4:3, ≥ 640px'te 16:10
// Konum yatayda ortada, dikeyde üstten %35'te: altta "Haritayı yükle" kartına yer kalır. Sayfada
// object-position: 50% 35% olduğu için kutunun oranı ne olursa olsun konum kutunun %35'inde kalır.
const KONUM_Y = 0.35;
const KARO = 256;
const KIMLIK = '2kahsap-statik-harita/1.0 (+https://2kahsap.com)';

/** Enlem/boylamın verilen yakınlıktaki dünya piksel konumu (Web Mercator). */
function piksel({ enlem, boylam }, z) {
  const olcek = KARO * 2 ** z;
  const e = (enlem * Math.PI) / 180;
  return {
    x: ((boylam + 180) / 360) * olcek,
    y: ((1 - Math.log(Math.tan(e) + 1 / Math.cos(e)) / Math.PI) / 2) * olcek,
  };
}

async function karoIndir(x, y) {
  const adres = `https://tile.openstreetmap.org/${YAKINLIK}/${x}/${y}.png`;
  const yanit = await fetch(adres, { headers: { 'User-Agent': KIMLIK } });
  if (!yanit.ok) throw new Error(`${adres}: HTTP ${yanit.status}`);
  return Buffer.from(await yanit.arrayBuffer());
}

async function main() {
  const onizleme = process.argv.includes('--onizleme');
  const merkez = piksel(MERKEZ, YAKINLIK);
  const sol = Math.round(merkez.x - GENISLIK / 2);
  const ust = Math.round(merkez.y - YUKSEKLIK * KONUM_Y);
  const ilkX = Math.floor(sol / KARO);
  const ilkY = Math.floor(ust / KARO);
  const sonX = Math.floor((sol + GENISLIK - 1) / KARO);
  const sonY = Math.floor((ust + YUKSEKLIK - 1) / KARO);

  // Karolar sırayla indirilir (OSM sunucusuna aynı anda tek istek)
  const parcalar = [];
  for (let y = ilkY; y <= sonY; y++) {
    for (let x = ilkX; x <= sonX; x++) {
      parcalar.push({ input: await karoIndir(x, y), left: x * KARO - sol, top: y * KARO - ust });
    }
  }
  console.log(`${parcalar.length} karo indirildi (yakınlık ${YAKINLIK})`);

  // Karolar tuvalin dışına taşar; önce büyük tuvalde birleştirilip sonra kesilir
  const tuvalSol = ilkX * KARO - sol;
  const tuvalUst = ilkY * KARO - ust;
  const tuvalG = (sonX - ilkX + 1) * KARO;
  const tuvalY = (sonY - ilkY + 1) * KARO;
  const birlesik = await sharp({ create: { width: tuvalG, height: tuvalY, channels: 3, background: '#ffffff' } })
    .composite(parcalar.map((p) => ({ input: p.input, left: p.left - tuvalSol, top: p.top - tuvalUst })))
    .png()
    .toBuffer();

  // Koyu tema: gri → ters (açık zemin koyulaşır, yazılar açılır) → koyu aralığa sıkıştır (zemin ≈ #282828, yollar
  // daha koyu, yazılar soluk krem) → sıcak krem ton. sharp işlemleri kendi sabit sırasıyla uyguladığı için
  // (linear, negate'ten önce) her adım ayrı aşamadır.
  const asama = (girdi, islem) => islem(sharp(girdi)).png().toBuffer();
  let harita = await asama(birlesik, (s) =>
    s.extract({ left: -tuvalSol, top: -tuvalUst, width: GENISLIK, height: YUKSEKLIK }).grayscale()
  );
  harita = await asama(harita, (s) => s.negate({ alpha: false }));
  harita = await asama(harita, (s) => s.linear(0.6, 30));
  harita = await asama(harita, (s) => s.tint({ r: 235, g: 220, b: 198 }));

  if (onizleme) {
    const dosya = path.join(os.tmpdir(), `${AD}-onizleme.png`);
    await sharp(harita).png().toFile(dosya);
    console.log(dosya);
    return;
  }
  await fs.mkdir(HEDEF, { recursive: true });
  for (const g of GENISLIKLER) {
    const dosya = path.join(HEDEF, `${AD}-${g}.webp`);
    await sharp(harita).resize({ width: g }).webp({ quality: KALITE }).toFile(dosya);
    console.log(path.relative(process.cwd(), dosya));
  }
}

main().catch((hata) => {
  console.error(hata);
  process.exit(1);
});
