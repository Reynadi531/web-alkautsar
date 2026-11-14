import { createFileRoute } from "@tanstack/react-router";

import { EditorialBrowser } from "../../components/editorial-browser";
import { PageHeader } from "../../components/page-header";
import { columns } from "../../lib/kolom";
import { site } from "../../lib/site";

export const Route = createFileRoute("/kolom/")({
  head: () => ({
    meta: [
      { title: `Kolom & Opini | ${site.name}` },
      { name: "description", content: "Cerita, bacaan, dan kabar dari lingkungan masjid." },
    ],
  }),
  component: ColumnPage,
});

function ColumnPage() {
  return (
    <div className="article-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Kolom & Opini" }]}
        label="Kolom"
        title="Kolom & Opini"
        intro="Cerita, bacaan, dan kabar dari lingkungan masjid."
      />
      <EditorialBrowser
        items={columns}
        label="Kolom"
        featuredTitle="Kolom pilihan"
        latestTitle="Kolom lainnya"
      />
    </div>
  );
}
