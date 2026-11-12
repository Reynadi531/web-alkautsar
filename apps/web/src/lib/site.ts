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

export interface NavLinkItem {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  href?: string;
  items: readonly NavLinkItem[];
}

export const navGroups: readonly NavGroup[] = [
  {
    label: "Tentang Masjid",
    href: "/profil",
    items: [
      { label: "Profil", href: "/profil" },
      { label: "Sejarah", href: "/profil/sejarah" },
      { label: "Visi & Misi", href: "/profil/visi-misi" },
      { label: "Kepengurusan", href: "/profil/pengurus" },
      { label: "Bidang", href: "/profil/bidang" },
    ],
  },
  {
    label: "Kegiatan",
    href: "/agenda",
    items: [
      { label: "Agenda", href: "/agenda" },
      { label: "Seminar", href: "/seminar" },
      { label: "Program", href: "/program" },
      { label: "Berita / Kabar", href: "/berita" },
    ],
  },
  {
    label: "Konten",
    items: [
      { label: "Video", href: "/video" },
      { label: "Pustaka", href: "/pustaka" },
      { label: "Publikasi", href: "/publikasi" },
      { label: "Artikel", href: "/artikel" },
      { label: "Kolom", href: "/kolom" },
      { label: "Buletin", href: "/buletin" },
    ],
  },
  {
    label: "Lainnya",
    items: [
      { label: "Layanan", href: "/layanan" },
      { label: "Donasi", href: "/donasi" },
      { label: "Kontak & Lokasi", href: "/kontak" },
    ],
  },
];

export const topNav: readonly (NavLinkItem | NavGroup)[] = [
  { label: "Beranda", href: "/" },
  navGroups[0]!,
  navGroups[1]!,
  { label: "Program", href: "/program" },
  navGroups[2]!,
  navGroups[3]!,
];

export const footerExplore: readonly NavLinkItem[] = [
  { label: "Profil", href: "/profil" },
  { label: "Agenda & seminar", href: "/agenda" },
  { label: "Program", href: "/program" },
  { label: "Berita / kabar", href: "/berita" },
];

export const footerQuickAccess: readonly NavLinkItem[] = [
  { label: "Video & bahan bacaan", href: "/video" },
  { label: "Artikel & kolom", href: "/artikel" },
  { label: "Layanan", href: "/layanan" },
  { label: "Donasi", href: "/donasi" },
  { label: "Kontak & lokasi", href: "/kontak" },
];

export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
