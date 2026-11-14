import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Clock3 } from "lucide-react";

import { PageHeader } from "../../components/page-header";
import { serviceExamples } from "../../lib/layanan";
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

const accessSteps = [
  "Periksa informasi layanan resmi setelah tersedia.",
  "Hubungi kontak layanan yang telah dikonfirmasi.",
  "Ikuti ketentuan layanan sesuai arahan pengurus.",
] as const;
const buttonClass =
  "inline-flex min-h-12 items-center justify-center gap-2.5 self-start rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale";
const headingClass = "text-[23px] leading-[1.4] font-semibold lg:text-[30px]";

function ServiceDetail() {
  const { contoh } = Route.useSearch();
  const service = serviceExamples[contoh - 1]!;

  return (
    <div className="service-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: service.title }]}
        label="Layanan / Contoh Konten"
        title={service.title}
        intro="Contoh halaman layanan: prosedur dan waktu pelayanan belum ditetapkan."
      />
      <article className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <a href="/layanan" className={buttonClass}>
          Kembali ke daftar
          <ArrowUpRight aria-hidden="true" className="size-[15px]" />
        </a>
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:gap-7">
          <div className="flex min-w-0 flex-col gap-7">
            <section aria-labelledby="tentang-layanan" className="flex flex-col gap-3">
              <h2 id="tentang-layanan" className={headingClass}>
                Tentang layanan
              </h2>
              <p className="text-sm leading-[1.65] text-ak-muted lg:text-base">
                Halaman ini disiapkan untuk menjelaskan layanan yang telah dikonfirmasi pengurus.
                Informasi tentang pihak yang melayani, persyaratan, dan cakupan layanan belum
                diberikan.
              </p>
            </section>
            <section aria-labelledby="cara-mengakses" className="flex flex-col gap-7">
              <h2 id="cara-mengakses" className={headingClass}>
                Cara mengakses
              </h2>
              <ol className="flex flex-col gap-7">
                {accessSteps.map((step, index) => (
                  <li key={step} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="w-[34px] shrink-0 text-lg leading-[1.65] font-semibold text-ak-brown"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm leading-[1.65] text-ak-muted">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
          <aside
            aria-labelledby="waktu-layanan"
            className="flex min-w-0 flex-col gap-5 rounded-[7px] bg-ak-pale p-7"
          >
            <Clock3 aria-hidden="true" className="size-[25px] text-primary" />
            <h2 id="waktu-layanan" className="text-xl leading-[1.65] font-semibold">
              Waktu layanan belum dikonfirmasi
            </h2>
            <p className="text-sm leading-[1.65] text-ak-muted">
              Telepon / WhatsApp / email layanan belum diberikan.
            </p>
            <a href="/kontak" className={buttonClass}>
              Lihat kontak masjid
              <ArrowUpRight aria-hidden="true" className="size-[15px]" />
            </a>
            <p className="px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted">
              Contoh alur akses, bukan prosedur resmi.
            </p>
          </aside>
        </div>
        <div className="grid grid-cols-1 gap-5 overflow-hidden rounded-[7px] md:grid-cols-2">
          <img
            src="/images/masjid-tampak-depan.webp"
            alt="Bangunan Masjid Al-Kautsar Pharmindo tampak dari depan"
            width={1200}
            height={800}
            fetchPriority="high"
            className="h-[220px] w-full object-cover md:h-[280px] lg:h-[330px]"
          />
          <img
            src="/images/masjid-udara.webp"
            alt="Masjid Al-Kautsar Pharmindo dan lingkungan sekitar dari udara"
            width={1200}
            height={800}
            loading="lazy"
            className="hidden h-[280px] w-full object-cover md:block lg:h-[330px]"
          />
        </div>
      </article>
    </div>
  );
}
