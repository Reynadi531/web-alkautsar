import { ArrowUpRight, Newspaper } from "lucide-react";
import { useMemo, useState } from "react";

import {
  ALL_PERIODS,
  categoryOptions,
  matchesPeriod,
  matchesQuery,
  periodOptions,
} from "../lib/site";
import { articleByline, type ArticleItem } from "../lib/tulisan";
import { EmptyState } from "./empty-state";
import { SearchField, SelectField } from "./filter-controls";
import { SectionLabel } from "./section-label";

const titleClass = "text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]";
const ALL_CATEGORIES = "Semua kategori";

export function EditorialCard({ article, label }: { article: ArticleItem; label: string }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[7px] border border-ak-line bg-white">
      <div className="relative flex h-[185px] items-end bg-ak-cream p-4">
        {article.image && (
          <img
            src={article.image}
            alt={article.alt}
            width={1200}
            height={540}
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
        )}
        {article.sample && (
          <span className="relative rounded-[3px] bg-ak-cream px-2 py-[5px] text-[9px] leading-[1.65] font-semibold text-ak-brown">
            CONTOH KONTEN
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2.5 p-[22px]">
        <p className="text-[10px] leading-[1.65] font-semibold text-ak-brown uppercase">{label}</p>
        <h3 className="text-[19px] leading-[1.65] font-semibold text-ak-dark">
          <a
            href={article.href}
            className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            {article.title}
          </a>
        </h3>
        <p className="text-[11px] leading-[1.65] text-ak-muted">{articleByline(article)}</p>
        {article.summary && (
          <p className="text-[13px] leading-[1.65] text-ak-muted">{article.summary}</p>
        )}
        <div
          aria-hidden="true"
          className="flex h-12 items-center gap-2 text-xs font-semibold text-primary group-hover:underline"
        >
          <Newspaper className="size-[17px]" />
          <span>Lihat selengkapnya ↗</span>
        </div>
      </div>
    </article>
  );
}

export function EditorialBrowser({
  items,
  label,
  featuredTitle,
  latestTitle,
}: {
  items: readonly ArticleItem[];
  label: "Artikel" | "Berita" | "Kolom";
  featuredTitle: string;
  latestTitle: string;
}) {
  const noun = label.toLocaleLowerCase("id");
  const categories = useMemo(
    () =>
      categoryOptions(
        ALL_CATEGORIES,
        items.map((article) => article.category),
      ),
    [items],
  );
  const periods = useMemo(() => periodOptions(items.map((article) => article.date)), [items]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [period, setPeriod] = useState(ALL_PERIODS);

  const results = items.filter(
    (article) =>
      (category === ALL_CATEGORIES || article.category === category) &&
      matchesPeriod(article.date, period) &&
      matchesQuery(query, article.title, article.summary, article.author, article.category),
  );
  const featured = results.find((article) => article.featured) ?? results[0];
  const isFiltering = query.trim() !== "" || category !== ALL_CATEGORIES || period !== ALL_PERIODS;
  const hasOfficial = items.some((article) => !article.sample);

  return (
    <div className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
      <search aria-label={`Cari ${noun}`} className="flex flex-col gap-5 lg:flex-row lg:gap-7">
        <SearchField value={query} onChange={setQuery} />
        <SelectField
          label={`Kategori ${noun}`}
          value={category}
          options={categories}
          onChange={setCategory}
        />
        <SelectField
          label={`Periode ${noun}`}
          value={period}
          options={periods}
          onChange={setPeriod}
        />
      </search>
      <p role="status" className="sr-only">
        {isFiltering ? `${results.length} ${noun} ditemukan` : ""}
      </p>
      {results.length === 0 && items.length > 0 && (
        <EmptyState
          title={`Tidak ada ${noun} yang sesuai`}
          description="Coba kata kunci lain, atau ubah kategori dan periode."
        />
      )}
      {featured && (
        <>
          <section
            id={`${noun}-pilihan`}
            aria-labelledby="judul-pilihan"
            className="flex flex-col gap-7 lg:gap-9"
          >
            <h2 id="judul-pilihan" className={titleClass}>
              {featuredTitle}
            </h2>
            <div className="grid gap-5 lg:grid-cols-2 lg:gap-7">
              {featured.image && (
                <img
                  src={featured.image}
                  alt={featured.alt}
                  width={1200}
                  height={680}
                  fetchPriority="high"
                  className="h-[230px] w-full rounded-[7px] object-cover lg:h-[340px]"
                />
              )}
              <div className="flex flex-col items-start gap-[18px] rounded-[7px] bg-ak-cream p-6">
                <SectionLabel>
                  {featured.sample ? "CONTOH KONTEN · " : ""}
                  {label.toUpperCase()}
                </SectionLabel>
                <h3 className={titleClass}>{featured.title}</h3>
                <p className="text-xs leading-[1.65] text-ak-muted">{articleByline(featured)}</p>
                {featured.summary && (
                  <p className="text-sm leading-[1.65] text-ak-muted">{featured.summary}</p>
                )}
                <a
                  href={featured.href}
                  className="inline-flex min-h-12 items-center gap-2.5 rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Baca selengkapnya <ArrowUpRight aria-hidden="true" className="size-[15px]" />
                </a>
              </div>
            </div>
          </section>
          <section
            id={`${noun}-lainnya`}
            aria-labelledby="judul-lainnya"
            className="flex flex-col gap-7 lg:gap-9"
          >
            <h2 id="judul-lainnya" className={titleClass}>
              {latestTitle}
            </h2>
            <div className="grid gap-5 md:grid-cols-2 lg:gap-7">
              {results.map((article) => (
                <EditorialCard key={article.id} article={article} label={label} />
              ))}
            </div>
          </section>
        </>
      )}
      {!isFiltering && !hasOfficial && (
        <EmptyState
          title={`Belum ada ${noun} resmi`}
          description={
            items.length > 0
              ? "Keadaan data kosong saat belum ada naskah terkonfirmasi. Kartu di atas hanya contoh konten."
              : "Naskah akan ditampilkan setelah diterbitkan oleh pengurus."
          }
        />
      )}
    </div>
  );
}
