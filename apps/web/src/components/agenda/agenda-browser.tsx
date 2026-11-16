import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";

import {
  ARCHIVE_PAGE_SIZE,
  agendaCategories,
  filterAgenda,
  type AgendaEvent,
  type ArchiveEntry,
} from "../../lib/agenda";
import { ALL_PERIODS, periodOptions } from "../../lib/site";
import { ArchiveList } from "../archive-list";
import { EmptyState } from "../empty-state";
import { SearchField, SelectField } from "../filter-controls";
import { Pagination } from "../pagination";
import { AgendaCard } from "./agenda-card";

const sectionTitle = "text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]";

export function AgendaBrowser({
  events,
  archive: archiveEntries,
}: {
  events: readonly AgendaEvent[];
  archive: readonly ArchiveEntry[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(agendaCategories[0]);
  const [period, setPeriod] = useState<string>(ALL_PERIODS);
  const [page, setPage] = useState(1);
  const periods = useMemo(
    () => periodOptions([...events, ...archiveEntries].map((item) => item.date)),
    [events, archiveEntries],
  );

  const { featured, upcoming, archive, isFiltering } = filterAgenda(events, archiveEntries, {
    query,
    category,
    period,
  });
  const hasAgenda = featured.length > 0 || upcoming.length > 0;
  const showAgenda = category !== "Arsip";
  const showArchive = category !== "Agenda";
  const hasResults = hasAgenda || archive.length > 0;

  const pageCount = Math.max(1, Math.ceil(archive.length / ARCHIVE_PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const archivePage = archive.slice(
    (currentPage - 1) * ARCHIVE_PAGE_SIZE,
    currentPage * ARCHIVE_PAGE_SIZE,
  );

  const reset =
    <T,>(setter: (value: T) => void) =>
    (value: T) => {
      setter(value);
      setPage(1);
    };

  return (
    <div className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
      <search
        aria-label="Pencarian dan filter"
        className="flex flex-col gap-5 lg:flex-row lg:gap-7"
      >
        <SearchField value={query} onChange={reset(setQuery)} />
        <SelectField
          label="Kategori"
          value={category}
          options={agendaCategories}
          onChange={reset(setCategory)}
        />
        <SelectField label="Periode" value={period} options={periods} onChange={reset(setPeriod)} />
      </search>

      <p role="status" className="sr-only">
        {isFiltering ? `${featured.length + upcoming.length + archive.length} hasil ditemukan` : ""}
      </p>

      {!hasResults && (
        <EmptyState
          title="Tidak ada hasil yang cocok"
          description="Coba kata kunci lain, atau ubah kategori dan periode."
        />
      )}

      {showAgenda && (hasAgenda || !isFiltering) && (
        <section id="agenda" aria-label="Agenda" className="flex flex-col gap-7 lg:gap-9">
          {featured.length > 0 && <h2 className={sectionTitle}>Agenda unggulan</h2>}
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-7">
            {featured.length > 0 && (
              <div className="flex flex-col gap-5">
                {featured.map((event) => (
                  <AgendaCard key={event.id} event={event} />
                ))}
              </div>
            )}
            <div className="flex flex-col items-start gap-[18px] lg:col-start-2 lg:row-start-1">
              <h2 className={`${sectionTitle} self-stretch`}>Agenda mendatang</h2>
              {upcoming.length > 0 ? (
                <div className="flex w-full flex-col gap-5">
                  {upcoming.map((event) => (
                    <AgendaCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="w-full">
                  <EmptyState
                    title="Belum ada agenda terkonfirmasi"
                    description="Belum ada tanggal, narasumber, atau pendaftaran aktif yang dapat ditampilkan."
                  />
                </div>
              )}
              <a href="/seminar" className={buttonVariants({ variant: "outline", size: "lg" })}>
                Lihat seminar
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      )}

      {showArchive && archive.length > 0 && (
        <section id="arsip" aria-label="Arsip kegiatan" className="flex flex-col gap-4">
          <h2 className={`${sectionTitle} mb-3`}>Arsip kegiatan</h2>
          <ArchiveList entries={archivePage} className="flex flex-col gap-4" />
          <Pagination
            page={currentPage}
            pageCount={pageCount}
            onPageChange={setPage}
            label="Halaman arsip"
          />
        </section>
      )}
    </div>
  );
}
