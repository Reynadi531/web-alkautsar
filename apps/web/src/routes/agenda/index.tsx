import { createFileRoute } from "@tanstack/react-router";

import { AgendaBrowser } from "../../components/agenda/agenda-browser";
import { PageHeader } from "../../components/page-header";
import { getEvents } from "../../lib/agenda";
import { site } from "../../lib/site";

export const Route = createFileRoute("/agenda/")({
  loader: () => getEvents({ data: "agenda" }),
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
  const { events, archive } = Route.useLoaderData();

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Agenda Kegiatan" }]}
        label="Kegiatan & Kebersamaan"
        title="Agenda Kegiatan"
        intro="Agenda mendatang dan rekam kegiatan di lingkungan masjid."
      />
      <AgendaBrowser events={events} archive={archive} />
    </>
  );
}
