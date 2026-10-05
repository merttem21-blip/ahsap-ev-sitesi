// Ham fotoğraflardan site için WebP varyantları üretir.
//
//   npm run images                        ham-gorseller/ → public/images/
//   npm run images -- --zorla             güncel olanları da yeniden üretir
//   npm run images -- --kaynak X --hedef Y
//
// ham-gorseller/<kategori>/<proje-slug>/<foto>.jpg
//   → public/images/<kategori>/<proje-slug>/<foto-adi>-{600,1000,1600}.webp
//
// Orijinal dosyalara dokunulmaz (yalnızca okunur). ham-gorseller/ .gitignore'dadır.
// Genişlikler mevcut fotoğraf kütüphanesiyle aynıdır; böylece sitedeki srcset tek düzende kalır.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const GENISLIKLER = [600, 1000, 1600];
const KALITE = 80;
const DESTEKLENEN = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff', '.avif']);
const DESTEKLENMEYEN = new Set(['.heic', '.heif']); // önce JPG'ye çevrilmeli

const arg = (ad, varsayilan) => {
  const i = process.argv.indexOf(ad);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : varsayilan;
};
const KAYNAK = path.resolve(arg('--kaynak', 'ham-gorseller'));
const HEDEF = path.resolve(arg('--hedef', 'public/images'));
const ZORLA = process.argv.includes('--zorla');

// "Kiremit Çatılı Ev (3).JPG" → "kiremit-catili-ev-3"
const TR = { ç: 'c', ğ: 'g', ı: 'i', i̇: 'i', ö: 'o', ş: 's', ü: 'u' };
const slug = (ad) =>
  ad
    .toLocaleLowerCase('tr')
    .replace(/[çğıöşü]|i̇/g, (h) => TR[h])
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

async function* dosyalar(klasor) {
  for (const oge of await fs.readdir(klasor, { withFileTypes: true })) {
    const yol = path.join(klasor, oge.name);
    if (oge.isDirectory()) yield* dosyalar(yol);
    else yield yol;
  }
}

const guncelMi = async (kaynak, ciktilar) => {
  const k = await fs.stat(kaynak);
  for (const c of ciktilar) {
    const s = await fs.stat(c).catch(() => null);
    if (!s || s.mtimeMs < k.mtimeMs) return false;
  }
  return true;
};

async function main() {
  if (!(await fs.stat(KAYNAK).catch(() => null))) {
    console.log(`Kaynak klasör yok: ${path.relative(process.cwd(), KAYNAK) || KAYNAK}`);
    console.log('Ham fotoğrafları ham-gorseller/<kategori>/<proje-slug>/ altına koyup tekrar çalıştırın.');
    return;
  }

  const sayac = { islenen: 0, atlanan: 0, desteklenmeyen: [], cakisan: [] };
  const hedefler = new Set();

  for await (const kaynak of dosyalar(KAYNAK)) {
    const uzanti = path.extname(kaynak).toLowerCase();
    const goreli = path.relative(KAYNAK, kaynak);
    if (DESTEKLENMEYEN.has(uzanti)) {
      sayac.desteklenmeyen.push(goreli);
      continue;
    }
    if (!DESTEKLENEN.has(uzanti)) continue;

    const klasor = path.join(HEDEF, ...path.dirname(goreli).split(path.sep).filter((p) => p !== '.').map(slug));
    const ad = slug(path.basename(kaynak, path.extname(kaynak)));
    const ciktilar = GENISLIKLER.map((g) => path.join(klasor, `${ad}-${g}.webp`));

    // Aynı ada dönüşen iki kaynak birbirinin üzerine yazmasın
    if (hedefler.has(ciktilar[0])) {
      sayac.cakisan.push(goreli);
      continue;
    }
    hedefler.add(ciktilar[0]);

    if (!ZORLA && (await guncelMi(kaynak, ciktilar))) {
      sayac.atlanan++;
      continue;
    }

    await fs.mkdir(klasor, { recursive: true });
    for (const [i, g] of GENISLIKLER.entries()) {
      await sharp(kaynak)
        .rotate() // EXIF yönünü uygula
        .resize({ width: g, withoutEnlargement: true })
        .webp({ quality: KALITE })
        .toFile(ciktilar[i]);
    }
    sayac.islenen++;
    console.log(`✓ ${goreli} → ${path.relative(process.cwd(), ciktilar[0]).replace(/-600\.webp$/, '-{600,1000,1600}.webp')}`);
  }

  console.log(`\nİşlenen: ${sayac.islenen} · Güncel olduğu için atlanan: ${sayac.atlanan}`);
  if (sayac.cakisan.length) console.log(`Aynı ada dönüştüğü için atlanan: ${sayac.cakisan.join(', ')}`);
  if (sayac.desteklenmeyen.length)
    console.log(`HEIC desteklenmiyor, önce JPG'ye çevirin: ${sayac.desteklenmeyen.join(', ')}`);
}

main().catch((hata) => {
  console.error(hata.message);
  process.exitCode = 1;
});
