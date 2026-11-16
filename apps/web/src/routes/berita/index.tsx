import { createFileRoute } from "@tanstack/react-router";

import { EditorialBrowser } from "../../components/editorial-browser";
import { PageHeader } from "../../components/page-header";
import { site } from "../../lib/site";
import { getPosts } from "../../lib/tulisan";

export const Route = createFileRoute("/berita/")({
  loader: () => getPosts({ data: "berita" }),
  head: () => ({
    meta: [
      { title: `Berita & Kabar | ${site.name}` },
      { name: "description", content: "Cerita, bacaan, dan kabar dari lingkungan masjid." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  const items = Route.useLoaderData();

  return (
    <div className="article-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Berita & Kabar" }]}
        label="Berita"
        title="Berita & Kabar"
        intro="Cerita, bacaan, dan kabar dari lingkungan masjid."
      />
      <EditorialBrowser
        items={items}
        label="Berita"
        featuredTitle="Berita utama"
        latestTitle="Berita terbaru"
      />
    </div>
  );
}
