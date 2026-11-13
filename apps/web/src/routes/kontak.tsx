import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";

import { PageHeader } from "../components/page-header";
import { site } from "../lib/site";

export const Route = createFileRoute("/kontak")({
  head: () => ({
    meta: [
      { title: `Kontak & Lokasi | ${site.name}` },
      {
        name: "description",
        content: `${site.street}, ${site.fullAddress}. Informasi lokasi dan akun Instagram masjid.`,
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="service-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Kontak & Lokasi" }]}
        label="Kunjungi masjid"
        title="Kontak & Lokasi"
        intro="Alamat masjid dan kanal informasi yang tersedia."
      />
      <div className="grid gap-7 px-[26px] py-8 md:grid-cols-2 lg:gap-9 lg:px-19 lg:py-[52px]">
        <section
          aria-labelledby="lokasi-masjid"
          className="flex flex-col items-start gap-4 rounded-[7px] bg-ak-cream p-7"
        >
          <MapPin aria-hidden="true" className="size-7 text-primary" />
          <h2 id="lokasi-masjid" className="text-[23px] leading-[1.4] font-semibold lg:text-[30px]">
            Lokasi masjid
          </h2>
          <address className="text-sm leading-[1.85] text-ak-muted not-italic">
            {site.name}
            <br />
            {site.street}
            <br />
            {site.fullAddress}
          </address>
          <a
            href={site.mapsUrl}
            className="inline-flex min-h-12 items-center gap-2.5 rounded-[5px] bg-primary px-[18px] text-[13px] font-semibold text-white hover:bg-ak-dark"
          >
            Buka Google Maps <ArrowUpRight aria-hidden="true" className="size-[15px]" />
          </a>
        </section>
        <section
          aria-labelledby="informasi-masjid"
          className="flex flex-col items-start gap-4 rounded-[7px] bg-ak-pale p-7"
        >
          <h2
            id="informasi-masjid"
            className="text-[23px] leading-[1.4] font-semibold lg:text-[30px]"
          >
            Informasi masjid
          </h2>
          <p className="text-sm leading-[1.65] text-ak-muted">
            Akun Instagram masjid: {site.instagramHandle}
          </p>
          <a
            href={site.instagramUrl}
            className="inline-flex min-h-12 items-center gap-2.5 rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-white"
          >
            Buka Instagram masjid <ArrowUpRight aria-hidden="true" className="size-[15px]" />
          </a>
          <p className="text-sm leading-[1.65] text-ak-muted">
            Kontak khusus pengelola layanan belum dikonfirmasi.
          </p>
        </section>
      </div>
    </div>
  );
}
