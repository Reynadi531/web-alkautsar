import { createFileRoute } from "@tanstack/react-router";
import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { ManagementViews } from "../../../components/management-views";
import { PageHeader } from "../../../components/page-header";
import { site } from "../../../lib/site";

export const Route = createFileRoute("/profil/pengurus/bagan")({
  head: () => ({
    meta: [
      { title: `Bagan Kepengurusan | ${site.name}` },
      {
        name: "description",
        content: "Contoh hierarki jabatan. Struktur dan masa kepengurusan resmi belum diberikan.",
      },
    ],
  }),
  component: OrganizationChartPage,
});

function ChartRole({
  title,
  level,
  primary = false,
}: {
  title: string;
  level: string;
  primary?: boolean;
}) {
  return (
    <article
      className={`flex min-w-0 flex-col gap-2 rounded-[5px] p-[22px] ${primary ? "bg-ak-green text-white" : "bg-white text-ak-dark"}`}
    >
      <p
        className={`text-[10px] leading-[1.65] font-semibold ${primary ? "text-ak-on-dark" : "text-ak-brown"}`}
      >
        TINGKAT {level} · CONTOH
      </p>
      <h2 className="text-[19px] leading-[1.65] font-semibold">{title}</h2>
      <p className={`text-xs leading-[1.65] ${primary ? "text-ak-on-dark" : "text-ak-muted"}`}>
        Nama belum diberikan
      </p>
    </article>
  );
}

function OrganizationChartPage() {
  return (
    <div className="management-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Bagan Kepengurusan" }]}
        label="Masjid Al-Kautsar"
        title="Bagan Kepengurusan"
        intro="Contoh hierarki jabatan. Struktur dan masa kepengurusan resmi belum diberikan."
      />
      <div className="flex flex-col items-start gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <ManagementViews chart />
        <aside
          aria-label="Catatan validasi bagan"
          className="w-full rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted"
        >
          CONTOH STRUKTUR: hubungan hierarki dan seluruh jabatan di bawah perlu dikonfirmasi. Pada
          mobile, hierarki disajikan vertikal tanpa gulir horizontal.
        </aside>
        <section
          aria-label="Contoh hierarki kepengurusan, belum dikonfirmasi"
          className="flex w-full flex-col gap-[18px] rounded-[7px] bg-ak-cream p-[22px] lg:p-10"
        >
          <ChartRole title="Ketua DKM" level="01" primary />
          <ArrowDown aria-hidden="true" className="size-[22px] self-center text-ak-icon" />
          <div className="grid gap-5 md:grid-cols-2 lg:gap-7">
            <ChartRole title="Sekretaris" level="02" />
            <ChartRole title="Bendahara" level="02" />
          </div>
          <ArrowDown aria-hidden="true" className="size-[22px] self-center text-ak-icon" />
          <ChartRole title="Koordinator bidang" level="03" />
        </section>
        <a href="/profil/pengurus" className={buttonVariants({ variant: "outline", size: "lg" })}>
          Lihat versi daftar
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
