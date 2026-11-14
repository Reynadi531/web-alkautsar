import { createFileRoute } from "@tanstack/react-router";
import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { ArrowUpRight, UserRound } from "lucide-react";

import { ManagementViews } from "../../../components/management-views";
import { PageHeader } from "../../../components/page-header";
import { site } from "../../../lib/site";

export const Route = createFileRoute("/profil/pengurus/")({
  head: () => ({
    meta: [
      { title: `Kepengurusan | ${site.name}` },
      {
        name: "description",
        content:
          "Mengenal struktur pengelolaan masjid. Nama, masa jabatan, dan susunan resmi menunggu konfirmasi.",
      },
    ],
  }),
  component: ManagementPage,
});

const roles = [
  { title: "Ketua DKM", description: "Koordinasi pengelolaan" },
  { title: "Sekretaris", description: "Administrasi" },
  { title: "Bendahara", description: "Pengelolaan dana" },
  { title: "Koordinator bidang", description: "Koordinasi bidang" },
];

function ManagementPage() {
  return (
    <div className="management-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Kepengurusan" }]}
        label="Masjid Al-Kautsar"
        title="Kepengurusan"
        intro="Mengenal struktur pengelolaan masjid. Nama, masa jabatan, dan susunan resmi menunggu konfirmasi."
      />
      <div className="flex flex-col items-start gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <ManagementViews />
        <aside
          aria-label="Catatan validasi kepengurusan"
          className="w-full rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted"
        >
          CONTOH STRUKTUR: jabatan berikut adalah placeholder, bukan susunan kepengurusan resmi.
          Tidak ada nama atau foto pribadi rekaan.
        </aside>
        <div className="flex w-full flex-col gap-7 lg:gap-9">
          {[roles.slice(0, 2), roles.slice(2)].map((row, index) => (
            <section
              key={index}
              aria-label={`Contoh jabatan pengurus ${index + 1}`}
              className="grid gap-5 md:grid-cols-2 lg:gap-7"
            >
              {row.map(({ title, description }) => (
                <article
                  key={title}
                  className="flex min-w-0 items-start gap-5 rounded-[7px] bg-ak-cream p-6"
                >
                  <div
                    aria-hidden="true"
                    className="flex h-[72px] w-16 shrink-0 items-center justify-center rounded-[4px] bg-ak-pale"
                  >
                    <UserRound className="size-7 text-ak-icon" />
                  </div>
                  <div className="flex min-w-0 flex-col gap-1.5">
                    <h2 className="text-[19px] leading-[1.65] font-semibold text-ak-dark">
                      {title}
                    </h2>
                    <p className="text-xs leading-[1.65] text-ak-muted">
                      Nama pengurus belum diberikan
                    </p>
                    <p className="text-[11px] leading-[1.65] text-ak-brown">
                      {description} (contoh jabatan)
                    </p>
                  </div>
                </article>
              ))}
            </section>
          ))}
        </div>
        <a href="/profil/bidang" className={buttonVariants({ variant: "outline", size: "lg" })}>
          Lihat bidang masjid
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
