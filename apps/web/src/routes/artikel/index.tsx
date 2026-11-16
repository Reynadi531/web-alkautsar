import { createFileRoute } from "@tanstack/react-router";

import { EditorialBrowser } from "../../components/editorial-browser";
import { PageHeader } from "../../components/page-header";
import { site } from "../../lib/site";
import { getPosts } from "../../lib/tulisan";

export const Route = createFileRoute("/artikel/")({
  loader: () => getPosts({ data: "artikel" }),
  head: () => ({
    meta: [
      { title: `Artikel Pilihan | ${site.name}` },
      { name: "description", content: "Cerita, bacaan, dan kabar dari lingkungan masjid." },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const items = Route.useLoaderData();

  return (
    <div className="article-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Artikel Pilihan" }]}
        label="Artikel"
        title="Artikel Pilihan"
        intro="Cerita, bacaan, dan kabar dari lingkungan masjid."
      />
      <EditorialBrowser
        items={items}
        label="Artikel"
        featuredTitle="Artikel pilihan"
        latestTitle="Artikel lainnya"
      />
    </div>
  );
}
