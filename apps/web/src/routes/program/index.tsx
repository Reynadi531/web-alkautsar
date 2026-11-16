import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { EmptyState } from "../../components/empty-state";
import { PageHeader } from "../../components/page-header";
import { SectionLabel } from "../../components/section-label";
import { getPrograms, type Program } from "../../lib/program";
import { site } from "../../lib/site";

export const Route = createFileRoute("/program/")({
  loader: () => getPrograms(),
  head: () => ({ meta: [{ title: `Program Masjid | ${site.name}` }] }),
  component: ProgramList,
});

const heading = "text-[23px] leading-[1.4] font-semibold lg:text-[30px]";

function ProgramCard({ program, priority = false }: { program: Program; priority?: boolean }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7">
      {program.image && (
        <img
          src={program.image}
          alt={program.alt}
          width={630}
          height={360}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          className="h-[230px] w-full rounded-[7px] object-cover md:h-full md:min-h-[360px]"
        />
      )}
      <article className="flex min-w-0 flex-col items-start gap-[18px] rounded-[7px] bg-ak-cream p-7">
        {program.sample && <SectionLabel>Contoh Konten</SectionLabel>}
        <h3 className={heading}>{program.title}</h3>
        {program.summary && (
          <p className="text-sm leading-[1.65] text-ak-muted lg:text-[15px]">{program.summary}</p>
        )}
        <a
          href={program.href}
          aria-label={`Kenali program: ${program.title}`}
          className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[5px] bg-primary px-[18px] text-[13px] font-semibold text-white hover:bg-ak-dark"
        >
          Kenali program
          <ArrowUpRight aria-hidden="true" className="size-[15px]" />
        </a>
      </article>
    </div>
  );
}

function ProgramList() {
  const programs = Route.useLoaderData();
  const featured = programs.find((program) => program.featured) ?? programs[0];
  const others = programs.filter((program) => program !== featured);
  const hasOfficial = programs.some((program) => !program.sample);

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
        {!hasOfficial && (
          <p className="rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted">
            Program resmi Al-Kautsar belum diberikan. Contoh program berikut hanya untuk desain;
            program khusus Salman tidak dianggap tersedia di masjid ini.
          </p>
        )}
        {featured && (
          <>
            <h2 className={heading}>Program pilihan</h2>
            <ProgramCard program={featured} priority />
          </>
        )}
        <h2 className={heading}>Seluruh program</h2>
        {others.map((program) => (
          <ProgramCard key={program.id} program={program} />
        ))}
        {!hasOfficial && (
          <EmptyState
            title="Belum ada program terkonfirmasi"
            description="Daftar program resmi akan ditampilkan setelah mendapat informasi yang disetujui."
          />
        )}
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
