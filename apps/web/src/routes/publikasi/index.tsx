import { createFileRoute } from "@tanstack/react-router";

import { DocumentBrowser } from "../../components/document-browser";
import { PageHeader } from "../../components/page-header";
import { publikasi } from "../../lib/publikasi";
import { site } from "../../lib/site";

export const Route = createFileRoute("/publikasi/")({
  head: () => ({
    meta: [
      { title: `Publikasi Masjid | ${site.name}` },
      {
        name: "description",
        content: "Katalog publikasi untuk dibaca dan diakses setelah dokumen resmi tersedia.",
      },
    ],
  }),
  component: PublikasiPage,
});

const categories = ["Semua jenis", "Publikasi"];

function PublikasiPage() {
  return (
    <div className="pustaka-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Publikasi Masjid" }]}
        label="Publikasi"
        title="Publikasi Masjid"
        intro="Katalog publikasi untuk dibaca dan diakses setelah dokumen resmi tersedia."
      />
      <DocumentBrowser
        label="Publikasi"
        items={publikasi}
        categories={categories}
        metadata="Jenis: Publikasi · Tanggal: belum diberikan"
      />
    </div>
  );
}
