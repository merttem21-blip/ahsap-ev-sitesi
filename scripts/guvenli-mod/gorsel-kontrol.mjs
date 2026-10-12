// Müşteri onaylı görünümün piksel karşılaştırması (CLAUDE.md "Güvenli Mod").
//
//   npm run gorsel-kontrol                              önce derler, sonra çeker ve karşılaştırır
//   npm run gorsel-kontrol -- --derleme-yok             mevcut dist/ ile
//   npm run gorsel-kontrol -- --esik=0.05               % olarak izin verilen fark (varsayılan 0)
//   npm run gorsel-kontrol -- --gurultu-yok             gürültü toleransı kapalı: tek bir piksel farkı bile hata
//   npm run gorsel-kontrol -- --referans-yenile         referansları baştan üretir (yalnızca müşteri onaylı
//                                                       bir görünüm değişikliğinden sonra)
//   npm run gorsel-kontrol -- --referans-yenile=yasal-kvkk,iletisim
//                                                       yalnızca adı (ya da kodu) verilen sayfaların referansını
//                                                       yeniler; diğerleri her zamanki gibi karşılaştırılır
//
// Her sayfa tipinden bir örnek 375, 768 ve 1280 px genişlikte çekilir: hareket azaltılmış
// (prefers-reduced-motion), CSS animasyonları kapalı, tüm görseller (lazy olanlar dahil) ve fontlar yüklenmiş,
// stil yüklenmiş fontlarla yeniden hesaplatılmış, sayfa boyutu art arda birkaç ölçümde sabit.
// Galeri sonsuz kaydırmalı olduğu için yalnızca ilk ekran çekilir. Teklif formunun 2. ve 3. adımı, önceki
// adımlar örnek verilerle doldurulup "Devam et" ile geçilerek çekilir; form hiçbir zaman gönderilmez
// (Web3Forms'a giden her istek engellenir ve hata sayılır).
//
// Referans yoksa (ilk çalıştırma) çekimler docs/guvenli-mod/referans/ altına kaydedilir. Varsa son çekimler
// docs/guvenli-mod/son/ altına yazılır, referansla karşılaştırılır; farklı olanların fark görseli (değişen
// pikseller kırmızı) docs/guvenli-mod/fark/ altına, özet rapor fark/rapor.md'ye yazılır. Fark varsa çıkış kodu 1.
//
// Gürültü: Chromium aynı derlemeyi bile ara sıra yazı ve simge kenarlarında birkaç tekil pikseli farklı boyar.
// Fark %0,001'in altındaysa ve dağınıksa (her fark pikselinin 8 px yakınında başka fark pikseli yoksa) çekim
// "geçti (gürültü)" sayılır; raporda fark görseliyle birlikte yine gösterilir. Bir harf ya da noktalama değişikliği
// bitişik piksellerden oluştuğu için gürültü sayılmaz. Eşiğin üstündeki ya da toplu her fark hata olarak kalır.
//
// Not: Çekimler tarayıcı sürümüne, işletim sistemine ve font yüklemesine bağlıdır. Referanslar bu bilgisayarda
// ve package.json'da sabitlenmiş Playwright sürümüyle üretilmiştir; başka ortamda karşılaştırma yapılacaksa
// önce referanslar, README'deki "Referans geçmişi"nin son sürümünden yeniden üretilmelidir (docs/guvenli-mod/README.md).
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { GUVENLI_MOD, derle, secenekDegeri, secenekVar, sunucuBaslat } from './ortak.mjs';

/** Teklif formunda görünen adımın "Devam et" düğmesine basar. */
async function devamEt(sayfa) {
  await sayfa.locator('[data-adim]:not([hidden]) [data-ileri]').click();
}

/** Teklif formu 1. adım: örnek verilerle doldurur ve 2. adıma geçer. */
async function teklifAdim1(sayfa) {
  await sayfa.locator('input[name="yapi_tipi"]').first().check();
  await sayfa.fill('input[name="alan_m2"]', '60');
  await sayfa.locator('input[name="kullanim"][value="Konut"]').check();
  await devamEt(sayfa);
}

/** Teklif formu 1. ve 2. adım: örnek verilerle doldurur ve 3. adıma geçer (3. adım boş kalır, gönderilmez). */
async function teklifAdim2(sayfa) {
  await teklifAdim1(sayfa);
  await sayfa.selectOption('select[name="konum_il"]', 'İstanbul');
  await sayfa.fill('input[name="konum_ilce"]', 'Pendik');
  await sayfa.locator('input[name="arsa"]').first().check();
  await sayfa.locator('input[name="butce"][value="Belirtmek istemiyorum"]').check();
  await sayfa.locator('input[name="zaman"][value="Henüz belli değil"]').check();
  await devamEt(sayfa);
}

/** Adım geçişinden sonra: istenen adım görünür, sayfa en üstte (sabit öğeler ilk ekrandaki yerinde), imleç kenarda. */
async function adimdaBekle(sayfa, no) {
  await sayfa.waitForFunction(
    (no) => document.querySelector('[data-adim-no]')?.textContent === String(no),
    no,
    { timeout: 10_000 }
  );
  await sayfa.mouse.move(0, 0);
  await sayfa.evaluate(() => window.scrollTo(0, 0));
}

// Sayfa tipleri: A ana sayfa, P projeler, K kategori, D proje detayı, G galeri, H hakkımızda, S SSS,
// T teklif al (T2, T3: formun 2. ve 3. adımı), İ iletişim, TŞ teşekkürler, Y yasal sayfa
// hazirlik: çekimden önce sayfada yapılacak etkileşim (yalnızca görünüm; form gönderilmez)
const SAYFALAR = [
  { kod: 'A', ad: 'ana-sayfa', yol: '/' },
  { kod: 'P', ad: 'projeler', yol: '/projeler' },
  { kod: 'K', ad: 'kategori-bungalov', yol: '/bungalov' },
  { kod: 'D', ad: 'proje-asma-katli-verandali-bungalov', yol: '/bungalov/asma-katli-verandali-bungalov' },
  { kod: 'G', ad: 'galeri', yol: '/galeri', ilkEkran: true, hazir: '.galeri-izgara.dizildi' },
  { kod: 'H', ad: 'hakkimizda', yol: '/hakkimizda' },
  { kod: 'S', ad: 'sss', yol: '/sss' },
  { kod: 'T', ad: 'teklif-al', yol: '/teklif-al' },
  {
    kod: 'T2',
    ad: 'teklif-al-adim-2',
    yol: '/teklif-al',
    hazirlik: async (sayfa) => {
      await teklifAdim1(sayfa);
      await adimdaBekle(sayfa, 2);
    },
  },
  {
    kod: 'T3',
    ad: 'teklif-al-adim-3',
    yol: '/teklif-al',
    hazirlik: async (sayfa) => {
      await teklifAdim2(sayfa);
      await adimdaBekle(sayfa, 3);
    },
  },
  { kod: 'İ', ad: 'iletisim', yol: '/iletisim' },
  { kod: 'TŞ', ad: 'tesekkurler', yol: '/tesekkurler' },
  { kod: 'Y', ad: 'yasal-kvkk', yol: '/kvkk' },
];

const GENISLIKLER = [
  { genislik: 375, yukseklik: 812, mobil: true },
  { genislik: 768, yukseklik: 1024, mobil: true },
  { genislik: 1280, yukseklik: 800, mobil: false },
];

const REFERANS = path.join(GUVENLI_MOD, 'referans');
const SON = path.join(GUVENLI_MOD, 'son');
const FARK = path.join(GUVENLI_MOD, 'fark');
const ESIK = Number(secenekDegeri('--esik') ?? 0);
const GORSEL_ZAMAN_ASIMI = 30_000;

// Düzenin oturması: fontlar tamamen yüklenir, stil yüklenmiş fontlarla yeniden hesaplatılır, ardından sayfa boyutu
// OLCUM_SAYISI ölçüm boyunca (OLCUM_ARALIGI ms arayla) aynı kalmalı. Font geç yüklenince ch birimi bayat kalıp
// satırlar farklı kırılabiliyor, sayfa boyu değişebiliyordu (docs/guvenli-mod/README.md, Bilinen sınırlar).
const OLCUM_SAYISI = 5;
const OLCUM_ARALIGI = 100;
const DUZEN_ZAMAN_ASIMI = 15_000;

// Gürültü toleransı (dosya başındaki açıklamaya bakın)
const GURULTU = !secenekVar('--gurultu-yok');
const GURULTU_ESIK = 0.001; // %, bu değerin altı
const GURULTU_ARALIK = 8; // px: iki fark pikseli arasındaki en küçük uzaklık (yatay, dikey ya da çapraz)
const FARK_RENGI = [255, 0, 0]; // fark görselinde değişen pikseller

/** Sayfayı çekime hazırlar: tüm görseller yüklenip çözülmüş, fontlar tamamen yüklenmiş, stil yeniden hesaplanmış,
    sayfa boyutu sabit.
    Döner: oturmayan her şey için bir uyarı metni (boşsa çekime hazır). */
async function hazirla(sayfa, { ilkEkran, hazir }) {
  if (hazir) await sayfa.waitForSelector(hazir, { state: 'attached', timeout: GORSEL_ZAMAN_ASIMI });
  const eksik = await sayfa.evaluate(
    async ({ ilkEkran, zamanAsimi }) => {
      // Yalnızca görüntülenen görseller (hidden/display:none olanlar çekimde yok); galeride yalnızca ilk ekran
      const resimler = [...document.images].filter(
        (r) => r.getClientRects().length > 0 && (!ilkEkran || r.getBoundingClientRect().top < window.innerHeight)
      );
      // Tam sayfa çekimde ekran dışındaki lazy görseller de hemen yüklensin (görünüm değişmez)
      if (!ilkEkran) for (const r of resimler) if (r.loading === 'lazy') r.loading = 'eager';
      const bekle = (r) =>
        (r.complete
          ? Promise.resolve()
          : new Promise((tamam) => {
              r.addEventListener('load', tamam, { once: true });
              r.addEventListener('error', tamam, { once: true });
            })
        ).then(() => (r.currentSrc ? r.decode().catch(() => {}) : undefined));
      const sure = new Promise((tamam) => setTimeout(tamam, zamanAsimi, 'zaman-asimi'));
      const sonuc = await Promise.race([Promise.all(resimler.map(bekle)), sure]);
      return sonuc === 'zaman-asimi' ? resimler.filter((r) => !r.complete).map((r) => r.currentSrc || r.src) : [];
    },
    { ilkEkran: !!ilkEkran, zamanAsimi: GORSEL_ZAMAN_ASIMI }
  );
  const duzen = await sayfa.evaluate(
    async ({ olcumSayisi, olcumAraligi, zamanAsimi }) => {
      const bitis = Date.now() + zamanAsimi;
      const ikiKare = () => new Promise((tamam) => requestAnimationFrame(() => requestAnimationFrame(tamam)));
      // 1. Fontlar: ready, yükleme sürerken başlayan yeni yüklemeler için yeniden beklenir; yüklenmekte olan
      //    yüz kalmayınca biter. İki kare, yeni fontla düzenin yeniden hesaplanması için.
      let fontlar = false;
      while (!fontlar && Date.now() < bitis) {
        await document.fonts.ready;
        await ikiKare();
        fontlar = document.fonts.status === 'loaded' && [...document.fonts].every((f) => f.status !== 'loading');
      }
      // 2. Font yüklenmeden hesaplanan ch/em birimleri Chromium'da bazen bayat kalır: 65ch'lik metin sütunu yedek
      //    fontun ölçüsüyle daralır, sayfa boyu değişir ve öyle sabitlenir. Kök font boyutu bir anlığına değiştirilip
      //    geri alınır; tüm stil yüklenmiş fontlarla yeniden hesaplanır. Sayfanın kendi stili değişmez.
      const kok = document.documentElement.style;
      const eski = [kok.getPropertyValue('font-size'), kok.getPropertyPriority('font-size')];
      kok.setProperty('font-size', '1px', 'important');
      void document.documentElement.offsetHeight;
      if (eski[0]) kok.setProperty('font-size', ...eski);
      else kok.removeProperty('font-size');
      void document.documentElement.offsetHeight;
      await ikiKare();
      // 3. Sayfa boyutu art arda olcumSayisi ölçümde aynı
      const olc = () =>
        `${document.documentElement.scrollWidth}×` +
        Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, document.body.offsetHeight);
      let onceki = olc();
      let ayni = 1;
      while (ayni < olcumSayisi && Date.now() < bitis) {
        await new Promise((tamam) => setTimeout(tamam, olcumAraligi));
        await ikiKare();
        const simdi = olc();
        ayni = simdi === onceki ? ayni + 1 : 1;
        onceki = simdi;
      }
      return { fontlar, sabit: ayni >= olcumSayisi, boyut: onceki };
    },
    { olcumSayisi: OLCUM_SAYISI, olcumAraligi: OLCUM_ARALIGI, zamanAsimi: DUZEN_ZAMAN_ASIMI }
  );
  return [
    ...eksik.map((e) => `yüklenemeyen görsel: ${e}`),
    ...(duzen.fontlar ? [] : ['fontlar zaman aşımına kadar yüklenmedi']),
    ...(duzen.sabit ? [] : [`sayfa boyutu sabitlenmedi (son ölçüm ${duzen.boyut})`]),
  ];
}

async function cek(tarayici, adres, s, g, hedef) {
  const baglam = await tarayici.newContext({
    viewport: { width: g.genislik, height: g.yukseklik },
    deviceScaleFactor: 1,
    isMobile: g.mobil,
    hasTouch: g.mobil,
    reducedMotion: 'reduce',
    colorScheme: 'light',
    locale: 'tr-TR',
    timezoneId: 'Europe/Istanbul',
  });
  // Çekim sırasında hiçbir form gönderilemez: Web3Forms'a giden istek engellenir ve hata sayılır
  let gonderimDenendi = false;
  await baglam.route(/api\.web3forms\.com/, (istek) => {
    gonderimDenendi = true;
    return istek.abort();
  });
  const sayfa = await baglam.newPage();
  const basarisiz = new Set();
  // Tarayıcının kendi iptal ettiği istekler (ör. <picture> kaynağı değişince) sorun sayılmaz
  sayfa.on('requestfailed', (i) => {
    const neden = i.failure()?.errorText ?? '';
    if (neden !== 'net::ERR_ABORTED') basarisiz.add(`başarısız istek: ${i.url()} (${neden})`);
  });
  try {
    const yanit = await sayfa.goto(adres + s.yol, { waitUntil: 'networkidle', timeout: 60_000 });
    if (!yanit?.ok()) throw new Error(`HTTP ${yanit?.status()}`);
    if (s.hazirlik) await s.hazirlik(sayfa);
    const hazirlik = await hazirla(sayfa, s);
    await sayfa.screenshot({ path: hedef, fullPage: !s.ilkEkran, animations: 'disabled', caret: 'hide' });
    if (gonderimDenendi) throw new Error(`${s.yol} (${s.ad}): çekim sırasında form gönderilmeye çalışıldı`);
    return { uyarilar: [...basarisiz, ...hazirlik] };
  } finally {
    await baglam.close();
  }
}

/** İki PNG'yi karşılaştırır; boyut farklıysa küçük olan eflatunla doldurulur (taşan alan fark sayılır). */
function karsilastir(referansYolu, sonYolu, farkYolu) {
  const a = PNG.sync.read(fs.readFileSync(referansYolu));
  const b = PNG.sync.read(fs.readFileSync(sonYolu));
  const genislik = Math.max(a.width, b.width);
  const yukseklik = Math.max(a.height, b.height);
  const genislet = (png) => {
    if (png.width === genislik && png.height === yukseklik) return png.data;
    const tuval = new PNG({ width: genislik, height: yukseklik });
    for (let i = 0; i < tuval.data.length; i += 4) tuval.data.set([255, 0, 255, 255], i);
    PNG.bitblt(png, tuval, 0, 0, png.width, png.height, 0, 0);
    return tuval.data;
  };
  const fark = new PNG({ width: genislik, height: yukseklik });
  const piksel = pixelmatch(genislet(a), genislet(b), fark.data, genislik, yukseklik, {
    threshold: 0.1,
    diffColor: FARK_RENGI,
  });
  if (piksel > 0) fs.writeFileSync(farkYolu, PNG.sync.write(fark));
  const yuzde = (piksel / (genislik * yukseklik)) * 100;
  const ayniBoyut = a.width === b.width && a.height === b.height;
  return {
    piksel,
    yuzde,
    gurultu: GURULTU && piksel > 0 && ayniBoyut && yuzde < GURULTU_ESIK && daginikMi(fark, piksel),
    referansBoyut: `${a.width}×${a.height}`,
    sonBoyut: `${b.width}×${b.height}`,
  };
}

/** Fark görselindeki fark pikselleri birbirinden en az GURULTU_ARALIK px uzakta mı (bitişik, toplu fark yok)? */
function daginikMi(fark, beklenen) {
  const noktalar = [];
  for (let i = 0; i < fark.data.length; i += 4) {
    if (fark.data[i] === FARK_RENGI[0] && fark.data[i + 1] === FARK_RENGI[1] && fark.data[i + 2] === FARK_RENGI[2]) {
      noktalar.push([(i / 4) % fark.width, Math.floor(i / 4 / fark.width)]);
    }
  }
  // Sayım pixelmatch'inkiyle tutmuyorsa emin olunamaz: gürültü sayılmaz
  if (noktalar.length !== beklenen) return false;
  return noktalar.every(([x, y], i) =>
    noktalar
      .slice(i + 1)
      .every(([x2, y2]) => Math.max(Math.abs(x - x2), Math.abs(y - y2)) >= GURULTU_ARALIK)
  );
}

/** --referans-yenile: hepsi; --referans-yenile=ad,kod,…: yalnızca verilen sayfalar. Referansı yenilenecek mi? */
function yenilemeSecimi() {
  const liste = secenekDegeri('--referans-yenile');
  if (liste === undefined) return secenekVar('--referans-yenile') ? () => true : () => false;
  const istenen = liste.split(',').map((x) => x.trim()).filter(Boolean);
  const bilinmeyen = istenen.filter((x) => !SAYFALAR.some((s) => s.ad === x || s.kod === x));
  if (!istenen.length || bilinmeyen.length) {
    console.error(`--referans-yenile: bilinmeyen sayfa "${bilinmeyen.join(', ')}". Geçerli adlar: ${SAYFALAR.map((s) => s.ad).join(', ')}`);
    process.exit(1);
  }
  return (s) => istenen.includes(s.ad) || istenen.includes(s.kod);
}

async function main() {
  const yenilensinMi = yenilemeSecimi();
  derle();
  for (const k of [REFERANS, SON, FARK]) fs.mkdirSync(k, { recursive: true });
  for (const k of [SON, FARK]) for (const d of fs.readdirSync(k)) fs.rmSync(path.join(k, d), { force: true });

  const sunucu = await sunucuBaslat();
  const tarayici = await chromium.launch();
  const satirlar = [];
  let olusturulan = 0;
  try {
    for (const s of SAYFALAR) {
      // Aynı sayfanın üç genişliği paralel çekilir
      await Promise.all(
        GENISLIKLER.map(async (g) => {
          const dosya = `${s.ad}-${g.genislik}.png`;
          const referansYolu = path.join(REFERANS, dosya);
          const referansYaz = yenilensinMi(s) || !fs.existsSync(referansYolu);
          const hedef = referansYaz ? referansYolu : path.join(SON, dosya);
          const { uyarilar } = await cek(tarayici, sunucu.adres, s, g, hedef);
          for (const u of uyarilar) console.warn(`  UYARI ${s.yol} @${g.genislik}: ${u}`);
          if (referansYaz) {
            olusturulan++;
            satirlar.push({ s, g, dosya, durum: 'referans' });
            return;
          }
          const sonuc = karsilastir(referansYolu, hedef, path.join(FARK, dosya));
          const durum = sonuc.gurultu ? 'gurultu' : sonuc.yuzde > ESIK ? 'fark' : 'ayni';
          satirlar.push({ s, g, dosya, durum, ...sonuc });
        })
      );
      process.stdout.write(`  ${s.kod.padEnd(2)} ${s.yol} ✓\n`);
    }
  } finally {
    await tarayici.close();
    await sunucu.kapat();
  }

  const sirali = SAYFALAR.flatMap((s) =>
    GENISLIKLER.map((g) => satirlar.find((r) => r.s === s && r.g === g)).filter(Boolean)
  );
  const farklar = sirali.filter((r) => r.durum === 'fark');
  const gurultuler = sirali.filter((r) => r.durum === 'gurultu');
  const karsilastirilan = sirali.filter((r) => r.durum !== 'referans');
  const DURUM = { ayni: '✓ aynı', gurultu: '✓ geçti (gürültü)', fark: '✗ fark var' };
  const tolerans = GURULTU
    ? `%${GURULTU_ESIK} altı ve dağınık (fark pikselleri arası en az ${GURULTU_ARALIK} px)`
    : 'kapalı (--gurultu-yok)';

  if (olusturulan) {
    console.log(`\n${olusturulan} referans görüntü ${path.relative(process.cwd(), REFERANS)} altına kaydedildi.`);
  }
  if (!karsilastirilan.length) return;

  const rapor = [
    '# Görsel kontrol raporu',
    '',
    `Tarih: ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })} · Eşik: %${ESIK}` +
      ` · Gürültü toleransı: ${tolerans}`,
    '',
    '| Kod | Sayfa | Genişlik | Durum | Fark | Referans boyutu | Son boyut | Fark görseli |',
    '|---|---|---|---|---|---|---|---|',
    ...karsilastirilan.map(
      (r) =>
        `| ${r.s.kod} | ${r.s.yol} | ${r.g.genislik} | ${DURUM[r.durum]} | ` +
        `%${r.yuzde.toFixed(4)} (${r.piksel} px) | ${r.referansBoyut} | ${r.sonBoyut} | ` +
        `${r.piksel > 0 ? `fark/${r.dosya}` : '-'} |`
    ),
    '',
  ].join('\n');
  fs.writeFileSync(path.join(FARK, 'rapor.md'), rapor);

  console.log('');
  for (const r of karsilastirilan) {
    const boyut = r.referansBoyut !== r.sonBoyut ? `  boyut ${r.referansBoyut} → ${r.sonBoyut}` : '';
    const gurultu = r.durum === 'gurultu' ? `  geçti (gürültü: ${r.piksel} dağınık piksel)` : '';
    console.log(
      `  ${r.durum === 'fark' ? '✗' : '✓'} ${r.s.kod.padEnd(2)} ${r.s.yol.padEnd(42)} ${String(r.g.genislik).padStart(4)}px  ` +
        `%${r.yuzde.toFixed(4)}${boyut}${gurultu}`
    );
  }
  if (farklar.length) {
    console.error(
      `\ngorsel-kontrol: ${farklar.length} çekimde fark var. Fark görselleri ve rapor: ${path.relative(process.cwd(), FARK)}`
    );
    console.error('İzin verilmeyen bir görünüm farkı varsa iş bitmiş sayılmaz (CLAUDE.md "Güvenli Mod").');
    process.exit(1);
  }
  if (gurultuler.length) {
    console.log(
      `\ngorsel-kontrol: ${karsilastirilan.length} çekim geçti; ${karsilastirilan.length - gurultuler.length} aynı, ` +
        `${gurultuler.length} gürültü düzeyinde (dağınık birkaç piksel). ` +
        `Fark görselleri ve rapor: ${path.relative(process.cwd(), FARK)} ✓`
    );
    return;
  }
  console.log(`\ngorsel-kontrol: ${karsilastirilan.length} çekim referansla aynı. ✓`);
}

main().catch((hata) => {
  console.error(hata);
  process.exit(1);
});
