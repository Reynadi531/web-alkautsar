import { createFileRoute, notFound } from "@tanstack/react-router";

import { EditorialDetail } from "../../components/editorial-detail";
import { site } from "../../lib/site";
import { getPost } from "../../lib/tulisan";

export const Route = createFileRoute("/berita/$slug")({
  loader: async ({ params }) => {
    const article = await getPost({ data: { rubric: "berita", slug: params.slug } });
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Berita"} | ${site.name}` },
      ...(loaderData?.summary ? [{ name: "description", content: loaderData.summary }] : []),
    ],
  }),
  component: NewsDetail,
});

function NewsDetail() {
  return <EditorialDetail article={Route.useLoaderData()} label="Berita" listHref="/berita" />;
}
