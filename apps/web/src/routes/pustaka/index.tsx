import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "../../components/page-header";
import { PustakaBrowser } from "../../components/pustaka-browser";
import { site } from "../../lib/site";

export const Route = createFileRoute("/pustaka/")({
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
  return (
    <div className="pustaka-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Pustaka Masjid" }]}
        label="Pustaka"
        title="Pustaka Masjid"
        intro="Katalog pustaka untuk dibaca dan diakses setelah dokumen resmi tersedia."
      />
      <PustakaBrowser />
    </div>
  );
}
