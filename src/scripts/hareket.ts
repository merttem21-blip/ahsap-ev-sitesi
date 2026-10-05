// Site geneli hareket (marka-stili §6). Yalnızca transform ve opacity; layout kayması yok.
//
// 1. Kaydırınca ortaya çıkma: [data-ortaya] öğeleri ekrana girerken bir kez belirir.
//    Sayfa açıldığında zaten görünen öğelere dokunulmaz (ilk ekran ve LCP gecikmez).
//    JS yoksa veya hareket azaltılmışsa hiçbir şey gizlenmez.
// 2. Yumuşak kaydırma (Lenis): yalnızca ince imleçli (fare/trackpad) cihazlarda ve hareket azaltılmamışsa.
// 3. Parallax: [data-parallax] katmanı kaydırma hızının %30'uyla kayar; yalnızca Lenis açıkken
//    (kaydırmayla aynı karede güncellenir, mobilde takılma riski olmaz).
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const azHareket = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const inceImlec = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// --- 1. Ortaya çıkma ---
function ortayaCikma() {
  const ogeler = [...document.querySelectorAll<HTMLElement>('[data-ortaya]')];
  if (azHareket || !('IntersectionObserver' in window) || ogeler.length === 0) return;

  const adim = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gecikme-adim')) || 80;
  const gozlemci = new IntersectionObserver(
    (girdiler) => {
      // Aynı anda giren öğeler (ör. bir kart satırı) sırayla belirir
      const girenler = girdiler.filter((g) => g.isIntersecting).map((g) => g.target as HTMLElement);
      girenler.forEach((oge, i) => {
        oge.style.setProperty('--gecikme', `${i * adim}ms`);
        oge.classList.remove('ortaya-gizli');
        gozlemci.unobserve(oge);
        oge.addEventListener('transitionend', () => oge.style.removeProperty('--gecikme'), { once: true });
      });
    },
    { rootMargin: '0px 0px -8% 0px' }
  );

  const ekranAlti = window.innerHeight;
  for (const oge of ogeler) {
    if (oge.getBoundingClientRect().top < ekranAlti) continue; // ilk ekranda görünüyor: olduğu gibi kalır
    oge.classList.add('ortaya-gizli');
    gozlemci.observe(oge);
  }
}

// --- 2 ve 3. Yumuşak kaydırma ve parallax ---
function yumusakKaydirma() {
  if (azHareket || !inceImlec) return;

  const lenis = new Lenis({
    autoRaf: true,
    lerp: 0.1,
    // Sabit header'ın altında kalmaması için çapa hedefleri biraz yukarıda durur
    anchors: { offset: -96 },
    // Işık kutusu ve açık menü gibi kendi kaydırması olan alanlar Lenis'e girmez
    prevent: (dugum) => dugum.closest('dialog, [data-lenis-prevent]') !== null,
  });

  const katmanlar = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
  if (katmanlar.length === 0) return;

  const ORAN = 0.3;
  // Katmanın kapsayıcısının alt sınırı; kaydırma sırasında yerleşim okunmaz, yalnızca boyut değişince
  let sinirlar: number[] = [];
  const olc = () => {
    sinirlar = katmanlar.map((k) => k.parentElement!.offsetTop + k.parentElement!.offsetHeight);
  };
  const guncelle = (kaydirma: number) => {
    katmanlar.forEach((k, i) => {
      // Kapsayıcı ekrandan çıkınca güncelleme durur
      if (kaydirma > sinirlar[i]) return;
      k.style.transform = `translate3d(0, ${(kaydirma * ORAN).toFixed(1)}px, 0)`;
    });
  };
  olc();
  window.addEventListener('resize', olc, { passive: true });
  lenis.on('scroll', (l: Lenis) => guncelle(l.scroll));
  guncelle(window.scrollY);
}

ortayaCikma();
yumusakKaydirma();
