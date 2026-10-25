// Ana sayfadaki kategori kartlarının (4:5 dikey) vitrin fotoğraflarını üretir:
// 4:5 kadraj, ortak sıcak renk düzeltmesi, eşitlenmiş parlaklık, koyulaştırılmış gökyüzü, netlik.
// Amaç kartların yan yana aynı ışıkta ve renkte görünmesidir.
//
//   node scripts/vitrin-gorseli.mjs            public/images/vitrin/ altına yazar
//   node scripts/vitrin-gorseli.mjs --onizleme  yalnızca sistemin geçici klasörüne yan yana önizleme yazar
//   node scripts/vitrin-gorseli.mjs --sadece=kamelya-vitrin  yalnızca adı verilen vitrinleri yazar
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
  // Aşağıdaki altısının kaynağı kategorinin vitrin projesinin (site.ts → vitrin, kategoriVitrini) kapak fotoğrafıdır
  {
    ad: 'ucgen-ev-vitrin',
    // Gece ışıklı üçgen ev; çatının tepesi ve ışıklı cam üçgen üst yarıda, bahçe metin karartmasının altında.
    // Proje adı değiştiği için fotoğraflar eski klasöründe (fotograf_klasoru)
    kaynak: 'public/images/ucgen-ev/a-frame-bungalov/a-frame-bungalov-01-1600.webp',
    kadraj: { left: 470, top: 300, width: 720, height: 900 },
  },
  {
    ad: 'kamelya-vitrin',
    // Kapakta kamelya kadrajın altında kalıyor, üstü otel binası; aynı projenin önden çekimi kullanılır:
    // çatı ve kemerli giriş üst yarıda, deck metin karartmasının altında
    kaynak: 'public/images/cardak/sekizgen-otel-cardagi/sekizgen-otel-cardagi-06-1600.webp',
    kadraj: { left: 360, top: 150, width: 840, height: 1050 },
  },
  {
    ad: 'otel-bar-vitrin',
    kaynak: p('otel-bar', 'deniz-ustu-ahsap-otel-odalari', '01'),
    // Hasır çatılı oda sırası denize doğru uzanır; teraslar ve su alt yarıda
    kadraj: { left: 0, top: 0, width: 960, height: 1200 },
  },
  {
    ad: 'cocuk-oyun-parki-vitrin',
    kaynak: p('cocuk-oyun-parki', 'kaydirakli-sato-oyun-evi', '01'),
    // Panoramik kaynaktan akşam ışığında çatı pencereli ana ev; kule ve kaydırak dışarıda (576 × 720)
    kadraj: { left: 340, top: 0, width: 576, height: 720 },
  },
  {
    ad: 'ahsap-cami-vitrin',
    kaynak: p('ahsap-cami', 'iki-katli-ahsap-cami', '01'),
    // Minare, iki katlı revak ve yan cephe; soldaki komşu yapı dışarıda
    kadraj: { left: 440, top: 0, width: 960, height: 1200 },
  },
  {
    ad: 'ozel-tasarim-vitrin',
    kaynak: p('ozel-tasarim', 'iskele-giris-kulubesi', '01'),
    // Panoramik kaynaktan kulübe, bayraklar ve deniz; sağdaki yolcular ve soldaki tabelalı büfe dışarıda (576 × 720)
    kadraj: { left: 560, top: 0, width: 576, height: 720 },
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
// --sadece=ucgen-ev-vitrin,kamelya-vitrin: yalnızca adı verilen vitrinler yazılır (diğer dosyalara dokunulmaz)
const sadece = process.argv.find((a) => a.startsWith('--sadece='))?.slice('--sadece='.length).split(',');
const secilenler = sadece ? VITRIN.filter((v) => sadece.includes(v.ad)) : VITRIN;

if (onizleme) {
  // Kartları kart oranında, beşerli satırlar hâlinde yan yana gösterir
  const W = 400;
  const H = 500;
  const SUTUN = Math.min(5, VITRIN.length);
  const parcalar = [];
  for (const [i, v] of VITRIN.entries()) {
    const img = await sharp(await isle(v.kaynak, v.kadraj, v.ayar)).resize(W, H).toBuffer();
    parcalar.push({ input: img, left: (i % SUTUN) * (W + 16), top: Math.floor(i / SUTUN) * (H + 16) });
  }
  const satir = Math.ceil(VITRIN.length / SUTUN);
  const dosya = path.join(os.tmpdir(), 'vitrin-onizleme.jpg');
  await sharp({ create: { width: SUTUN * (W + 16) - 16, height: satir * (H + 16) - 16, channels: 3, background: '#1e1e1e' } })
    .composite(parcalar)
    .jpeg({ quality: 85 })
    .toFile(dosya);
  console.log(dosya);
} else {
  await fs.mkdir(HEDEF, { recursive: true });
  for (const v of secilenler) {
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
