import { createFileRoute } from "@tanstack/react-router";

import { DocumentBrowser } from "../../components/document-browser";
import { PageHeader } from "../../components/page-header";
import { getDocuments } from "../../lib/dokumen";
import { site } from "../../lib/site";

export const Route = createFileRoute("/buletin/")({
  loader: () => getDocuments({ data: "buletin" }),
  head: () => ({
    meta: [
      { title: `Buletin Masjid | ${site.name}` },
      { name: "description", content: "Edisi terbaru dan arsip buletin masjid." },
    ],
  }),
  component: BuletinPage,
});

function BuletinPage() {
  const items = Route.useLoaderData();

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
        items={items}
        filterLabel="Jenis"
        featuredHeading="Edisi terbaru"
        archiveHeading="Arsip edisi"
      />
    </div>
  );
}
