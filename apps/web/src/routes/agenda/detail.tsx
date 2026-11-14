import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { EmptyState } from "../../components/empty-state";
import { PageHeader } from "../../components/page-header";
import { agendaEvents } from "../../lib/agenda";
import { site } from "../../lib/site";

const title = "Kajian dan Kebersamaan Warga";
const information = [
  ["Tanggal", "Belum ditetapkan"],
  ["Waktu", "WIB · belum dikonfirmasi"],
  ["Lokasi", "Belum dikonfirmasi"],
  ["Narasumber", "Belum diberikan"],
  ["Pendaftaran", "Belum tersedia"],
] as const;
const buttonClass =
  "inline-flex min-h-12 items-center justify-center gap-2.5 self-start rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale";

export const Route = createFileRoute("/agenda/detail")({
  head: () => ({
    meta: [
      { title: `${title} | ${site.name}` },
      {
        name: "description",
        content: "Contoh konten kegiatan. Belum dijadwalkan dan bukan pengumuman aktif.",
      },
    ],
  }),
  component: AgendaDetail,
});

function AgendaDetail() {
  const { image } = agendaEvents[0]!;

  return (
    <div className="agenda-detail-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: title }]}
        label="Agenda / Contoh Konten"
        title={title}
        intro="Contoh konten: kegiatan ini belum dijadwalkan dan bukan pengumuman aktif."
      />
      <article className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <a href="/agenda" className={buttonClass}>
          Kembali ke daftar
          <ArrowUpRight aria-hidden="true" className="size-[15px]" />
        </a>
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:gap-7">
          <img
            src={image.src}
            alt="Suasana jamaah sebagai ilustrasi umum, bukan dokumentasi acara tertentu"
            width={1200}
            height={540}
            fetchPriority="high"
            className="h-[230px] w-full rounded-[7px] object-cover md:h-[400px] md:bg-ak-cream md:object-contain"
          />
          <section
            aria-labelledby="informasi-kegiatan"
            className="flex min-w-0 flex-col gap-4 rounded-[7px] bg-ak-pale p-7"
          >
            <h2
              id="informasi-kegiatan"
              className="text-[23px] leading-[1.4] font-semibold lg:text-[30px]"
            >
              Informasi kegiatan
            </h2>
            <dl className="flex flex-col gap-4">
              {information.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-4">
                  <dt className="text-[10px] leading-[1.65] font-semibold text-ak-brown uppercase">
                    {label}
                  </dt>
                  <dd className="text-sm leading-[1.65]">{value}</dd>
                </div>
              ))}
            </dl>
            <p className="rounded-[5px] px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted">
              Tidak ada tautan pendaftaran aktif.
            </p>
          </section>
        </div>
        <section aria-labelledby="tentang-kegiatan" className="flex flex-col gap-3">
          <h2
            id="tentang-kegiatan"
            className="text-[23px] leading-[1.4] font-semibold lg:text-[30px]"
          >
            Tentang kegiatan
          </h2>
          <p className="text-sm leading-[1.65] text-ak-muted lg:text-base">
            Contoh penyajian deskripsi kegiatan. Tema, alur kegiatan, sasaran peserta, dan ketentuan
            mengikuti akan disesuaikan dengan informasi resmi. Jangan menggunakan halaman contoh ini
            sebagai jadwal kegiatan.
          </p>
        </section>
        <a href="/kontak" className={buttonClass}>
          Tanyakan informasi kegiatan
          <ArrowUpRight aria-hidden="true" className="size-[15px]" />
        </a>
        <h2 id="agenda-terkait" className="text-[23px] leading-[1.4] font-semibold lg:text-[30px]">
          Agenda terkait
        </h2>
        <section aria-labelledby="agenda-terkait">
          <EmptyState
            title="Belum ada agenda terkait"
            description="Rekomendasi agenda akan tampil setelah kegiatan resmi diterbitkan."
          />
        </section>
      </article>
    </div>
  );
}
