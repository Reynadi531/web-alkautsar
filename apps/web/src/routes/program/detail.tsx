import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { PageHeader } from "../../components/page-header";
import { site } from "../../lib/site";

export const Route = createFileRoute("/program/detail")({
  head: () => ({ meta: [{ title: `Ruang Belajar Warga | ${site.name}` }] }),
  component: ProgramDetail,
});

const buttonClass =
  "inline-flex min-h-12 items-center justify-center gap-2.5 self-start rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale";
const headingClass = "text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]";
const participationDetails = [
  ["Jadwal", "Belum dikonfirmasi"],
  ["Lokasi", "Belum dikonfirmasi"],
  ["Pendaftaran", "Belum tersedia"],
  ["Kontak program", "Belum diberikan"],
] as const;

function ProgramDetail() {
  return (
    <div className="program-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Ruang Belajar Warga" }]}
        label="Program / Contoh Konten"
        title="Ruang Belajar Warga"
        intro="Contoh konten: bukan program aktif atau program yang telah disahkan."
      />
      <article className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <a href="/program" className={buttonClass}>
          Kembali ke daftar
          <ArrowUpRight aria-hidden="true" className="size-[15px]" />
        </a>
        <picture className="block h-[250px] overflow-hidden rounded-[7px] bg-ak-cream lg:h-[440px]">
          <source media="(min-width: 1024px)" srcSet="/images/program-belajar-desktop.webp" />
          <img
            src="/images/jamaah-masjid.webp"
            alt="Ilustrasi umum suasana jamaah di masjid, bukan dokumentasi program Ruang Belajar Warga"
            width={1288}
            height={440}
            fetchPriority="high"
            className="h-full w-full object-contain lg:object-cover"
          />
        </picture>
        <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 lg:gap-7">
          <div className="flex min-w-0 flex-col gap-[26px]">
            <section aria-labelledby="tujuan-program" className="flex flex-col gap-3">
              <h2 id="tujuan-program" className={headingClass}>
                Tujuan program
              </h2>
              <p className="text-sm leading-[1.65] text-ak-muted lg:text-base">
                Contoh tujuan: menyediakan ruang belajar dan saling berbagi pengetahuan bagi warga.
                Rumusan ini merupakan contoh konten dan perlu diganti dengan deskripsi program
                resmi.
              </p>
            </section>
            <section aria-labelledby="sasaran-peserta" className="flex flex-col gap-3">
              <h2 id="sasaran-peserta" className={headingClass}>
                Sasaran peserta
              </h2>
              <p className="text-sm leading-[1.65] text-ak-muted lg:text-base">
                Contoh sasaran: jamaah dan warga lingkungan masjid. Persyaratan, kapasitas, dan
                ketentuan peserta belum ditetapkan.
              </p>
            </section>
          </div>
          <section
            aria-labelledby="cara-mengikuti"
            className="flex min-w-0 flex-col gap-5 rounded-[7px] bg-ak-pale p-7"
          >
            <h2 id="cara-mengikuti" className={headingClass}>
              Cara mengikuti
            </h2>
            <dl className="flex flex-col gap-5">
              {participationDetails.map(([label, value]) => (
                <div key={label} className="flex flex-col gap-5">
                  <dt className="text-[10px] leading-[1.65] font-semibold text-ak-brown uppercase">
                    {label}
                  </dt>
                  <dd className="text-sm leading-[1.65] text-ak-dark">{value}</dd>
                </div>
              ))}
            </dl>
            <a href="/kontak" className={buttonClass}>
              Tanyakan program
              <ArrowUpRight aria-hidden="true" className="size-[15px]" />
            </a>
          </section>
        </div>
        <p className="rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted">
          Tidak ada pendaftaran aktif. Kegiatan terkait akan ditampilkan setelah program resmi
          ditetapkan.
        </p>
        <a href="/program" className={buttonClass}>
          Kembali ke semua program
          <ArrowUpRight aria-hidden="true" className="size-[15px]" />
        </a>
      </article>
    </div>
  );
}
