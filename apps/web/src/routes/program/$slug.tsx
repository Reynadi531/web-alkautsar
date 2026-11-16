import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { PageHeader } from "../../components/page-header";
import { RichText } from "../../components/rich-text";
import { getProgram } from "../../lib/program";
import { site } from "../../lib/site";

export const Route = createFileRoute("/program/$slug")({
  loader: async ({ params }) => {
    const program = await getProgram({ data: params.slug });
    if (!program) throw notFound();
    return program;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Program"} | ${site.name}` },
      ...(loaderData?.summary ? [{ name: "description", content: loaderData.summary }] : []),
    ],
  }),
  component: ProgramDetail,
});

const buttonClass =
  "inline-flex min-h-12 items-center justify-center gap-2.5 self-start rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale";
const headingClass = "text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]";

function ProgramDetail() {
  const program = Route.useLoaderData();

  return (
    <div className="program-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: program.title }]}
        label={program.sample ? "Program / Contoh Konten" : "Program"}
        title={program.title}
        intro={
          program.sample
            ? "Contoh konten: bukan program aktif atau program yang telah disahkan."
            : program.summary || "Program Masjid Al-Kautsar Pharmindo."
        }
      />
      <article className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <a href="/program" className={buttonClass}>
          Kembali ke daftar
          <ArrowUpRight aria-hidden="true" className="size-[15px]" />
        </a>
        {program.image && (
          <picture className="block h-[250px] overflow-hidden rounded-[7px] bg-ak-cream lg:h-[440px]">
            {program.detailImage && (
              <source media="(min-width: 1024px)" srcSet={program.detailImage} />
            )}
            <img
              src={program.image}
              alt={program.alt}
              width={1288}
              height={440}
              fetchPriority="high"
              className={`h-full w-full lg:object-cover ${program.detailImage ? "object-contain" : "object-cover"}`}
            />
          </picture>
        )}
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:gap-7">
          <div className="flex min-w-0 flex-col gap-[26px]">
            {program.purpose && (
              <section aria-labelledby="tujuan-program" className="flex flex-col gap-3">
                <h2 id="tujuan-program" className={headingClass}>
                  Tujuan program
                </h2>
                <RichText html={program.purpose} />
              </section>
            )}
            {program.audience && (
              <section aria-labelledby="sasaran-peserta" className="flex flex-col gap-3">
                <h2 id="sasaran-peserta" className={headingClass}>
                  Sasaran peserta
                </h2>
                <RichText html={program.audience} />
              </section>
            )}
          </div>
          <section
            aria-labelledby="cara-mengikuti"
            className="flex min-w-0 flex-col gap-5 rounded-[7px] bg-ak-pale p-7"
          >
            <h2 id="cara-mengikuti" className={headingClass}>
              Cara mengikuti
            </h2>
            <dl className="flex flex-col gap-5">
              {program.participation.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-5">
                  <dt className="text-[10px] leading-[1.65] font-semibold text-ak-brown uppercase">
                    {label}
                  </dt>
                  <dd className="text-sm leading-[1.65] text-ak-dark">{value}</dd>
                </div>
              ))}
            </dl>
            {program.registrationUrl && (
              <a
                href={program.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 self-start rounded-[5px] bg-primary px-[18px] text-[13px] font-semibold text-white hover:bg-ak-dark"
              >
                Daftar program <ArrowUpRight aria-hidden="true" className="size-[15px]" />
              </a>
            )}
            <a href="/kontak" className={buttonClass}>
              Tanyakan program
              <ArrowUpRight aria-hidden="true" className="size-[15px]" />
            </a>
          </section>
        </div>
        {!program.registrationUrl && (
          <p className="rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted">
            Tidak ada pendaftaran aktif.
            {program.sample
              ? " Kegiatan terkait akan ditampilkan setelah program resmi ditetapkan."
              : ""}
          </p>
        )}
        <a href="/program" className={buttonClass}>
          Kembali ke semua program
          <ArrowUpRight aria-hidden="true" className="size-[15px]" />
        </a>
      </article>
    </div>
  );
}
