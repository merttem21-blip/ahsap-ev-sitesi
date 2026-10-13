// Klavye odağı yardımcıları: açık mobil menü paneli (Header.astro) ve tam ekran fotoğraf görüntüleyiciler
// (Galeri.astro, galeri.astro). Görünüme ve fare/dokunma davranışına dokunmaz; yalnızca Tab tuşunun gideceği yeri belirler.

const SECICI =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), ' +
  'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Kapların içindeki, klavyeyle odaklanabilen ve şu an görünen öğeler (DOM sırasıyla). */
export function odaklanabilirler(...kaplar: (Element | null | undefined)[]) {
  return kaplar
    .flatMap((k) => (k ? [...k.querySelectorAll<HTMLElement>(SECICI)] : []))
    .filter((e) => e.getClientRects().length > 0 && getComputedStyle(e).visibility !== 'hidden' && !e.closest('[inert]'));
}

/**
 * Odak alanın içinde kalır: Tab son öğeden ilk öğeye, Shift+Tab ilk öğeden son öğeye döner.
 * Odak alanın dışındaysa (ör. pencerenin kendisinde) Tab ilk, Shift+Tab son öğeye gider.
 */
export function odagiTut(e: KeyboardEvent, ogeler: HTMLElement[]) {
  if (e.key !== 'Tab' || e.altKey || e.ctrlKey || e.metaKey || ogeler.length === 0) return;
  const aktif = document.activeElement as HTMLElement | null;
  const sira = aktif ? ogeler.indexOf(aktif) : -1;
  if (e.shiftKey && sira <= 0) {
    e.preventDefault();
    ogeler[ogeler.length - 1].focus();
  } else if (!e.shiftKey && (sira === -1 || sira === ogeler.length - 1)) {
    e.preventDefault();
    ogeler[0].focus();
  }
}

/**
 * Listede ok tuşlarıyla gezinme: Aşağı/Sağ sonraki, Yukarı/Sol önceki, Home ilk, End son öğe.
 * Odaktaki öğe listede değilse ya da değiştirici tuş basılıysa hiçbir şey yapmaz. Odak taşındıysa true döner.
 */
export function oklarlaGez(e: KeyboardEvent, ogeler: HTMLElement[], tuslar = ['ArrowUp', 'ArrowDown', 'Home', 'End']) {
  if (!tuslar.includes(e.key) || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return false;
  const sira = ogeler.indexOf(document.activeElement as HTMLElement);
  if (sira === -1) return false;
  const hedef =
    e.key === 'Home'
      ? 0
      : e.key === 'End'
        ? ogeler.length - 1
        : e.key === 'ArrowDown' || e.key === 'ArrowRight'
          ? Math.min(sira + 1, ogeler.length - 1)
          : Math.max(sira - 1, 0);
  e.preventDefault();
  ogeler[hedef].focus();
  return true;
}
