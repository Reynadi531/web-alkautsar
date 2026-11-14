import { type ArticleItem } from "./artikel";

export const columns: readonly ArticleItem[] = [
  {
    id: 1,
    title: "Merawat Ruang Kebersamaan",
    image: "/images/jamaah-masjid.webp",
    detailImage: {
      desktop: "/images/kolom-kebersamaan-desktop.webp",
      mobile: "/images/kolom-kebersamaan-mobile.webp",
    },
    alt: "Suasana jamaah di ruang masjid, ilustrasi umum bukan dokumentasi acara tertentu",
    href: "/kolom/detail",
  },
  {
    id: 2,
    title: "Mengenal lingkungan masjid",
    image: "/images/masjid-udara.webp",
    alt: "Pemandangan Masjid Al-Kautsar dan lingkungan sekitar dari udara",
    href: "/kolom/detail?contoh=2",
  },
];
