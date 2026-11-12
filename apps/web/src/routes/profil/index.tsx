import { createFileRoute } from "@tanstack/react-router";
import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { ArrowUpRight } from "lucide-react";

import { PageHeader } from "../../components/page-header";
import { SectionLabel } from "../../components/section-label";
import { site } from "../../lib/site";

export const Route = createFileRoute("/profil/")({
  head: () => ({
    meta: [
      { title: `Tentang Masjid — ${site.name}` },
      {
        name: "description",
        content:
          "Mengenal ruang ibadah dan kebersamaan warga di Komplek Pharmindo, Cimahi Selatan.",
      },
    ],
  }),
  component: ProfilePage,
});

const exploreCards = [
  {
    title: "Sejarah",
    summary: "Narasi dan perjalanan masjid menunggu arsip terverifikasi.",
    href: "/profil/sejarah",
  },
  {
    title: "Visi & Misi",
    summary: "Pernyataan resmi akan ditambahkan setelah dikonfirmasi.",
    href: "/profil/visi-misi",
  },
] as const;

function ProfilePage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Tentang Masjid" }]}
        label="Masjid Al-Kautsar"
        title="Tentang Masjid"
        intro="Mengenal ruang ibadah dan kebersamaan warga di Komplek Pharmindo, Cimahi Selatan."
      />

      <div className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <section
          id="pengenalan"
          className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:items-start lg:gap-7"
        >
          <div className="flex flex-col items-start gap-5">
            <SectionLabel>Masjid Al-Kautsar Pharmindo</SectionLabel>
            <h2 className="text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]">
              Dekat dengan warga, tumbuh dalam kebersamaan.
            </h2>
            <p className="text-sm leading-[1.65] text-ak-muted lg:text-base">
              Masjid Al-Kautsar berada di Komplek Pharmindo, Kelurahan Melong, Kecamatan Cimahi
              Selatan, Kota Cimahi.
            </p>
            <a href="/kontak" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Kontak &amp; lokasi
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          <div className="grid aspect-378/220 grid-cols-[356fr_264fr] gap-2.5 overflow-hidden rounded-[7px] bg-ak-cream md:aspect-630/330">
            <img
              src="/images/masjid-tampak-depan.webp"
              alt="Tampak depan Masjid Al-Kautsar"
              width={1400}
              height={788}
              className="size-full object-cover"
            />
            <img
              src="/images/masjid-interior.webp"
              alt="Ruang dalam masjid dengan jendela clerestory yang terang"
              width={900}
              height={1125}
              className="size-full object-contain"
            />
          </div>
        </section>

        <section id="jelajahi-profil" className="grid gap-5 lg:grid-cols-2 lg:gap-7">
          {exploreCards.map((card) => (
            <div
              key={card.title}
              className="flex flex-col items-start gap-3.5 rounded-[7px] bg-ak-cream p-[26px]"
            >
              <h2 className="text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]">
                {card.title}
              </h2>
              <p className="text-sm leading-[1.65] text-ak-muted">{card.summary}</p>
              <a href={card.href} className={buttonVariants({ variant: "outline", size: "lg" })}>
                Selengkapnya
                <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
          ))}
        </section>

        <section
          id="pengelolaan"
          aria-label="Pengelolaan masjid"
          className="flex flex-col items-start gap-5 lg:flex-row lg:gap-7"
        >
          <a href="/profil/pengurus" className={buttonVariants({ size: "lg" })}>
            Kepengurusan
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a href="/profil/bidang" className={buttonVariants({ variant: "outline", size: "lg" })}>
            Bidang
            <ArrowUpRight aria-hidden="true" />
          </a>
        </section>
      </div>
    </>
  );
}
