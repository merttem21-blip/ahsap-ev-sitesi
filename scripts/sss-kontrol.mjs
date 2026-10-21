// SSS akordeonunda zıplama denetimi: soruya GERÇEK tıklama/dokunma ile basılır, sonra 3 saniye boyunca her
// karede sayfa kaydırması (scrollY) ve tıklanan sorunun başlığının ekrandaki yeri kaydedilir. Başlık herhangi
// bir anda 2 px'ten fazla oynarsa kontrol kalır.
//
//   npm run check:sss                         derler; /sss, / ve /bungalov'u Chromium ve WebKit'te 375 ve 1280 px'te dener
//   npm run check:sss -- --derleme-yok        mevcut dist/ ile
//   npm run check:sss -- --adres=https://…    yayındaki siteyi dener (derleme yapılmaz)
//   npm run check:sss -- --tarayici=webkit --genislik=375 --sayfa=/sss --senaryo=header-alti-ustte-acik --ayrinti
//   npm run check:sss -- --yavaslat=6         Chromium işlemcisi 6 kat yavaş (telefon)
//
// Tıklama gerçektir: 375 px'te dokunmatik telefon bağlamı (hasTouch + isMobile) ve touchscreen.tap(x, y),
// 1280 px'te fare (mouse.click(x, y); Lenis yumuşak kaydırması da açık). element.click() ve details.open
// kullanılmaz: odak, :hover, touchstart ve tarayıcının kendi kaydırmaları da ölçüme girer.
// Ölçüm, dokunuştan önceki duruma göredir (taban); basma anında (mousedown/odak) olan kayma da yakalanır.
// Örnekleyici sayfanın kendi kare dengelemesinden sonra okur (click dinleyicisi window'da, kabarcık sonunda
// başlar): ekrana çizilen konum ölçülür, dengelemeden önceki ara durum değil (CDP screencast ile doğrulandı:
// çizilen karelerde başlık, örneklenen yerde).
import path from 'node:path';
import { chromium, webkit } from 'playwright';
import { derle, sunucuBaslat, DIST, secenekVar, secenekDegeri } from './guvenli-mod/ortak.mjs';

const SINIR = 2; // px
const SURE = 3000; // tıklamadan sonra izlenen süre (ms)

const TARAYICILAR = { chromium, webkit };
const BOYUTLAR = {
  375: { viewport: { width: 375, height: 667 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 },
  1280: { viewport: { width: 1280, height: 800 } },
};

// Sorular sayfadaki sıralarına göre ilk + 0/1/2 olarak seçilir (/sss'te ilk = 4: ikinci grubun ortası). Bir
// sayfadaki tüm sorular tek name="sss" grubundadır: biri açılınca diğeri kapanır.
// ustteDegisim: tıklanan başlığın üstünde bir cevap kapanıyor mu (o zaman scrollY'nin değişmesi gerekir; başlığın
// yerinde kalması için sayfa kapanan cevap kadar kaydırılır).
const SENARYOLAR = [
  { ad: 'ilk-acma', aciklama: 'ilk kez açma', once: null, hedef: 0, konum: 'orta', ustteDegisim: false },
  { ad: 'acikken-alttaki', aciklama: 'açıkken alttakini açma', once: 0, hedef: 1, konum: 'orta', ustteDegisim: true },
  { ad: 'acikken-ustteki', aciklama: 'açıkken üsttekini açma', once: 1, hedef: 0, konum: 'orta', ustteDegisim: false },
  { ad: 'ayni-kapatma', aciklama: 'aynı kutuyu kapatma', once: 0, hedef: 0, konum: 'orta', ustteDegisim: false },
  { ad: 'header-alti', aciklama: "header'ın hemen altındaki başlık", once: null, hedef: 2, konum: 'header', ustteDegisim: false },
  {
    ad: 'header-alti-ustte-acik',
    aciklama: "header'ın altındaki başlık, üstte açık cevap varken",
    once: 1,
    hedef: 2,
    konum: 'header',
    ustteDegisim: true,
  },
];

// Aynı akordeon üç yerde: SSS sayfası, ana sayfa (header fixed, sayfa sonu yakın) ve kategori sayfası
const SAYFALAR = { '/sss': 4, '/': 0, '/bungalov': 0 };

const ayrinti = secenekVar('--ayrinti');
const disAdres = secenekDegeri('--adres');
const secilenTarayici = secenekDegeri('--tarayici');
const secilenGenislik = secenekDegeri('--genislik');
const secilenSayfa = secenekDegeri('--sayfa');
const secilenSenaryo = secenekDegeri('--senaryo');
const YAVASLAT = Number(secenekDegeri('--yavaslat') ?? 1);
// Ek ölçü: --boyut=1536x730@1.25 (fare) ya da --boyut=820x1180@2t (dokunmatik); varsayılan ölçülerin yerine geçer
const ekBoyut = secenekDegeri('--boyut')?.match(/^(\d+)x(\d+)(?:@([\d.]+))?(t)?$/);
if (ekBoyut) {
  for (const k of Object.keys(BOYUTLAR)) delete BOYUTLAR[k];
  const [, en, boy, dpr = '1', dokunmatik] = ekBoyut;
  BOYUTLAR[en] = {
    viewport: { width: Number(en), height: Number(boy) },
    deviceScaleFactor: Number(dpr),
    ...(dokunmatik ? { hasTouch: true, isMobile: true } : {}),
  };
}

const bekle = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Sayfayı anında kaydırır (html'deki scroll-behavior: smooth'a takılmadan) ve n. başlık oturana kadar bekler:
 * kaydırınca ortaya çıkma (li'deki translateY, 700 ms + kademe) bitmiş ve başlık 400 ms boyunca kıpırdamamış olmalı.
 */
async function kaydirVeBekle(sayfa, y, n) {
  await sayfa.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), y);
  await bekle(300);
  await sayfa.waitForFunction(
    (n) => {
      const ozet = document.querySelectorAll('details.sss > summary')[n];
      const li = ozet.closest('[data-ortaya]');
      const d = (window.__oturma ??= { ust: null, an: 0 });
      const ust = ozet.getBoundingClientRect().top;
      const yerinde =
        !li.classList.contains('ortaya-gizli') && ['none', 'matrix(1, 0, 0, 1, 0, 0)'].includes(getComputedStyle(li).transform);
      if (!yerinde || ust !== d.ust) {
        d.ust = ust;
        d.an = performance.now();
        return false;
      }
      return performance.now() - d.an > 400;
    },
    n,
    { polling: 50, timeout: 10000 }
  );
  await sayfa.evaluate(() => delete window.__oturma);
}

/** n. sorunun başlığı ekranda istenen yere gelecek şekilde kaydırır. */
async function konumla(sayfa, n, konum) {
  const y = await sayfa.evaluate(
    ({ n, konum }) => {
      const ozet = document.querySelectorAll('details.sss > summary')[n];
      const ust = document.querySelector('[data-ust]').getBoundingClientRect().bottom;
      const li = ozet.closest('[data-ortaya]');
      const donusum = li ? getComputedStyle(li).transform : 'none';
      const kayma = donusum === 'none' ? 0 : new DOMMatrixReadOnly(donusum).m42;
      const belgeUstu = ozet.getBoundingClientRect().top - kayma + window.scrollY;
      // header: başlık header'ın alt kenarının 4 px altında; orta: ekranın %40'ında
      const hedefUst = konum === 'header' ? ust + 4 : Math.round(window.innerHeight * 0.4);
      return Math.round(belgeUstu - hedefUst);
    },
    { n, konum }
  );
  await kaydirVeBekle(sayfa, y, n);
}

/** Başlığa gerçek dokunuş/tıklama (soru metninin üzerine). */
async function bas(sayfa, n, dokunmatik) {
  const kutu = await sayfa.locator('details.sss > summary').nth(n).boundingBox();
  const x = kutu.x + Math.min(kutu.width / 2, 120);
  const y = kutu.y + kutu.height / 2;
  if (dokunmatik) await sayfa.touchscreen.tap(x, y);
  else await sayfa.mouse.click(x, y);
}

/**
 * Ölçümü kurar: taban (dokunuştan önce) ve basma anındaki olaylar (pointerdown, mousedown, touchstart, focus,
 * scroll, toggle) hemen kaydedilir; kare kare örnekleme click olayında başlar ve SURE ms sürer.
 */
async function olcumuKur(sayfa, n) {
  await sayfa.evaluate(
    ({ n, SURE }) => {
      const ozet = document.querySelectorAll('details.sss > summary')[n];
      const oku = (olay) => ({ olay, an: performance.now(), y: window.scrollY, ust: ozet.getBoundingClientRect().top });
      window.__sss = { taban: oku('taban'), olaylar: [], kareler: [], tik: null, bitti: false };
      for (const ad of ['pointerdown', 'mousedown', 'touchstart', 'focusin', 'scroll', 'toggle']) {
        window.addEventListener(ad, () => window.__sss.olaylar.push(oku(ad)), { capture: true, passive: true });
      }
      window.addEventListener(
        'click',
        () => {
          if (window.__sss.tik !== null) return;
          window.__sss.tik = performance.now();
          window.__sss.olaylar.push(oku('click'));
          const kare = () => {
            const k = oku('kare');
            window.__sss.kareler.push(k);
            if (k.an - window.__sss.tik < SURE) requestAnimationFrame(kare);
            else window.__sss.bitti = true;
          };
          requestAnimationFrame(kare);
        },
        { passive: true }
      );
    },
    { n, SURE }
  );
}

async function senaryoCalistir(tarayici, genislik, adres, yol, ilk, s, eskiTarayici) {
  const once = s.once === null ? null : ilk + s.once;
  const hedef = ilk + s.hedef;
  const dokunmatik = Boolean(BOYUTLAR[genislik].hasTouch);
  const baglam = await tarayici.newContext({ ...BOYUTLAR[genislik], locale: 'tr-TR' });
  // <details name> desteği olmayan tarayıcı (iOS 17.2 öncesi Safari, Chrome 120 öncesi): betik tek-cevap-açık
  // kuralını kendisi uygular. Tarayıcının kendi dışlayıcı davranışı kalır ama betik önce davranıp aynı sırayı izler.
  if (eskiTarayici) await baglam.addInitScript(() => delete HTMLDetailsElement.prototype.name);
  const sayfa = await baglam.newPage();
  if (YAVASLAT > 1 && tarayici.browserType().name() === 'chromium') {
    const cdp = await baglam.newCDPSession(sayfa);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: YAVASLAT });
  }
  try {
    await sayfa.goto(adres + yol, { waitUntil: 'load' });
    await sayfa.evaluate(() => document.fonts.ready);

    if (once !== null) {
      await konumla(sayfa, once, 'orta');
      await bas(sayfa, once, dokunmatik);
      await bekle(900);
      const acik = await sayfa.evaluate((n) => document.querySelectorAll('details.sss')[n].open, once);
      if (!acik) throw new Error(`hazırlık: ${once + 1}. soru açılmadı`);
    }
    await konumla(sayfa, hedef, s.konum);

    await olcumuKur(sayfa, hedef);
    await bas(sayfa, hedef, dokunmatik);
    await sayfa.waitForFunction(() => window.__sss.bitti, null, { timeout: SURE + 5000 });

    const sonuc = await sayfa.evaluate((n) => {
      const v = window.__sss;
      for (const k of [v.taban, ...v.olaylar, ...v.kareler]) k.t = Math.round(k.an - v.tik);
      return { ...v, acik: document.querySelectorAll('details.sss')[n].open };
    }, hedef);
    const { taban } = sonuc;
    // Ekrana çizilen durumlar: kareler (sayfanın dengelemesinden sonra) ve basma anındaki olaylar (odak kaydırması
    // anında uygulanır, ondan sonra dengeleyen bir şey yok). scroll ve toggle olaylarındaki okuma ölçüye girmez:
    // ikisi de karenin rAF'ından önce çalışır, o an kapanan cevabın yeni yüksekliği uygulanmış ama dengeleme
    // henüz yapılmamıştır; ekrana hiç çizilmeyen bu ara durum yalnızca --ayrinti çıktısında görünür.
    const tumu = [...sonuc.olaylar, ...sonuc.kareler].sort((a, b) => a.an - b.an);
    const cizilen = tumu.filter((k) => !['scroll', 'toggle'].includes(k.olay));
    const enBuyuk = (dizi) => dizi.reduce((a, b) => (Math.abs(b) > Math.abs(a) ? b : a), 0);
    const enUst = enBuyuk(cizilen.map((k) => k.ust - taban.ust));
    const enY = enBuyuk(cizilen.map((k) => k.y - taban.y));
    const ilkHata = cizilen.find(
      (k) => Math.abs(k.ust - taban.ust) > SINIR || (!s.ustteDegisim && Math.abs(k.y - taban.y) > SINIR)
    );

    const beklenenAcik = s.ad !== 'ayni-kapatma';
    const hatalar = [];
    if (sonuc.acik !== beklenenAcik) hatalar.push(`soru ${beklenenAcik ? 'açılmadı' : 'kapanmadı'} (tık başlığa ulaşmadı)`);
    if (Math.abs(enUst) > SINIR) hatalar.push(`başlık ${enUst > 0 ? '+' : ''}${enUst.toFixed(1)} px oynadı`);
    if (!s.ustteDegisim && Math.abs(enY) > SINIR) hatalar.push(`sayfa ${enY > 0 ? '+' : ''}${enY.toFixed(1)} px kaydı`);
    if (sonuc.kareler.length < 20) hatalar.push(`yalnızca ${sonuc.kareler.length} kare örneklendi`);

    return { gecti: hatalar.length === 0, hatalar, kare: sonuc.kareler.length, enUst, enY, ilkHata, taban, tumu };
  } finally {
    await baglam.close();
  }
}

// --- Çalıştır ---
let adres = disAdres?.replace(/\/$/, '');
let sunucu = null;
if (!adres) {
  derle();
  sunucu = await sunucuBaslat(path.resolve(DIST));
  adres = sunucu.adres;
}
const sayfalar = Object.entries(SAYFALAR).filter(([yol]) => !secilenSayfa || secilenSayfa === yol);
// Her sayfa yerleşik name grubuyla; /sss ayrıca name desteği olmayan tarayıcı gibi (¹, betiğin kendi yolu; bu yol
// her sayfada aynı kod olduğu için bir sayfa yeter)
const kosular = sayfalar.flatMap(([yol, ilk]) => [
  [yol, ilk, false],
  ...(yol === '/sss' && !secenekVar('--eski-yok') ? [[yol, ilk, true]] : []),
]);
console.log(
  `SSS zıplama kontrolü: ${disAdres ? adres : 'yerel derleme'} · ${sayfalar.map(([y]) => y).join(', ')} · ` +
    `sınır ${SINIR} px · ${SURE / 1000} sn` +
    (YAVASLAT > 1 ? ` · Chromium işlemcisi ${YAVASLAT}x yavaş` : '') +
    "\n¹ <details name> desteği olmayan tarayıcı (iOS 17.2 öncesi Safari, Chrome 120 öncesi): tek cevap kuralını betik uygular\n"
);

let toplam = 0;
let kalan = 0;
try {
  for (const [ad, motor] of Object.entries(TARAYICILAR)) {
    if (secilenTarayici && secilenTarayici !== ad) continue;
    const tarayici = await motor.launch();
    try {
      for (const genislik of Object.keys(BOYUTLAR)) {
        if (secilenGenislik && secilenGenislik !== genislik) continue;
        for (const [yol, ilk, eski] of kosular) {
          for (const s of SENARYOLAR) {
            if (secilenSenaryo && secilenSenaryo !== s.ad) continue;
            let r;
            try {
              r = await senaryoCalistir(tarayici, genislik, adres, yol, ilk, s, eski);
            } catch (h) {
              r = { gecti: false, hatalar: [String(h.message ?? h).split('\n')[0]], kare: 0, enUst: 0, enY: 0 };
            }
            toplam++;
            if (!r.gecti) kalan++;
            const etiket = `${ad.padEnd(8)} ${genislik.padStart(4)} px  ${(yol + (eski ? ' ¹' : '')).padEnd(9)} ${s.aciklama}`;
            const olcu = `başlık en çok ${r.enUst.toFixed(1)} px, scrollY ${r.enY.toFixed(1)} px, ${r.kare} kare`;
            console.log(`${r.gecti ? '✓' : '✗'} ${etiket.padEnd(84)} ${olcu}`);
            if (!r.gecti) console.log(`    → ${r.hatalar.join('; ')}`);
            if (!r.gecti && r.ilkHata) {
              const { olay, t, y, ust } = r.ilkHata;
              console.log(
                `    ilk kayma: ${olay} @${t} ms · scrollY ${r.taban.y} → ${y} · başlık ${r.taban.ust.toFixed(1)} → ${ust.toFixed(1)}`
              );
            }
            if (ayrinti && r.tumu) {
              for (const k of r.tumu.slice(0, 400))
                console.log(`      ${k.olay.padEnd(11)} ${String(k.t).padStart(5)} ms  y=${k.y}  üst=${k.ust.toFixed(1)}`);
            }
          }
        }
      }
    } finally {
      await tarayici.close();
    }
  }
} finally {
  await sunucu?.kapat();
}

console.log(`\n${toplam - kalan}/${toplam} senaryo geçti${kalan ? ` · ${kalan} kaldı` : ''}`);
process.exit(kalan ? 1 : 0);
