import { createFileRoute } from "@tanstack/react-router";

import { EditorialBrowser } from "../../components/editorial-browser";
import { PageHeader } from "../../components/page-header";
import { news } from "../../lib/berita";
import { site } from "../../lib/site";

export const Route = createFileRoute("/berita/")({
  head: () => ({
    meta: [
      { title: `Berita & Kabar | ${site.name}` },
      { name: "description", content: "Cerita, bacaan, dan kabar dari lingkungan masjid." },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <div className="article-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Berita & Kabar" }]}
        label="Berita"
        title="Berita & Kabar"
        intro="Cerita, bacaan, dan kabar dari lingkungan masjid."
      />
      <EditorialBrowser
        items={news}
        label="Berita"
        featuredTitle="Berita utama"
        latestTitle="Berita terbaru"
      />
    </div>
  );
}
