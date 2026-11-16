import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { cmsFilter, cmsList } from "./cms.server";

export interface SearchResult {
  label: string;
  href: string;
  /** Section the result belongs to, e.g. "Berita". */
  kind: string;
}

const sections = [
  { collection: "agenda", kind: "Agenda", path: "/agenda" },
  { collection: "seminar", kind: "Seminar", path: "/seminar" },
  { collection: "program", kind: "Program", path: "/program" },
  { collection: "berita", kind: "Berita", path: "/berita" },
  { collection: "artikel", kind: "Artikel", path: "/artikel" },
  { collection: "kolom", kind: "Kolom", path: "/kolom" },
  { collection: "pustaka", kind: "Pustaka", path: "/pustaka" },
  { collection: "publikasi", kind: "Publikasi", path: "/publikasi" },
  { collection: "buletin", kind: "Buletin", path: "/buletin" },
  { collection: "layanan", kind: "Layanan", path: "/layanan" },
] as const;

/** Published, confirmed content whose title or summary contains every query word. Samples are never results. */
export const searchContent = createServerFn({ method: "GET" })
  .validator(z.string().max(200))
  .handler(async ({ data: query }): Promise<SearchResult[]> => {
    const words = query.split(/\s+/).filter(Boolean).slice(0, 8);
    if (words.length === 0) return [];

    const params: Record<string, string> = {};
    const clauses = words.map((word, index) => {
      params[`w${index}`] = word;
      return `(judul ~ {:w${index}} || ringkasan ~ {:w${index}})`;
    });
    const filter = cmsFilter(["contoh = false", ...clauses].join(" && "), params);

    const groups = await Promise.all(
      sections.map(async ({ collection, kind, path }) =>
        (await cmsList(collection, { filter, sort: "-dibuat", limit: 10 })).map(
          (record): SearchResult => ({
            label: record.judul,
            href: `${path}/${record.slug}`,
            kind,
          }),
        ),
      ),
    );
    return groups.flat();
  });
