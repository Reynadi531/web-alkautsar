import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  cmsBySlug,
  cmsDate,
  cmsFilter,
  cmsFirst,
  cmsHtml,
  cmsImage,
  cmsLines,
  cmsList,
  cmsText,
  type CmsRecord,
} from "./cms.server";

export const getProfile = createServerFn({ method: "GET" }).handler(async () => {
  const record = await cmsFirst("profil");
  return {
    title: record?.judul as string | undefined,
    description: record ? cmsText(record, "deskripsi") : undefined,
  };
});

export interface History {
  title?: string;
  /** Sanitized HTML. */
  narrative: string;
  milestones: { id: string; title: string; description?: string }[];
  /** True while the narrative and milestones are editorial placeholders. */
  sample: boolean;
}

export const getHistory = createServerFn({ method: "GET" }).handler(async (): Promise<History> => {
  const [record, milestones] = await Promise.all([
    cmsFirst("sejarah"),
    cmsList("tonggak_sejarah", { sort: "urutan,tahun" }),
  ]);
  return {
    title: record?.judul,
    narrative: record ? cmsHtml(record, "narasi") : "",
    milestones: milestones.map((milestone) => {
      const year = cmsText(milestone, "tahun");
      return {
        id: milestone.id,
        title: year ? `${year} · ${milestone.judul}` : milestone.judul,
        description: cmsText(milestone, "deskripsi"),
      };
    }),
    sample: record
      ? Boolean(record.contoh) || milestones.some((milestone) => milestone.contoh)
      : true,
  };
});

export const getVisionMission = createServerFn({ method: "GET" }).handler(async () => {
  const record = await cmsFirst("visi_misi");
  return {
    vision: record?.visi as string | undefined,
    visionNote: record ? cmsText(record, "keterangan_visi") : undefined,
    missions: record ? cmsLines(record, "misi") : [],
    /** True while no official statement has been ratified. */
    sample: record ? Boolean(record.contoh) : true,
  };
});

export interface Officer {
  id: string;
  role: string;
  name?: string;
  duty?: string;
  photo?: string;
  /** Row in the organisation chart; 1 is the top. */
  level: number;
  term?: string;
  sample: boolean;
}

export const getOfficers = createServerFn({ method: "GET" }).handler(async () =>
  (await cmsList("pengurus", { sort: "tingkat,urutan,jabatan" })).map((record): Officer => ({
    id: record.id,
    role: record.jabatan,
    name: cmsText(record, "nama"),
    duty: cmsText(record, "tugas"),
    photo: cmsImage(record, "foto", 640),
    level: Number(record.tingkat) || 1,
    term: cmsText(record, "periode"),
    sample: Boolean(record.contoh),
  })),
);

export type DepartmentIcon =
  | "buku"
  | "kepedulian"
  | "pemuda"
  | "pendidikan"
  | "keuangan"
  | "sarana"
  | "umum";

export interface Department {
  id: string;
  name: string;
  href: string;
  icon: DepartmentIcon;
  summary?: string;
  sample: boolean;
}

export interface DepartmentDetail extends Department {
  /** Sanitized HTML. */
  about: string;
  /** Sanitized HTML. */
  duties: string;
  lead?: string;
  contact?: string;
  activities: { id: string; title: string; href: string; schedule: string }[];
}

function toDepartment(record: CmsRecord): Department {
  return {
    id: record.id,
    name: record.nama,
    href: `/profil/bidang/${record.slug}`,
    icon: (cmsText(record, "ikon") as DepartmentIcon | undefined) ?? "umum",
    summary: cmsText(record, "ringkasan"),
    sample: Boolean(record.contoh),
  };
}

export const getDepartments = createServerFn({ method: "GET" }).handler(async () =>
  (await cmsList("bidang", { sort: "urutan,nama" })).map(toDepartment),
);

export const getDepartment = createServerFn({ method: "GET" })
  .validator(z.string().min(1).max(120))
  .handler(async ({ data: slug }): Promise<DepartmentDetail | null> => {
    const record = await cmsBySlug("bidang", slug);
    if (!record) return null;
    const agenda = await cmsList("agenda", {
      filter: cmsFilter("bidang = {:id} && contoh = false", { id: record.id }),
      sort: "-tanggal",
      limit: 6,
    });
    return {
      ...toDepartment(record),
      about: cmsHtml(record, "tentang"),
      duties: cmsHtml(record, "tanggung_jawab"),
      lead: cmsText(record, "penanggung_jawab"),
      contact: cmsText(record, "kontak"),
      activities: agenda.map((item) => ({
        id: item.id,
        title: item.judul,
        href: `/agenda/${item.slug}`,
        schedule: cmsDate(item, "tanggal").dateLabel ?? "Tanggal belum ditetapkan",
      })),
    };
  });
