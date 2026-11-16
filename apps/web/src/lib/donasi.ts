import { createServerFn } from "@tanstack/react-start";

import { cmsFirst, cmsImage, cmsLines, cmsList, cmsText } from "./cms.server";

export interface Donation {
  bank?: string;
  accountNumber?: string;
  accountName?: string;
  qrisUrl?: string;
  confirmationContact?: string;
  steps: string[];
  purposes: { id: string; title: string; description?: string }[];
  /** True until the pengurus confirm official donation channels. */
  sample: boolean;
}

export const getDonation = createServerFn({ method: "GET" }).handler(
  async (): Promise<Donation> => {
    const [record, purposes] = await Promise.all([
      cmsFirst("donasi"),
      cmsList("tujuan_donasi", { sort: "urutan,judul" }),
    ]);
    return {
      bank: record ? cmsText(record, "nama_bank") : undefined,
      accountNumber: record ? cmsText(record, "nomor_rekening") : undefined,
      accountName: record ? cmsText(record, "atas_nama") : undefined,
      qrisUrl: record ? cmsImage(record, "qris", 640) : undefined,
      confirmationContact: record ? cmsText(record, "kontak_konfirmasi") : undefined,
      steps: record ? cmsLines(record, "langkah") : [],
      purposes: purposes.map((purpose) => ({
        id: purpose.id,
        title: purpose.judul,
        description: cmsText(purpose, "deskripsi"),
      })),
      sample: record ? Boolean(record.contoh) : true,
    };
  },
);
