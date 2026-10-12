// Müşteri onaylı görünümün piksel karşılaştırması (CLAUDE.md "Güvenli Mod").
//
//   npm run gorsel-kontrol                              önce derler, sonra çeker ve karşılaştırır
//   npm run gorsel-kontrol -- --derleme-yok             mevcut dist/ ile
//   npm run gorsel-kontrol -- --esik=0.05               % olarak izin verilen fark (varsayılan 0)
//   npm run gorsel-kontrol -- --referans-yenile         referansları baştan üretir (yalnızca müşteri onaylı
//                                                       bir görünüm değişikliğinden sonra)
//
// Her sayfa tipinden bir örnek 375, 768 ve 1280 px genişlikte çekilir: hareket azaltılmış
// (prefers-reduced-motion), CSS animasyonları kapalı, tüm görseller (lazy olanlar dahil) ve fontlar yüklenmiş.
// Galeri sonsuz kaydırmalı olduğu için yalnızca ilk ekran çekilir.
//
// Referans yoksa (ilk çalıştırma) çekimler docs/guvenli-mod/referans/ altına kaydedilir. Varsa son çekimler
// docs/guvenli-mod/son/ altına yazılır, referansla karşılaştırılır; farklı olanların fark görseli (değişen
// pikseller kırmızı) docs/guvenli-mod/fark/ altına, özet rapor fark/rapor.md'ye yazılır. Fark varsa çıkış kodu 1.
//
// Not: Çekimler tarayıcı sürümüne, işletim sistemine ve font yüklemesine bağlıdır. Referanslar bu bilgisayarda
// ve package.json'da sabitlenmiş Playwright sürümüyle üretilmiştir; başka ortamda karşılaştırma yapılacaksa
// önce onayli-tasarim etiketinden referans yeniden üretilmelidir (docs/guvenli-mod/README.md).
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { GUVENLI_MOD, derle, secenekDegeri, secenekVar, sunucuBaslat } from './ortak.mjs';

// Sayfa tipleri: A ana sayfa, P projeler, K kategori, D proje detayı, G galeri, H hakkımızda, S SSS,
// T teklif al, İ iletişim, TŞ teşekkürler, Y yasal sayfa
const SAYFALAR = [
  { kod: 'A', ad: 'ana-sayfa', yol: '/' },
  { kod: 'P', ad: 'projeler', yol: '/projeler' },
  { kod: 'K', ad: 'kategori-bungalov', yol: '/bungalov' },
  { kod: 'D', ad: 'proje-asma-katli-verandali-bungalov', yol: '/bungalov/asma-katli-verandali-bungalov' },
  { kod: 'G', ad: 'galeri', yol: '/galeri', ilkEkran: true, hazir: '.galeri-izgara.dizildi' },
  { kod: 'H', ad: 'hakkimizda', yol: '/hakkimizda' },
  { kod: 'S', ad: 'sss', yol: '/sss' },
  { kod: 'T', ad: 'teklif-al', yol: '/teklif-al' },
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

/** Sayfayı çekime hazırlar: tüm görseller yüklenip çözülmüş, fontlar hazır, iki kare boyanmış. */
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
      await document.fonts.ready;
      await new Promise((tamam) => requestAnimationFrame(() => requestAnimationFrame(tamam)));
      return sonuc === 'zaman-asimi' ? resimler.filter((r) => !r.complete).map((r) => r.currentSrc || r.src) : [];
    },
    { ilkEkran: !!ilkEkran, zamanAsimi: GORSEL_ZAMAN_ASIMI }
  );
  return eksik;
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
    const eksik = await hazirla(sayfa, s);
    await sayfa.screenshot({ path: hedef, fullPage: !s.ilkEkran, animations: 'disabled', caret: 'hide' });
    return { uyarilar: [...basarisiz, ...eksik.map((e) => `yüklenemeyen görsel: ${e}`)] };
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
  const piksel = pixelmatch(genislet(a), genislet(b), fark.data, genislik, yukseklik, { threshold: 0.1 });
  if (piksel > 0) fs.writeFileSync(farkYolu, PNG.sync.write(fark));
  return {
    piksel,
    yuzde: (piksel / (genislik * yukseklik)) * 100,
    referansBoyut: `${a.width}×${a.height}`,
    sonBoyut: `${b.width}×${b.height}`,
  };
}

async function main() {
  const yenile = secenekVar('--referans-yenile');
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
          const referansYaz = yenile || !fs.existsSync(referansYolu);
          const hedef = referansYaz ? referansYolu : path.join(SON, dosya);
          const { uyarilar } = await cek(tarayici, sunucu.adres, s, g, hedef);
          for (const u of uyarilar) console.warn(`  UYARI ${s.yol} @${g.genislik}: ${u}`);
          if (referansYaz) {
            olusturulan++;
            satirlar.push({ s, g, dosya, durum: 'referans' });
            return;
          }
          const sonuc = karsilastir(referansYolu, hedef, path.join(FARK, dosya));
          satirlar.push({ s, g, dosya, durum: sonuc.yuzde > ESIK ? 'fark' : 'ayni', ...sonuc });
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
  const karsilastirilan = sirali.filter((r) => r.durum !== 'referans');

  if (olusturulan) {
    console.log(`\n${olusturulan} referans görüntü ${path.relative(process.cwd(), REFERANS)} altına kaydedildi.`);
  }
  if (!karsilastirilan.length) return;

  const rapor = [
    '# Görsel kontrol raporu',
    '',
    `Tarih: ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })} · Eşik: %${ESIK}`,
    '',
    '| Kod | Sayfa | Genişlik | Durum | Fark | Referans boyutu | Son boyut | Fark görseli |',
    '|---|---|---|---|---|---|---|---|',
    ...karsilastirilan.map(
      (r) =>
        `| ${r.s.kod} | ${r.s.yol} | ${r.g.genislik} | ${r.durum === 'fark' ? '✗ fark var' : '✓ aynı'} | ` +
        `%${r.yuzde.toFixed(4)} (${r.piksel} px) | ${r.referansBoyut} | ${r.sonBoyut} | ` +
        `${r.piksel > 0 ? `fark/${r.dosya}` : '-'} |`
    ),
    '',
  ].join('\n');
  fs.writeFileSync(path.join(FARK, 'rapor.md'), rapor);

  console.log('');
  for (const r of karsilastirilan) {
    const boyut = r.referansBoyut !== r.sonBoyut ? `  boyut ${r.referansBoyut} → ${r.sonBoyut}` : '';
    console.log(
      `  ${r.durum === 'fark' ? '✗' : '✓'} ${r.s.kod.padEnd(2)} ${r.s.yol.padEnd(42)} ${String(r.g.genislik).padStart(4)}px  ` +
        `%${r.yuzde.toFixed(4)}${boyut}`
    );
  }
  if (farklar.length) {
    console.error(
      `\ngorsel-kontrol: ${farklar.length} çekimde fark var. Fark görselleri ve rapor: ${path.relative(process.cwd(), FARK)}`
    );
    console.error('İzin verilmeyen bir görünüm farkı varsa iş bitmiş sayılmaz (CLAUDE.md "Güvenli Mod").');
    process.exit(1);
  }
  console.log(`\ngorsel-kontrol: ${karsilastirilan.length} çekim referansla aynı. ✓`);
}

main().catch((hata) => {
  console.error(hata);
  process.exit(1);
});
