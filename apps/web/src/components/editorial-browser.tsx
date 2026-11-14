import { ArrowUpRight, Newspaper } from "lucide-react";
import { useState } from "react";

import { type ArticleItem } from "../lib/artikel";
import { EmptyState } from "./empty-state";
import { SearchField, SelectField } from "./filter-controls";
import { SectionLabel } from "./section-label";

const titleClass = "text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]";
const periods = ["Periode: semua", "Tanggal belum dikonfirmasi"];

function EditorialCard({ article, label }: { article: ArticleItem; label: string }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[7px] border border-ak-line bg-white">
      <div className="relative flex h-[185px] items-end bg-ak-cream p-4">
        <img
          src={article.image}
          alt={article.alt}
          width={1200}
          height={540}
          loading="lazy"
          className={`absolute inset-0 size-full object-cover ${article.id === 2 ? "lg:object-contain" : ""}`}
        />
        <span className="relative rounded-[3px] bg-ak-cream px-2 py-[5px] text-[9px] leading-[1.65] font-semibold text-ak-brown">
          CONTOH KONTEN
        </span>
      </div>
      <div className="flex flex-col gap-2.5 p-[22px]">
        <p className="text-[10px] leading-[1.65] font-semibold text-ak-brown">{label}</p>
        <h3 className="text-[19px] leading-[1.65] font-semibold text-ak-dark">
          <a
            href={article.href}
            className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            {article.title}
          </a>
        </h3>
        <p className="text-[11px] leading-[1.65] text-ak-muted">
          Penulis · tanggal belum dikonfirmasi
        </p>
        <p className="text-[13px] leading-[1.65] text-ak-muted">
          Contoh konten, bukan informasi atau publikasi resmi.
        </p>
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
  label: "Artikel" | "Berita";
  featuredTitle: string;
  latestTitle: string;
}) {
  const categories = ["Semua kategori", label];
  const noun = label.toLocaleLowerCase("id");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categories[0]!);
  const [period, setPeriod] = useState(periods[0]!);
  const normalized = query.trim().toLocaleLowerCase("id");
  const results = items.filter((article) =>
    `${article.title} ${label} Contoh konten Penulis tanggal belum dikonfirmasi`
      .toLocaleLowerCase("id")
      .includes(normalized),
  );
  const featured = results.find((article) => article.id === 1);
  const isFiltering = normalized !== "" || category !== categories[0] || period !== periods[0];

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
      {results.length === 0 ? (
        <EmptyState
          title={`Tidak ada ${noun} yang sesuai`}
          description={`Coba kata kunci lain atau hapus pencarian untuk melihat contoh ${noun}.`}
        />
      ) : (
        <>
          {featured && (
            <section
              id={`${noun}-pilihan`}
              aria-labelledby="judul-pilihan"
              className="flex flex-col gap-7 lg:gap-9"
            >
              <h2 id="judul-pilihan" className={titleClass}>
                {featuredTitle}
              </h2>
              <div className="grid gap-5 lg:grid-cols-2 lg:gap-7">
                <img
                  src={featured.image}
                  alt={featured.alt}
                  width={1200}
                  height={680}
                  fetchPriority="high"
                  className="h-[230px] w-full rounded-[7px] object-cover lg:h-[340px]"
                />
                <div className="flex flex-col items-start gap-[18px] rounded-[7px] bg-ak-cream p-6">
                  <SectionLabel>CONTOH KONTEN · {label.toUpperCase()}</SectionLabel>
                  <h3 className={titleClass}>{featured.title}</h3>
                  <p className="text-xs leading-[1.65] text-ak-muted">
                    Tanggal terbit dan penulis belum diberikan
                  </p>
                  <p className="text-sm leading-[1.65] text-ak-muted">
                    Contoh tata letak {noun}. Naskah ini belum menjadi publikasi resmi masjid.
                  </p>
                  <a
                    href={featured.href}
                    className="inline-flex min-h-12 items-center gap-2.5 rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                  >
                    Baca selengkapnya <ArrowUpRight aria-hidden="true" className="size-[15px]" />
                  </a>
                </div>
              </div>
            </section>
          )}
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
                <EditorialCard key={article.id} article={article} label={label.toUpperCase()} />
              ))}
            </div>
          </section>
        </>
      )}
      {!isFiltering && (
        <EmptyState
          title={`Belum ada ${noun} resmi`}
          description="Keadaan data kosong saat belum ada naskah terkonfirmasi. Kartu di atas hanya contoh konten."
        />
      )}
    </div>
  );
}
