import { createFileRoute } from "@tanstack/react-router";

import { PageHeader } from "../../components/page-header";
import { SeminarBrowser } from "../../components/seminar-browser";
import { site } from "../../lib/site";

export const Route = createFileRoute("/seminar/")({
  head: () => ({
    meta: [
      { title: `Seminar & Diskusi | ${site.name}` },
      { name: "description", content: "Ruang informasi seminar, diskusi, dan materi pendukung." },
    ],
  }),
  component: SeminarPage,
});

function SeminarPage() {
  return (
    <div className="seminar-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Seminar & Diskusi" }]}
        label="Kegiatan & Kebersamaan"
        title="Seminar & Diskusi"
        intro="Ruang informasi seminar, diskusi, dan materi pendukung."
      />
      <SeminarBrowser />
    </div>
  );
}
