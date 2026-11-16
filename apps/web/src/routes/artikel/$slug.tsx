import { createFileRoute, notFound } from "@tanstack/react-router";

import { EditorialDetail } from "../../components/editorial-detail";
import { site } from "../../lib/site";
import { getPost } from "../../lib/tulisan";

export const Route = createFileRoute("/artikel/$slug")({
  loader: async ({ params }) => {
    const article = await getPost({ data: { rubric: "artikel", slug: params.slug } });
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Artikel"} | ${site.name}` },
      ...(loaderData?.summary ? [{ name: "description", content: loaderData.summary }] : []),
    ],
  }),
  component: ArticleDetail,
});

function ArticleDetail() {
  return <EditorialDetail article={Route.useLoaderData()} label="Artikel" listHref="/artikel" />;
}
