import { createFileRoute } from "@tanstack/react-router";

import { EditorialBrowser } from "../../components/editorial-browser";
import { PageHeader } from "../../components/page-header";
import { articles } from "../../lib/artikel";
import { site } from "../../lib/site";

export const Route = createFileRoute("/artikel/")({
  head: () => ({
    meta: [
      { title: `Artikel Pilihan | ${site.name}` },
      { name: "description", content: "Cerita, bacaan, dan kabar dari lingkungan masjid." },
    ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  return (
    <div className="article-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Artikel Pilihan" }]}
        label="Artikel"
        title="Artikel Pilihan"
        intro="Cerita, bacaan, dan kabar dari lingkungan masjid."
      />
      <EditorialBrowser
        items={articles}
        label="Artikel"
        featuredTitle="Artikel pilihan"
        latestTitle="Artikel lainnya"
      />
    </div>
  );
}
