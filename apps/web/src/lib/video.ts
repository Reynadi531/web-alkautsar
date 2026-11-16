import { createServerFn } from "@tanstack/react-start";

import { cmsDate, cmsImage, cmsList, cmsText } from "./cms.server";
import { ALL_PERIODS, matchesPeriod, matchesQuery } from "./site";

export const ALL_VIDEOS = "Semua video";

export interface VideoItem {
  id: string;
  title: string;
  meta: string;
  summary: string;
  image?: { src: string; alt: string };
  /** Link to the recording; absent until an official video exists. */
  url?: string;
  category?: string;
  featured: boolean;
  /** Contoh konten: not a real recording yet. */
  sample: boolean;
  /** ISO date (YYYY-MM-DD); absent while the date is unknown. */
  date?: string;
}

export const getVideos = createServerFn({ method: "GET" }).handler(async () => {
  const records = await cmsList("video", { sort: "-unggulan,urutan,-tanggal" });
  return records.map((record): VideoItem => {
    const { date, dateLabel } = cmsDate(record, "tanggal");
    const duration = cmsText(record, "durasi");
    const src = cmsImage(record, "thumbnail");
    return {
      id: record.id,
      title: record.judul,
      meta:
        duration || dateLabel
          ? [duration, dateLabel].filter(Boolean).join(" · ")
          : "Durasi dan tanggal belum diberikan",
      summary: cmsText(record, "ringkasan") ?? "",
      image: src ? { src, alt: cmsText(record, "alt_thumbnail") ?? "" } : undefined,
      url: cmsText(record, "url_video"),
      category: cmsText(record, "kategori"),
      featured: Boolean(record.unggulan),
      sample: Boolean(record.contoh),
      date,
    };
  });
});

export interface VideoFilters {
  query: string;
  category: string;
  period: string;
}

export function filterVideos(
  videos: readonly VideoItem[],
  { query, category, period }: VideoFilters,
) {
  const results = videos.filter(
    (video) =>
      (category === ALL_VIDEOS || video.category === category) &&
      matchesPeriod(video.date, period) &&
      matchesQuery(query, video.title, video.meta, video.summary),
  );
  const featured = results.find((video) => video.featured) ?? null;
  return {
    featured,
    others: results.filter((video) => video !== featured),
    isFiltering: query.trim() !== "" || category !== ALL_VIDEOS || period !== ALL_PERIODS,
  };
}
