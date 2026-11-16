import { createFileRoute } from "@tanstack/react-router";
import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Fragment } from "react";

import { EmptyState } from "../../../components/empty-state";
import { ManagementViews } from "../../../components/management-views";
import { PageHeader } from "../../../components/page-header";
import { getOfficers, type Officer } from "../../../lib/profil";
import { site } from "../../../lib/site";

export const Route = createFileRoute("/profil/pengurus/bagan")({
  loader: () => getOfficers(),
  head: () => ({
    meta: [
      { title: `Bagan Kepengurusan | ${site.name}` },
      { name: "description", content: "Hierarki jabatan pengurus Masjid Al-Kautsar Pharmindo." },
    ],
  }),
  component: OrganizationChartPage,
});

function ChartRole({ officer, primary }: { officer: Officer; primary: boolean }) {
  return (
    <article
      className={`flex min-w-0 flex-col gap-2 rounded-[5px] p-[22px] ${primary ? "bg-ak-green text-white" : "bg-white text-ak-dark"}`}
    >
      <p
        className={`text-[10px] leading-[1.65] font-semibold ${primary ? "text-ak-on-dark" : "text-ak-brown"}`}
      >
        TINGKAT {String(officer.level).padStart(2, "0")}
        {officer.sample ? " · CONTOH" : ""}
      </p>
      <h2 className="text-[19px] leading-[1.65] font-semibold">{officer.role}</h2>
      <p className={`text-xs leading-[1.65] ${primary ? "text-ak-on-dark" : "text-ak-muted"}`}>
        {officer.name ?? "Nama belum diberikan"}
      </p>
    </article>
  );
}

function OrganizationChartPage() {
  const officers = Route.useLoaderData();
  const sample = officers.some((officer) => officer.sample);
  // Officers arrive sorted by level, so each chart row is a run of equal levels.
  const rows: Officer[][] = [];
  for (const officer of officers) {
    const row = rows.at(-1);
    if (row && row[0]!.level === officer.level) row.push(officer);
    else rows.push([officer]);
  }

  return (
    <div className="management-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Bagan Kepengurusan" }]}
        label="Masjid Al-Kautsar"
        title="Bagan Kepengurusan"
        intro={
          sample || officers.length === 0
            ? "Contoh hierarki jabatan. Struktur dan masa kepengurusan resmi belum diberikan."
            : "Hierarki jabatan pengurus masjid."
        }
      />
      <div className="flex flex-col items-start gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <ManagementViews chart />
        {sample && (
          <aside
            aria-label="Catatan validasi bagan"
            className="w-full rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted"
          >
            CONTOH STRUKTUR: hubungan hierarki dan jabatan bertanda contoh perlu dikonfirmasi.
          </aside>
        )}
        {rows.length > 0 ? (
          <section
            aria-label={
              sample ? "Contoh hierarki kepengurusan, belum dikonfirmasi" : "Hierarki kepengurusan"
            }
            className="flex w-full flex-col gap-[18px] rounded-[7px] bg-ak-cream p-[22px] lg:p-10"
          >
            {rows.map((row, index) => (
              <Fragment key={row[0]!.level}>
                {index > 0 && (
                  <ArrowDown aria-hidden="true" className="size-[22px] self-center text-ak-icon" />
                )}
                <div className={row.length > 1 ? "grid gap-5 md:grid-cols-2 lg:gap-7" : undefined}>
                  {row.map((officer) => (
                    <ChartRole key={officer.id} officer={officer} primary={index === 0} />
                  ))}
                </div>
              </Fragment>
            ))}
          </section>
        ) : (
          <div className="w-full">
            <EmptyState
              title="Bagan belum tersedia"
              description="Hierarki pengurus akan ditampilkan setelah ditetapkan."
            />
          </div>
        )}
        <a href="/profil/pengurus" className={buttonVariants({ variant: "outline", size: "lg" })}>
          Lihat versi daftar
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
