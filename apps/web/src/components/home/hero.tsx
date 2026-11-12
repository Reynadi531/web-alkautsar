import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { ArrowUpRight } from "lucide-react";

import { SectionLabel } from "../section-label";
import { site } from "../../lib/site";

export function Hero() {
  return (
    <section id="hero" className="grid lg:min-h-[610px] lg:grid-cols-[792fr_648fr]">
      <div className="flex flex-col justify-center gap-6 bg-ak-pale px-[26px] py-14 lg:px-19 lg:py-20">
        <SectionLabel>Masjid di Komplek Pharmindo</SectionLabel>
        <h1 className="text-[33px] leading-[1.5] font-bold text-ak-dark lg:text-[54px]">
          Masjid Al-Kautsar
          <br />
          Pharmindo
        </h1>
        <p className="text-[15px] leading-normal text-ak-muted lg:text-[17px]">
          Ruang ibadah dan kebersamaan warga di Komplek Pharmindo, Cimahi Selatan.
        </p>
        <div className="flex flex-wrap gap-3.5">
          <a href="/agenda" className={buttonVariants()}>
            Lihat Kegiatan
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "outline" })}
          >
            Petunjuk Arah
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="relative flex min-h-[420px] flex-col justify-end overflow-hidden p-[26px] lg:min-h-0 lg:p-10">
        <img
          src="/images/masjid-udara.webp"
          alt="Foto udara Masjid Al-Kautsar Pharmindo"
          width={1536}
          height={1024}
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-ak-dark/35" />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-ak-dark/0 from-40% to-[#0b241d]/87"
        />
        <div className="relative flex flex-col gap-3">
          <p className="text-[11px] font-semibold tracking-[0.164em] text-[#dce7d7] uppercase">
            Lokasi Masjid
          </p>
          <p className="text-xl leading-normal font-semibold text-white lg:text-[23px]">
            Jl. Trowulan V, Blok T —
            <br />
            Melong, Cimahi Selatan
          </p>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-[13px] leading-normal text-white hover:underline"
          >
            Lihat di peta <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
