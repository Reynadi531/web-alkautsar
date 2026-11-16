import { createFileRoute } from "@tanstack/react-router";

import { EditorialBrowser } from "../../components/editorial-browser";
import { PageHeader } from "../../components/page-header";
import { site } from "../../lib/site";
import { getPosts } from "../../lib/tulisan";

export const Route = createFileRoute("/kolom/")({
  loader: () => getPosts({ data: "kolom" }),
  head: () => ({
    meta: [
      { title: `Kolom & Opini | ${site.name}` },
      { name: "description", content: "Cerita, bacaan, dan kabar dari lingkungan masjid." },
    ],
  }),
  component: ColumnPage,
});

function ColumnPage() {
  const items = Route.useLoaderData();

  return (
    <div className="article-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Kolom & Opini" }]}
        label="Kolom"
        title="Kolom & Opini"
        intro="Cerita, bacaan, dan kabar dari lingkungan masjid."
      />
      <EditorialBrowser
        items={items}
        label="Kolom"
        featuredTitle="Kolom pilihan"
        latestTitle="Kolom lainnya"
      />
    </div>
  );
}
