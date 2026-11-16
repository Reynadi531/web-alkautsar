import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { cmsBySlug, cmsHtml, cmsImage, cmsList, cmsText, type CmsRecord } from "./cms.server";

export interface Program {
  id: string;
  title: string;
  summary: string;
  href: string;
  image?: string;
  /** Optional wide crop for the detail page on desktop. */
  detailImage?: string;
  alt: string;
  featured: boolean;
  /** Contoh konten: not an active or approved program. */
  sample: boolean;
}

export interface ProgramDetail extends Program {
  /** Sanitized HTML. */
  purpose: string;
  /** Sanitized HTML. */
  audience: string;
  participation: [label: string, value: string][];
  registrationUrl?: string;
}

function toProgram(record: CmsRecord): Program {
  return {
    id: record.id,
    title: record.judul,
    summary: cmsText(record, "ringkasan") ?? "",
    href: `/program/${record.slug}`,
    image: cmsImage(record, "gambar"),
    detailImage: cmsImage(record, "gambar_detail"),
    alt: cmsText(record, "alt_gambar") ?? "",
    featured: Boolean(record.unggulan),
    sample: Boolean(record.contoh),
  };
}

export const getPrograms = createServerFn({ method: "GET" }).handler(async () =>
  (await cmsList("program", { sort: "-unggulan,judul" })).map(toProgram),
);

export const getProgram = createServerFn({ method: "GET" })
  .validator(z.string().min(1).max(120))
  .handler(async ({ data: slug }): Promise<ProgramDetail | null> => {
    const record = await cmsBySlug("program", slug);
    if (!record) return null;
    const registrationUrl = cmsText(record, "url_pendaftaran");
    return {
      ...toProgram(record),
      purpose: cmsHtml(record, "tujuan"),
      audience: cmsHtml(record, "sasaran"),
      participation: [
        ["Jadwal", cmsText(record, "jadwal") ?? "Belum dikonfirmasi"],
        ["Lokasi", cmsText(record, "lokasi") ?? "Belum dikonfirmasi"],
        [
          "Pendaftaran",
          cmsText(record, "keterangan_pendaftaran") ??
            (registrationUrl ? "Dibuka" : "Belum tersedia"),
        ],
        ["Kontak program", cmsText(record, "kontak") ?? "Belum diberikan"],
      ],
      registrationUrl,
    };
  });
