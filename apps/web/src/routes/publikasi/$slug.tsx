import { createFileRoute, notFound } from "@tanstack/react-router";

import { DocumentDetail } from "../../components/document-detail";
import { getDocument } from "../../lib/dokumen";
import { site } from "../../lib/site";

export const Route = createFileRoute("/publikasi/$slug")({
  loader: async ({ params }) => {
    const document = await getDocument({ data: { catalog: "publikasi", slug: params.slug } });
    if (!document) throw notFound();
    return document;
  },
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title ?? "Publikasi"} | ${site.name}` }],
  }),
  component: PublikasiDetail,
});

function PublikasiDetail() {
  return (
    <DocumentDetail document={Route.useLoaderData()} label="Publikasi" backHref="/publikasi" />
  );
}
