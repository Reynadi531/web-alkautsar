import type { AgendaEvent } from "./agenda";

export const seminarSample: AgendaEvent = {
  id: "ruang-belajar-bersama",
  title: "Ruang belajar bersama",
  category: "Agenda",
  schedule: "Tanggal belum ditetapkan · Waktu WIB belum dikonfirmasi",
  summary: "CONTOH KONTEN: bukan agenda aktif. Lokasi dan pendaftaran menunggu konfirmasi.",
  href: "/seminar/detail",
  image: {
    src: "/images/jamaah-masjid.webp",
    alt: "Suasana jamaah sebagai ilustrasi umum, bukan dokumentasi acara tertentu",
  },
  sample: true,
};
