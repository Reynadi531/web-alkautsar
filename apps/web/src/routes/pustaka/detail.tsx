import { createFileRoute } from "@tanstack/react-router";

import { DocumentDetail } from "../../components/document-detail";
import { pustaka } from "../../lib/pustaka";
import { site } from "../../lib/site";

export const Route = createFileRoute("/pustaka/detail")({
  validateSearch: (search: Record<string, unknown>) => ({
    contoh: Number(search.contoh) === 2 ? 2 : 1,
  }),
  head: ({ match }) => ({
    meta: [{ title: `${pustaka[match.search.contoh - 1]!.title} | ${site.name}` }],
  }),
  component: PustakaDetail,
});

function PustakaDetail() {
  const { contoh } = Route.useSearch();
  const item = pustaka[contoh - 1]!;
  const title = item.id === 1 ? "Catatan Kebersamaan" : item.title;
  return <DocumentDetail title={title} label="Pustaka" backHref="/pustaka" />;
}
