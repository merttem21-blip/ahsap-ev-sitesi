// Kalite kontrol sayfaları: netlik için 1600px'te 1:1 orta kırpım, eğim için dikey kılavuz çizgili küçük görsel.
//   node kontrol.mjs <netlik|egim> <cikti.jpg> <id>...   (proje kökünden)
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(path.join(process.cwd(), 'package.json'));
const sharp = require('sharp');
sharp.concurrency(1);

const [tur, cikti, ...ids] = process.argv.slice(2);
const kok = 'ham-gorseller/azra';
const bul = (id) => {
  for (const k of fs.readdirSync(kok)) for (const f of fs.readdirSync(path.join(kok, k))) if (f.startsWith(id + '.')) return path.join(kok, k, f);
};
const etiket = (m, w) => Buffer.from(`<svg width="${w}" height="24" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#000" opacity=".75"/><text x="6" y="17" font-family="Arial" font-size="15" fill="#ffd27a">${m}</text></svg>`);

const kareler = [];
for (const id of ids) {
  const dosya = bul(id);
  let tampon;
  if (tur === 'netlik') {
    const b = await sharp(dosya).rotate().resize({ width: 1600, height: 1600, fit: 'inside' }).toBuffer();
    const { width, height } = await sharp(b).metadata();
    tampon = await sharp(b).extract({ left: Math.round(width / 2 - 260), top: Math.round(height / 2 - 170), width: 520, height: 340 }).toBuffer();
  } else {
    const b = await sharp(dosya).rotate().resize({ height: 340 }).toBuffer();
    const { width } = await sharp(b).metadata();
    const cizgi = Array.from({ length: 7 }, (_, i) => `<line x1="${(i * width) / 6}" y1="0" x2="${(i * width) / 6}" y2="340" stroke="#0ff" stroke-width="1"/>`).join('');
    tampon = await sharp(b).composite([{ input: Buffer.from(`<svg width="${width}" height="340" xmlns="http://www.w3.org/2000/svg">${cizgi}</svg>`) }]).toBuffer();
  }
  const { width } = await sharp(tampon).metadata();
  kareler.push({ tampon: await sharp(tampon).composite([{ input: etiket(id, width), left: 0, top: 0 }]).toBuffer(), width });
}
const sutun = tur === 'netlik' ? 4 : 5;
const satirlar = [];
for (let i = 0; i < kareler.length; i += sutun) satirlar.push(kareler.slice(i, i + sutun));
const genislik = Math.max(...satirlar.map((s) => s.reduce((t, k) => t + k.width + 6, 0)));
const parcalar = satirlar.flatMap((s, r) => {
  let x = 0;
  return s.map((k) => { const p = { input: k.tampon, left: x, top: r * 346 }; x += k.width + 6; return p; });
});
await sharp({ create: { width: genislik, height: satirlar.length * 346, channels: 3, background: '#222' } }).composite(parcalar).jpeg({ quality: 82 }).toFile(cikti);
console.log(cikti);
