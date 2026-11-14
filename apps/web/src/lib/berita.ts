import { type ArticleItem } from "./artikel";

export const news: readonly ArticleItem[] = [
  {
    id: 1,
    title: "Merawat ruang kebersamaan",
    image: "/images/jamaah-masjid.webp",
    alt: "Suasana jamaah di ruang masjid, ilustrasi umum bukan dokumentasi acara tertentu",
    href: "/berita/detail",
  },
  {
    id: 2,
    title: "Mengenal lingkungan masjid",
    image: "/images/masjid-udara.webp",
    alt: "Pemandangan Masjid Al-Kautsar dan lingkungan sekitar dari udara",
    href: "/berita/detail?contoh=2",
  },
];
