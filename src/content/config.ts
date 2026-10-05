// Proje içerikleri: src/content/projeler/<proje-slug>.md
// Fotoğraflar: public/images/<kategori>/<proje-slug>/<dosya>-{600,1000,1600}.webp
import { defineCollection, z } from 'astro:content';
import { kategoriler } from '../data/site';

const kategoriSluglari = kategoriler.map((k) => k.slug) as [string, ...string[]];

// Teknik şartname alanı: boş bırakılabilir; boş alanlar sitede gösterilmez
const sartname = z.union([z.number(), z.string()]).nullish();

const projeler = defineCollection({
  type: 'content',
  schema: z
    .object({
      baslik: z.string().min(3),
      kategori: z.enum(kategoriSluglari),
      kapak: z.string(),
      fotograflar: z
        .array(
          z.object({
            dosya: z.string(),
            alt: z.string().min(10, 'Alt metni fotoğrafı anlatmalı').max(125),
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
