import { createFileRoute } from "@tanstack/react-router";

import { DocumentBrowser } from "../../components/document-browser";
import { PageHeader } from "../../components/page-header";
import { buletin } from "../../lib/buletin";
import { site } from "../../lib/site";

export const Route = createFileRoute("/buletin/")({
  head: () => ({
    meta: [
      { title: `Buletin Masjid | ${site.name}` },
      { name: "description", content: "Edisi terbaru dan arsip buletin masjid." },
    ],
  }),
  component: BuletinPage,
});

const categories = ["Semua jenis", "Buletin"];

function BuletinPage() {
  return (
    <div className="pustaka-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Buletin Masjid" }]}
        label="Buletin"
        title="Buletin Masjid"
        intro="Edisi terbaru dan arsip buletin masjid."
      />
      <DocumentBrowser
        label="Buletin"
        items={buletin}
        categories={categories}
        metadata="Nomor edisi: belum diberikan · Tanggal: belum diberikan"
        featuredHeading="Edisi terbaru"
        archiveHeading="Arsip edisi"
      />
    </div>
  );
}
