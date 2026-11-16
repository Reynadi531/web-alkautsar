import { ArrowUpRight, FileText } from "lucide-react";

import type { AgendaDetail, EventKind } from "../lib/agenda";
import { AgendaCard } from "./agenda/agenda-card";
import { EmptyState } from "./empty-state";
import { PageHeader } from "./page-header";
import { RichText } from "./rich-text";

const heading = "text-[23px] leading-[1.4] font-semibold lg:text-[30px]";
const buttonClass =
  "inline-flex min-h-12 items-center justify-center gap-2.5 self-start rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale";

/** Detail page shared by /agenda/$slug and /seminar/$slug. */
export function EventDetail({ event, kind }: { event: AgendaDetail; kind: EventKind }) {
  const isSeminar = kind === "seminar";

  return (
    <div className={isSeminar ? "seminar-page" : "agenda-detail-page"}>
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: event.title }]}
        label={event.sample ? `${event.category} / Contoh Konten` : event.category}
        title={event.title}
        intro={
          event.sample
            ? "Contoh konten: kegiatan ini belum dijadwalkan dan bukan pengumuman aktif."
            : event.summary || event.schedule
        }
      />
      <article className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <a href={`/${kind}`} className={buttonClass}>
          Kembali ke daftar
          <ArrowUpRight aria-hidden="true" className="size-[15px]" />
        </a>
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:gap-7">
          {event.image && (
            <img
              src={event.image.src}
              alt={event.image.alt}
              width={1200}
              height={540}
              fetchPriority="high"
              className="h-[230px] w-full rounded-[7px] object-cover md:h-[400px] md:bg-ak-cream md:object-contain"
            />
          )}
          <section
            aria-labelledby="informasi-kegiatan"
            className="flex min-w-0 flex-col gap-4 rounded-[7px] bg-ak-pale p-7"
          >
            <h2 id="informasi-kegiatan" className={heading}>
              Informasi kegiatan
            </h2>
            <dl className="flex flex-col gap-4">
              {event.information.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-4">
                  <dt className="text-[10px] leading-[1.65] font-semibold text-ak-brown uppercase">
                    {label}
                  </dt>
                  <dd className="text-sm leading-[1.65]">{value}</dd>
                </div>
              ))}
            </dl>
            {event.registrationUrl ? (
              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2.5 self-start rounded-[5px] bg-primary px-[18px] text-[13px] font-semibold text-white hover:bg-ak-dark"
              >
                Daftar kegiatan <ArrowUpRight aria-hidden="true" className="size-[15px]" />
              </a>
            ) : (
              <p className="rounded-[5px] px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted">
                Tidak ada tautan pendaftaran aktif.
              </p>
            )}
          </section>
        </div>
        {event.description && (
          <section aria-labelledby="tentang-kegiatan" className="flex flex-col gap-3">
            <h2 id="tentang-kegiatan" className={heading}>
              {isSeminar ? "Tentang seminar" : "Tentang kegiatan"}
            </h2>
            <RichText html={event.description} />
          </section>
        )}
        {isSeminar && (
          <section
            aria-label="Materi seminar"
            className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-[7px] bg-ak-pale p-[26px] text-center lg:min-h-[280px]"
          >
            <FileText aria-hidden="true" className="size-9 text-primary" />
            {event.materialUrl ? (
              <>
                <h2 className="text-[22px] leading-[1.65] font-semibold">Materi seminar</h2>
                <a
                  href={event.materialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${buttonClass} self-center bg-white`}
                >
                  Buka materi <ArrowUpRight aria-hidden="true" className="size-[15px]" />
                </a>
              </>
            ) : (
              <>
                <h2 className="text-[22px] leading-[1.65] font-semibold">
                  Pratinjau belum tersedia
                </h2>
                <p className="text-[13px] leading-[1.65] text-ak-muted">
                  Berkas resmi belum diberikan. Tidak ada unduhan aktif.
                </p>
              </>
            )}
          </section>
        )}
        <a href="/kontak" className={buttonClass}>
          Tanyakan informasi kegiatan
          <ArrowUpRight aria-hidden="true" className="size-[15px]" />
        </a>
        <h2 id="agenda-terkait" className={heading}>
          Agenda terkait
        </h2>
        <section aria-labelledby="agenda-terkait">
          {event.related.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:gap-7">
              {event.related.map((related) => (
                <AgendaCard key={related.id} event={related} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Belum ada agenda terkait"
              description="Rekomendasi agenda akan tampil setelah kegiatan resmi diterbitkan."
            />
          )}
        </section>
      </article>
    </div>
  );
}
