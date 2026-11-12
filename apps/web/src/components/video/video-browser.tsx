import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { useMemo, useState } from "react";

import {
  categoryOptions,
  filterVideos,
  hasOfficialVideos,
  periodOptions,
  ALL_PERIODS,
} from "../../lib/video";
import { EmptyState } from "../empty-state";
import { SearchField, SelectField } from "../filter-controls";
import { VideoCard } from "./video-card";

const sectionTitle = "text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]";

export function VideoBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(categoryOptions[0]);
  const [period, setPeriod] = useState<string>(ALL_PERIODS);
  const periods = useMemo(periodOptions, []);

  const { featured, others, isFiltering } = filterVideos({ query, category, period });
  const hasResults = featured !== null || others.length > 0;

  return (
    <div className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
      <search
        aria-label="Pencarian dan filter"
        className="flex flex-col gap-5 lg:flex-row lg:gap-7"
      >
        <SearchField value={query} onChange={setQuery} />
        <SelectField
          label="Kategori"
          value={category}
          options={categoryOptions}
          onChange={setCategory}
        />
        <SelectField label="Periode" value={period} options={periods} onChange={setPeriod} />
      </search>

      <p role="status" className="sr-only">
        {isFiltering ? `${(featured ? 1 : 0) + others.length} hasil ditemukan` : ""}
      </p>

      {!hasResults && (
        <EmptyState
          title="Tidak ada hasil yang cocok"
          description="Coba kata kunci lain, atau ubah periode."
        />
      )}

      {featured && (
        <section id="video-utama" aria-label="Video utama" className="flex flex-col gap-7 lg:gap-9">
          <h2 className={sectionTitle}>Video utama</h2>
          <div className="relative flex min-h-[220px] flex-col justify-end gap-4 overflow-hidden rounded-[7px] bg-ak-dark p-7 lg:min-h-[430px]">
            <img
              src={featured.image.src}
              alt={featured.image.alt}
              width={1600}
              height={900}
              className="absolute inset-0 size-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-ak-dark/[0.47]" />
            <CirclePlay aria-hidden="true" className="relative size-[54px] text-white" />
            <h3 className="relative text-[23px] leading-[1.65] font-semibold text-white lg:text-[32px]">
              {featured.title}
            </h3>
            <p className="relative text-[11px] leading-[1.65] text-[#e0ebdd]">{featured.meta}</p>
          </div>
          <a
            href={featured.href}
            className={`${buttonVariants({ variant: "outline", size: "lg" })} self-start`}
          >
            Lihat tampilan pemutaran
            <ArrowUpRight aria-hidden="true" />
          </a>
        </section>
      )}

      {others.length > 0 && (
        <section
          id="video-lainnya"
          aria-label="Video lainnya"
          className="flex flex-col gap-7 lg:gap-9"
        >
          <h2 className={sectionTitle}>Video lainnya</h2>
          <div className="flex flex-col gap-5 lg:grid lg:grid-cols-2 lg:gap-7">
            {others.map((video, index) => (
              <VideoCard key={video.id} video={video} contain={index === 1} />
            ))}
          </div>
        </section>
      )}

      {!isFiltering && (
        <>
          <div className="flex flex-col gap-1.5 rounded-[5px] bg-ak-pale px-[18px] py-3.5">
            <p className="text-xs leading-[1.65] text-ak-muted">
              Kanal YouTube masjid belum dikonfirmasi. Tidak ada tautan kanal atau video rekaan.
            </p>
          </div>
          {!hasOfficialVideos && (
            <EmptyState
              title="Belum ada video resmi"
              description="Tampilan data kosong sebelum sumber video diberikan."
            />
          )}
        </>
      )}
    </div>
  );
}
