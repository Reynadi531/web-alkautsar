import { createFileRoute, notFound } from "@tanstack/react-router";

import { EventDetail } from "../../components/event-detail";
import { getEvent } from "../../lib/agenda";
import { site } from "../../lib/site";

export const Route = createFileRoute("/seminar/$slug")({
  loader: async ({ params }) => {
    const event = await getEvent({ data: { kind: "seminar", slug: params.slug } });
    if (!event) throw notFound();
    return event;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Seminar"} | ${site.name}` },
      ...(loaderData?.summary ? [{ name: "description", content: loaderData.summary }] : []),
    ],
  }),
  component: SeminarDetail,
});

function SeminarDetail() {
  return <EventDetail event={Route.useLoaderData()} kind="seminar" />;
}
