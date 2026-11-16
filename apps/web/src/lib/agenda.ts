import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  cmsBySlug,
  cmsDate,
  cmsFile,
  cmsFilter,
  cmsHtml,
  cmsImage,
  cmsList,
  cmsText,
  cmsToday,
  type CmsRecord,
} from "./cms.server";
import { ALL_PERIODS, matchesPeriod, matchesQuery } from "./site";

export const AGENDA_CATEGORY = "Agenda";
export const ARCHIVE_CATEGORY = "Arsip";

export const agendaCategories = ["Semua kategori", AGENDA_CATEGORY, ARCHIVE_CATEGORY] as const;

export type EventKind = "agenda" | "seminar";

export interface AgendaEvent {
  id: string;
  title: string;
  category: "Agenda" | "Seminar";
  schedule: string;
  summary: string;
  href: string;
  image?: { src: string; alt: string };
  featured: boolean;
  /** Contoh konten: placeholder from the design, not a confirmed event. */
  sample: boolean;
  /** ISO date (YYYY-MM-DD); absent while the date is unconfirmed. */
  date?: string;
  theme?: string;
}

export interface AgendaDetail extends AgendaEvent {
  information: [label: string, value: string][];
  registrationUrl?: string;
  /** Sanitized HTML. */
  description: string;
  materialUrl?: string;
  related: AgendaEvent[];
}

export interface ArchiveEntry {
  id: string;
  title: string;
  status: string;
  date?: string;
  href?: string;
}

export const ARCHIVE_PAGE_SIZE = 10;

const kindSchema = z.enum(["agenda", "seminar"]);
const UPCOMING_FIRST = "-unggulan,tanggal,dibuat";

function toEvent(kind: EventKind, record: CmsRecord): AgendaEvent & { dateLabel?: string } {
  const { date, dateLabel } = cmsDate(record, "tanggal");
  const src = cmsImage(record, "gambar");
  return {
    id: record.id,
    title: record.judul,
    category: kind === "agenda" ? "Agenda" : "Seminar",
    schedule: `${dateLabel ?? "Tanggal belum ditetapkan"} · ${cmsText(record, "waktu") ?? "Waktu WIB belum dikonfirmasi"}`,
    summary: cmsText(record, "ringkasan") ?? "",
    href: `/${kind}/${record.slug}`,
    image: src ? { src, alt: cmsText(record, "alt_gambar") ?? "" } : undefined,
    featured: Boolean(record.unggulan),
    sample: Boolean(record.contoh),
    date,
    dateLabel,
    theme: cmsText(record, "tema"),
  };
}

function toArchiveRow(record: CmsRecord): ArchiveEntry {
  return {
    id: record.id,
    title: record.judul,
    status: cmsText(record, "keterangan") ?? "ARSIP",
    date: cmsDate(record, "tanggal").date,
  };
}

/** Dated events that already took place leave the upcoming list and join the archive. */
async function loadEvents(kind: EventKind) {
  const [records, rows] = await Promise.all([
    cmsList(kind, { sort: UPCOMING_FIRST }),
    cmsList("arsip_kegiatan", { sort: "urutan,-tanggal" }),
  ]);
  const today = cmsToday();
  const events: AgendaEvent[] = [];
  const past: ArchiveEntry[] = [];
  for (const record of records) {
    const { dateLabel, ...event } = toEvent(kind, record);
    if (event.date && event.date < today) {
      past.push({
        id: event.id,
        title: event.title,
        status: `ARSIP · ${dateLabel}`,
        date: event.date,
        href: event.href,
      });
    } else {
      events.push(event);
    }
  }
  past.sort((a, b) => b.date!.localeCompare(a.date!));
  return { events, archive: [...past, ...rows.map(toArchiveRow)] };
}

export const getEvents = createServerFn({ method: "GET" })
  .validator(kindSchema)
  .handler(({ data }) => loadEvents(data));

export const getEvent = createServerFn({ method: "GET" })
  .validator(z.object({ kind: kindSchema, slug: z.string().min(1).max(120) }))
  .handler(async ({ data: { kind, slug } }): Promise<AgendaDetail | null> => {
    const record = await cmsBySlug(kind, slug);
    if (!record) return null;

    const related = await cmsList(kind, {
      filter: cmsFilter("id != {:id} && contoh = false && (tanggal = '' || tanggal >= {:today})", {
        id: record.id,
        today: `${cmsToday()} 00:00:00`,
      }),
      sort: UPCOMING_FIRST,
      limit: 2,
    });
    const { dateLabel, ...event } = toEvent(kind, record);
    const registrationUrl = cmsText(record, "url_pendaftaran");

    return {
      ...event,
      information: [
        ["Tanggal", dateLabel ?? "Belum ditetapkan"],
        ["Waktu", cmsText(record, "waktu") ?? "WIB · belum dikonfirmasi"],
        ["Lokasi", cmsText(record, "lokasi") ?? "Belum dikonfirmasi"],
        kind === "agenda"
          ? ["Narasumber", cmsText(record, "narasumber") ?? "Belum diberikan"]
          : ["Pembicara", cmsText(record, "pembicara") ?? "Belum diberikan"],
        [
          "Pendaftaran",
          cmsText(record, "keterangan_pendaftaran") ??
            (registrationUrl ? "Dibuka" : "Belum tersedia"),
        ],
      ],
      registrationUrl,
      description: cmsHtml(record, "deskripsi"),
      materialUrl: cmsFile(record, "materi"),
      related: related.map((item) => {
        const { dateLabel: _, ...other } = toEvent(kind, item);
        return other;
      }),
    };
  });

/** Beranda: confirmed upcoming agenda and the activity archive. */
export const getHomeActivities = createServerFn({ method: "GET" }).handler(async () => {
  const [{ events }, rows] = await Promise.all([
    loadEvents("agenda"),
    cmsList("arsip_kegiatan", { sort: "urutan,-tanggal", limit: 5 }),
  ]);
  return {
    upcoming: events.filter((event) => !event.sample).slice(0, 3),
    archive: rows.map(toArchiveRow),
  };
});

export interface AgendaFilters {
  query: string;
  category: string;
  period: string;
}

export function filterAgenda(
  allEvents: readonly AgendaEvent[],
  allArchive: readonly ArchiveEntry[],
  { query, category, period }: AgendaFilters,
) {
  const events =
    category === ARCHIVE_CATEGORY
      ? []
      : allEvents.filter(
          (event) =>
            matchesPeriod(event.date, period) &&
            matchesQuery(query, event.title, event.summary, event.schedule),
        );
  const archive =
    category === AGENDA_CATEGORY
      ? []
      : allArchive.filter(
          (entry) =>
            matchesPeriod(entry.date, period) && matchesQuery(query, entry.title, entry.status),
        );

  return {
    featured: events.filter((event) => event.featured),
    upcoming: events.filter((event) => !event.featured),
    archive,
    isFiltering: query.trim() !== "" || category !== agendaCategories[0] || period !== ALL_PERIODS,
  };
}
