import { createFileRoute, notFound } from "@tanstack/react-router";

import { DocumentDetail } from "../../components/document-detail";
import { getDocument } from "../../lib/dokumen";
import { site } from "../../lib/site";

export const Route = createFileRoute("/pustaka/$slug")({
  loader: async ({ params }) => {
    const document = await getDocument({ data: { catalog: "pustaka", slug: params.slug } });
    if (!document) throw notFound();
    return document;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title ?? "Pustaka"} | ${site.name}` }],
  }),
  component: PustakaDetail,
});

function PustakaDetail() {
  return <DocumentDetail document={Route.useLoaderData()} label="Pustaka" backHref="/pustaka" />;
}
