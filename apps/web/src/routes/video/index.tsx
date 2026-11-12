import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "../../components/page-header";
import { VideoBrowser } from "../../components/video/video-browser";
import { site } from "../../lib/site";

export const Route = createFileRoute("/video/")({
  head: () => ({
    meta: [
      { title: `Video Masjid — ${site.name}` },
      {
        name: "description",
        content: "Ruang untuk dokumentasi dan video pilihan dari lingkungan masjid.",
      },
    ],
  }),
  component: VideoPage,
});

function VideoPage() {
  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Video Masjid" }]}
        label="Video & Dokumentasi"
        title="Video Masjid"
        intro="Ruang untuk dokumentasi dan video pilihan dari lingkungan masjid."
      />
      <VideoBrowser />
    </>
  );
}
