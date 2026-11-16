import { createFileRoute, notFound } from "@tanstack/react-router";

import { DocumentDetail } from "../../components/document-detail";
import { getDocument } from "../../lib/dokumen";
import { site } from "../../lib/site";

export const Route = createFileRoute("/buletin/$slug")({
  loader: async ({ params }) => {
    const document = await getDocument({ data: { catalog: "buletin", slug: params.slug } });
    if (!document) throw notFound();
    return document;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title ?? "Buletin"} | ${site.name}` }],
  }),
  component: BuletinDetail,
});

function BuletinDetail() {
  return <DocumentDetail document={Route.useLoaderData()} label="Buletin" backHref="/buletin" />;
}
