export const ALL_VIDEOS = "Semua video";
export const ALL_PERIODS = "Periode: semua";

export const categoryOptions = [ALL_VIDEOS] as const;

export interface VideoItem {
  id: string;
  title: string;
  meta: string;
  summary: string;
  href: string;
  image: { src: string; alt: string };
  /** Contoh konten: not a real recording yet. */
  sample?: boolean;
  /** ISO date (YYYY-MM-DD). Leave empty while the date is unknown. */
  date?: string;
}

export const featuredVideo: VideoItem = {
  id: "mengenal-masjid-al-kautsar",
  title: "Mengenal Masjid Al-Kautsar",
  meta: "CONTOH KONTEN · video dan durasi belum tersedia",
  summary: "Pengenalan singkat masjid dan kegiatan jamaah.",
  href: "/video/tonton",
  image: {
    src: "/images/jamaah-masjid.webp",
    alt: "Jamaah duduk bersama di dalam masjid pada siang hari",
  },
  sample: true,
};

export const otherVideos: readonly VideoItem[] = [
  {
    id: "potret-bangunan-masjid",
    title: "Potret bangunan masjid",
    meta: "Durasi dan tanggal belum diberikan",
    summary: "Thumbnail contoh memakai foto masjid asli.",
    href: "/video/tonton",
    image: {
      src: "/images/masjid-tampak-depan.webp",
      alt: "Tampak depan bangunan Masjid Al-Kautsar",
    },
    sample: true,
  },
  {
    id: "di-lingkungan-pharmindo",
    title: "Di lingkungan Pharmindo",
    meta: "Durasi dan tanggal belum diberikan",
    summary: "Contoh konten — bukan rekaman video yang sudah tersedia.",
    href: "/video/tonton?contoh=2",
    image: {
      src: "/images/masjid-udara.webp",
      alt: "Pandangan udara Masjid Al-Kautsar di lingkungan Pharmindo",
    },
    sample: true,
  },
];

export function periodOptions(): string[] {
  const years = new Set<string>();
  for (const item of [featuredVideo, ...otherVideos]) {
    if (item.date) years.add(item.date.slice(0, 4));
  }
  return [
    ALL_PERIODS,
    ...[...years]
      .sort()
      .reverse()
      .map((year) => `Periode: ${year}`),
  ];
}

export interface VideoFilters {
  query: string;
  category: string;
  period: string;
}

function matchesPeriod(date: string | undefined, period: string) {
  if (period === ALL_PERIODS) return true;
  return Boolean(date) && `Periode: ${date!.slice(0, 4)}` === period;
}

function matchesQuery(query: string, ...fields: string[]) {
  const needle = query.trim().toLowerCase();
  return needle === "" || fields.some((field) => field.toLowerCase().includes(needle));
}

function matches(item: VideoItem, { query, period }: VideoFilters) {
  return (
    matchesPeriod(item.date, period) && matchesQuery(query, item.title, item.meta, item.summary)
  );
}

export function filterVideos(filters: VideoFilters) {
  return {
    featured: matches(featuredVideo, filters) ? featuredVideo : null,
    others: otherVideos.filter((video) => matches(video, filters)),
    isFiltering:
      filters.query.trim() !== "" ||
      filters.category !== categoryOptions[0] ||
      filters.period !== ALL_PERIODS,
  };
}

export const hasOfficialVideos = [featuredVideo, ...otherVideos].some((video) => !video.sample);
