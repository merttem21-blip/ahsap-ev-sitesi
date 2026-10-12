// Ana sayfadaki kategori kartlarının (4:5 dikey) vitrin fotoğraflarını üretir:
// 4:5 kadraj, ortak sıcak renk düzeltmesi, eşitlenmiş parlaklık, koyulaştırılmış gökyüzü, netlik.
// Amaç dört kartın yan yana aynı ışıkta ve renkte görünmesidir.
//
//   node scripts/vitrin-gorseli.mjs            public/images/vitrin/ altına yazar
//   node scripts/vitrin-gorseli.mjs --onizleme  yalnızca sistemin geçici klasörüne yan yana önizleme yazar
//
// Kaynak dosyalara dokunulmaz (yalnızca okunur). Çıktı: <kategori>-vitrin-{600,1000,1600}.webp;
// kaynak kadraj dar ise büyütülmez (gorsel() gerçek genişliği okur). Ev kadrajın üst yarısında
// kalmalıdır: alt kısım kart metninin karartması altında kalır.
import path from 'node:path';
import fs from 'node:fs/promises';
import os from 'node:os';
import sharp from 'sharp';

const HEDEF = path.resolve('public/images/vitrin');
const GENISLIKLER = [600, 1000, 1600];
const KALITE = 72; // alt yarı metin karartması altında kalır; hero kadar yüksek kalite gerekmez
const HEDEF_PARLAKLIK = 112; // kadrajın üst %60'ının ortalama parlaklığı (0–255)

const p = (kategori, proje, no) => `public/images/${kategori}/${proje}/${proje}-${no}-1600.webp`;

const VITRIN = [
  {
    ad: 'ahsap-ev-vitrin',
    // Taş Kaideli Verandalı Ahşap Ev'in tamamlanmış hali. Bu fotoğrafların projesi tekrar olduğu için
    // kaldırıldı; fotoğraflar sitede yayınlanmayan arşivde duruyor.
    kaynak: 'arsiv/gorseller/ahsap-ev/gri-catili-verandali-ahsap-ev/gri-catili-verandali-ahsap-ev-01-1600.webp',
    // Sol köşe veranda, üçgen çatı ve taş kaide kadrajda; sağdaki bahçe eşyaları dışarıda
    kadraj: { left: 40, top: 0, width: 960, height: 1200 },
    // Vernik sarıya çalıyor; yeşil kanal biraz kısılınca ahşap diğer kartlardaki bal tonuna yaklaşır
    ayar: { yesil: 0.96 },
  },
  {
    ad: 'bungalov-vitrin',
    kaynak: p('bungalov', 'genis-verandali-asma-katli-bungalov', '01'),
    // Cam üçgen cephe ve veranda üst yarıda; çimendeki dağınıklık metin karartmasının altında
    kadraj: { left: 60, top: 220, width: 1500, height: 1875 },
  },
  {
    ad: 'villa-vitrin',
    kaynak: p('villa', 'genis-verandali-ahsap-villa', '07'),
    // Kavisli saçak ve veranda; kapalı gökyüzü ortak koyulaştırmayla diğerlerine yaklaşır
    kadraj: { left: 30, top: 0, width: 1234, height: 1543 },
    ayar: { doygunluk: 1.02 },
  },
  {
    ad: 'tiny-house-vitrin',
    kaynak: p('tiny-house', 'romorklu-tiny-house', '05'),
    // Panoramik kaynaktan lombar pencere, kapı ve teras; kaynak 720px yüksek olduğu için 576px genişlik
    kadraj: { left: 410, top: 0, width: 576, height: 720 },
  },
];

// Kadrajın üst %60'ının (evin durduğu bölge) ortalama parlaklığı
async function parlaklik(girdi, { width, height }) {
  const { channels } = await sharp(girdi)
    .extract({ left: 0, top: 0, width, height: Math.round(height * 0.6) })
    .greyscale()
    .stats();
  return channels[0].mean;
}

async function isle(kaynak, kadraj, ayar = {}) {
  const { width, height } = kadraj;
  const kirpik = await sharp(kaynak).extract(kadraj).toBuffer();
  // Parlaklık eşitleme: aşırıya kaçmasın diye ±15% ile sınırlı
  const carpan = Math.min(1.15, Math.max(0.85, HEDEF_PARLAKLIK / (await parlaklik(kirpik, kadraj))));
  // Gökyüzünü üstten gece tonuna çeken katman (multiply, yalnızca üst %45). Mavi gökyüzü derinleşir,
  // kapalı gökyüzü griye iner; kartlar yan yana aynı akşamüstü ışığında görünür.
  const gokyuzu = Buffer.from(
    `<svg width="${width}" height="${height}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#1e1e1e" stop-opacity="0.5"/>
      <stop offset="0.45" stop-color="#1e1e1e" stop-opacity="0"/>
    </linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`
  );
  return sharp(kirpik)
    .modulate({ brightness: carpan })
    .recomb([
      [1.04, 0.01, 0],
      [0, ayar.yesil ?? 1.0, 0],
      [0, 0, 0.95],
    ])
    .linear(1.05, -5)
    .modulate({ saturation: ayar.doygunluk ?? 0.94 })
    .composite([{ input: gokyuzu, blend: 'multiply' }])
    .sharpen({ sigma: 0.5, m1: 0.4, m2: 0.8 })
    .toBuffer();
}

const onizleme = process.argv.includes('--onizleme');

if (onizleme) {
  // Dört kartı yan yana, kart oranında gösterir
  const W = 400;
  const H = 500;
  const parcalar = [];
  for (const [i, v] of VITRIN.entries()) {
    const img = await sharp(await isle(v.kaynak, v.kadraj, v.ayar)).resize(W, H).toBuffer();
    parcalar.push({ input: img, left: i * (W + 16), top: 0 });
  }
  const dosya = path.join(os.tmpdir(), 'vitrin-onizleme.jpg');
  await sharp({ create: { width: 4 * W + 48, height: H, channels: 3, background: '#1e1e1e' } })
    .composite(parcalar)
    .jpeg({ quality: 85 })
    .toFile(dosya);
  console.log(dosya);
} else {
  await fs.mkdir(HEDEF, { recursive: true });
  for (const v of VITRIN) {
    const islenmis = await isle(v.kaynak, v.kadraj, v.ayar);
    for (const g of GENISLIKLER) {
      const dosya = path.join(HEDEF, `${v.ad}-${g}.webp`);
      const bilgi = await sharp(islenmis)
        .resize({ width: g, withoutEnlargement: true })
        .webp({ quality: KALITE, effort: 6 })
        .toFile(dosya);
      console.log(`${path.relative(process.cwd(), dosya)}  ${bilgi.width}×${bilgi.height}  ${Math.round(bilgi.size / 1024)} KB`);
    }
  }
}
