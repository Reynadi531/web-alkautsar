import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Image } from "lucide-react";

import { EmptyState } from "../components/empty-state";
import { PageHeader } from "../components/page-header";
import { site } from "../lib/site";

export const Route = createFileRoute("/donasi")({
  head: () => ({ meta: [{ title: `Donasi untuk Masjid | ${site.name}` }] }),
  component: DonationPage,
});

const headingClass = "text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]";
const noticeClass =
  "rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted";
const donationSteps = [
  "Tunggu informasi kanal dan tujuan donasi resmi.",
  "Periksa kembali nama penerima sebelum menyelesaikan transaksi.",
  "Simpan bukti transaksi dan konfirmasikan melalui kontak resmi jika diperlukan.",
];

function DonationPage() {
  return (
    <div className="donation-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Donasi untuk Masjid" }]}
        label="Kebaikan & Kepedulian"
        title="Donasi untuk Masjid"
        intro="Ruang informasi untuk mendukung kegiatan dan kebutuhan masjid melalui kanal resmi."
      />
      <div className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <p className={noticeClass}>
          Informasi donasi resmi belum diberikan. Jangan melakukan transfer berdasarkan desain ini.
          QRIS, rekening, penerima, dan kontak konfirmasi harus diverifikasi sebelum diterbitkan.
        </p>
        <h2 id="tujuan-donasi" className={headingClass}>
          Pilihan tujuan donasi
        </h2>
        <section aria-labelledby="tujuan-donasi">
          <EmptyState
            title="Tujuan donasi belum dikonfirmasi"
            description="Daftar tujuan dan peruntukan dana akan ditampilkan setelah mendapat informasi resmi."
          />
        </section>
        <div
          id="metode-donasi"
          className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:gap-7"
        >
          <section
            aria-labelledby="qris"
            className="flex min-w-0 flex-col gap-5 rounded-[7px] bg-ak-cream p-6 lg:p-8"
          >
            <h2 id="qris" className={headingClass}>
              Melalui QRIS
            </h2>
            <div className="flex h-[300px] w-full max-w-full flex-col items-center justify-center gap-[18px] rounded-[5px] border border-ak-border bg-white p-6 text-center md:w-[300px]">
              <Image aria-hidden="true" className="size-9 shrink-0 text-ak-icon" />
              <p className="text-[22px] leading-[1.65] font-semibold text-ak-dark">
                QRIS resmi masjid
              </p>
              <p className="text-xs leading-[1.65] text-ak-muted">
                Aset resmi belum diberikan
                <br />
                Tidak dapat dipindai
              </p>
            </div>
            <p className="text-xs leading-[1.65] text-ak-muted">
              Pastikan nama penerima sesuai kanal resmi yang dikonfirmasi pengurus.
            </p>
          </section>
          <section
            aria-labelledby="transfer-bank"
            className="flex min-w-0 flex-col gap-5 rounded-[7px] bg-ak-pale p-6 lg:p-8"
          >
            <h2 id="transfer-bank" className={headingClass}>
              Transfer bank
            </h2>
            <h3 className="text-[25px] leading-[1.65] font-semibold text-ak-dark">
              Informasi rekening
            </h3>
            <dl className="flex flex-col gap-5">
              <dt className="text-[10px] leading-[1.65] font-semibold text-ak-brown">BANK</dt>
              <dd className="text-[15px] leading-[1.65] text-ak-muted">Belum diberikan</dd>
              <dt className="text-[10px] leading-[1.65] font-semibold text-ak-brown">
                NOMOR REKENING
              </dt>
              <dd className="text-[15px] leading-[1.65] text-ak-muted">Belum diberikan</dd>
              <dt className="text-[10px] leading-[1.65] font-semibold text-ak-brown">ATAS NAMA</dt>
              <dd className="text-[15px] leading-[1.65] text-ak-muted">Belum dikonfirmasi</dd>
            </dl>
            <p className="text-xs leading-[1.65] text-ak-muted">
              Tidak ada nomor rekening atau identitas penerima contoh.
            </p>
          </section>
        </div>
        <h2 id="cara-berdonasi" className={headingClass}>
          Cara berdonasi
        </h2>
        <ol aria-labelledby="cara-berdonasi" className="flex flex-col gap-7 lg:gap-9">
          {donationSteps.map((step, index) => (
            <li key={step} className="flex gap-4">
              <span
                aria-hidden="true"
                className="w-8 shrink-0 text-lg leading-[1.65] font-semibold text-ak-brown"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-sm leading-[1.65] text-ak-muted">{step}</p>
            </li>
          ))}
        </ol>
        <p className={noticeClass}>
          Kontak konfirmasi donasi belum diberikan. Halaman ini bukan aplikasi pencatatan keuangan;
          ruangmasjid tetap berada di lingkup terpisah.
        </p>
        <a
          href="/kontak"
          className="inline-flex min-h-12 items-center justify-center gap-2.5 self-start rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale"
        >
          Lihat kontak masjid
          <ArrowUpRight aria-hidden="true" className="size-[15px]" />
        </a>
      </div>
    </div>
  );
}
