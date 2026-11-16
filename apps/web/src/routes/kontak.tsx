import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Map, MapPinned } from "lucide-react";

import { InstagramIcon } from "../components/instagram-icon";
import { PageHeader } from "../components/page-header";
import { useContact } from "../lib/kontak";
import { site } from "../lib/site";

export const Route = createFileRoute("/kontak")({
  head: () => ({
    meta: [
      { title: `Kontak & Lokasi | ${site.name}` },
      {
        name: "description",
        content: "Alamat, petunjuk arah, dan kanal komunikasi Masjid Al-Kautsar Pharmindo.",
      },
    ],
  }),
  component: ContactPage,
});

/** wa.me needs digits only, with the Indonesian country code instead of a leading 0. */
function toWhatsappNumber(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
}

function ContactPage() {
  const contact = useContact();
  const channels = [
    { label: "Telepon", value: contact.phone, href: contact.phone && `tel:${contact.phone}` },
    {
      label: "WhatsApp",
      value: contact.whatsapp,
      href: contact.whatsapp && `https://wa.me/${toWhatsappNumber(contact.whatsapp)}`,
    },
    { label: "Email", value: contact.email, href: contact.email && `mailto:${contact.email}` },
  ];

  return (
    <div className="service-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Kontak & Lokasi" }]}
        label="Temukan kami"
        title="Kontak & Lokasi"
        intro="Dekat dengan warga, mudah ditemukan di Komplek Pharmindo, Cimahi Selatan."
      />
      <div className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <div className="grid items-start gap-5 md:grid-cols-2 lg:gap-7">
          <section
            aria-labelledby="lokasi-masjid"
            className="flex min-w-0 flex-col items-start gap-[18px] rounded-[7px] bg-ak-cream p-6 lg:p-8"
          >
            <MapPinned aria-hidden="true" className="size-7 text-primary" />
            <h2
              id="lokasi-masjid"
              className="text-[23px] leading-[1.4] font-semibold lg:text-[30px]"
            >
              {site.name}
            </h2>
            <address className="flex flex-col gap-[18px] not-italic">
              <span className="text-[21px] leading-[1.65] font-semibold">{contact.street}</span>
              <span className="text-[15px] leading-[1.65] text-ak-muted">
                {contact.fullAddress}
              </span>
            </address>
            <a
              href={contact.mapsUrl}
              className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[5px] bg-primary px-[18px] text-[13px] font-semibold text-white hover:bg-ak-dark"
            >
              Buka petunjuk arah{" "}
              <ArrowUpRight aria-hidden="true" className="size-[15px] shrink-0" />
            </a>
          </section>
          {contact.mapEmbedUrl ? (
            <iframe
              src={contact.mapEmbedUrl}
              title="Peta lokasi Masjid Al-Kautsar Pharmindo"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[300px] w-full min-w-0 rounded-[7px] border-0 bg-ak-pale lg:h-[410px]"
            />
          ) : (
            <section
              aria-labelledby="area-peta"
              className="flex min-h-[300px] min-w-0 flex-col items-center justify-center gap-[18px] rounded-[7px] bg-ak-pale p-7 text-center lg:min-h-[410px]"
            >
              <Map aria-hidden="true" className="size-12 shrink-0 text-ak-muted" />
              <h2 id="area-peta" className="text-[25px] leading-[1.65] font-semibold">
                Area peta masjid
              </h2>
              <p className="text-[13px] leading-[1.65] text-ak-muted">
                Pratinjau peta interaktif belum dimuat.
                <br />
                Gunakan petunjuk arah untuk mencari alamat masjid.
              </p>
              <a
                href={contact.mapsUrl}
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-white"
              >
                Lihat di Google Maps{" "}
                <ArrowUpRight aria-hidden="true" className="size-[15px] shrink-0" />
              </a>
            </section>
          )}
        </div>
        <h2
          id="kanal-komunikasi"
          className="text-[23px] leading-[1.4] font-semibold lg:text-[30px]"
        >
          Mari tetap terhubung
        </h2>
        <section
          aria-labelledby="kanal-komunikasi"
          className="grid items-start gap-5 md:grid-cols-2 lg:gap-7"
        >
          <div className="flex min-w-0 flex-col items-start gap-[18px] rounded-[7px] bg-primary p-[26px] text-white">
            <InstagramIcon className="size-[26px] text-ak-on-dark" />
            <h3 className="text-2xl leading-[1.65] font-semibold">Instagram</h3>
            <p className="break-all text-sm leading-[1.65] text-ak-on-dark lg:text-[17px]">
              {contact.instagramHandle ?? "Belum diberikan"}
            </p>
            {contact.instagramUrl && (
              <a
                href={contact.instagramUrl}
                className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold hover:bg-ak-dark"
              >
                Buka Instagram <ArrowUpRight aria-hidden="true" className="size-[15px] shrink-0" />
              </a>
            )}
          </div>
          <dl className="flex flex-col gap-[18px] rounded-[7px] bg-ak-cream p-[26px]">
            {channels.map(({ label, value, href }) => (
              <div key={label} className="flex flex-col gap-[18px]">
                <dt className="text-[15px] leading-[1.65] font-semibold">{label}</dt>
                <dd className="text-xs leading-[1.65] text-ak-muted">
                  {value && href ? (
                    <a href={href} className="break-all font-semibold text-primary hover:underline">
                      {value}
                    </a>
                  ) : (
                    "Belum diberikan"
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <section aria-labelledby="informasi-kunjungan" className="flex flex-col gap-3">
          <h2
            id="informasi-kunjungan"
            className="text-[23px] leading-[1.4] font-semibold lg:text-[30px]"
          >
            Informasi kunjungan
          </h2>
          <p className="text-sm leading-[1.65] whitespace-pre-line text-ak-muted lg:text-base">
            {contact.visitInfo ??
              "Jam kunjungan, akses rombongan, dan kontak pengelola belum dikonfirmasi. Periksa informasi resmi sebelum merencanakan kunjungan khusus."}
          </p>
        </section>
        <section aria-label="Foto lingkungan masjid" className="grid gap-5 md:grid-cols-2">
          <img
            src="/images/masjid-udara.webp"
            alt="Masjid Al-Kautsar Pharmindo dan lingkungan sekitar dilihat dari udara"
            width={634}
            height={390}
            loading="lazy"
            className="h-[250px] w-full rounded-[7px] object-cover lg:h-[390px]"
          />
          <img
            src="/images/masjid-tampak-depan.webp"
            alt="Tampak depan Masjid Al-Kautsar Pharmindo"
            width={634}
            height={390}
            loading="lazy"
            className="hidden h-[250px] w-full rounded-[7px] object-cover md:block lg:h-[390px]"
          />
        </section>
      </div>
    </div>
  );
}
