// Projelerin tek kaynağı: src/content/projeler/<proje-slug>.md (bir dosya = bir proje)
// Fotoğraflar: public/images/<kategori>/<proje-slug>/<dosya>-{600,1000,1600}.webp
// Yeni proje ekleme rehberi: docs/yeni-proje-ekleme.md (taslak kayıt: npm run yeni-proje)
import { defineCollection, z } from 'astro:content';
import { kategoriler } from '../data/site';
import { iller } from '../data/iller';

const kategoriSluglari = kategoriler.map((k) => k.slug) as [string, ...string[]];

// Teknik şartname alanı: boş bırakılabilir; boş alanlar sitede gösterilmez
const sartname = z.union([z.number(), z.string()]).nullish();

const projeler = defineCollection({
  type: 'content',
  schema: z
    .object({
      baslik: z.string().trim().min(3, 'baslik: proje adını yazın'),
      kategori: z.enum(kategoriSluglari),
      kapak: z.string(),
      // İl/ilçe; yalnızca müşteri izin verdiyse yazılır. Boşsa galeri ve alt metinlerde gösterilmez.
      konum: z.string().trim().nullish(),
      // Sitede gösterilmeyen, sonraki özellikler için hazırlık alanları; hepsi boş bırakılabilir.
      // il: teklif formundaki il listesinden biri (yazım birliği için). Boşsa null.
      il: z
        .string()
        .trim()
        .nullish()
        .transform((v) => v || null)
        .refine((v) => v === null || iller.includes(v), 'il: 81 ilden biri olmalı (ör. "İstanbul") ya da boş kalmalı'),
      // one_cikan: true / false; boşsa false
      // (Astro tür hatalarında kendi İngilizce mesajını gösterdiği için kontrol refine ile yapılır)
      one_cikan: z
        .unknown()
        .refine((v) => v == null || typeof v === 'boolean', 'one_cikan: true ya da false yazın ya da boş bırakın')
        .transform((v) => v === true),
      // etiketler: YAML listesi ya da virgülle ayrılmış metin ("veranda, asma kat"); boşsa []
      etiketler: z
        .union([z.array(z.string()), z.string()])
        .nullish()
        .transform((v) => {
          const liste = (typeof v === 'string' ? v.split(',') : (v ?? [])).map((e) => e.trim()).filter(Boolean);
          return [...new Set(liste)];
        }),
      fotograflar: z
        .array(
          z.object({
            dosya: z.string(),
            alt: z.string().min(10, 'Alt metni fotoğrafı anlatmalı').max(125, 'Alt metni en fazla 125 karakter olmalı'),
          })
        )
        .min(4, 'Her proje en az 4 fotoğraftan oluşur'),
      kapali_alan_m2: sartname,
      kat_sayisi: sartname,
      oda_sayisi: sartname,
      ahsap_turu: sartname,
      tasiyici_sistem: sartname,
      cati_kaplama: sartname,
      dis_cephe: sartname,
      yalitim: sartname,
      dograma: sartname,
      ic_kaplama: sartname,
      teslim_suresi: sartname,
      notlar: sartname,
    })
    .refine((p) => p.fotograflar.some((f) => f.dosya === p.kapak), {
      message: 'kapak, fotograflar listesindeki dosyalardan biri olmalı',
      path: ['kapak'],
    }),
});

export const collections = { projeler };
