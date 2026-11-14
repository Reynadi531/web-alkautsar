import { createFileRoute } from "@tanstack/react-router";

import { EditorialDetail } from "../../components/editorial-detail";
import { columns } from "../../lib/kolom";
import { site } from "../../lib/site";

export const Route = createFileRoute("/kolom/detail")({
  validateSearch: (search: Record<string, unknown>) => ({
    contoh: Number(search.contoh) === 2 ? 2 : 1,
  }),
  head: ({ match }) => ({
    meta: [{ title: `${columns[match.search.contoh - 1]!.title} | ${site.name}` }],
  }),
  component: ColumnDetail,
});

function ColumnDetail() {
  const { contoh } = Route.useSearch();
  return <EditorialDetail article={columns[contoh - 1]!} label="Kolom" listHref="/kolom" />;
}
