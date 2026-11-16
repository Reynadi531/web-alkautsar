import { createFileRoute } from "@tanstack/react-router";

import { DocumentDetail } from "../../components/document-detail";
import { publikasi } from "../../lib/publikasi";
import { site } from "../../lib/site";

export const Route = createFileRoute("/publikasi/detail")({
  validateSearch: (search: Record<string, unknown>) => ({
    contoh: Number(search.contoh) === 2 ? 2 : 1,
  }),
  head: ({ match }) => ({
    meta: [{ title: `${publikasi[match.search.contoh - 1]!.title} | ${site.name}` }],
  }),
  component: PublikasiDetail,
});

function PublikasiDetail() {
  const { contoh } = Route.useSearch();
  return (
    <DocumentDetail title={publikasi[contoh - 1]!.title} label="Publikasi" backHref="/publikasi" />
  );
}
