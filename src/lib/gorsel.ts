// public/images altındaki hazır WebP varyantları (-600 / -1000 / -1600) için
// srcset ve gerçek boyutları derleme sırasında okur. Dosya yoksa derleme hata verir.
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const GENISLIKLER = [600, 1000, 1600];

export interface Gorsel {
  src: string; // srcset desteklemeyen tarayıcılar için orta boy
  buyuk: string; // en büyük varyant (tam ekran / bağlantı)
  srcset: string;
  width: number;
  height: number;
}

const onbellek = new Map<string, Promise<Gorsel>>();

/** yol: uzantısız ve boyut eksiz, ör. "/images/villa/genis-verandali-ahsap-villa/genis-verandali-ahsap-villa-01" */
export function gorsel(yol: string): Promise<Gorsel> {
  let sonuc = onbellek.get(yol);
  if (!sonuc) {
    sonuc = oku(yol);
    onbellek.set(yol, sonuc);
  }
  return sonuc;
}

async function oku(yol: string): Promise<Gorsel> {
  const adaylar = [];
  for (const g of GENISLIKLER) {
    const url = `${yol}-${g}.webp`;
    const dosya = path.join(process.cwd(), 'public', url);
    if (!fs.existsSync(dosya)) throw new Error(`[görsel] Dosya bulunamadı: public${url}`);
    const { width, height } = await sharp(dosya).metadata();
    adaylar.push({ url, width: width!, height: height! });
  }
  // Küçük kaynaklarda -1000 ve -1600 aynı genişlikte olabilir; her genişlik srcset'e bir kez yazılır
  const tekil = adaylar.filter((a, i) => adaylar.findIndex((b) => b.width === a.width) === i);
  const enBuyuk = adaylar[adaylar.length - 1];
  return {
    src: adaylar[1].url,
    buyuk: enBuyuk.url,
    srcset: tekil.map((a) => `${a.url} ${a.width}w`).join(', '),
    width: enBuyuk.width,
    height: enBuyuk.height,
  };
}

/** 4:3 karta kırpılan geniş (panoramik) görseller daha geniş kaynak ister. */
export function kartSizes(gorsel: Gorsel) {
  const k = Math.max(1, gorsel.width / gorsel.height / (4 / 3));
  const o = (n: number) => Math.round(n * k);
  return `(min-width: 1280px) ${o(400)}px, (min-width: 1024px) ${o(33)}vw, (min-width: 640px) ${o(50)}vw, ${o(100)}vw`;
}
