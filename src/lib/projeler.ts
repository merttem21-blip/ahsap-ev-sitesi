// Proje içerikleri için ortak yardımcılar
import { getCollection, type CollectionEntry } from 'astro:content';
import { kategoriler, type Kategori } from '../data/site';

export type Proje = CollectionEntry<'projeler'>;

export const projeYolu = (p: Proje) => `/${p.data.kategori}/${p.slug}`;
export const fotoYolu = (p: Proje, dosya: string) => `/images/${p.data.kategori}/${p.slug}/${dosya}`;
export const kapakFotosu = (p: Proje) => p.data.fotograflar.find((f) => f.dosya === p.data.kapak)!;
export const projeKategorisi = (p: Proje) => kategoriler.find((k) => k.slug === p.data.kategori)!;

export async function kategoriProjeleri(kategori: string, haric?: string) {
  const liste = await getCollection('projeler', (p) => p.data.kategori === kategori && p.slug !== haric);
  return liste.sort((a, b) => a.data.baslik.localeCompare(b.data.baslik, 'tr'));
}

/** Kategoriyi temsil eden proje: site.ts'deki "vitrin", yoksa ilk proje. */
export function kategoriVitrini(kategori: Kategori, projeler: Proje[]) {
  return projeler.find((p) => p.slug === kategori.vitrin) ?? projeler[0];
}

// Teknik şartname tablosunun satırları ve sırası
const SARTNAME_ALANLARI = [
  ['kapali_alan_m2', 'Kapalı alan'],
  ['kat_sayisi', 'Kat sayısı'],
  ['oda_sayisi', 'Oda sayısı'],
  ['ahsap_turu', 'Ahşap türü'],
  ['tasiyici_sistem', 'Taşıyıcı sistem'],
  ['cati_kaplama', 'Çatı kaplaması'],
  ['dis_cephe', 'Dış cephe'],
  ['yalitim', 'Yalıtım'],
  ['dograma', 'Doğrama'],
  ['ic_kaplama', 'İç kaplama'],
  ['teslim_suresi', 'Teslim süresi'],
  ['notlar', 'Notlar'],
] as const;

/** Yalnızca doldurulmuş alanlar döner; boş alanlar sitede gösterilmez. */
export function sartnameSatirlari(p: Proje) {
  return SARTNAME_ALANLARI.flatMap(([alan, etiket]) => {
    const deger = p.data[alan];
    if (deger === null || deger === undefined || String(deger).trim() === '') return [];
    const metin = String(deger).trim();
    return [{ etiket, deger: alan === 'kapali_alan_m2' && /^\d+([.,]\d+)?$/.test(metin) ? `${metin} m²` : metin }];
  });
}

// Meta başlık 50–60 karakter olsun diye proje adına uyan ilk kalıp seçilir
export function projeMetaBasligi(baslik: string) {
  const ek = ' | 2K AHŞAP';
  const ahsapsiz = !/ahşap/i.test(baslik);
  const adaylar = [
    `${baslik} Projesi ve Fotoğrafları`,
    `${baslik} Projesi ve Galerisi`,
    `${baslik} Proje Galerisi`,
    `${baslik} Projesi`,
    ...(ahsapsiz ? [`Ahşap ${baslik} Projesi ve Fotoğrafları`, `Ahşap ${baslik} Projesi`] : []),
    `${baslik}: Proje Fotoğrafları ve Detayları`,
  ];
  const uygun = adaylar.find((a) => (a + ek).length >= 50 && (a + ek).length <= 60);
  return (uygun ?? adaylar.find((a) => (a + ek).length <= 60) ?? baslik) + ek;
}

// Meta açıklama en fazla 155 karakter olsun diye sığan ilk (en uzun) kalıp seçilir
const sigan = (adaylar: string[]) => adaylar.find((a) => a.length <= 155) ?? adaylar[adaylar.length - 1];

export function projeMetaAciklamasi(p: Proje) {
  const giris = `${p.data.baslik} projemizin ${p.data.fotograflar.length} fotoğrafını inceleyin.`;
  return sigan([
    `${giris} Özel ölçülerde tasarlayıp ürettiğimiz benzer bir yapı için 2K AHŞAP'tan teklif alın.`,
    `${giris} Özel ölçülerde benzer bir yapı için 2K AHŞAP'tan teklif alın.`,
    `${giris} Benzer bir yapı için teklif alın.`,
  ]);
}

// Kategori sayfasının meta bilgisi sayfada görünen H1 ve giriş paragrafından üretilir
export function kategoriMetaBasligi(k: Kategori) {
  const ek = ' | 2K AHŞAP';
  return [`${k.h1}${ek}`, `${k.ad} Projeleri${ek}`].find((a) => a.length <= 60) ?? `${k.ad}${ek}`;
}

export function kategoriMetaAciklamasi(k: Kategori) {
  return sigan([
    `${k.giris} Proje fotoğraflarını inceleyin, size özel tasarım için 2K AHŞAP'tan teklif alın.`,
    `${k.giris} Proje fotoğraflarını inceleyin, 2K AHŞAP'tan teklif alın.`,
    `${k.giris} Fotoğrafları inceleyin, teklif alın.`,
  ]);
}

/** JSON-LD'yi <script> içine güvenle yazar (</script> kaçışı). */
export const jsonLd = (veri: unknown) => JSON.stringify(veri).replace(/</g, '\\u003c');
