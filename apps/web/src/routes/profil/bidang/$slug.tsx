import { createFileRoute, notFound } from "@tanstack/react-router";
import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { ArrowUpRight, CalendarDays } from "lucide-react";

import { EmptyState } from "../../../components/empty-state";
import { PageHeader } from "../../../components/page-header";
import { RichText } from "../../../components/rich-text";
import { SectionLabel } from "../../../components/section-label";
import { getDepartment } from "../../../lib/profil";
import { site } from "../../../lib/site";

export const Route = createFileRoute("/profil/bidang/$slug")({
  loader: async ({ params }) => {
    const department = await getDepartment({ data: params.slug });
    if (!department) throw notFound();
    return department;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `Bidang ${loaderData?.name ?? ""} | ${site.name}` }],
  }),
  component: DepartmentDetailPage,
});

const headingClass = "text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]";

function DepartmentDetailPage() {
  const department = Route.useLoaderData();
  const title = `Bidang ${department.name}`;
  const sections = [
    { title: "Tentang bidang", html: department.about },
    { title: "Tanggung jawab", html: department.duties },
  ].filter((section) => section.html);

  return (
    <div className="management-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: title }]}
        label="Masjid Al-Kautsar"
        title={title}
        intro={
          department.sample
            ? "Contoh halaman detail bidang. Bukan penetapan struktur resmi masjid."
            : (department.summary ?? "Bidang pengelolaan Masjid Al-Kautsar Pharmindo.")
        }
      />
      <div className="flex flex-col items-start gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <a href="/profil/bidang" className={buttonVariants({ variant: "outline", size: "lg" })}>
          Kembali ke daftar
          <ArrowUpRight aria-hidden="true" />
        </a>
        <div className="grid w-full items-start gap-5 md:grid-cols-2 lg:gap-7">
          <div className="flex flex-col gap-[26px]">
            {sections.map((section) => (
              <section key={section.title} className="flex flex-col gap-3">
                <h2 className={headingClass}>{section.title}</h2>
                <RichText html={section.html} />
              </section>
            ))}
          </div>
          <aside
            aria-label="Status bidang"
            className="flex flex-col items-start gap-4 rounded-[7px] bg-ak-pale p-7"
          >
            {department.sample && <SectionLabel>Contoh konten</SectionLabel>}
            <p className="text-base leading-[1.65] font-semibold text-ak-dark">
              Penanggung jawab: {department.lead ?? "belum diberikan"}
            </p>
            <p className="text-[13px] leading-[1.65] text-ak-muted">
              Kontak bidang: {department.contact ?? "belum dikonfirmasi"}
            </p>
            <a href="/kontak" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Hubungi masjid
              <ArrowUpRight aria-hidden="true" />
            </a>
          </aside>
        </div>
        <section aria-labelledby="kegiatan-terkait" className="flex w-full flex-col gap-7 lg:gap-9">
          <h2 id="kegiatan-terkait" className={headingClass}>
            Kegiatan terkait
          </h2>
          {department.activities.length > 0 ? (
            <ul className="flex flex-col gap-4">
              {department.activities.map((activity) => (
                <li key={activity.id}>
                  <a
                    href={activity.href}
                    className="flex items-center gap-4 rounded-[5px] bg-ak-cream px-5 py-4 hover:bg-ak-pale"
                  >
                    <CalendarDays aria-hidden="true" className="size-5 shrink-0 text-primary" />
                    <span className="min-w-0 flex-1 text-base leading-[1.65] font-semibold text-ak-dark">
                      {activity.title}
                    </span>
                    <span className="shrink-0 text-[11px] leading-[1.65] text-ak-brown">
                      {activity.schedule}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              title="Belum ada kegiatan terkait"
              description="Kegiatan akan ditautkan setelah bidang dan agenda dikonfirmasi."
            />
          )}
        </section>
      </div>
    </div>
  );
}
