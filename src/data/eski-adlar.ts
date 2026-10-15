// Adı değişen kategori ve projelerin eski değerleri → yeni değerleri (15 Ekim 2026, müşteri talebi:
// "Çardak" → "Kamelya", "A-Frame" → "Üçgen Ev"). Eski linklerdeki sorgu parametreleri (/galeri?kategori=,
// /teklif-al?tip= / ?yapi= / ?proje=) ve tarayıcıda kalmış form taslakları yeni değeri seçili açsın diye
// tarayıcı betiklerinde kullanılır. Eski sayfa adreslerinin 301 yönlendirmeleri vercel.json'dadır.

// Kategori slug'ı (küçük harfe çevrilmiş eski ad da tanınır: ?tip=Çardak, ?tip=A-Frame)
const kategoriler: Record<string, string> = {
  cardak: 'kamelya',
  'çardak': 'kamelya',
  'a-frame': 'ucgen-ev',
};

// Proje slug'ı
const projeler: Record<string, string> = {
  'sekizgen-otel-cardagi': 'sekizgen-otel-kamelyasi',
  'tas-duvarli-bahce-cardagi': 'tas-duvarli-bahce-kamelyasi',
  'a-frame-bungalov': 'ucgen-ev-bungalov',
  'verandali-kucuk-a-frame': 'verandali-kucuk-ucgen-ev',
};

// Teklif formunun yapı tipi değeri (kategori adı); eski taslaklarda kalmış olabilir
const yapiTipleri: Record<string, string> = {
  'Çardak': 'Kamelya',
  'A-Frame': 'Üçgen Ev',
};

const esle = (tablo: Record<string, string>, deger: string, anahtar = deger) =>
  Object.prototype.hasOwnProperty.call(tablo, anahtar) ? tablo[anahtar] : deger;

/** Eski kategori slug'ını ya da adını yenisine çevirir; tanınmayan değer olduğu gibi döner. */
export const guncelKategori = (deger: string) => esle(kategoriler, deger, deger.toLowerCase());
/** Eski proje slug'ını yenisine çevirir; tanınmayan değer olduğu gibi döner. */
export const guncelProje = (deger: string) => esle(projeler, deger);
/** Eski yapı tipi değerini yenisine çevirir; tanınmayan değer olduğu gibi döner. */
export const guncelYapiTipi = (deger: string) => esle(yapiTipleri, deger);
