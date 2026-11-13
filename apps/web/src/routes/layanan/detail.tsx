import { createFileRoute } from "@tanstack/react-router";

import { EmptyState } from "../../components/empty-state";
import { PageHeader } from "../../components/page-header";
import { serviceExamples, serviceSummary } from "../../lib/layanan";
import { site } from "../../lib/site";

export const Route = createFileRoute("/layanan/detail")({
  validateSearch: (search: Record<string, unknown>) => ({
    contoh: Number(search.contoh) === 2 ? 2 : 1,
  }),
  head: ({ match }) => ({
    meta: [{ title: `${serviceExamples[match.search.contoh - 1]!.title} | ${site.name}` }],
  }),
  component: ServiceDetail,
});

function ServiceDetail() {
  const { contoh } = Route.useSearch();
  const service = serviceExamples[contoh - 1]!;

  return (
    <div className="service-page">
      <PageHeader
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Layanan Masjid", href: "/layanan" },
          { label: service.title },
        ]}
        label="Contoh konten"
        title={service.title}
        intro={serviceSummary}
      />
      <article className="flex flex-col gap-7 px-[26px] py-8 lg:gap-9 lg:px-19 lg:py-[52px]">
        <h2 className="text-[23px] leading-[1.4] font-semibold lg:text-[30px]">
          Informasi layanan
        </h2>
        <EmptyState
          title="Detail layanan belum dikonfirmasi"
          description="Ini adalah contoh konten, bukan layanan resmi Al-Kautsar. Ketentuan, jadwal layanan, dan kontak pengelola belum diberikan oleh pengurus."
        />
        <div className="flex flex-wrap gap-4">
          <a
            href="/layanan"
            className="inline-flex min-h-12 items-center rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale"
          >
            Kembali ke daftar layanan
          </a>
          <a
            href="/kontak"
            className="inline-flex min-h-12 items-center rounded-[5px] bg-primary px-[18px] text-[13px] font-semibold text-white hover:bg-ak-dark"
          >
            Kontak &amp; lokasi
          </a>
        </div>
      </article>
    </div>
  );
}
