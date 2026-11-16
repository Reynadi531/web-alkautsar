import { createFileRoute, notFound } from "@tanstack/react-router";

import { EventDetail } from "../../components/event-detail";
import { getEvent } from "../../lib/agenda";
import { site } from "../../lib/site";

export const Route = createFileRoute("/agenda/$slug")({
  loader: async ({ params }) => {
    const event = await getEvent({ data: { kind: "agenda", slug: params.slug } });
    if (!event) throw notFound();
    return event;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Agenda"} | ${site.name}` },
      ...(loaderData?.summary ? [{ name: "description", content: loaderData.summary }] : []),
    ],
  }),
  component: AgendaDetail,
});

function AgendaDetail() {
  return <EventDetail event={Route.useLoaderData()} kind="agenda" />;
}
