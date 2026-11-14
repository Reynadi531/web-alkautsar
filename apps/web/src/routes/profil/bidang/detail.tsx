import { createFileRoute } from "@tanstack/react-router";
import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { ArrowUpRight } from "lucide-react";

import { EmptyState } from "../../../components/empty-state";
import { PageHeader } from "../../../components/page-header";
import { SectionLabel } from "../../../components/section-label";
import { site } from "../../../lib/site";

export const Route = createFileRoute("/profil/bidang/detail")({
  validateSearch: (search: Record<string, unknown>) => ({
    contoh: Number(search.contoh) === 2 ? 2 : 1,
  }),
  head: ({ match }) => ({
    meta: [
      {
        title: `Bidang ${match.search.contoh === 2 ? "Sosial & Kemasyarakatan" : "Ibadah & Dakwah"} | ${site.name}`,
      },
    ],
  }),
  component: DepartmentDetailPage,
});

function DepartmentDetailPage() {
  const { contoh } = Route.useSearch();
  const title = `Bidang ${contoh === 2 ? "Sosial & Kemasyarakatan" : "Ibadah & Dakwah"}`;
  return (
    <div className="management-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: title }]}
        label="Masjid Al-Kautsar"
        title={title}
        intro="Contoh halaman detail bidang. Bukan penetapan struktur resmi masjid."
      />
      <div className="flex flex-col items-start gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <a href="/profil/bidang" className={buttonVariants({ variant: "outline", size: "lg" })}>
          Kembali ke daftar
          <ArrowUpRight aria-hidden="true" />
        </a>
        <div className="grid w-full items-start gap-5 md:grid-cols-2 lg:gap-7">
          <div className="flex flex-col gap-[26px]">
            {[
              {
                title: "Tentang bidang",
                text: "Area ini memuat deskripsi bidang berdasarkan dokumen kepengurusan resmi. Naskah dan penanggung jawab belum diberikan.",
              },
              {
                title: "Tanggung jawab",
                text: "Contoh susunan informasi: ruang lingkup kerja, koordinasi pelaksanaan kegiatan, dan pelaporan. Rincian final harus dikonfirmasi pengurus.",
              },
            ].map(({ title, text }) => (
              <section key={title} className="flex flex-col gap-3">
                <h2 className="text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]">
                  {title}
                </h2>
                <p className="text-sm leading-[1.65] text-ak-muted lg:text-base">{text}</p>
              </section>
            ))}
          </div>
          <aside
            aria-label="Status bidang"
            className="flex flex-col items-start gap-4 rounded-[7px] bg-ak-pale p-7"
          >
            <SectionLabel>Contoh konten</SectionLabel>
            <p className="text-base leading-[1.65] font-semibold text-ak-dark">
              Penanggung jawab: belum diberikan
            </p>
            <p className="text-[13px] leading-[1.65] text-ak-muted">
              Kontak bidang: belum dikonfirmasi
            </p>
            <a href="/kontak" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Hubungi masjid
              <ArrowUpRight aria-hidden="true" />
            </a>
          </aside>
        </div>
        <section aria-labelledby="kegiatan-terkait" className="flex w-full flex-col gap-7 lg:gap-9">
          <h2
            id="kegiatan-terkait"
            className="text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]"
          >
            Kegiatan terkait
          </h2>
          <EmptyState
            title="Belum ada kegiatan terkait"
            description="Kegiatan akan ditautkan setelah bidang dan agenda dikonfirmasi."
          />
        </section>
      </div>
    </div>
  );
}
