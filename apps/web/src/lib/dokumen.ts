import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  cmsBySlug,
  cmsDate,
  cmsFile,
  cmsImage,
  cmsList,
  cmsText,
  type CmsRecord,
} from "./cms.server";

/** Document catalogues sharing one layout; each is its own CMS collection. */
export type Catalog = "pustaka" | "publikasi" | "buletin";

export const catalogLabels = {
  pustaka: "Pustaka",
  publikasi: "Publikasi",
  buletin: "Buletin",
} as const satisfies Record<Catalog, string>;

export interface DocumentItem {
  id: string;
  title: string;
  href: string;
  summary: string;
  /** Catalogue-specific line under the title, e.g. "Penulis: …". */
  metadata: string;
  category?: string;
  /** ISO date (YYYY-MM-DD); absent while unconfirmed. */
  date?: string;
  cover?: string;
  /** Contoh konten: no official document behind this entry. */
  sample: boolean;
}

export interface DocumentDetail extends DocumentItem {
  facts: [label: string, value: string][];
  fileUrl?: string;
  downloadUrl?: string;
}

const catalogSchema = z.enum(["pustaka", "publikasi", "buletin"]);
const MISSING = "Belum diberikan";

function toDocument(catalog: Catalog, record: CmsRecord): DocumentDetail {
  const { date, dateLabel } = cmsDate(record, "tanggal");
  const title: string = record.judul;
  const category = cmsText(record, "kategori");

  const specific: [string, string] =
    catalog === "buletin"
      ? ["Nomor edisi", cmsText(record, "nomor_edisi") ?? MISSING]
      : catalog === "publikasi"
        ? ["Jenis", cmsText(record, "jenis") ?? catalogLabels.publikasi]
        : ["Penulis", cmsText(record, "penulis") ?? MISSING];
  const lower = (value: string) => (value === MISSING ? "belum diberikan" : value);
  const metadata =
    catalog === "pustaka"
      ? `Penulis: ${lower(specific[1])}`
      : `${specific[0]}: ${lower(specific[1])} · Tanggal: ${dateLabel ?? "belum diberikan"}`;

  return {
    id: record.id,
    title,
    href: `/${catalog}/${record.slug}`,
    summary: cmsText(record, "ringkasan") ?? "",
    metadata,
    category,
    date,
    cover: cmsImage(record, "sampul", 640),
    sample: Boolean(record.contoh),
    facts: [
      ["Judul", title],
      specific,
      ["Kategori", category ?? MISSING],
      ["Tanggal", dateLabel ?? "Belum dikonfirmasi"],
    ],
    fileUrl: cmsFile(record, "berkas"),
    downloadUrl: cmsFile(record, "berkas", { download: true }),
  };
}

export const getDocuments = createServerFn({ method: "GET" })
  .validator(catalogSchema)
  .handler(async ({ data: catalog }) =>
    (await cmsList(catalog, { sort: "-tanggal,-dibuat" })).map((record): DocumentItem => {
      const { facts: _, fileUrl: __, downloadUrl: ___, ...item } = toDocument(catalog, record);
      return item;
    }),
  );

export const getDocument = createServerFn({ method: "GET" })
  .validator(z.object({ catalog: catalogSchema, slug: z.string().min(1).max(120) }))
  .handler(async ({ data: { catalog, slug } }): Promise<DocumentDetail | null> => {
    const record = await cmsBySlug(catalog, slug);
    return record ? toDocument(catalog, record) : null;
  });
