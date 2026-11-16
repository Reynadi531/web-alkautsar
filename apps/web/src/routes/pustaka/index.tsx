import { createFileRoute } from "@tanstack/react-router";

import { DocumentBrowser } from "../../components/document-browser";
import { PageHeader } from "../../components/page-header";
import { getDocuments } from "../../lib/dokumen";
import { site } from "../../lib/site";

export const Route = createFileRoute("/pustaka/")({
  loader: () => getDocuments({ data: "pustaka" }),
  head: () => ({
    meta: [
      { title: `Pustaka Masjid | ${site.name}` },
      {
        name: "description",
        content: "Katalog pustaka untuk dibaca dan diakses setelah dokumen resmi tersedia.",
      },
    ],
  }),
  component: PustakaPage,
});

function PustakaPage() {
  const items = Route.useLoaderData();

  return (
    <div className="pustaka-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Pustaka Masjid" }]}
        label="Pustaka"
        title="Pustaka Masjid"
        intro="Katalog pustaka untuk dibaca dan diakses setelah dokumen resmi tersedia."
      />
      <DocumentBrowser label="Pustaka" items={items} />
    </div>
  );
}
