// Derlenen sayfalardaki JSON-LD'yi denetler (seo-kurallar §9). Şemalar: src/lib/sema.ts,
// src/components/Breadcrumb.astro, src/data/sss.ts.
//
//   npm run build && npm run jsonld-kontrol
//
// Her sayfada:
// - Her JSON-LD bloğu geçerli JSON, @context https://schema.org, her düğümde @type var.
// - Organization + HomeAndConstructionBusiness tek varlık olarak bir kez var; ad, logo, telefon, adres ve sosyal
//   profiller dolu; tüm sayfalarda aynı. Telefon footer'daki tel: bağlantısıyla, adres footer'daki adresle aynı.
// - Konum çubuğu (nav.konum) varsa BreadcrumbList bir kez var ve görünen öğelerle birebir aynı (ad, sıra, bağlantı);
//   yoksa BreadcrumbList yok.
// - Sayfada SSS soruları görünüyorsa FAQPage bir kez var ve yalnızca o soruları aynı sırayla, aynı cevaplarla taşır;
//   görünmüyorsa FAQPage yok.
// - Proje galerisi ([data-galeri]) varsa CreativeWork: ad = H1, açıklama dolu, url = canonical, görseller galerideki
//   fotoğraflarla aynı (alt metni = caption) ve dosyaları dist/ içinde var.
// - Şemadaki site adresleri canonical ile aynı biçimde (https, www'suz).
// Sorun varsa çıkış kodu 1'dir.
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

const DIST = path.resolve(process.argv[2] ?? 'dist');
if (!fs.existsSync(path.join(DIST, 'index.html'))) {
  console.error(`Derleme yok: ${DIST} — önce "npm run build" çalıştırın.`);
  process.exit(1);
}

const sayfalar = [];
(function gez(klasor) {
  for (const o of fs.readdirSync(klasor, { withFileTypes: true })) {
    const p = path.join(klasor, o.name);
    if (o.isDirectory()) gez(p);
    else if (o.name.endsWith('.html')) sayfalar.push(p);
  }
})(DIST);
sayfalar.sort();

const bosluk = (s) => (typeof s === 'string' ? s.replace(/\s+/g, ' ').trim() : s);
const metin = (el) => bosluk(el?.text ?? '');
const turleri = (d) => [d?.['@type']].flat().filter(Boolean);
const turuVar = (d, tur) => turleri(d).includes(tur);
const esit = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/** Blok içindeki tüm düğümler (@graph ve iç içe nesneler dahil) */
function dugumler(veri) {
  const liste = [];
  (function yuru(d) {
    if (Array.isArray(d)) return d.forEach(yuru);
    if (d && typeof d === 'object') {
      if (d['@type']) liste.push(d);
      Object.values(d).forEach(yuru);
    }
  })(veri);
  return liste;
}

/** Şemadaki tüm metin değerleri (adres denetimi için) */
function dizeler(veri, liste = []) {
  if (typeof veri === 'string') liste.push(veri);
  else if (veri && typeof veri === 'object') Object.values(veri).forEach((v) => dizeler(v, liste));
  return liste;
}

const hatalar = [];
const sayac = {};
let ilkIsletme;
let koken;

for (const dosya of sayfalar) {
  const url = '/' + path.relative(DIST, dosya).split(path.sep).join('/').replace(/(^|\/)index\.html$/, '').replace(/\.html$/, '');
  const hata = (m) => hatalar.push(`${url} → ${m}`);
  const kok = parse(fs.readFileSync(dosya, 'utf8'));
  const canonical = kok.querySelector('link[rel="canonical"]')?.getAttribute('href');
  if (!canonical) {
    hata('canonical yok');
    continue;
  }
  koken ??= new URL(canonical).origin;
  const mutlak = (href) => new URL(href, `${koken}/`).href;

  // 1) Bloklar
  const bloklar = [];
  for (const s of kok.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      bloklar.push(JSON.parse(s.rawText));
    } catch (e) {
      hata(`JSON-LD geçersiz JSON: ${e.message}`);
    }
  }
  for (const b of bloklar) {
    if (b['@context'] !== 'https://schema.org') hata(`@context "${b['@context']}" (beklenen https://schema.org)`);
    if (!b['@type'] && !b['@graph']) hata('JSON-LD bloğunda @type yok');
  }
  const ust = bloklar.flatMap((b) => (b['@graph'] ? b['@graph'] : [b]));
  for (const d of ust) for (const t of turleri(d)) sayac[t] = (sayac[t] ?? 0) + 1;

  // Site adresleri tek biçimde (canonical'ın kökeni)
  for (const s of dizeler(bloklar))
    if (/^https?:\/\/(www\.)?2kahsap\.com/i.test(s) && !s.startsWith(`${koken}/`)) hata(`farklı biçimde site adresi: ${s}`);

  // 2) İşletme: Organization + HomeAndConstructionBusiness
  const isletmeler = ust.filter((d) => turuVar(d, 'Organization') || turuVar(d, 'HomeAndConstructionBusiness'));
  if (isletmeler.length !== 1) hata(`işletme şeması ${isletmeler.length} kez (beklenen 1)`);
  const isletme = isletmeler[0];
  if (isletme) {
    for (const tur of ['Organization', 'HomeAndConstructionBusiness'])
      if (!turuVar(isletme, tur)) hata(`işletme şemasında @type ${tur} yok`);
    for (const alan of ['@id', 'name', 'url', 'logo', 'telephone', 'address'])
      if (!isletme[alan]) hata(`işletme şemasında ${alan} yok`);
    for (const alan of ['streetAddress', 'addressLocality', 'addressRegion', 'postalCode', 'addressCountry'])
      if (!isletme.address?.[alan]) hata(`işletme adresinde ${alan} yok`);
    if (isletme.url !== `${koken}/`) hata(`işletme url'si ${isletme.url}`);
    if (!Array.isArray(isletme.sameAs) || isletme.sameAs.length === 0) hata('işletme şemasında sosyal profil (sameAs) yok');
    const logo = typeof isletme.logo === 'string' ? isletme.logo : isletme.logo?.url;
    if (logo?.startsWith(koken) && !fs.existsSync(path.join(DIST, decodeURI(new URL(logo).pathname))))
      hata(`logo dosyası yok: ${logo}`);
    ilkIsletme ??= isletme;
    if (!esit(isletme, ilkIsletme)) hata('işletme şeması diğer sayfalardakinden farklı');

    // Görünen iletişim bilgileriyle aynı mı (footer)
    const tel = kok.querySelector('footer a[href^="tel:"]')?.getAttribute('href');
    const rakam = (s) => s?.replace(/\D/g, '');
    if (!tel) hata('footer\'da tel: bağlantısı yok');
    else if (rakam(tel) !== rakam(isletme.telephone)) hata(`telefon şemada ${isletme.telephone}, footer'da ${tel}`);
    const footer = metin(kok.querySelector('footer'));
    for (const parca of [isletme.address?.streetAddress, isletme.address?.postalCode])
      if (parca && !footer.includes(parca)) hata(`adres parçası footer'da görünmüyor: ${parca}`);
  }

  // 3) Konum çubuğu ↔ BreadcrumbList
  const konumlar = ust.filter((d) => turuVar(d, 'BreadcrumbList'));
  const ogeler = kok.querySelectorAll('nav.konum li');
  if (ogeler.length === 0) {
    if (konumlar.length) hata('konum çubuğu yok ama BreadcrumbList var');
  } else if (konumlar.length !== 1) hata(`konum çubuğu var, BreadcrumbList ${konumlar.length} kez (beklenen 1)`);
  else {
    const liste = konumlar[0].itemListElement ?? [];
    if (liste.length !== ogeler.length) hata(`BreadcrumbList ${liste.length} öğe, konum çubuğu ${ogeler.length} öğe`);
    ogeler.forEach((li, i) => {
      const s = liste[i] ?? {};
      const a = li.querySelector('a');
      const beklenen = { position: i + 1, name: metin(li), item: a ? mutlak(a.getAttribute('href')) : undefined };
      const bulunan = { position: s.position, name: s.name, item: s.item };
      if (!esit(beklenen, bulunan)) hata(`BreadcrumbList ${i + 1}. öğe ${JSON.stringify(bulunan)}, görünen ${JSON.stringify(beklenen)}`);
    });
  }

  // 4) Görünen SSS ↔ FAQPage
  const sssler = ust.filter((d) => turuVar(d, 'FAQPage'));
  const gorunen = kok.querySelectorAll('details.sss').map((d) => ({
    soru: metin(d.querySelector('.sss-soru')),
    cevap: metin(d.querySelector('.sss-cevap')),
  }));
  if (gorunen.length === 0) {
    if (sssler.length) hata('sayfada SSS yok ama FAQPage var');
  } else if (sssler.length !== 1) hata(`sayfada ${gorunen.length} soru var, FAQPage ${sssler.length} kez (beklenen 1)`);
  else {
    const semadaki = (sssler[0].mainEntity ?? []).map((q) => ({
      soru: q['@type'] === 'Question' ? bosluk(q.name) : `(@type ${q['@type']})`,
      cevap: q.acceptedAnswer?.['@type'] === 'Answer' ? bosluk(q.acceptedAnswer.text) : '(Answer yok)',
    }));
    if (semadaki.length !== gorunen.length) hata(`FAQPage ${semadaki.length} soru, sayfada ${gorunen.length} soru`);
    gorunen.forEach((g, i) => {
      if (!esit(g, semadaki[i])) hata(`FAQPage ${i + 1}. soru sayfadakiyle aynı değil: "${semadaki[i]?.soru}" / "${g.soru}"`);
    });
  }

  // 5) Proje detayı ↔ CreativeWork
  const projeler = ust.filter((d) => turuVar(d, 'CreativeWork'));
  const galeri = kok.querySelector('[data-galeri]');
  if (!galeri) {
    if (projeler.length) hata('proje galerisi yok ama CreativeWork var');
  } else if (projeler.length !== 1) hata(`proje sayfasında CreativeWork ${projeler.length} kez (beklenen 1)`);
  else {
    const p = projeler[0];
    if (p.name !== metin(kok.querySelector('h1'))) hata(`proje adı "${p.name}", H1 "${metin(kok.querySelector('h1'))}"`);
    if (!p.description?.trim()) hata('proje açıklaması boş');
    if (p.url !== canonical) hata(`proje url'si ${p.url}, canonical ${canonical}`);
    const fotolar = galeri.querySelectorAll('.galeri-kucukler img').map((img) => img.getAttribute('alt'));
    const gorseller = [p.image].flat().filter(Boolean);
    if (gorseller.length !== fotolar.length) hata(`şemada ${gorseller.length} görsel, galeride ${fotolar.length} fotoğraf`);
    const altlar = new Set(fotolar);
    for (const g of gorseller) {
      if (!turuVar(g, 'ImageObject') || !g.contentUrl) {
        hata(`proje görseli ImageObject değil ya da contentUrl yok: ${JSON.stringify(g).slice(0, 80)}`);
        continue;
      }
      if (!altlar.has(g.caption)) hata(`görsel açıklaması galeride yok: "${g.caption}"`);
      if (!fs.existsSync(path.join(DIST, decodeURI(new URL(g.contentUrl).pathname)))) hata(`görsel dosyası yok: ${g.contentUrl}`);
    }
  }
}

const ozet = Object.entries(sayac)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([t, n]) => `${t} ${n}`)
  .join(' · ');
console.log(`${sayfalar.length} sayfa denetlendi · ${ozet}`);
if (hatalar.length) {
  console.error(`\n${hatalar.length} sorun:\n` + hatalar.map((h) => `  ✗ ${h}`).join('\n'));
  process.exit(1);
}
console.log('✓ JSON-LD geçerli ve sayfada görünenle aynı');
