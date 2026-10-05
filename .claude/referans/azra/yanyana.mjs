// Görselleri satır satır yan yana dizen kontrol sayfası üretir.
//   node yanyana.mjs <cikti.jpg> "etiket::a.jpg,b.jpg" "c.jpg,d.webp" ...   (her argüman bir satır)
//   YUKSEKLIK=<px> satır yüksekliği · ALTYAZI=1 her görselin altına dosya adını yazar
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(path.join(process.cwd(), 'package.json'));
const sharp = require('sharp');

const Y = Number(process.env.YUKSEKLIK || 150);
const ETIKET = 230;
const [cikti, ...satirlar] = process.argv.slice(2);
const kacis = (m) => m.replace(/[&<>]/g, (h) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[h]);
const parcalar = [];
let genislik = 0;
for (const [i, satir] of satirlar.entries()) {
  const [etiket, liste] = satir.includes('::') ? satir.split('::') : ['', satir];
  const top = i * (Y + 8);
  let x = 0;
  if (etiket) {
    const kelimeler = etiket.split(/(?<=[-_ ])/);
    const lines = [''];
    for (const k of kelimeler) (lines.at(-1) + k).length > 24 ? lines.push(k) : (lines[lines.length - 1] += k);
    const svg = `<svg width="${ETIKET}" height="${Y}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#111"/>${lines
      .map((l, j) => `<text x="6" y="${22 + j * 20}" font-family="Arial" font-size="16" fill="#ffd27a">${kacis(l)}</text>`)
      .join('')}</svg>`;
    parcalar.push({ input: Buffer.from(svg), left: 0, top });
    x = ETIKET + 6;
  }
  for (const dosya of liste.split(',').filter(Boolean)) {
    const tampon = await sharp(dosya).rotate().resize({ height: Y }).toBuffer();
    const { width } = await sharp(tampon).metadata();
    parcalar.push({ input: tampon, left: x, top });
    if (process.env.ALTYAZI) {
      // Dosya adını görselin altına yazar (ör. "ahsap-ev-12")
      const ad = kacis(path.basename(dosya).replace(/(-\d+)?\.\w+$/, ''));
      const svg = `<svg width="${width}" height="22" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#000" opacity="0.7"/><text x="4" y="16" font-family="Arial" font-size="14" fill="#fff">${ad}</text></svg>`;
      parcalar.push({ input: Buffer.from(svg), left: x, top: top + Y - 22 });
    }
    x += width + 6;
  }
  genislik = Math.max(genislik, x);
}
await sharp({ create: { width: Math.max(genislik, 1), height: satirlar.length * (Y + 8), channels: 3, background: '#222' } })
  .composite(parcalar)
  .jpeg({ quality: 78 })
  .toFile(cikti);
console.log(cikti);
