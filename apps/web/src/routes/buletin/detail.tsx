import { createFileRoute } from "@tanstack/react-router";

import { DocumentDetail } from "../../components/document-detail";
import { buletin } from "../../lib/buletin";
import { site } from "../../lib/site";

export const Route = createFileRoute("/buletin/detail")({
  validateSearch: (search: Record<string, unknown>) => ({
    contoh: Number(search.contoh) === 2 ? 2 : 1,
  }),
  head: ({ match }) => ({
    meta: [{ title: `${buletin[match.search.contoh - 1]!.title} | ${site.name}` }],
  }),
  component: BuletinDetail,
});

function BuletinDetail() {
  const { contoh } = Route.useSearch();
  return <DocumentDetail title={buletin[contoh - 1]!.title} label="Buletin" backHref="/buletin" />;
}
