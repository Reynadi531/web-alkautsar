import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { cn } from "@web-alkautsar/ui/lib/utils";
import { ArrowUpRight } from "lucide-react";

import { SectionLabel } from "../section-label";
import { site } from "../../lib/site";

export function Hero() {
  return (
    <section id="hero" className="grid lg:min-h-[610px] lg:grid-cols-[792fr_648fr]">
      <div className="flex min-h-[418px] flex-col justify-between gap-5 bg-primary px-[26px] pt-10 pb-[26px] lg:min-h-0 lg:justify-center lg:gap-6 lg:bg-ak-pale lg:px-19 lg:py-20">
        <SectionLabel className="text-[9px] tracking-[1.1px] text-ak-on-dark-muted lg:text-[11px] lg:tracking-[1.8px] lg:text-ak-brown">
          Masjid di Komplek Pharmindo
        </SectionLabel>
        <h1 className="text-[33px] leading-[1.55] font-bold text-white lg:text-[54px] lg:leading-[1.5] lg:text-ak-dark">
          Masjid Al-Kautsar
          <br />
          Pharmindo
        </h1>
        <p className="text-sm leading-[1.55] text-ak-on-dark lg:text-[17px] lg:leading-normal lg:text-ak-muted">
          Ruang ibadah dan kebersamaan warga di Komplek Pharmindo, Cimahi Selatan.
        </p>
        <div className="flex flex-wrap gap-3 lg:gap-3.5">
          <a
            href="/agenda"
            className={cn(
              buttonVariants(),
              "border-[#e4edc5] bg-[#e4edc5] px-3.5 text-xs text-primary hover:bg-white lg:border-transparent lg:bg-primary lg:px-5 lg:text-[13px] lg:text-white lg:hover:bg-ak-dark",
            )}
          >
            Lihat Kegiatan
            <ArrowUpRight aria-hidden="true" />
          </a>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "border-[#729688] px-3.5 text-xs text-white hover:bg-white/10 lg:border-ak-border lg:px-5 lg:text-[13px] lg:text-primary lg:hover:bg-ak-pale",
            )}
          >
            Petunjuk Arah
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-[#729688] pt-3 text-[9px] text-ak-on-dark lg:hidden">
          <span className="tracking-[0.6px] uppercase">Melong · Cimahi Selatan</span>
          <a
            href={site.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-11 items-center hover:underline"
          >
            LIHAT PETA <ArrowUpRight aria-hidden="true" className="ml-1 size-3" />
          </a>
        </div>
      </div>

      <div className="relative hidden flex-col justify-end overflow-hidden p-10 lg:flex">
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
            className="w-fit py-1 text-[13px] leading-normal text-white hover:underline"
          >
            Lihat di peta <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
