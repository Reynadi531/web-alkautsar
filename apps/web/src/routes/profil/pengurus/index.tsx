import { createFileRoute } from "@tanstack/react-router";
import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { ArrowUpRight, UserRound } from "lucide-react";

import { EmptyState } from "../../../components/empty-state";
import { ManagementViews } from "../../../components/management-views";
import { PageHeader } from "../../../components/page-header";
import { getOfficers } from "../../../lib/profil";
import { site } from "../../../lib/site";

export const Route = createFileRoute("/profil/pengurus/")({
  loader: () => getOfficers(),
  head: () => ({
    meta: [
      { title: `Kepengurusan | ${site.name}` },
      {
        name: "description",
        content: "Mengenal struktur pengelolaan Masjid Al-Kautsar Pharmindo.",
      },
    ],
  }),
  component: ManagementPage,
});

function ManagementPage() {
  const officers = Route.useLoaderData();
  const sample = officers.some((officer) => officer.sample);

  return (
    <div className="management-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Kepengurusan" }]}
        label="Masjid Al-Kautsar"
        title="Kepengurusan"
        intro={
          sample || officers.length === 0
            ? "Mengenal struktur pengelolaan masjid. Nama, masa jabatan, dan susunan resmi menunggu konfirmasi."
            : "Mengenal struktur pengelolaan masjid."
        }
      />
      <div className="flex flex-col items-start gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <ManagementViews />
        {sample && (
          <aside
            aria-label="Catatan validasi kepengurusan"
            className="w-full rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted"
          >
            CONTOH STRUKTUR: jabatan bertanda contoh adalah placeholder, bukan susunan kepengurusan
            resmi. Tidak ada nama atau foto pribadi rekaan.
          </aside>
        )}
        {officers.length > 0 ? (
          <section
            aria-label="Daftar pengurus"
            className="grid w-full gap-x-5 gap-y-7 md:grid-cols-2 lg:gap-x-7 lg:gap-y-9"
          >
            {officers.map((officer) => (
              <article
                key={officer.id}
                className="flex min-w-0 items-start gap-5 rounded-[7px] bg-ak-cream p-6"
              >
                {officer.photo ? (
                  <img
                    src={officer.photo}
                    alt={officer.name ? `Foto ${officer.name}` : ""}
                    width={64}
                    height={72}
                    loading="lazy"
                    className="h-[72px] w-16 shrink-0 rounded-[4px] bg-ak-pale object-cover"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="flex h-[72px] w-16 shrink-0 items-center justify-center rounded-[4px] bg-ak-pale"
                  >
                    <UserRound className="size-7 text-ak-icon" />
                  </div>
                )}
                <div className="flex min-w-0 flex-col gap-1.5">
                  <h2 className="text-[19px] leading-[1.65] font-semibold text-ak-dark">
                    {officer.role}
                  </h2>
                  <p className="text-xs leading-[1.65] text-ak-muted">
                    {officer.name ?? "Nama pengurus belum diberikan"}
                    {officer.term ? ` · ${officer.term}` : ""}
                  </p>
                  {(officer.duty || officer.sample) && (
                    <p className="text-[11px] leading-[1.65] text-ak-brown">
                      {[officer.duty, officer.sample ? "(contoh jabatan)" : ""]
                        .filter(Boolean)
                        .join(" ")}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </section>
        ) : (
          <div className="w-full">
            <EmptyState
              title="Susunan pengurus belum tersedia"
              description="Daftar pengurus akan ditampilkan setelah ditetapkan."
            />
          </div>
        )}
        <a href="/profil/bidang" className={buttonVariants({ variant: "outline", size: "lg" })}>
          Lihat bidang masjid
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
