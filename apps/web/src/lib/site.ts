/** Identity and navigation. Address and contact channels come from the CMS (`lib/kontak.ts`). */
export const site = {
  name: "Masjid Al-Kautsar Pharmindo",
  shortName: "Al-Kautsar",
} as const;

export interface NavLinkItem {
  label: string;
  href: string;
  unavailable?: boolean;
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
      { label: "Pencarian", href: "/pencarian" },
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

/** Case-insensitive match of a search box value against any of the given fields. */
export function matchesQuery(query: string, ...fields: (string | undefined)[]) {
  const needle = query.trim().toLocaleLowerCase("id");
  return needle === "" || fields.some((field) => field?.toLocaleLowerCase("id").includes(needle));
}

export const ALL_PERIODS = "Periode: semua";

/** "Periode" select options: every year present in the given ISO dates, newest first. */
export function periodOptions(dates: readonly (string | undefined)[]): string[] {
  const years = new Set<string>();
  for (const date of dates) if (date) years.add(date.slice(0, 4));
  return [
    ALL_PERIODS,
    ...[...years]
      .sort()
      .reverse()
      .map((year) => `Periode: ${year}`),
  ];
}

export function matchesPeriod(date: string | undefined, period: string) {
  if (period === ALL_PERIODS) return true;
  return date !== undefined && `Periode: ${date.slice(0, 4)}` === period;
}

/** Select options: the "all" label followed by the distinct non-empty values. */
export function categoryOptions(all: string, values: readonly (string | undefined)[]): string[] {
  return [all, ...new Set(values.filter((value): value is string => Boolean(value)))];
}
