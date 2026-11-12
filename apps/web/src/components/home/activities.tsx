import { BookOpen, CalendarDays } from "lucide-react";

import { SectionLabel } from "../section-label";

const archive = ["Kajian keislaman", "Pemuda & Ramadan", "Kegiatan UPZ"] as const;

export function Activities() {
  return (
    <section
      id="kegiatan"
      className="flex flex-col gap-7 bg-white px-[26px] py-14 lg:px-19 lg:py-[84px]"
    >
      <div className="flex flex-col gap-3">
        <SectionLabel>Kegiatan &amp; Pengumuman</SectionLabel>
        <h2 className="text-[25px] leading-[1.6] font-bold text-ak-dark lg:text-[34px]">
          Kabar dari lingkungan masjid.
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-[18px] rounded-lg bg-ak-pale p-7">
          <div className="flex items-center gap-4">
            <h3 className="flex-1 text-xl leading-[1.6] font-bold text-ak-dark">Agenda kegiatan</h3>
            <span className="rounded-full bg-ak-chip px-2 py-1 text-[9px] text-ak-chip-text">
              CONTOH TAMPILAN
            </span>
          </div>
          <p className="text-[13px] leading-[1.6] text-ak-muted">
            Agenda mendatang belum dikonfirmasi. Informasi kegiatan akan diperbarui setelah
            tersedia.
          </p>
          <div className="flex flex-col gap-2.5 rounded-[5px] bg-white p-5">
            <CalendarDays aria-hidden="true" className="size-5 text-ak-icon" />
            <p className="text-sm leading-[1.6] font-semibold text-ak-dark">
              Agenda mendatang belum tersedia.
            </p>
            <p className="text-xs leading-[1.6] text-ak-body">
              Belum ada tanggal atau rincian kegiatan yang dapat ditampilkan.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-lg bg-ak-cream p-7">
          <div className="flex items-center gap-3">
            <h3 className="flex-1 text-xl leading-[1.6] font-bold text-ak-dark">Jejak kegiatan</h3>
            <span className="text-[10px] text-ak-brown">ARSIP</span>
          </div>
          <p className="text-[13px] leading-[1.6] text-ak-muted">
            Rekam kegiatan di lingkungan masjid.
          </p>
          <ul className="flex flex-col">
            {archive.map((name) => (
              <li
                key={name}
                className="flex items-center gap-3 rounded-sm border-b border-ak-line p-3.5"
              >
                <BookOpen aria-hidden="true" className="size-[19px] shrink-0 text-ak-icon" />
                <span className="text-[13px] font-semibold text-ak-dark">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
