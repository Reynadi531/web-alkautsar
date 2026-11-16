import { ArrowUpRight, FileText } from "lucide-react";
import { useMemo, useState } from "react";

import type { DocumentItem } from "../lib/dokumen";
import {
  ALL_PERIODS,
  categoryOptions,
  matchesPeriod,
  matchesQuery,
  periodOptions,
} from "../lib/site";
import { EmptyState } from "./empty-state";
import { SearchField, SelectField } from "./filter-controls";

const headingClass = "text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]";
/** Newest entries shown under the first heading; the rest form the archive. */
const HIGHLIGHT_COUNT = 2;

interface DocumentBrowserProps {
  label: string;
  items: readonly DocumentItem[];
  /** Name of the category select: "Kategori" or "Jenis". */
  filterLabel?: "Kategori" | "Jenis";
  featuredHeading?: string;
  archiveHeading?: string;
}

function DocumentCard({ item, label }: { item: DocumentItem; label: string }) {
  return (
    <article className="overflow-hidden rounded-[7px] border border-ak-line bg-white">
      <div className="relative flex h-[200px] flex-col items-start justify-end gap-3 bg-ak-pale p-4">
        {item.cover && (
          <img
            src={item.cover}
            alt=""
            width={640}
            height={400}
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
        )}
        {item.sample && (
          <span className="relative rounded-[3px] bg-ak-cream px-2 py-[5px] text-[9px] leading-[1.65] font-semibold text-ak-brown">
            CONTOH KONTEN
          </span>
        )}
        {!item.cover && (
          <>
            <FileText aria-hidden="true" className="size-7 text-primary" />
            <p className="text-[11px] leading-[1.65] font-semibold text-primary">
              PRATINJAU SAMPUL
            </p>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2.5 p-[22px]">
        <p className="text-[10px] leading-[1.65] font-semibold text-ak-brown uppercase">{label}</p>
        <h3 className="text-[19px] leading-[1.65] font-semibold text-ak-dark">{item.title}</h3>
        <p className="text-[11px] leading-[1.65] text-ak-muted">{item.metadata}</p>
        {item.summary && <p className="text-[13px] leading-[1.65] text-ak-muted">{item.summary}</p>}
        <a
          href={item.href}
          aria-label={`Lihat selengkapnya: ${item.title}`}
          className="flex min-h-12 items-center gap-2 text-xs font-semibold text-primary underline-offset-4 hover:underline"
        >
          <FileText aria-hidden="true" className="size-[17px] shrink-0" />
          Lihat selengkapnya
          <ArrowUpRight aria-hidden="true" className="size-[15px] shrink-0" />
        </a>
      </div>
    </article>
  );
}

export function DocumentBrowser({
  label,
  items,
  filterLabel = "Kategori",
  featuredHeading = `${label} pilihan`,
  archiveHeading = `Seluruh ${label.toLocaleLowerCase("id")}`,
}: DocumentBrowserProps) {
  const noun = label.toLocaleLowerCase("id");
  const allCategories = `Semua ${filterLabel.toLocaleLowerCase("id")}`;
  const categories = useMemo(
    () =>
      categoryOptions(
        allCategories,
        items.map((item) => item.category),
      ),
    [allCategories, items],
  );
  const periods = useMemo(() => periodOptions(items.map((item) => item.date)), [items]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(allCategories);
  const [period, setPeriod] = useState(ALL_PERIODS);

  const results = items.filter(
    (item) =>
      (category === allCategories || item.category === category) &&
      matchesPeriod(item.date, period) &&
      matchesQuery(query, item.title, item.summary, item.metadata, item.category),
  );
  const highlights = results.slice(0, HIGHLIGHT_COUNT);
  const archive = results.slice(HIGHLIGHT_COUNT);
  const isFiltering = query.trim() !== "" || category !== allCategories || period !== ALL_PERIODS;
  const hasOfficial = items.some((item) => !item.sample);

  function reset() {
    setQuery("");
    setCategory(allCategories);
    setPeriod(ALL_PERIODS);
  }

  return (
    <div className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
      <search
        aria-label={`Pencarian dan filter ${noun}`}
        className="flex flex-col gap-5 lg:flex-row lg:gap-7"
      >
        <SearchField value={query} onChange={setQuery} />
        <SelectField
          label={filterLabel}
          value={category}
          options={categories}
          onChange={setCategory}
        />
        <SelectField label="Periode" value={period} options={periods} onChange={setPeriod} />
      </search>
      {items.some((item) => item.sample) && (
        <p className="rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted">
          CONTOH KONTEN: judul, sampul, metadata, dan berkas bertanda contoh hanya memperlihatkan
          tampilan. Bukan dokumen resmi yang diterbitkan masjid.
        </p>
      )}
      <p role="status" className="sr-only">
        {isFiltering ? `${results.length} ${noun} ditemukan` : ""}
      </p>
      {(highlights.length > 0 || isFiltering) && (
        <section
          id={`${noun}-pilihan`}
          aria-labelledby={`${noun}-pilihan-title`}
          className="flex flex-col gap-7 lg:gap-9"
        >
          <h2 id={`${noun}-pilihan-title`} className={headingClass}>
            {featuredHeading}
          </h2>
          {highlights.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:gap-7">
              {highlights.map((item) => (
                <DocumentCard key={item.id} item={item} label={label} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <EmptyState
                title="Tidak ada hasil yang cocok"
                description={`Coba kata kunci lain, atau atur ulang filter ${noun}.`}
              />
              <button
                type="button"
                onClick={reset}
                className="min-h-12 self-start rounded-[5px] border border-ak-field px-[18px] text-xs font-semibold text-primary hover:bg-ak-pale"
              >
                Atur ulang filter
              </button>
            </div>
          )}
        </section>
      )}
      {(archive.length > 0 || !hasOfficial) && (
        <section
          id={`seluruh-${noun}`}
          aria-labelledby={`seluruh-${noun}-title`}
          className="flex flex-col gap-7 lg:gap-9"
        >
          <h2 id={`seluruh-${noun}-title`} className={headingClass}>
            {archiveHeading}
          </h2>
          {archive.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:gap-7">
              {archive.map((item) => (
                <DocumentCard key={item.id} item={item} label={label} />
              ))}
            </div>
          ) : (
            <EmptyState
              title={`Belum ada ${noun} resmi`}
              description="Katalog dan arsip akan terisi setelah metadata serta berkas diberikan."
            />
          )}
        </section>
      )}
    </div>
  );
}
