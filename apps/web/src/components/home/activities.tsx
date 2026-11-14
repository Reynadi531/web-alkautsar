import { BookOpen, CalendarDays } from "lucide-react";

import { SectionLabel } from "../section-label";

const archive = ["Kajian keislaman", "Pemuda & Ramadan", "Kegiatan UPZ"] as const;

export function Activities() {
  return (
    <section
      id="kegiatan"
      className="flex min-h-[750px] flex-col gap-[18px] bg-white px-[26px] pt-9 pb-10 lg:min-h-[665px] lg:gap-7 lg:px-19 lg:py-[84px]"
    >
      <div className="flex flex-col gap-[18px] lg:gap-3">
        <SectionLabel className="text-[9px] tracking-[1.3px] lg:text-[11px]">
          Kegiatan &amp; Pengumuman
        </SectionLabel>
        <h2 className="text-[25px] leading-[1.6] font-bold text-ak-dark lg:text-[34px]">
          <span className="lg:hidden">
            Yang sedang berlangsung
            <br />
            di sekitar kita.
          </span>
          <span className="hidden lg:inline">Kabar dari lingkungan masjid.</span>
        </h2>
        <p className="text-xs leading-[1.6] text-ak-muted lg:hidden">
          Informasi agenda dan jejak kegiatan di lingkungan Masjid Al-Kautsar Pharmindo.
        </p>
      </div>

      <div className="grid gap-[18px] lg:min-h-[364px] lg:grid-cols-2 lg:gap-6">
        <div className="flex flex-col gap-3 rounded-[6px] bg-ak-pale p-[22px] lg:gap-[18px] lg:p-7">
          <div className="hidden items-center gap-4 lg:flex">
            <h3 className="flex-1 text-xl leading-[1.6] font-bold text-ak-dark">Agenda kegiatan</h3>
            <span className="rounded-full bg-ak-chip px-2 py-1 text-[9px] text-ak-chip-text">
              CONTOH TAMPILAN
            </span>
          </div>
          <p className="hidden text-[13px] leading-[1.6] text-ak-muted lg:block">
            Agenda mendatang belum dikonfirmasi. Informasi kegiatan akan diperbarui setelah
            tersedia.
          </p>
          <div className="flex flex-col gap-3 lg:gap-2.5 lg:rounded-[5px] lg:bg-white lg:p-5">
            <CalendarDays aria-hidden="true" className="size-6 text-ak-icon lg:size-5" />
            <p className="text-base leading-[1.6] font-semibold text-ak-dark lg:text-sm">
              Agenda mendatang belum tersedia.
            </p>
            <p className="text-xs leading-[1.6] text-ak-muted">
              <span className="lg:hidden">
                Agenda mendatang belum dikonfirmasi. Informasi akan diperbarui setelah tersedia.
              </span>
              <span className="hidden lg:inline">
                Belum ada tanggal atau rincian kegiatan yang dapat ditampilkan.
              </span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[18px] pt-2 lg:gap-4 lg:rounded-lg lg:bg-ak-cream lg:p-7">
          <div className="flex items-center gap-3">
            <h3 className="flex-1 text-[17px] leading-[1.6] font-bold text-ak-dark lg:text-xl">
              Jejak kegiatan
            </h3>
            <span className="text-[9px] text-ak-brown lg:text-[10px]">ARSIP</span>
          </div>
          <p className="-mt-2.5 text-[11px] leading-[1.6] text-ak-muted lg:mt-0 lg:text-[13px]">
            Rekam kegiatan di lingkungan masjid.
          </p>
          <ul className="flex flex-col gap-[18px] lg:gap-0">
            {archive.map((name) => (
              <li
                key={name}
                className="flex items-center gap-3 rounded-sm bg-ak-mist px-3 py-4 lg:border-b lg:border-ak-line lg:bg-transparent lg:p-3.5"
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
