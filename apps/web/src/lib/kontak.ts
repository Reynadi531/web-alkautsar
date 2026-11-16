import { getRouteApi } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import { cmsFirst, cmsText } from "./cms.server";

export interface Contact {
  street: string;
  fullAddress: string;
  area: string;
  mapsUrl: string;
  mapEmbedUrl?: string;
  coordinates: { latitude: number; longitude: number };
  instagramHandle?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  visitInfo?: string;
}

/** Confirmed address, shown when the CMS cannot be reached. */
const fallbackContact: Contact = {
  street: "Jl. Trowulan V, Blok T",
  fullAddress: "Kelurahan Melong, Kecamatan Cimahi Selatan, Kota Cimahi, Jawa Barat 40534",
  area: "Melong · Cimahi Selatan",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Masjid+Al-Kautsar+Pharmindo+Cimahi+Selatan",
  coordinates: { latitude: -6.8841, longitude: 107.5413 },
};

export const getContact = createServerFn({ method: "GET" }).handler(async (): Promise<Contact> => {
  const record = await cmsFirst("kontak");
  if (!record) return fallbackContact;

  const latitude = Number(record.lintang);
  const longitude = Number(record.bujur);
  return {
    street: cmsText(record, "jalan") ?? fallbackContact.street,
    fullAddress: cmsText(record, "alamat_lengkap") ?? fallbackContact.fullAddress,
    area: cmsText(record, "wilayah") ?? fallbackContact.area,
    mapsUrl: cmsText(record, "url_peta") ?? fallbackContact.mapsUrl,
    mapEmbedUrl: cmsText(record, "url_sematan_peta"),
    // PocketBase stores an empty number as 0; (0, 0) is not Cimahi.
    coordinates: latitude && longitude ? { latitude, longitude } : fallbackContact.coordinates,
    instagramHandle: cmsText(record, "akun_instagram"),
    instagramUrl: cmsText(record, "url_instagram"),
    youtubeUrl: cmsText(record, "url_youtube"),
    phone: cmsText(record, "telepon"),
    whatsapp: cmsText(record, "whatsapp"),
    email: cmsText(record, "email"),
    visitInfo: cmsText(record, "info_kunjungan"),
  };
});

const rootRoute = getRouteApi("__root__");

/** Contact details loaded once per page by the root route. */
export function useContact(): Contact {
  return rootRoute.useLoaderData();
}
