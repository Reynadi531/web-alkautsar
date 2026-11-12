export const AGENDA_CATEGORY = "Agenda";
export const ARCHIVE_CATEGORY = "Arsip";

export const categoryOptions = ["Semua kategori", AGENDA_CATEGORY, ARCHIVE_CATEGORY] as const;

export interface AgendaEvent {
  id: string;
  title: string;
  category: typeof AGENDA_CATEGORY;
  schedule: string;
  summary: string;
  href: string;
  image: { src: string; alt: string };
  featured?: boolean;
  sample?: boolean;
  /** ISO date (YYYY-MM-DD). Leave empty while the date is unconfirmed. */
  date?: string;
}

export interface ArchiveEntry {
  id: string;
  title: string;
  status: string;
  /** ISO date (YYYY-MM-DD). Leave empty while the date is unknown. */
  date?: string;
}

export const agendaEvents: readonly AgendaEvent[] = [
  {
    id: "kajian-dan-kebersamaan-warga",
    title: "Kajian dan kebersamaan warga",
    category: AGENDA_CATEGORY,
    schedule: "Tanggal belum ditetapkan · Waktu WIB belum dikonfirmasi",
    summary: "CONTOH KONTEN — bukan agenda aktif. Lokasi dan pendaftaran menunggu konfirmasi.",
    href: "/agenda/detail",
    image: {
      src: "/images/jamaah-masjid.webp",
      alt: "Jamaah duduk bersama di dalam masjid pada siang hari",
    },
    featured: true,
    sample: true,
  },
];

export const archiveEntries: readonly ArchiveEntry[] = [
  { id: "kajian-keislaman", title: "Kajian keislaman", status: "ARSIP · detail belum tersedia" },
  { id: "pemuda-ramadan", title: "Pemuda & Ramadan", status: "ARSIP · detail belum tersedia" },
  { id: "kegiatan-upz", title: "Kegiatan UPZ", status: "ARSIP · detail belum tersedia" },
];

export const ARCHIVE_PAGE_SIZE = 10;
export const ALL_PERIODS = "Periode: semua";

export function periodOptions(): string[] {
  const years = new Set<string>();
  for (const item of [...agendaEvents, ...archiveEntries]) {
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

export interface AgendaFilters {
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

export function filterAgenda({ query, category, period }: AgendaFilters) {
  const events =
    category === ARCHIVE_CATEGORY
      ? []
      : agendaEvents.filter(
          (event) =>
            matchesPeriod(event.date, period) &&
            matchesQuery(query, event.title, event.summary, event.schedule),
        );
  const archive =
    category === AGENDA_CATEGORY
      ? []
      : archiveEntries.filter(
          (entry) =>
            matchesPeriod(entry.date, period) && matchesQuery(query, entry.title, entry.status),
        );

  return {
    featured: events.filter((event) => event.featured),
    upcoming: events.filter((event) => !event.featured),
    archive,
    isFiltering: query.trim() !== "" || category !== categoryOptions[0] || period !== ALL_PERIODS,
  };
}
