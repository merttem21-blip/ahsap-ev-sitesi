// Bağlantı önizlemesi görselleri (1200×630 JPEG): src/lib/paylasim.ts
// Her derlemede hero ve kapak fotoğraflarından yeniden üretilir; yeni proje veya kapak değişikliği için ek adım gerekmez.
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { kategoriler } from '../../data/site';
import { kategoriProjeleri } from '../../lib/projeler';
import {
  anaSayfaPaylasimi,
  kategoriPaylasimi,
  paylasimGorseli,
  projePaylasimi,
  varsayilanPaylasim,
  type Paylasim,
} from '../../lib/paylasim';

export async function getStaticPaths() {
  const liste: Paylasim[] = [varsayilanPaylasim, anaSayfaPaylasimi];
  for (const k of kategoriler) {
    const p = await kategoriPaylasimi(k, await kategoriProjeleri(k.slug));
    if (p.kaynak) liste.push(p); // projesi olmayan kategori varsayılan görseli kullanır
  }
  for (const proje of await getCollection('projeler')) liste.push(await projePaylasimi(proje));
  return liste.map((p) => ({ params: { yol: p.yol.replace(/^\/paylasim\//, '') }, props: { paylasim: p } }));
}

export const GET: APIRoute = async ({ props }) =>
  new Response(await paylasimGorseli(props.paylasim as Paylasim), { headers: { 'Content-Type': 'image/jpeg' } });
