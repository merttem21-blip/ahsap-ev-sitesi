// schema.org JSON-LD şemaları (seo-kurallar §9). Değerler firma bilgilerinden (src/data/site.ts) ve proje
// verisinden gelir; şemada sayfada görünmeyen bilgi bulunmaz. Konum çubuğu şeması Breadcrumb.astro'da,
// SSS şeması src/data/sss.ts'de. Derlenen şemaları denetleyen betik: npm run jsonld-kontrol
import { firma, semaLogosu, varsayilanGorsel, type Kategori } from '../data/site';
import type { Gorsel } from './gorsel';
import type { Proje } from './projeler';

export const isletmeKimligi = (site: URL) => new URL('/#isletme', site).href;

/** Her sayfada: tek varlık hem Organization hem LocalBusiness alt türü HomeAndConstructionBusiness'tır;
    ad, adres ve telefon (NAP) tek yerde durur. LinkedIn kurucunun kişisel hesabı olduğu için founder altında. */
export const isletmeSemasi = (site: URL) => ({
  '@context': 'https://schema.org',
  '@type': ['Organization', 'HomeAndConstructionBusiness'],
  '@id': isletmeKimligi(site),
  name: firma.marka,
  url: new URL('/', site).href,
  logo: new URL(semaLogosu, site).href,
  image: new URL(varsayilanGorsel, site).href,
  description: '2015’ten beri özel tasarım ahşap ev, bungalov, villa ve tiny house üreten firma.',
  telephone: firma.telefonUluslararasi,
  email: firma.eposta,
  foundingDate: firma.kurulusYili,
  address: {
    '@type': 'PostalAddress',
    streetAddress: firma.adresParcalari.sokak,
    addressLocality: firma.adresParcalari.ilce,
    addressRegion: firma.adresParcalari.il,
    postalCode: firma.adresParcalari.postaKodu,
    addressCountry: 'TR',
  },
  areaServed: { '@type': 'Country', name: 'Türkiye' },
  founder: { '@type': 'Person', name: firma.kurucu, sameAs: firma.linkedin },
  sameAs: [firma.instagram, firma.facebook],
});

/** Markdown'ı düz metne çevirir (proje açıklaması için). */
const duzMetin = (md: string) =>
  md
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, '')
    .replace(/(\*\*|__|\*|`)/g, '')
    .replace(/\s+/g, ' ')
    .trim();

/** Proje detayı: proje adı, açıklaması ve galerideki tüm fotoğraflar (kapak önce).
    Açıklama, sayfadaki "Proje Hakkında" metnidir; o yoksa sayfanın meta açıklaması. */
export function projeSemasi(o: {
  proje: Proje;
  kategori: Kategori;
  sayfaAdresi: string;
  metaAciklama: string;
  fotolar: { alt: string; g: Gorsel }[];
  site: URL;
}) {
  const aciklama = duzMetin(o.proje.body);
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${o.sayfaAdresi}#proje`,
    name: o.proje.data.baslik,
    description: aciklama || o.metaAciklama,
    url: o.sayfaAdresi,
    genre: o.kategori.ad,
    inLanguage: 'tr-TR',
    creator: { '@id': isletmeKimligi(o.site) },
    image: o.fotolar.map((f) => ({
      '@type': 'ImageObject',
      contentUrl: new URL(f.g.buyuk, o.site).href,
      caption: f.alt,
      width: f.g.width,
      height: f.g.height,
      creditText: firma.marka,
    })),
  };
}
