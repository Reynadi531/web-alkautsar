import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { cmsBySlug, cmsHtml, cmsLines, cmsList, cmsText, type CmsRecord } from "./cms.server";

export type ServiceIcon = "lokasi" | "percakapan" | "ibadah" | "pendidikan" | "kepedulian" | "umum";

export interface Service {
  id: string;
  title: string;
  href: string;
  icon: ServiceIcon;
  summary: string;
  /** Contoh konten: not a service confirmed by the pengurus. */
  sample: boolean;
}

export interface ServiceDetail extends Service {
  /** Sanitized HTML. */
  about: string;
  steps: string[];
  hours?: string;
  contact?: string;
}

function toService(record: CmsRecord): Service {
  return {
    id: record.id,
    title: record.judul,
    href: `/layanan/${record.slug}`,
    icon: (cmsText(record, "ikon") as ServiceIcon | undefined) ?? "umum",
    summary: cmsText(record, "ringkasan") ?? "",
    sample: Boolean(record.contoh),
  };
}

export const getServices = createServerFn({ method: "GET" }).handler(async () =>
  (await cmsList("layanan", { sort: "urutan,judul" })).map(toService),
);

export const getService = createServerFn({ method: "GET" })
  .validator(z.string().min(1).max(120))
  .handler(async ({ data: slug }): Promise<ServiceDetail | null> => {
    const record = await cmsBySlug("layanan", slug);
    if (!record) return null;
    return {
      ...toService(record),
      about: cmsHtml(record, "tentang"),
      steps: cmsLines(record, "langkah_akses"),
      hours: cmsText(record, "waktu_layanan"),
      contact: cmsText(record, "kontak"),
    };
  });
