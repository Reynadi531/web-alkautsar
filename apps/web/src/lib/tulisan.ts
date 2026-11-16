import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  cmsBySlug,
  cmsDate,
  cmsFilter,
  cmsHtml,
  cmsImage,
  cmsList,
  cmsText,
  type CmsRecord,
} from "./cms.server";

/** Editorial sections sharing one layout; each is its own CMS collection. */
export type Rubric = "artikel" | "berita" | "kolom";

export const rubricLabels = {
  artikel: "Artikel",
  berita: "Berita",
  kolom: "Kolom",
} as const satisfies Record<Rubric, string>;

export interface ArticleItem {
  id: string;
  title: string;
  summary: string;
  href: string;
  image?: string;
  /** Optional art-directed crops for the detail page. */
  detailImage?: { desktop?: string; mobile?: string };
  alt: string;
  author?: string;
  /** ISO date (YYYY-MM-DD); absent while the publication date is unconfirmed. */
  date?: string;
  dateLabel?: string;
  source?: string;
  category?: string;
  featured: boolean;
  /** Contoh konten: illustrative manuscript, not an official publication. */
  sample: boolean;
}

export interface ArticleDetail extends ArticleItem {
  /** Sanitized HTML; empty while the manuscript has not been supplied. */
  body: string;
  related: ArticleItem[];
}

const rubricSchema = z.enum(["artikel", "berita", "kolom"]);
const NEWEST_FIRST = "-unggulan,-tanggal_terbit,-dibuat";

function toArticle(rubric: Rubric, record: CmsRecord): ArticleItem {
  const desktop = cmsImage(record, "gambar_detail");
  const mobile = cmsImage(record, "gambar_detail_seluler");
  return {
    id: record.id,
    title: record.judul,
    summary: cmsText(record, "ringkasan") ?? "",
    href: `/${rubric}/${record.slug}`,
    image: cmsImage(record, "gambar"),
    detailImage: desktop || mobile ? { desktop, mobile } : undefined,
    alt: cmsText(record, "alt_gambar") ?? "",
    author: cmsText(record, "penulis"),
    ...cmsDate(record, "tanggal_terbit"),
    source: cmsText(record, "sumber"),
    category: cmsText(record, "kategori"),
    featured: Boolean(record.unggulan),
    sample: Boolean(record.contoh),
  };
}

export const getPosts = createServerFn({ method: "GET" })
  .validator(rubricSchema)
  .handler(async ({ data: rubric }) =>
    (await cmsList(rubric, { sort: NEWEST_FIRST })).map((record) => toArticle(rubric, record)),
  );

export const getPost = createServerFn({ method: "GET" })
  .validator(z.object({ rubric: rubricSchema, slug: z.string().min(1).max(120) }))
  .handler(async ({ data: { rubric, slug } }): Promise<ArticleDetail | null> => {
    const record = await cmsBySlug(rubric, slug);
    if (!record) return null;
    const related = await cmsList(rubric, {
      filter: cmsFilter("id != {:id} && contoh = false", { id: record.id }),
      sort: NEWEST_FIRST,
      limit: 2,
    });
    return {
      ...toArticle(rubric, record),
      body: cmsHtml(record, "isi"),
      related: related.map((item) => toArticle(rubric, item)),
    };
  });

/** "Penulis · tanggal" line shared by cards and detail pages. */
export function articleByline(article: ArticleItem) {
  return `${article.author ?? "Penulis belum diberikan"} · ${article.dateLabel ?? "tanggal belum dikonfirmasi"}`;
}
