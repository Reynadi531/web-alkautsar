import { createFileRoute } from "@tanstack/react-router";

import { EditorialDetail } from "../../components/editorial-detail";
import { articles } from "../../lib/artikel";
import { site } from "../../lib/site";

export const Route = createFileRoute("/artikel/detail")({
  validateSearch: (search: Record<string, unknown>) => ({
    contoh: Number(search.contoh) === 2 ? 2 : 1,
  }),
  head: ({ match }) => ({
    meta: [{ title: `${articles[match.search.contoh - 1]!.title} | ${site.name}` }],
  }),
  component: ArticleDetail,
});

function ArticleDetail() {
  const { contoh } = Route.useSearch();
  return <EditorialDetail article={articles[contoh - 1]!} label="Artikel" listHref="/artikel" />;
}
