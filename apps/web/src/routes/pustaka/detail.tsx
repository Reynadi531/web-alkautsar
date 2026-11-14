import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, BookOpen, FileText } from "lucide-react";

import { PageHeader } from "../../components/page-header";
import { SectionLabel } from "../../components/section-label";
import { pustaka } from "../../lib/pustaka";
import { site } from "../../lib/site";

export const Route = createFileRoute("/pustaka/detail")({
  validateSearch: (search: Record<string, unknown>) => ({
    contoh: Number(search.contoh) === 2 ? 2 : 1,
  }),
  head: ({ match }) => ({
    meta: [{ title: `${pustaka[match.search.contoh - 1]!.title} | ${site.name}` }],
  }),
  component: PustakaDetail,
});

const linkClass =
  "flex min-h-12 items-center justify-center gap-2 self-start rounded-[5px] border border-ak-field px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale";

function PustakaDetail() {
  const { contoh } = Route.useSearch();
  const item = pustaka[contoh - 1]!;
  const title = item.id === 1 ? "Catatan Kebersamaan" : item.title;
  return (
    <div className="pustaka-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: title }]}
        label="Pustaka"
        title={title}
        intro="Contoh konten · Pustaka · berkas resmi belum tersedia."
      />
      <div className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <a href="/pustaka" className={linkClass}>
          Kembali ke daftar
          <ArrowUpRight aria-hidden="true" className="size-[15px]" />
        </a>
        <section id="tentang-pustaka" className="flex flex-col gap-5 md:flex-row lg:gap-7">
          <div className="flex min-h-[350px] flex-col justify-between gap-[22px] rounded-[6px] bg-ak-pale p-8 md:w-[280px] md:shrink-0 lg:min-h-[430px] lg:w-[340px]">
            <SectionLabel>Contoh sampul</SectionLabel>
            <BookOpen aria-hidden="true" className="size-10 text-primary" />
            <p className="text-[30px] leading-[1.65] font-semibold text-ak-dark">{title}</p>
            <p className="text-[11px] leading-[1.65] font-semibold text-ak-brown">
              PUSTAKA · AL-KAUTSAR
            </p>
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-[18px]">
            <h2 className="text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]">
              Tentang pustaka
            </h2>
            <dl className="flex flex-col gap-[18px]">
              {[
                ["Judul", title],
                ["Penulis", "Belum diberikan"],
                ["Kategori", "Contoh bacaan komunitas"],
                ["Tanggal", "Belum dikonfirmasi"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col gap-[18px]">
                  <dt className="text-[10px] leading-[1.65] font-semibold text-ak-brown uppercase">
                    {label}
                  </dt>
                  <dd className="text-[15px] leading-[1.65] text-ak-dark">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-sm leading-[1.65] text-ak-muted">
              Contoh penyajian ringkasan bacaan. Naskah, nama penulis, tanggal, dan sampul resmi
              harus dikonfirmasi sebelum diterbitkan.
            </p>
          </div>
        </section>
        <section
          id="pratinjau-pustaka"
          aria-label="Pratinjau pustaka"
          className="flex min-h-[260px] flex-col items-center justify-center gap-4 rounded-[7px] bg-ak-pale p-[26px] text-center lg:min-h-[380px]"
        >
          <FileText aria-hidden="true" className="size-9 text-primary" />
          <h2 className="text-[22px] leading-[1.65] font-semibold text-ak-dark">
            Pratinjau belum tersedia
          </h2>
          <p className="text-[13px] leading-[1.65] text-ak-muted">
            Berkas resmi belum diberikan. Tidak ada unduhan aktif.
          </p>
        </section>
        <div className="flex flex-col gap-5 sm:flex-row lg:gap-7">
          {["Baca", "Unduh"].map((label) => (
            <button
              key={label}
              type="button"
              disabled
              className="min-h-12 rounded-[5px] bg-[#e8ede5] px-[18px] text-xs leading-[1.65] font-semibold text-ak-muted disabled:cursor-not-allowed"
            >
              {label}: belum tersedia
            </button>
          ))}
        </div>
        <p className="rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted">
          Aksi baca dan unduh nonaktif sampai berkas resmi diberikan. Tidak ada tautan dokumen
          rekaan.
        </p>
        <a href="/kontak" className={linkClass}>
          Tanyakan bahan bacaan
          <ArrowUpRight aria-hidden="true" className="size-[15px]" />
        </a>
      </div>
    </div>
  );
}
