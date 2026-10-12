// Build çıktısındaki formları docs/guvenli-mod/form-envanteri.json ile karşılaştırır (CLAUDE.md "Güvenli Mod").
//
//   npm run form-kontrol                    önce derler, sonra denetler
//   npm run form-kontrol -- --derleme-yok   mevcut dist/ ile denetler
//   npm run form-kontrol -- --goster        dist/'teki formların yapısını JSON olarak yazar (envanteri
//                                           yalnızca onaylı bir değişiklikten sonra elle güncellemek için)
//
// Hata sayılanlar: form silinmiş ya da envanterde olmayan bir form eklenmiş; action veya method değişmiş;
// access_key yok, boş ya da onaylı sürümdekinden farklı; gizli alan (subject, from_name, redirect, botcheck…)
// eklenmiş, silinmiş ya da değeri değişmiş; kullanıcı alanı eklenmiş, silinmiş, yeniden adlandırılmış ya da
// türü, zorunluluğu veya seçenekleri değişmiş; sayfanın JS'inde Web3Forms gönderim akışının parçaları yok.
// Sorun varsa çıkış kodu 1'dir. Erişim anahtarının değeri hiçbir zaman ekrana yazılmaz.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { parse } from 'node-html-parser';
import { DIST, GUVENLI_MOD, KOK, derle, htmlSayfalari, secenekVar } from './ortak.mjs';

const ENVANTER = path.join(GUVENLI_MOD, 'form-envanteri.json');
const GIZLI_ADLAR = new Set(['botcheck']); // görünmeyen ama type="hidden" olmayan alanlar (honeypot)

/** Bir sayfadaki formların karşılaştırılabilir yapısı. */
function formlariOku(html) {
  const kok = parse(html);
  return kok.querySelectorAll('form').map((form) => {
    const nitelikler = form.attributes;
    const gizliAlanlar = [];
    const alanlar = new Map();

    for (const g of form.querySelectorAll('input, select, textarea')) {
      const ad = g.getAttribute('name');
      if (!ad) continue;
      const etiket = g.tagName.toLowerCase();
      const tip = etiket === 'input' ? (g.getAttribute('type') ?? 'text').toLowerCase() : etiket;

      if (tip === 'hidden' || GIZLI_ADLAR.has(ad)) {
        gizliAlanlar.push({ ad, tip, deger: g.getAttribute('value') ?? '' });
        continue;
      }
      const zorunlu = g.hasAttribute('required');
      if (tip === 'radio') {
        const grup = alanlar.get(ad) ?? { ad, tip, zorunlu: false, secenekler: [] };
        grup.zorunlu ||= zorunlu;
        grup.secenekler.push(g.getAttribute('value') ?? '');
        alanlar.set(ad, grup);
      } else if (tip === 'select') {
        const secenekler = g.querySelectorAll('option').map((o) => o.getAttribute('value') ?? o.text.trim());
        alanlar.set(ad, { ad, tip, zorunlu, secenekler });
      } else if (tip === 'checkbox') {
        alanlar.set(ad, { ad, tip, zorunlu, deger: g.getAttribute('value') ?? 'on' });
      } else {
        alanlar.set(ad, { ad, tip, zorunlu });
      }
    }

    return {
      // Formu tanıtan değersiz data-* niteliği (ör. data-iletisim)
      kimlik: Object.keys(nitelikler).find((n) => n.startsWith('data-') && nitelikler[n] === '') ?? null,
      action: nitelikler.action ?? null,
      method: (nitelikler.method ?? 'get').toLowerCase(),
      gizliAlanlar,
      alanlar: [...alanlar.values()],
      betikler: kok.querySelectorAll('script[type="module"][src]').map((s) => s.getAttribute('src')),
    };
  });
}

/** Sayfanın modül betikleri ve statik olarak içe aktardıkları (dist/_astro) tek metin olarak. */
function betikMetni(betikler) {
  const okunan = new Set();
  let metin = '';
  const oku = (adres) => {
    const dosya = path.join(DIST, adres);
    if (okunan.has(dosya) || !dosya.startsWith(DIST) || !fs.existsSync(dosya)) return;
    okunan.add(dosya);
    const icerik = fs.readFileSync(dosya, 'utf8');
    metin += icerik;
    for (const [, goreli] of icerik.matchAll(/(?:from|import)\s*\(?\s*["'](\.{1,2}\/[^"']+\.js)["']/g)) {
      oku(path.posix.join(path.posix.dirname(adres), goreli));
    }
  };
  betikler.forEach(oku);
  return metin;
}

/** git'teki onaylı sürümde erişim anahtarı (değer yalnızca karşılaştırmada kullanılır, yazdırılmaz). */
function onayliAnahtar({ referansGit, kaynakDosya, degisken }) {
  const sonuc = spawnSync('git', ['show', `${referansGit}:${kaynakDosya}`], { cwd: KOK, encoding: 'utf8' });
  if (sonuc.status !== 0) return null;
  return sonuc.stdout.match(new RegExp(`${degisken}\\s*=\\s*['"\`]([^'"\`]*)['"\`]`))?.[1] ?? null;
}

const esit = (a, b) => JSON.stringify(a) === JSON.stringify(b);

function main() {
  derle();
  const sayfalar = htmlSayfalari().map((s) => ({ ...s, formlar: formlariOku(fs.readFileSync(s.dosya, 'utf8')) }));
  const formluSayfalar = sayfalar.filter((s) => s.formlar.length);

  if (secenekVar('--goster')) {
    const cikti = formluSayfalar.flatMap((s) => s.formlar.map(({ betikler, ...f }) => ({ sayfa: s.url, ...f })));
    console.log(JSON.stringify(cikti, null, 2));
    return;
  }

  const envanter = JSON.parse(fs.readFileSync(ENVANTER, 'utf8'));
  const hatalar = [];
  const uyarilar = [];
  const anahtarAdi = envanter.erisimAnahtari.alan;
  const referansAnahtar = onayliAnahtar(envanter.erisimAnahtari);
  if (referansAnahtar === null) {
    uyarilar.push(
      `Onaylı sürümdeki erişim anahtarı okunamadı (git ${envanter.erisimAnahtari.referansGit}:${envanter.erisimAnahtari.kaynakDosya}); ` +
        'yalnızca anahtarın varlığı denetlendi.'
    );
  }

  const eslesen = new Set();
  for (const beklenen of envanter.formlar) {
    const yer = `${beklenen.sayfa} (${beklenen.kimlik})`;
    const sayfa = sayfalar.find((s) => s.url === beklenen.sayfa);
    const form = sayfa?.formlar.find((f) => f.kimlik === beklenen.kimlik);
    if (!form) {
      hatalar.push(`${yer}: form bulunamadı (sayfa ya da form silinmiş veya ${beklenen.kimlik} niteliği değişmiş).`);
      continue;
    }
    eslesen.add(form);

    if (form.action !== beklenen.action) hatalar.push(`${yer}: action değişmiş: "${beklenen.action}" → "${form.action}".`);
    if (form.method !== beklenen.method) hatalar.push(`${yer}: method değişmiş: "${beklenen.method}" → "${form.method}".`);

    // Gizli alanlar: ad, tür ve değer birebir aynı; erişim anahtarının yalnızca varlığı ve onaylı değerle eşitliği
    const gizli = new Map(form.gizliAlanlar.map((g) => [g.ad, g]));
    for (const b of beklenen.gizliAlanlar) {
      const g = gizli.get(b.ad);
      if (!g) {
        hatalar.push(`${yer}: gizli alan silinmiş: ${b.ad}.`);
        continue;
      }
      gizli.delete(b.ad);
      if (g.tip !== b.tip) hatalar.push(`${yer}: gizli alan türü değişmiş: ${b.ad} (${b.tip} → ${g.tip}).`);
      if (b.ad === anahtarAdi) {
        if (!g.deger.trim()) hatalar.push(`${yer}: ${anahtarAdi} boş.`);
        else if (referansAnahtar !== null && g.deger !== referansAnahtar)
          hatalar.push(`${yer}: ${anahtarAdi} değeri onaylı sürümdekinden farklı (değer gösterilmez).`);
      } else if (g.deger !== b.deger) {
        hatalar.push(`${yer}: gizli alan değeri değişmiş: ${b.ad}: "${b.deger}" → "${g.deger}".`);
      }
    }
    for (const g of gizli.values()) hatalar.push(`${yer}: envanterde olmayan gizli alan eklenmiş: ${g.ad}.`);

    // Kullanıcı alanları
    const alanlar = new Map(form.alanlar.map((a) => [a.ad, a]));
    for (const b of beklenen.alanlar) {
      const a = alanlar.get(b.ad);
      if (!a) {
        hatalar.push(`${yer}: alan silinmiş ya da yeniden adlandırılmış: ${b.ad}.`);
        continue;
      }
      alanlar.delete(b.ad);
      if (a.tip !== b.tip) hatalar.push(`${yer}: alan türü değişmiş: ${b.ad} (${b.tip} → ${a.tip}).`);
      if (a.zorunlu !== b.zorunlu)
        hatalar.push(`${yer}: alanın zorunluluğu değişmiş: ${b.ad} (${b.zorunlu} → ${a.zorunlu}).`);
      if (b.secenekler && !esit(a.secenekler, b.secenekler)) hatalar.push(`${yer}: alanın seçenekleri değişmiş: ${b.ad}.`);
      if (b.deger !== undefined && a.deger !== b.deger)
        hatalar.push(`${yer}: alanın gönderilen değeri değişmiş: ${b.ad}: "${b.deger}" → "${a.deger}".`);
    }
    for (const a of alanlar.values()) hatalar.push(`${yer}: envanterde olmayan alan eklenmiş: ${a.ad}.`);

    // JS açıkken gönderim (src/scripts/form.ts): Web3Forms adresi ve gönderilen anahtar alanlar paketlenmiş betikte
    const js = betikMetni(form.betikler);
    if (!js) hatalar.push(`${yer}: sayfada form betiği bulunamadı (JS gönderim akışı yok).`);
    else
      for (const ifade of beklenen.jsGonderim.gerekenIfadeler)
        if (!js.includes(ifade)) hatalar.push(`${yer}: form betiğinde "${ifade}" bulunamadı (gönderim akışı değişmiş olabilir).`);
  }

  for (const s of formluSayfalar)
    for (const f of s.formlar)
      if (!eslesen.has(f)) hatalar.push(`${s.url}: envanterde olmayan form (${f.kimlik ?? 'kimliksiz'}, action: ${f.action}).`);

  for (const u of uyarilar) console.warn(`UYARI: ${u}`);
  if (hatalar.length) {
    console.error(`\nform-kontrol: ${hatalar.length} sorun bulundu:`);
    for (const h of hatalar) console.error(`  ✗ ${h}`);
    console.error('\nFormlar müşteri onaylı haliyle korunmalı (CLAUDE.md "Güvenli Mod").');
    process.exit(1);
  }
  const alanSayisi = envanter.formlar.reduce((t, f) => t + f.alanlar.length + f.gizliAlanlar.length, 0);
  console.log(
    `form-kontrol: ${envanter.formlar.length} form, ${alanSayisi} alan envanterle aynı ` +
      `(${envanter.formlar.map((f) => f.sayfa).join(', ')}). ✓`
  );
}

main();
