// Bağlantı önizlemesi (Open Graph / Twitter) görselleri: 1200×630 JPEG, derlemede üretilir
// (src/pages/paylasim/[...yol].ts). Sitede görünmez; yalnızca WhatsApp ve sosyal medyada link
// paylaşılınca çıkar. JPEG seçildi: her platform açar, WhatsApp'ın önizleme sınırının (~300 KB) altında kalır.
// Ana sayfa hero fotoğrafından, proje ve kategori sayfaları kapak fotoğrafından, Projeler, Galeri ve Hakkımızda
// sayfanın üstünde görünen fotoğraftan, diğer genel sayfalar (SSS, İletişim, yasal sayfalar vb.) logolu varsayılan
// görselden yararlanır.
import path from 'node:path';
import sharp from 'sharp';
import { getEntry } from 'astro:content';
import { heroGorseli, type Kategori } from '../data/site';
import { gorsel } from './gorsel';
import { fotoYolu, kapakFotosu, kategoriVitrini, type Proje } from './projeler';

export const PAYLASIM_GENISLIK = 1200;
export const PAYLASIM_YUKSEKLIK = 630;

// Zemin: marka gece rengi (--color-gece, marka-stili §2)
const GECE = '#1E1E1E';
const LOGO = 'public/logo/2k-ahsap-logo-koyu-zemin.svg';

export interface Paylasim {
  yol: string; // yayındaki adres: /paylasim/….jpg
  alt: string; // og:image:alt
  kaynak?: string; // public/ altındaki fotoğraf; yoksa logolu varsayılan görsel
  dikkatKirp?: boolean; // ortadan değil, fotoğrafın en dolu bölgesinden kırpılır (yapı kadrajın altındaysa)
}

export const varsayilanPaylasim: Paylasim = { yol: '/paylasim/2k-ahsap.jpg', alt: '2K AHŞAP logosu' };

/** Ana sayfa: hero fotoğrafının sitede görünen masaüstü kadrajından (1376×768; kırpma yalnızca üst ve alttan
    birkaç piksel, iki ev de kadrajda kalır). */
export const anaSayfaPaylasimi: Paylasim = {
  yol: '/paylasim/ana-sayfa.jpg',
  alt: heroGorseli.alt,
  kaynak: heroGorseli.masaustu,
};

/** Projenin kapak fotoğrafından: /paylasim/<kategori>/<proje>.jpg */
export async function projePaylasimi(p: Proje): Promise<Paylasim> {
  const kapak = kapakFotosu(p);
  return {
    yol: `/paylasim/${p.data.kategori}/${p.slug}.jpg`,
    alt: kapak.alt,
    kaynak: (await gorsel(fotoYolu(p, kapak.dosya))).buyuk,
  };
}

// Genel sayfalar: sayfanın üstünde görünen proje fotoğrafı (Projeler ve Galeri'de başlık bandı, Hakkımızda'da
// açılışın yatay kadrajı). Sayfadaki fotoğraf değişirse burası da güncellenir. Galeri'nin fotoğrafında üçgen ev
// kadrajın altında; ortadan kırpılınca evin alt kısmı kesiliyordu.
interface GenelSayfaFotosu {
  proje: string;
  dosya: string;
  dikkatKirp?: boolean;
}
const GENEL_SAYFALAR = {
  projeler: { proje: 'genis-verandali-ahsap-villa', dosya: 'genis-verandali-ahsap-villa-22' },
  galeri: { proje: 'ucgen-ev-bungalov', dosya: 'a-frame-bungalov-01', dikkatKirp: true },
  hakkimizda: { proje: 'tas-kaideli-verandali-ahsap-ev', dosya: 'tas-kaideli-verandali-ahsap-ev-07' },
} satisfies Record<string, GenelSayfaFotosu>;
export type GenelSayfa = keyof typeof GENEL_SAYFALAR;
export const genelSayfalar = Object.keys(GENEL_SAYFALAR) as GenelSayfa[];

/** Genel sayfanın kendi fotoğrafından: /paylasim/<sayfa>.jpg. Alt metni projenin kaydından gelir. */
export async function genelSayfaPaylasimi(sayfa: GenelSayfa): Promise<Paylasim> {
  const { proje, dosya, dikkatKirp }: GenelSayfaFotosu = GENEL_SAYFALAR[sayfa];
  const kayit = await getEntry('projeler', proje);
  const foto = kayit?.data.fotograflar.find((f) => f.dosya === dosya);
  if (!kayit || !foto) throw new Error(`[paylaşım] Proje fotoğrafı bulunamadı: ${proje}/${dosya}`);
  return { yol: `/paylasim/${sayfa}.jpg`, alt: foto.alt, kaynak: (await gorsel(fotoYolu(kayit, dosya))).buyuk, dikkatKirp };
}

/** Kategoriyi temsil eden projenin (vitrin) kapağından: /paylasim/<kategori>.jpg. Projesi yoksa varsayılan. */
export async function kategoriPaylasimi(k: Kategori, projeler: Proje[]): Promise<Paylasim> {
  const vitrin = kategoriVitrini(k, projeler);
  if (!vitrin) return varsayilanPaylasim;
  return { ...(await projePaylasimi(vitrin)), yol: `/paylasim/${k.slug}.jpg` };
}

const jpeg = (g: sharp.Sharp) => g.jpeg({ quality: 82, mozjpeg: true }).toBuffer();

/** Fotoğraf 1200×630'a ortadan (dikkatKirp ise en dolu bölgeden) kırpılır. Çok dikey fotoğrafta (tiny house
    gibi) kırpma yapıyı keseceği için fotoğraf 4:5'e kırpılıp (en dolu bölge) gece zemine ortalanır. */
async function fotodan(kaynak: string, dikkatKirp = false) {
  const dosya = path.join(process.cwd(), 'public', kaynak);
  const { width = 0, height = 0 } = await sharp(dosya).metadata();
  if (width / height >= 0.7) {
    const position = dikkatKirp ? sharp.strategy.attention : sharp.gravity.centre;
    return jpeg(sharp(dosya).resize({ width: PAYLASIM_GENISLIK, height: PAYLASIM_YUKSEKLIK, fit: 'cover', position }));
  }
  const dikey = await sharp(dosya)
    .resize({ width, height: Math.round((width * 5) / 4), fit: 'cover', position: sharp.strategy.attention })
    .toBuffer();
  return jpeg(
    sharp(dikey).resize({ width: PAYLASIM_GENISLIK, height: PAYLASIM_YUKSEKLIK, fit: 'contain', background: GECE })
  );
}

/** Logolu varsayılan görsel: gece zemin, ortada koyu zemin logosu. Logo ortadaki kareye sığar; WhatsApp
    önizlemeyi kare kırptığında da tamamı görünür. Çevresinde logo yüksekliğinin %25'inden fazla boşluk kalır. */
async function logodan() {
  const yukseklik = 400;
  const logo = await sharp(path.join(process.cwd(), LOGO), { density: 300 }).resize({ height: yukseklik }).toBuffer();
  const { width = 0 } = await sharp(logo).metadata();
  return jpeg(
    sharp({ create: { width: PAYLASIM_GENISLIK, height: PAYLASIM_YUKSEKLIK, channels: 3, background: GECE } }).composite([
      {
        input: logo,
        left: Math.round((PAYLASIM_GENISLIK - width) / 2),
        top: Math.round((PAYLASIM_YUKSEKLIK - yukseklik) / 2),
      },
    ])
  );
}

export const paylasimGorseli = (p: Paylasim) => (p.kaynak ? fotodan(p.kaynak, p.dikkatKirp) : logodan());
