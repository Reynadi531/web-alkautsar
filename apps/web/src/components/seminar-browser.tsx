import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";

import type { AgendaEvent, ArchiveEntry } from "../lib/agenda";
import {
  ALL_PERIODS,
  categoryOptions,
  matchesPeriod,
  matchesQuery,
  periodOptions,
} from "../lib/site";
import { AgendaCard } from "./agenda/agenda-card";
import { ArchiveList } from "./archive-list";
import { EmptyState } from "./empty-state";
import { SearchField, SelectField } from "./filter-controls";

const heading = "text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]";
const ALL_THEMES = "Semua tema";

export function SeminarBrowser({
  events,
  archive,
}: {
  events: readonly AgendaEvent[];
  archive: readonly ArchiveEntry[];
}) {
  const themes = useMemo(
    () =>
      categoryOptions(ALL_THEMES, [
        ...events.map((event) => event.theme),
        ...archive.map((entry) => entry.title),
      ]),
    [events, archive],
  );
  const periods = useMemo(
    () => periodOptions([...events, ...archive].map((item) => item.date)),
    [events, archive],
  );
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState(ALL_THEMES);
  const [period, setPeriod] = useState(ALL_PERIODS);

  const seminars = events.filter(
    (event) =>
      (theme === ALL_THEMES || event.theme === theme) &&
      matchesPeriod(event.date, period) &&
      matchesQuery(query, event.title, event.summary, event.schedule),
  );
  const archives = archive.filter(
    (entry) =>
      (theme === ALL_THEMES || entry.title === theme) &&
      matchesPeriod(entry.date, period) &&
      matchesQuery(query, entry.title, entry.status),
  );
  const featured = seminars.find((event) => event.featured) ?? seminars[0];
  const upcoming = seminars.filter((event) => event !== featured);
  const filtering = query.trim() !== "" || theme !== ALL_THEMES || period !== ALL_PERIODS;
  const resultCount = seminars.length + archives.length;

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
      {filtering && resultCount === 0 && (
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
              setTheme(ALL_THEMES);
              setPeriod(ALL_PERIODS);
            }}
            className="min-h-12 rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale"
          >
            Atur ulang pencarian
          </button>
        </div>
      )}
      {(featured || !filtering) && (
        <section aria-labelledby="seminar-unggulan" className="flex flex-col gap-7 lg:gap-9">
          <h2 id="seminar-unggulan" className={heading}>
            Seminar unggulan
          </h2>
          <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:gap-7">
            {featured && <AgendaCard event={featured} priority />}
            <div className="flex flex-col items-start gap-[18px]">
              <h2 className={heading}>Seminar mendatang</h2>
              <div className="flex w-full flex-col gap-5">
                {upcoming.length > 0 ? (
                  upcoming.map((event) => <AgendaCard key={event.id} event={event} />)
                ) : (
                  <EmptyState
                    title="Belum ada agenda terkonfirmasi"
                    description="Belum ada tanggal, narasumber, atau pendaftaran aktif yang dapat ditampilkan."
                  />
                )}
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
            ARSIP: rekam kegiatan di lingkungan masjid. Rincian tanggal, dokumentasi, dan narasumber
            ditampilkan apabila sudah diberikan.
          </p>
          <ArchiveList entries={archives} className="flex flex-col gap-7 lg:gap-9" />
        </section>
      )}
    </div>
  );
}
