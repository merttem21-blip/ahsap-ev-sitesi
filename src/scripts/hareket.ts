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
  const goster = (oge: HTMLElement, sira: number) => {
    oge.style.setProperty('--gecikme', `${sira * adim}ms`);
    oge.classList.remove('ortaya-gizli');
    oge.addEventListener('transitionend', () => oge.style.removeProperty('--gecikme'), { once: true });
  };

  // Yatay kaydırmalı [data-ortaya-grup] (ör. mobildeki kart şeridi) tek parça izlenir: ekran dışında
  // kalan kartlar kendi başına hiç görünür olmayacağı için grup ekrana girince hepsi sırayla belirir.
  // Kaydırmalı değilse (ızgara) öğeler tek tek izlenir.
  const gruplar = new Map<HTMLElement, HTMLElement[]>();
  for (const grup of document.querySelectorAll<HTMLElement>('[data-ortaya-grup]')) {
    const tasma = getComputedStyle(grup).overflowX;
    if (tasma === 'auto' || tasma === 'scroll') gruplar.set(grup, [...grup.querySelectorAll<HTMLElement>('[data-ortaya]')]);
  }

  const gozlemci = new IntersectionObserver(
    (girdiler) => {
      // Aynı anda giren öğeler (ör. bir kart satırı) sırayla belirir
      let sira = 0;
      for (const g of girdiler) {
        if (!g.isIntersecting) continue;
        const hedef = g.target as HTMLElement;
        gozlemci.unobserve(hedef);
        for (const oge of gruplar.get(hedef) ?? [hedef]) goster(oge, sira++);
      }
    },
    { rootMargin: '0px 0px -8% 0px' }
  );

  const ekranAlti = window.innerHeight;
  const gruptakiler = new Set([...gruplar.values()].flat());
  for (const hedef of [...gruplar.keys(), ...ogeler.filter((o) => !gruptakiler.has(o))]) {
    if (hedef.getBoundingClientRect().top < ekranAlti) continue; // ilk ekranda görünüyor: olduğu gibi kalır
    for (const oge of gruplar.get(hedef) ?? [hedef]) oge.classList.add('ortaya-gizli');
    gozlemci.observe(hedef);
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
