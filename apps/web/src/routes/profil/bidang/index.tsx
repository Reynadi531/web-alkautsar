import { createFileRoute } from "@tanstack/react-router";
import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { ArrowUpRight } from "lucide-react";

import { DepartmentIcon } from "../../../components/department-icon";
import { EmptyState } from "../../../components/empty-state";
import { PageHeader } from "../../../components/page-header";
import { SectionLabel } from "../../../components/section-label";
import { getDepartments } from "../../../lib/profil";
import { site } from "../../../lib/site";

export const Route = createFileRoute("/profil/bidang/")({
  loader: () => getDepartments(),
  head: () => ({
    meta: [
      { title: `Bidang Masjid | ${site.name}` },
      {
        name: "description",
        content: "Ruang pengelolaan yang mendukung ibadah dan kebersamaan warga.",
      },
    ],
  }),
  component: DepartmentsPage,
});

function DepartmentsPage() {
  const departments = Route.useLoaderData();
  const hasOfficial = departments.some((department) => !department.sample);

  return (
    <div className="management-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Bidang Masjid" }]}
        label="Masjid Al-Kautsar"
        title="Bidang Masjid"
        intro="Ruang pengelolaan yang mendukung ibadah dan kebersamaan warga."
      />
      <div className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        {!hasOfficial && departments.length > 0 && (
          <aside
            aria-label="Catatan validasi bidang"
            className="rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted"
          >
            Daftar bidang resmi belum tersedia. Bidang berikut adalah contoh kategori untuk
            kebutuhan desain, bukan struktur Al-Kautsar yang telah disahkan.
          </aside>
        )}
        {departments.length > 0 && (
          <section aria-label="Daftar bidang" className="grid gap-5 md:grid-cols-2 lg:gap-7">
            {departments.map((department) => (
              <article
                key={department.id}
                className="flex min-w-0 flex-col items-start gap-[18px] rounded-[7px] bg-ak-cream p-7"
              >
                <DepartmentIcon name={department.icon} className="size-[30px] text-ak-green" />
                {department.sample && <SectionLabel>Contoh konten</SectionLabel>}
                <h2 className="text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]">
                  {department.name}
                </h2>
                {department.summary && (
                  <p className="text-sm leading-[1.65] text-ak-muted">{department.summary}</p>
                )}
                <a
                  href={department.href}
                  aria-label={`Detail bidang ${department.name}`}
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  Detail bidang
                  <ArrowUpRight aria-hidden="true" />
                </a>
              </article>
            ))}
          </section>
        )}
        {!hasOfficial && (
          <EmptyState
            title="Bidang resmi belum dikonfirmasi"
            description="Susunan bidang akan diperbarui setelah ditetapkan."
          />
        )}
      </div>
    </div>
  );
}
