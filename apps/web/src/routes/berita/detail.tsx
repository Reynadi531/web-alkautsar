import { createFileRoute } from "@tanstack/react-router";

import { EditorialDetail } from "../../components/editorial-detail";
import { news } from "../../lib/berita";
import { site } from "../../lib/site";

export const Route = createFileRoute("/berita/detail")({
  validateSearch: (search: Record<string, unknown>) => ({
    contoh: Number(search.contoh) === 2 ? 2 : 1,
  }),
  head: ({ match }) => ({
    meta: [{ title: `${news[match.search.contoh - 1]!.title} | ${site.name}` }],
  }),
  component: NewsDetail,
});

function NewsDetail() {
  const { contoh } = Route.useSearch();
  return <EditorialDetail article={news[contoh - 1]!} label="Berita" listHref="/berita" />;
}
