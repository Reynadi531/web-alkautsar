export interface ArticleItem {
  id: number;
  title: string;
  image: string;
  alt: string;
  href: string;
}

export const articles: readonly ArticleItem[] = [
  {
    id: 1,
    title: "Merawat ruang kebersamaan",
    image: "/images/jamaah-masjid.webp",
    alt: "Suasana jamaah di ruang masjid, ilustrasi umum bukan dokumentasi acara tertentu",
    href: "/artikel/detail",
  },
  {
    id: 2,
    title: "Mengenal lingkungan masjid",
    image: "/images/masjid-udara.webp",
    alt: "Pemandangan Masjid Al-Kautsar dan lingkungan sekitar dari udara",
    href: "/artikel/detail?contoh=2",
  },
];

export const sampleArticleBody = [
  {
    text: "Ruang ibadah yang nyaman mengundang kita untuk menjaga kebersihan, ketenangan, dan sikap saling menghormati. Kebersamaan dapat dirawat melalui kebiasaan sederhana, mulai dari merapikan perlengkapan pribadi hingga memberi ruang bagi jamaah lain.",
  },
  {
    heading: "Dimulai dari hal sederhana",
    text: "Datang dengan tertib, memperhatikan kenyamanan sekitar, dan meninggalkan ruang dalam keadaan rapi merupakan contoh ajakan umum dalam naskah ilustratif ini. Arahan khusus masjid perlu mengikuti informasi dari pengurus.",
  },
  {
    heading: "Ruang bagi cerita warga",
    text: "Bagian ini disiapkan untuk naskah yang telah melalui proses penyuntingan. Kutipan, informasi kegiatan, dan dokumentasi akan dicantumkan hanya apabila sumbernya tersedia dan dapat dikonfirmasi.",
  },
];
