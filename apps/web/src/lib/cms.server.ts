import { log } from "evlog";
import PocketBase, { ClientResponseError, type RecordModel } from "pocketbase";
import sanitizeHtml from "sanitize-html";

import { ENV } from "../env.server";

export type CmsRecord = RecordModel;

const TIME_ZONE = "Asia/Jakarta";

let pb: PocketBase | undefined;

function client() {
  if (!pb) {
    pb = new PocketBase(ENV.POCKETBASE_URL);
    pb.autoCancellation(false);
  }
  return pb;
}

function report(collection: string, error: unknown) {
  // The SDK wraps network failures; the wrapped error says why the CMS was unreachable.
  const cause = error instanceof ClientResponseError ? error.originalError : undefined;
  log.error({
    action: "cms.fetch",
    collection,
    status: error instanceof ClientResponseError ? error.status : undefined,
    error: error instanceof Error ? error.message : String(error),
    cause: cause instanceof Error ? cause.message : undefined,
  });
}

/** Binds `{:name}` placeholders so visitor input cannot alter a filter. */
export function cmsFilter(expression: string, params: Record<string, unknown>) {
  return client().filter(expression, params);
}

/** Records of a collection. An unreachable CMS yields an empty list, so pages show their empty state. */
export async function cmsList(
  collection: string,
  options: { sort?: string; filter?: string; limit?: number } = {},
): Promise<CmsRecord[]> {
  const { limit, ...query } = options;
  try {
    if (limit) {
      const page = await client()
        .collection(collection)
        .getList(1, limit, { ...query, skipTotal: true });
      return page.items;
    }
    return await client().collection(collection).getFullList(query);
  } catch (error) {
    report(collection, error);
    return [];
  }
}

export async function cmsFirst(collection: string, filter = ""): Promise<CmsRecord | null> {
  try {
    return await client().collection(collection).getFirstListItem(filter);
  } catch (error) {
    if (!(error instanceof ClientResponseError && error.status === 404)) report(collection, error);
    return null;
  }
}

export function cmsBySlug(collection: string, slug: string) {
  return cmsFirst(collection, cmsFilter("slug = {:slug}", { slug }));
}

/** Trimmed text of a field, or `undefined` when the editor left it empty. */
export function cmsText(record: CmsRecord, field: string): string | undefined {
  const value: unknown = record[field];
  return typeof value === "string" && value.trim() !== "" ? value.trim() : undefined;
}

/** One entry per non-empty line of a multi-line text field. */
export function cmsLines(record: CmsRecord, field: string): string[] {
  return (cmsText(record, field) ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Browser-reachable URL of an uploaded file. */
export function cmsFile(
  record: CmsRecord,
  field: string,
  query: { download?: boolean } = {},
): string | undefined {
  const name = cmsText(record, field);
  if (!name) return undefined;
  const base = ENV.POCKETBASE_PUBLIC_URL.replace(/\/+$/, "");
  const url = `${base}/api/files/${record.collectionId}/${record.id}/${encodeURIComponent(name)}`;
  return query.download ? `${url}?download=1` : url;
}

/**
 * URL of an uploaded photo, downscaled to the given width. PocketBase re-encodes
 * thumbs as PNG, which only shrinks JPEG/PNG uploads; WebP/AVIF are served as uploaded.
 */
export function cmsImage(
  record: CmsRecord,
  field: string,
  width: 640 | 1280 = 1280,
): string | undefined {
  const url = cmsFile(record, field);
  if (!url) return undefined;
  return /\.(jpe?g|png)$/i.test(url) ? `${url}?thumb=${width}x0` : url;
}

/** ISO day (Jakarta) plus its Indonesian label for a PocketBase date field. */
export function cmsDate(record: CmsRecord, field: string): { date?: string; dateLabel?: string } {
  const value = cmsText(record, field);
  if (!value) return {};
  const parsed = new Date(value.replace(" ", "T"));
  if (Number.isNaN(parsed.getTime())) return {};
  return {
    date: new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(parsed),
    dateLabel: new Intl.DateTimeFormat("id-ID", {
      timeZone: TIME_ZONE,
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(parsed),
  };
}

export function cmsToday() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: TIME_ZONE }).format(new Date());
}

/** Rich text from an editor field, reduced to safe markup for `RichText`. */
export function cmsHtml(record: CmsRecord, field: string): string {
  const value = cmsText(record, field);
  if (!value) return "";
  return sanitizeHtml(value, {
    allowedTags: [...sanitizeHtml.defaults.allowedTags, "img", "figure", "figcaption"],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height", "loading"],
      "*": ["colspan", "rowspan"],
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
      img: sanitizeHtml.simpleTransform("img", { loading: "lazy" }),
    },
  }).trim();
}
