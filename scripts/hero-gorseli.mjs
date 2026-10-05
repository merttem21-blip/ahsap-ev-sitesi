// Ana sayfa hero fotoğraflarını üretir: kadraj, sıcak renk düzeltmesi, kontrast ve netlik.
//
//   node scripts/hero-gorseli.mjs            public/images/hero/ altına yazar
//   node scripts/hero-gorseli.mjs --onizleme  yalnızca sistemin geçici klasörüne -onizleme.jpg yazar
//
// Kaynak dosyalara dokunulmaz (yalnızca okunur). Çıktı adları sitedeki düzenle aynıdır:
// <ad>-{600,1000,1600}.webp; kaynak 1600px'ten darsa büyütülmez (gorsel() gerçek genişliği okur).
// Orijinal (ham) fotoğraf gelirse `kaynak` yolunu ona çevirmek yeterlidir; daha büyük çıktı üretilir.
import path from 'node:path';
import fs from 'node:fs/promises';
import os from 'node:os';
import sharp from 'sharp';

const HEDEF = path.resolve('public/images/hero');
const GENISLIKLER = [600, 1000, 1600];
const KALITE = 78;

const HERO = [
  {
    ad: 'kiremit-catili-ahsap-ev-hero',
    kaynak: 'public/images/ahsap-ev/kiremit-catili-ahsap-ev/kiremit-catili-ahsap-ev-01-1600.webp',
    // Sağdaki bahçe küreği ve palmiye gövdesi kadraj dışında kalır; üstteki boş gökyüzü azaltılır
    kadraj: { left: 40, top: 100, width: 1340, height: 1100 },
  },
];

// Öğle fotoğrafını koyu temaya yaklaştırır: hafif sıcak denge, kontrast, derin gökyüzü, netlik.
// Mavi kanal fazla kısılmaz; kısılırsa gökyüzü griye, çimen sarıya döner.
async function isle(kaynak, kadraj) {
  const { width, height } = kadraj;
  // Gökyüzünü üstten koyu laciverde çeken katman (multiply, yalnızca üst %42)
  const gokyuzu = Buffer.from(
    `<svg width="${width}" height="${height}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0f1a2e" stop-opacity="0.45"/>
      <stop offset="0.42" stop-color="#0f1a2e" stop-opacity="0"/>
    </linearGradient></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>`
  );
  return sharp(kaynak)
    .extract(kadraj)
    .recomb([
      [1.03, 0.01, 0],
      [0, 1.0, 0],
      [0, 0, 0.97],
    ])
    .linear(1.06, -6)
    .modulate({ saturation: 1.03 })
    .composite([{ input: gokyuzu, blend: 'multiply' }])
    .sharpen({ sigma: 0.5, m1: 0.4, m2: 0.8 });
}

const onizleme = process.argv.includes('--onizleme');
await fs.mkdir(HEDEF, { recursive: true });

for (const h of HERO) {
  const islenmis = await (await isle(h.kaynak, h.kadraj)).toBuffer();
  if (onizleme) {
    const dosya = path.join(os.tmpdir(), `${h.ad}-onizleme.jpg`);
    await sharp(islenmis).jpeg({ quality: 85 }).toFile(dosya);
    console.log(dosya);
    continue;
  }
  for (const g of GENISLIKLER) {
    const dosya = path.join(HEDEF, `${h.ad}-${g}.webp`);
    const bilgi = await sharp(islenmis)
      .resize({ width: g, withoutEnlargement: true })
      .webp({ quality: KALITE, effort: 6 })
      .toFile(dosya);
    console.log(`${path.relative(process.cwd(), dosya)}  ${bilgi.width}×${bilgi.height}  ${Math.round(bilgi.size / 1024)} KB`);
  }
}
