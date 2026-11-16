import { createFileRoute, notFound } from "@tanstack/react-router";

import { EditorialDetail } from "../../components/editorial-detail";
import { site } from "../../lib/site";
import { getPost } from "../../lib/tulisan";

export const Route = createFileRoute("/kolom/$slug")({
  loader: async ({ params }) => {
    const article = await getPost({ data: { rubric: "kolom", slug: params.slug } });
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Kolom"} | ${site.name}` },
      ...(loaderData?.summary ? [{ name: "description", content: loaderData.summary }] : []),
    ],
  }),
  component: ColumnDetail,
});

function ColumnDetail() {
  return <EditorialDetail article={Route.useLoaderData()} label="Kolom" listHref="/kolom" />;
}
