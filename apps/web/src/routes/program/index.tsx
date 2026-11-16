import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { EmptyState } from "../../components/empty-state";
import { PageHeader } from "../../components/page-header";
import { SectionLabel } from "../../components/section-label";
import { site } from "../../lib/site";

export const Route = createFileRoute("/program/")({
  head: () => ({ meta: [{ title: `Program Masjid | ${site.name}` }] }),
  component: ProgramList,
});

function ProgramList() {
  return (
    <div className="program-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Program Masjid" }]}
        label="Program & Partisipasi"
        title="Program Masjid"
        intro="Ruang untuk mengenal tujuan, peserta, dan cara mengikuti program masjid."
      />
      <section
        id="daftar-program"
        className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16"
      >
        <p className="rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted">
          Program resmi Al-Kautsar belum diberikan. Contoh program berikut hanya untuk desain;
          program khusus Salman tidak dianggap tersedia di masjid ini.
        </p>
        <h2 className="text-[23px] leading-[1.4] font-semibold lg:text-[30px]">Program pilihan</h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7">
          <img
            src="/images/jamaah-masjid.webp"
            alt="Ilustrasi umum suasana jamaah di masjid, bukan dokumentasi program tertentu"
            width={630}
            height={360}
            fetchPriority="high"
            className="h-[230px] w-full rounded-[7px] object-cover md:h-full md:min-h-[360px]"
          />
          <article className="flex min-w-0 flex-col items-start gap-[18px] rounded-[7px] bg-ak-cream p-7">
            <SectionLabel>Contoh Konten</SectionLabel>
            <h3 className="text-[23px] leading-[1.4] font-semibold lg:text-[30px]">
              Ruang Belajar Warga
            </h3>
            <p className="text-sm leading-[1.65] text-ak-muted lg:text-[15px]">
              Contoh pola program belajar bersama. Tujuan, sasaran peserta, dan mekanisme
              pelaksanaan perlu dikonfirmasi pengurus.
            </p>
            <a
              href="/program/detail"
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[5px] bg-primary px-[18px] text-[13px] font-semibold text-white hover:bg-ak-dark"
            >
              Kenali program
              <ArrowUpRight aria-hidden="true" className="size-[15px]" />
            </a>
          </article>
        </div>
        <h2 className="text-[23px] leading-[1.4] font-semibold lg:text-[30px]">Seluruh program</h2>
        <EmptyState
          title="Belum ada program terkonfirmasi"
          description="Daftar program resmi akan ditampilkan setelah mendapat informasi yang disetujui."
        />
        <a
          href="/agenda"
          className="inline-flex min-h-12 items-center justify-center gap-2.5 self-start rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale"
        >
          Lihat agenda kegiatan
          <ArrowUpRight aria-hidden="true" className="size-[15px]" />
        </a>
      </section>
    </div>
  );
}
