// Form taslaklarının ortak kuralları (taslağı yazan ve geri yükleyen: src/scripts/form.ts).
// Taslak localStorage'da son değişiklikten 7 gün tutulur. Süresi dolan ya da bozuk taslaklar sitenin her sayfası
// açılırken silinir (src/layouts/Layout.astro); depolama kapalıysa hiçbir şey yapılmaz.
// Bu kural /cerez-politikasi ve /gizlilik metninde yazılıdır: süre ya da davranış değişirse metinler de değişmeli.

export const TASLAK = '2k-ahsap-taslak-';
const TASLAK_OMRU = 7 * 24 * 60 * 60 * 1000;

/**
 * Geçerli taslağın alanları; taslak yoksa null. Süresi dolmuş ya da bozuk taslak silinir ve null döner.
 * Depolama kapalıysa hata fırlatır (çağıran yakalar).
 */
export function taslakOku(anahtar: string): Record<string, unknown> | null {
  const metin = localStorage.getItem(anahtar);
  if (metin === null) return null;
  let kayit: { zaman?: unknown; alanlar?: unknown } | null = null;
  try {
    kayit = JSON.parse(metin);
  } catch {
    /* bozuk kayıt: aşağıda silinir */
  }
  const gecerli =
    !!kayit &&
    typeof kayit.zaman === 'number' &&
    Date.now() - kayit.zaman <= TASLAK_OMRU &&
    !!kayit.alanlar &&
    typeof kayit.alanlar === 'object';
  if (gecerli) return kayit!.alanlar as Record<string, unknown>;
  localStorage.removeItem(anahtar);
  return null;
}

/** Süresi dolan ve bozuk tüm form taslaklarını siler (her sayfa açılırken). */
export function eskiTaslaklariSil() {
  try {
    const anahtarlar: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const anahtar = localStorage.key(i);
      if (anahtar?.startsWith(TASLAK)) anahtarlar.push(anahtar);
    }
    anahtarlar.forEach(taslakOku);
  } catch {
    /* depolama kapalı */
  }
}
