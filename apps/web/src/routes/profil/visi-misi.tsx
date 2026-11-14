import { createFileRoute } from "@tanstack/react-router";
import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { ArrowUpRight } from "lucide-react";

import { PageHeader } from "../../components/page-header";
import { site } from "../../lib/site";

export const Route = createFileRoute("/profil/visi-misi")({
  head: () => ({
    meta: [
      { title: `Visi dan Misi | ${site.name}` },
      {
        name: "description",
        content:
          "Landasan bersama bagi kegiatan dan pengelolaan masjid. Rumusan resmi menunggu konfirmasi pengurus.",
      },
    ],
  }),
  component: VisionMissionPage,
});

function VisionMissionPage() {
  return (
    <div className="vision-mission-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Visi dan Misi" }]}
        label="Masjid Al-Kautsar"
        title="Visi dan Misi"
        intro="Landasan bersama bagi kegiatan dan pengelolaan masjid."
      />

      <div className="flex flex-col items-start gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <aside
          id="catatan-validasi"
          aria-label="Catatan validasi visi dan misi"
          className="w-full rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted"
        >
          Rumusan visi dan misi resmi belum diberikan. Tidak ada pernyataan di halaman ini yang
          dianggap telah disahkan.
        </aside>

        <div id="visi-dan-misi" className="grid w-full items-start gap-5 md:grid-cols-2 lg:gap-7">
          <section
            id="visi"
            aria-labelledby="judul-visi"
            className="flex flex-col gap-5 rounded-[7px] bg-ak-green p-[26px] lg:p-[42px]"
          >
            <h2
              id="judul-visi"
              className="text-[11px] leading-[1.65] font-semibold text-ak-on-dark-muted"
            >
              VISI
            </h2>
            <p className="text-[26px] leading-[1.65] font-semibold text-white lg:text-[34px]">
              Rumusan visi resmi masjid
            </p>
            <p className="text-sm leading-[1.65] text-ak-on-dark">
              Menunggu teks resmi dari pengurus Masjid Al-Kautsar Pharmindo.
            </p>
          </section>

          <section id="misi" aria-labelledby="judul-misi" className="flex flex-col gap-5">
            <h2
              id="judul-misi"
              className="text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]"
            >
              Misi
            </h2>
            <ol aria-label="Butir misi, menunggu konfirmasi resmi" className="flex flex-col gap-5">
              {["01", "02", "03"].map((number) => (
                <li
                  key={number}
                  className="flex items-start gap-[18px] rounded-[5px] bg-ak-cream p-[22px]"
                >
                  <span
                    aria-hidden="true"
                    className="w-9 shrink-0 text-lg leading-[1.65] font-semibold text-ak-brown"
                  >
                    {number}
                  </span>
                  <p className="text-sm leading-[1.65] text-ak-muted">
                    Butir misi resmi akan ditambahkan setelah dikonfirmasi.
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <a href="/profil" className={buttonVariants({ variant: "outline", size: "lg" })}>
          Kembali ke daftar
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
