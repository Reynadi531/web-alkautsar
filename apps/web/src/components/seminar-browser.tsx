import { Archive, ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { archiveEntries } from "../lib/agenda";
import { seminarSample } from "../lib/seminar";
import { AgendaCard } from "./agenda/agenda-card";
import { EmptyState } from "./empty-state";
import { SearchField, SelectField } from "./filter-controls";

const heading = "text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]";
const themes = ["Semua tema", ...archiveEntries.map((entry) => entry.title)];
const periods = ["Periode: semua", "Tanggal belum ditetapkan"];

export function SeminarBrowser() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState(themes[0]!);
  const [period, setPeriod] = useState(periods[0]!);
  const search = query.trim().toLocaleLowerCase("id");
  const showSample =
    theme === themes[0] &&
    `${seminarSample.title} ${seminarSample.summary} ${seminarSample.schedule}`
      .toLocaleLowerCase("id")
      .includes(search);
  const archives = archiveEntries.filter(
    (entry) =>
      period === periods[0] &&
      (theme === themes[0] || theme === entry.title) &&
      `${entry.title} ${entry.status}`.toLocaleLowerCase("id").includes(search),
  );
  const filtering = Boolean(search) || theme !== themes[0] || period !== periods[0];
  const resultCount = Number(showSample) + archives.length;

  return (
    <div className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
      <search
        aria-label="Pencarian dan filter seminar"
        className="flex flex-col gap-5 lg:flex-row lg:gap-7"
      >
        <SearchField value={query} onChange={setQuery} />
        <SelectField label="Tema" value={theme} options={themes} onChange={setTheme} />
        <SelectField label="Periode" value={period} options={periods} onChange={setPeriod} />
      </search>
      <p role="status" className="sr-only">
        {filtering ? `${resultCount} hasil ditemukan` : ""}
      </p>
      {resultCount === 0 && (
        <div className="flex flex-col items-start gap-4">
          <div className="w-full">
            <EmptyState
              title="Tidak ada hasil yang cocok"
              description="Coba kata kunci lain, atau ubah tema dan periode."
            />
          </div>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setTheme(themes[0]!);
              setPeriod(periods[0]!);
            }}
            className="min-h-12 rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale"
          >
            Atur ulang pencarian
          </button>
        </div>
      )}
      {(showSample || !filtering) && (
        <section aria-labelledby="seminar-unggulan" className="flex flex-col gap-7 lg:gap-9">
          <h2 id="seminar-unggulan" className={heading}>
            Seminar unggulan
          </h2>
          <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:gap-7">
            {showSample && <AgendaCard event={seminarSample} priority />}
            <div className="flex flex-col items-start gap-[18px]">
              <h2 className={heading}>Seminar mendatang</h2>
              <div className="w-full">
                <EmptyState
                  title="Belum ada agenda terkonfirmasi"
                  description="Belum ada tanggal, narasumber, atau pendaftaran aktif yang dapat ditampilkan."
                />
              </div>
              <a
                href="/agenda"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale"
              >
                Lihat agenda lainnya <ArrowUpRight aria-hidden="true" className="size-[15px]" />
              </a>
            </div>
          </div>
        </section>
      )}
      {archives.length > 0 && (
        <section aria-labelledby="arsip-kegiatan" className="flex flex-col gap-7 lg:gap-9">
          <h2 id="arsip-kegiatan" className={heading}>
            Arsip kegiatan
          </h2>
          <p className="rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted">
            ARSIP: kategori berikut berasal dari beranda existing. Rincian tanggal, dokumentasi, dan
            narasumber belum diberikan.
          </p>
          <ul className="flex flex-col gap-7 lg:gap-9">
            {archives.map((entry) => (
              <li
                key={entry.id}
                className="flex items-center gap-4 rounded-[5px] bg-ak-cream px-5 py-4"
              >
                <Archive aria-hidden="true" className="size-5 shrink-0 text-primary" />
                <p className="min-w-0 flex-1 text-base leading-[1.65] font-semibold text-ak-dark">
                  {entry.title}
                </p>
                <p className="w-[100px] shrink-0 text-[11px] leading-[1.65] text-ak-brown sm:w-[200px]">
                  {entry.status}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
