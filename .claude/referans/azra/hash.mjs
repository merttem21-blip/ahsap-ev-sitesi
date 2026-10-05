// Algısal benzerlik hash'leri: dHash (9x8 fark) + pHash (32x32 DCT → 8x8).
// node hash.mjs <cikti.json> [--kirpim] <klasor|dosya>...   (proje kökünden çalıştırılır; sharp oradan gelir)
// --kirpim: kırpılmış kopyaları da yakalamak için ortadan %85/%70 ve dört köşeden %80 kırpımların hash'lerini ekler (k[]).
import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(path.join(process.cwd(), 'package.json'));
const sharp = require('sharp');

const [cikti, ...argumanlar] = process.argv.slice(2);
const KIRPIM = argumanlar.includes('--kirpim');
const girdiler = argumanlar.filter((a) => a !== '--kirpim');
const UZANTI = /\.(jpe?g|png|webp)$/i;

async function* tara(yol) {
  const s = await fs.stat(yol);
  if (s.isFile()) return yield yol;
  for (const ad of await fs.readdir(yol)) yield* tara(path.join(yol, ad));
}

const bitler = (dizi) => dizi.map((b) => (b ? '1' : '0')).join('');

// Kırpım bölgeleri: [sol, üst, genişlik, yükseklik] oran olarak
const KIRPIMLAR = [
  [0.075, 0.075, 0.85, 0.85],
  [0.15, 0.15, 0.7, 0.7],
  [0, 0, 0.8, 0.8],
  [0.2, 0, 0.8, 0.8],
  [0, 0.2, 0.8, 0.8],
  [0.2, 0.2, 0.8, 0.8],
];

async function kirp(dosya, [x, y, en, boy]) {
  const tampon = await sharp(dosya).rotate().toBuffer();
  const { width, height } = await sharp(tampon).metadata();
  return sharp(tampon)
    .extract({ left: Math.round(x * width), top: Math.round(y * height), width: Math.round(en * width), height: Math.round(boy * height) })
    .toBuffer();
}

async function dHash(dosya) {
  const { data } = await sharp(dosya).rotate().greyscale().resize(9, 8, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true });
  const b = [];
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) b.push(data[y * 9 + x] > data[y * 9 + x + 1]);
  return bitler(b);
}

const N = 32;
const COS = Array.from({ length: 8 }, (_, u) => Array.from({ length: N }, (_, x) => Math.cos(((2 * x + 1) * u * Math.PI) / (2 * N))));
async function pHash(dosya) {
  const { data } = await sharp(dosya).rotate().greyscale().resize(N, N, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true });
  const katsayi = [];
  for (let u = 0; u < 8; u++)
    for (let v = 0; v < 8; v++) {
      let t = 0;
      for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) t += data[y * N + x] * COS[u][y] * COS[v][x];
      katsayi.push(t);
    }
  const ac = katsayi.slice(1);
  const medyan = [...ac].sort((a, b) => a - b)[Math.floor(ac.length / 2)];
  return bitler(katsayi.map((k) => k > medyan));
}

const sonuc = {};
for (const g of girdiler)
  for await (const dosya of tara(g)) {
    if (!UZANTI.test(dosya)) continue;
    try {
      const meta = await sharp(dosya).metadata();
      sonuc[path.relative(process.cwd(), dosya).replaceAll('\\', '/')] = {
        d: await dHash(dosya),
        p: await pHash(dosya),
        w: meta.width,
        h: meta.height,
      };
      if (KIRPIM) {
        const k = [];
        for (const bolge of KIRPIMLAR) {
          const parca = await kirp(dosya, bolge);
          k.push({ d: await dHash(parca), p: await pHash(parca) });
        }
        sonuc[path.relative(process.cwd(), dosya).replaceAll('\\', '/')].k = k;
      }
    } catch (e) {
      console.error('HATA', dosya, e.message);
    }
  }
await fs.writeFile(cikti, JSON.stringify(sonuc));
console.log(Object.keys(sonuc).length, 'görsel');
