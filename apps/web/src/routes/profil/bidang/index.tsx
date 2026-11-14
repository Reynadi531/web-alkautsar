import { createFileRoute } from "@tanstack/react-router";
import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { ArrowUpRight, BookOpen, HeartHandshake } from "lucide-react";

import { EmptyState } from "../../../components/empty-state";
import { PageHeader } from "../../../components/page-header";
import { SectionLabel } from "../../../components/section-label";
import { site } from "../../../lib/site";

export const Route = createFileRoute("/profil/bidang/")({
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
  return (
    <div className="management-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Bidang Masjid" }]}
        label="Masjid Al-Kautsar"
        title="Bidang Masjid"
        intro="Ruang pengelolaan yang mendukung ibadah dan kebersamaan warga."
      />
      <div className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <aside
          aria-label="Catatan validasi bidang"
          className="rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted"
        >
          Daftar bidang resmi belum tersedia. Dua bidang berikut adalah contoh kategori untuk
          kebutuhan desain, bukan struktur Al-Kautsar yang telah disahkan.
        </aside>
        <section aria-label="Contoh bidang" className="grid gap-5 md:grid-cols-2 lg:gap-7">
          {[
            { title: "Ibadah & Dakwah", icon: BookOpen, href: "/profil/bidang/detail" },
            {
              title: "Sosial & Kemasyarakatan",
              icon: HeartHandshake,
              href: "/profil/bidang/detail?contoh=2",
            },
          ].map(({ title, icon: Icon, href }) => (
            <article
              key={title}
              className="flex min-w-0 flex-col items-start gap-[18px] rounded-[7px] bg-ak-cream p-7"
            >
              <Icon aria-hidden="true" className="size-[30px] text-ak-green" />
              <SectionLabel>Contoh konten</SectionLabel>
              <h2 className="text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]">
                {title}
              </h2>
              <p className="text-sm leading-[1.65] text-ak-muted">
                Deskripsi dan ruang lingkup bidang akan disesuaikan dengan struktur resmi masjid.
              </p>
              <a
                href={href}
                aria-label={`Detail bidang ${title}`}
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Detail bidang
                <ArrowUpRight aria-hidden="true" />
              </a>
            </article>
          ))}
        </section>
        <EmptyState
          title="Bidang resmi belum dikonfirmasi"
          description="Susunan bidang akan diperbarui setelah ditetapkan."
        />
      </div>
    </div>
  );
}
