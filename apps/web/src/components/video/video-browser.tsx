import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";

import { useContact } from "../../lib/kontak";
import { ALL_PERIODS, categoryOptions, periodOptions } from "../../lib/site";
import { ALL_VIDEOS, filterVideos, type VideoItem } from "../../lib/video";
import { EmptyState } from "../empty-state";
import { SearchField, SelectField } from "../filter-controls";
import { VideoCard } from "./video-card";

const sectionTitle = "text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]";

export function VideoBrowser({ videos }: { videos: readonly VideoItem[] }) {
  const { youtubeUrl } = useContact();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL_VIDEOS);
  const [period, setPeriod] = useState(ALL_PERIODS);
  const categories = useMemo(
    () =>
      categoryOptions(
        ALL_VIDEOS,
        videos.map((video) => video.category),
      ),
    [videos],
  );
  const periods = useMemo(() => periodOptions(videos.map((video) => video.date)), [videos]);

  const { featured, others, isFiltering } = filterVideos(videos, { query, category, period });
  const hasResults = featured !== null || others.length > 0;
  const hasOfficial = videos.some((video) => !video.sample);

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
          options={categories}
          onChange={setCategory}
        />
        <SelectField label="Periode" value={period} options={periods} onChange={setPeriod} />
      </search>

      <p role="status" className="sr-only">
        {isFiltering ? `${(featured ? 1 : 0) + others.length} hasil ditemukan` : ""}
      </p>

      {!hasResults && videos.length > 0 && (
        <EmptyState
          title="Tidak ada hasil yang cocok"
          description="Coba kata kunci lain, atau ubah kategori dan periode."
        />
      )}

      {featured && (
        <section id="video-utama" aria-label="Video utama" className="flex flex-col gap-7 lg:gap-9">
          <h2 className={sectionTitle}>Video utama</h2>
          <div className="relative flex min-h-[220px] flex-col justify-end gap-4 overflow-hidden rounded-[7px] bg-ak-dark p-7 lg:min-h-[430px]">
            {featured.image && (
              <img
                src={featured.image.src}
                alt={featured.image.alt}
                width={1600}
                height={900}
                className="absolute inset-0 size-full object-cover"
              />
            )}
            <div aria-hidden="true" className="absolute inset-0 bg-ak-dark/[0.47]" />
            <h3 className="relative text-[23px] leading-[1.65] font-semibold text-white lg:text-[32px]">
              {featured.url ? (
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="after:absolute after:inset-0 hover:underline"
                >
                  {featured.title}
                </a>
              ) : (
                featured.title
              )}
            </h3>
            <p className="relative text-[11px] leading-[1.65] text-[#e0ebdd]">
              {featured.sample ? "CONTOH KONTEN · " : ""}
              {featured.meta}
            </p>
          </div>
          <p className="text-xs leading-[1.65] text-ak-muted">
            {featured.url
              ? featured.summary
              : "Pemutaran belum tersedia. Rekaman video resmi belum diberikan."}
          </p>
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
            {others.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>
      )}

      {!isFiltering && (
        <>
          {youtubeUrl ? (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center gap-2.5 self-start rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale"
            >
              Kunjungi kanal YouTube <ArrowUpRight aria-hidden="true" className="size-[15px]" />
            </a>
          ) : (
            <div className="flex flex-col gap-1.5 rounded-[5px] bg-ak-pale px-[18px] py-3.5">
              <p className="text-xs leading-[1.65] text-ak-muted">
                Kanal YouTube masjid belum dikonfirmasi. Tidak ada tautan kanal atau video rekaan.
              </p>
            </div>
          )}
          {!hasOfficial && (
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
