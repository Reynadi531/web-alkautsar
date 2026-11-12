import { createFileRoute } from "@tanstack/react-router";

import { AgendaBrowser } from "../../components/agenda/agenda-browser";
import { PageHeader } from "../../components/page-header";
import { site } from "../../lib/site";

export const Route = createFileRoute("/agenda/")({
  head: () => ({
    meta: [
      { title: `Agenda Kegiatan — ${site.name}` },
      {
        name: "description",
        content: "Agenda mendatang dan rekam kegiatan di lingkungan Masjid Al-Kautsar Pharmindo.",
      },
    ],
  }),
  component: AgendaPage,
});

function AgendaPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Agenda Kegiatan" }]}
        label="Kegiatan & Kebersamaan"
        title="Agenda Kegiatan"
        intro="Agenda mendatang dan rekam kegiatan di lingkungan masjid."
      />
      <AgendaBrowser />
    </>
  );
}
