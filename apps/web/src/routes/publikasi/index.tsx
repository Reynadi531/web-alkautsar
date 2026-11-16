import { createFileRoute } from "@tanstack/react-router";

import { DocumentBrowser } from "../../components/document-browser";
import { PageHeader } from "../../components/page-header";
import { getDocuments } from "../../lib/dokumen";
import { site } from "../../lib/site";

export const Route = createFileRoute("/publikasi/")({
  loader: () => getDocuments({ data: "publikasi" }),
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

function PublikasiPage() {
  const items = Route.useLoaderData();

  return (
    <div className="pustaka-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Publikasi Masjid" }]}
        label="Publikasi"
        title="Publikasi Masjid"
        intro="Katalog publikasi untuk dibaca dan diakses setelah dokumen resmi tersedia."
      />
      <DocumentBrowser label="Publikasi" items={items} filterLabel="Jenis" />
    </div>
  );
}
