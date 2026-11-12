export const site = {
  name: "Masjid Al-Kautsar Pharmindo",
  shortName: "Al-Kautsar",
  area: "Melong · Cimahi Selatan",
  street: "Jl. Trowulan V, Blok T",
  fullAddress: "Kelurahan Melong, Kecamatan Cimahi Selatan, Kota Cimahi, Jawa Barat 40534",
  instagramHandle: "@masjidalkautsar.pharmindo",
  instagramUrl: "https://www.instagram.com/masjidalkautsar.pharmindo/",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Masjid+Al-Kautsar+Pharmindo+Cimahi+Selatan",
  coordinates: { latitude: -6.8841, longitude: 107.5413 },
} as const;

export const mainNav = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Masjid", href: "/profil" },
  { label: "Kegiatan", href: "/agenda" },
  { label: "Program", href: "/program" },
  { label: "Kontak", href: "/kontak" },
] as const;

export const footerQuickLinks = [
  { label: "Petunjuk arah", href: site.mapsUrl, external: true },
  { label: "Instagram", href: site.instagramUrl, external: true },
] as const;
