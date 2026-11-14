import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";

import { EmptyState } from "../components/empty-state";
import { PageHeader } from "../components/page-header";
import { navGroups, site } from "../lib/site";

export const Route = createFileRoute("/pencarian")({
  validateSearch: (search: Record<string, unknown>) => ({
    q:
      search.reset === 1 || search.reset === "1"
        ? ""
        : typeof search.q === "string"
          ? search.q.trim()
          : "",
  }),
  head: () => ({
    meta: [
      { title: `Hasil Pencarian | ${site.name}` },
      { name: "description", content: "Temukan agenda, kabar, dan bahan bacaan masjid." },
    ],
  }),
  component: SearchPage,
});

const publishedPages = [
  { label: "Beranda", href: "/", keywords: `${site.name} ${site.area}` },
  ...navGroups.flatMap((group) =>
    group.items
      .filter((item) => !item.unavailable && item.href !== "/pencarian")
      .map((item) => ({
        label: item.label,
        href: item.href,
        keywords: item.href === "/kontak" ? `${site.street} ${site.fullAddress}` : "",
      })),
  ),
];

const actionClass =
  "flex min-h-12 items-center justify-center gap-2.5 self-start rounded-[5px] border px-[18px] text-[13px] font-semibold transition-colors";

function SearchPage() {
  const { q } = Route.useSearch();
  const words = q.toLocaleLowerCase("id").split(/\s+/).filter(Boolean);
  const results = words.length
    ? publishedPages.filter((item) => {
        const text = `${item.label} ${item.keywords}`.toLocaleLowerCase("id");
        return words.every((word) => text.includes(word));
      })
    : [];

  return (
    <div className="article-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Hasil Pencarian" }]}
        label={q && results.length === 0 ? "Pencarian / Tanpa hasil" : "Pencarian"}
        title="Hasil Pencarian"
        intro="Temukan agenda, kabar, dan bahan bacaan masjid."
      />
      <section
        id="hasil-pencarian"
        aria-label="Pencarian situs"
        className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16"
      >
        <form
          action="/pencarian"
          method="get"
          role="search"
          className="flex flex-col gap-5 sm:flex-row sm:items-end lg:gap-7"
        >
          <div className="relative min-w-0 flex-1">
            <label htmlFor="kata-kunci" className="sr-only">
              Kata kunci pencarian
            </label>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-primary"
            />
            <input
              key={q}
              id="kata-kunci"
              name="q"
              type="search"
              defaultValue={q}
              placeholder="Cari informasi…"
              className="h-12 w-full rounded-[5px] border border-ak-field bg-white pr-4 pl-[46px] text-[13px] text-ak-dark outline-none placeholder:text-ak-muted focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
          <button
            type="submit"
            className={`${actionClass} border-primary bg-primary text-white hover:bg-ak-dark`}
          >
            Cari <ArrowUpRight aria-hidden="true" className="size-[15px]" />
          </button>
        </form>

        <p role="status" className="text-lg leading-[1.65] font-semibold break-words text-ak-dark">
          {q
            ? `${results.length} hasil untuk “${q}”`
            : "Masukkan kata kunci untuk mencari informasi masjid."}
        </p>

        {results.length > 0 ? (
          <ul className="divide-y divide-ak-line rounded-[7px] border border-ak-line">
            {results.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex min-h-16 items-center justify-between gap-4 rounded-[5px] px-5 py-4 text-sm font-semibold text-primary hover:bg-ak-pale"
                >
                  {item.label}
                  <ArrowUpRight aria-hidden="true" className="size-[15px] shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            title={q ? "Pencarian belum menemukan hasil" : "Cari informasi masjid"}
            description={
              q
                ? "Coba kata kunci yang lebih singkat atau hapus filter pencarian."
                : "Ketik kata kunci, lalu pilih Cari. Misalnya: agenda, pustaka, atau lokasi."
            }
          />
        )}

        <div className="flex flex-col gap-5 sm:flex-row lg:gap-7">
          <a
            href="/pencarian?reset=1"
            className={`${actionClass} border-ak-field text-primary hover:bg-ak-pale`}
          >
            Hapus pencarian <ArrowUpRight aria-hidden="true" className="size-[15px]" />
          </a>
          <a
            href="/agenda"
            className={`${actionClass} border-primary bg-primary text-white hover:bg-ak-dark`}
          >
            Lihat semua agenda <ArrowUpRight aria-hidden="true" className="size-[15px]" />
          </a>
        </div>
        <p className="rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted">
          {q && results.length === 0 ? "Kondisi tanpa hasil. " : ""}Pencarian menggunakan konten
          terbit; data yang belum dikonfirmasi tidak dianggap hasil pencarian.
        </p>
      </section>
    </div>
  );
}
