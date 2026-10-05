// Fotoğraf kalite ölçümleri (proje kökünden çalıştırılır; sharp oradan gelir):
//   node kalite.mjs <cikti.json> <klasor|dosya>...
// netlik  : Laplacian varyansı, uzun kenar 1024px'e küçültülmüş gri görüntüde (yüksek = net)
// parlaklik: ortalama parlaklık (0–255); karanlik / patlak: <25 ve >245 piksel oranı
// egim    : güçlü dikey kenarların açı tepe noktası (derece, + saat yönü); dikey çizgi azsa null
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(path.join(process.cwd(), 'package.json'));
const sharp = require('sharp');
sharp.concurrency(1);

const [cikti, ...girdiler] = process.argv.slice(2);
const UZANTI = /\.(jpe?g|png|webp)$/i;

async function* tara(yol) {
  const s = await fs.stat(yol);
  if (s.isFile()) return yield yol;
  for (const ad of await fs.readdir(yol)) yield* tara(path.join(yol, ad));
}

async function gri(dosya, uzunKenar) {
  const { data, info } = await sharp(dosya)
    .rotate()
    .resize({ width: uzunKenar, height: uzunKenar, fit: 'inside' })
    .greyscale()
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { p: data, w: info.width, h: info.height };
}

function netlik({ p, w, h }) {
  let top = 0, kare = 0, n = 0;
  for (let y = 1; y < h - 1; y++)
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const l = p[i - w] + p[i + w] + p[i - 1] + p[i + 1] - 4 * p[i];
      top += l; kare += l * l; n++;
    }
  const ort = top / n;
  return kare / n - ort * ort;
}

function pozlama({ p }) {
  let top = 0, karanlik = 0, patlak = 0;
  for (const v of p) { top += v; if (v < 25) karanlik++; else if (v > 245) patlak++; }
  return { parlaklik: top / p.length, karanlik: karanlik / p.length, patlak: patlak / p.length };
}

function egim({ p, w, h }) {
  // Sobel; gradyanı yataya yakın (yani kenarı dikeye yakın) güçlü pikseller
  const kayit = [];
  for (let y = 1; y < h - 1; y++)
    for (let x = 1; x < w - 1; x++) {
      const i = y * w + x;
      const gx = p[i - w + 1] + 2 * p[i + 1] + p[i + w + 1] - p[i - w - 1] - 2 * p[i - 1] - p[i + w - 1];
      const gy = p[i + w - 1] + 2 * p[i + w] + p[i + w + 1] - p[i - w - 1] - 2 * p[i - w] - p[i - w + 1];
      const g = Math.hypot(gx, gy);
      if (g > 120) kayit.push([g, (Math.atan2(gy, gx) * 180) / Math.PI]);
    }
  if (kayit.length < 500) return { egim: null, dikeyOran: 0 };
  const hist = new Float64Array(61); // -15°…+15°, 0,5° adım
  let dikey = 0, tum = 0;
  for (const [g, a] of kayit) {
    let f = ((a % 180) + 180) % 180; // 0–180
    if (f > 90) f -= 180; // -90…90; 0 = dikey kenar
    tum += g;
    if (Math.abs(f) <= 15) { hist[Math.round((f + 15) * 2)] += g; dikey += g; }
  }
  const yumusak = hist.map((_, i) => (hist[i - 1] || 0) + 2 * hist[i] + (hist[i + 1] || 0));
  let tepe = 0;
  yumusak.forEach((v, i) => { if (v > yumusak[tepe]) tepe = i; });
  const dikeyOran = dikey / tum;
  return { egim: dikeyOran < 0.08 ? null : tepe / 2 - 15, dikeyOran };
}

const sonuc = {};
for (const g of girdiler)
  for await (const dosya of tara(g)) {
    if (!UZANTI.test(dosya)) continue;
    try {
      const meta = await sharp(dosya).metadata();
      const yon = (meta.orientation || 1) >= 5; // EXIF ile 90° dönükse genişlik/yükseklik yer değiştirir
      const k = await gri(dosya, 1024);
      const e = await gri(dosya, 800);
      sonuc[path.relative(process.cwd(), dosya).replaceAll('\\', '/')] = {
        w: yon ? meta.height : meta.width,
        h: yon ? meta.width : meta.height,
        netlik: Math.round(netlik(k)),
        ...Object.fromEntries(Object.entries(pozlama(k)).map(([a, v]) => [a, Math.round(v * 1000) / 1000])),
        ...egim(e),
      };
    } catch (hata) {
      console.error('HATA', dosya, hata.message);
    }
  }
await fs.writeFile(cikti, JSON.stringify(sonuc, null, 1));
console.log(Object.keys(sonuc).length, 'görsel ölçüldü');
