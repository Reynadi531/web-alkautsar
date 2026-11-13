import { createFileRoute } from "@tanstack/react-router";

import { ServiceBrowser } from "../../components/layanan/service-browser";
import { PageHeader } from "../../components/page-header";
import { site } from "../../lib/site";

export const Route = createFileRoute("/layanan/")({
  head: () => ({
    meta: [
      { title: `Layanan Masjid | ${site.name}` },
      {
        name: "description",
        content: "Informasi layanan dan cara mengaksesnya melalui pengurus masjid.",
      },
    ],
  }),
  component: ServicePage,
});

function ServicePage() {
  return (
    <div className="service-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Layanan Masjid" }]}
        label="Layanan untuk jamaah"
        title="Layanan Masjid"
        intro="Informasi layanan dan cara mengaksesnya melalui pengurus masjid."
      />
      <ServiceBrowser />
    </div>
  );
}
