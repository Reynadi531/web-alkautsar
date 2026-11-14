import { ArrowUpRight, FileText } from "lucide-react";
import { useState } from "react";

import { pustaka } from "../lib/pustaka";
import { EmptyState } from "./empty-state";
import { SearchField, SelectField } from "./filter-controls";

const categories = ["Semua kategori", "Pustaka"];
const periods = ["Periode: semua", "Tanggal belum dikonfirmasi"];
const headingClass = "text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]";

export function PustakaBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categories[0]!);
  const [period, setPeriod] = useState(periods[0]!);
  const normalized = query.trim().toLocaleLowerCase("id");
  const results = pustaka.filter((item) =>
    `${item.title} Pustaka Contoh konten Penulis belum diberikan Tanggal belum dikonfirmasi`
      .toLocaleLowerCase("id")
      .includes(normalized),
  );
  const isFiltering = normalized !== "" || category !== categories[0] || period !== periods[0];

  function reset() {
    setQuery("");
    setCategory(categories[0]!);
    setPeriod(periods[0]!);
  }

  return (
    <div className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
      <search
        aria-label="Pencarian dan filter pustaka"
        className="flex flex-col gap-5 lg:flex-row lg:gap-7"
      >
        <SearchField value={query} onChange={setQuery} />
        <SelectField
          label="Kategori"
          value={category}
          options={categories}
          onChange={setCategory}
        />
        <SelectField label="Periode" value={period} options={periods} onChange={setPeriod} />
      </search>
      <p className="rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted">
        CONTOH KONTEN: judul, sampul, metadata, dan berkas berikut hanya contoh tampilan. Tidak ada
        dokumen resmi yang diterbitkan melalui desain ini.
      </p>
      <p role="status" className="sr-only">
        {isFiltering ? `${results.length} pustaka ditemukan` : ""}
      </p>
      <section
        id="pustaka-pilihan"
        aria-labelledby="pustaka-pilihan-title"
        className="flex flex-col gap-7 lg:gap-9"
      >
        <h2 id="pustaka-pilihan-title" className={headingClass}>
          Pustaka pilihan
        </h2>
        {results.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:gap-7">
            {results.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-[7px] border border-ak-line bg-white"
              >
                <div className="flex h-[200px] flex-col items-start justify-end gap-3 bg-ak-pale p-4">
                  <span className="rounded-[3px] bg-ak-cream px-2 py-[5px] text-[9px] leading-[1.65] font-semibold text-ak-brown">
                    CONTOH KONTEN
                  </span>
                  <FileText aria-hidden="true" className="size-7 text-primary" />
                  <p className="text-[11px] leading-[1.65] font-semibold text-primary">
                    PRATINJAU SAMPUL
                  </p>
                </div>
                <div className="flex flex-col gap-2.5 p-[22px]">
                  <p className="text-[10px] leading-[1.65] font-semibold text-ak-brown">PUSTAKA</p>
                  <h3 className="text-[19px] leading-[1.65] font-semibold text-ak-dark">
                    {item.title}
                  </h3>
                  <p className="text-[11px] leading-[1.65] text-ak-muted">
                    Penulis: belum diberikan
                  </p>
                  <p className="text-[13px] leading-[1.65] text-ak-muted">
                    Contoh konten: ringkasan bacaan menunggu naskah yang disetujui.
                  </p>
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
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <EmptyState
              title="Tidak ada hasil yang cocok"
              description="Coba kata kunci lain, atau atur ulang filter pustaka."
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
      <section
        id="seluruh-pustaka"
        aria-labelledby="seluruh-pustaka-title"
        className="flex flex-col gap-7 lg:gap-9"
      >
        <h2 id="seluruh-pustaka-title" className={headingClass}>
          Seluruh pustaka
        </h2>
        <EmptyState
          title="Belum ada pustaka resmi"
          description="Katalog dan arsip akan terisi setelah metadata serta berkas diberikan."
        />
      </section>
    </div>
  );
}
