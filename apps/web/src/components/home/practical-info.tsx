import { Clock3, MapPinned } from "lucide-react";

import type { PrayerTimes } from "../../lib/prayer-times";
import { site } from "../../lib/site";
import { SectionLabel } from "../section-label";

function PrayerCard({ prayer }: { prayer: PrayerTimes }) {
  if (prayer.status === "unavailable") {
    return (
      <div className="flex min-h-[284px] flex-col gap-4 bg-ak-pale px-[26px] py-8 lg:min-h-0 lg:rounded-lg lg:p-7">
        <div className="flex items-center gap-3">
          <h3 className="flex-1 text-[22px] leading-[1.6] font-bold text-ak-dark">Jadwal salat</h3>
          <span className="rounded-full bg-[#dae7d2] px-2 py-1 text-[9px] text-[#476746]">
            Belum tersedia
          </span>
        </div>
        <p className="text-xs leading-[1.6] text-ak-muted">Waktu salat untuk wilayah Cimahi.</p>
        <div className="flex gap-3.5 rounded-[5px] bg-white p-[18px]">
          <Clock3 aria-hidden="true" className="size-[22px] shrink-0 text-[#71926c]" />
          <div className="flex flex-1 flex-col gap-[5px]">
            <p className="text-sm leading-[1.6] font-semibold text-ak-dark">
              Jadwal sedang disiapkan
            </p>
            <p className="text-[11px] leading-[1.6] text-ak-body">
              Waktu salat akan ditampilkan setelah data terkonfirmasi.
            </p>
          </div>
        </div>
        <p className="text-[10px] leading-[1.6] text-ak-body">
          Silakan periksa kembali untuk pembaruan jadwal.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 bg-ak-sage px-[26px] py-8 lg:rounded-lg lg:p-7">
      <div className="flex items-center gap-2.5">
        <Clock3 aria-hidden="true" className="size-5 shrink-0 text-ak-icon" />
        <h3 className="flex-1 text-[19px] leading-[1.6] font-bold text-ak-dark">Jadwal salat</h3>
        <span className="rounded-full border border-[#b9c9b4] px-2 py-[5px] text-[10px] text-[#526f52]">
          {prayer.dateLabel}
        </span>
      </div>
      <ul className="grid grid-cols-5 gap-2">
        {prayer.times.map(({ name, time }) => (
          <li
            key={name}
            className="flex flex-col gap-[9px] rounded bg-ak-mist px-2 py-3.5 sm:px-2.5"
          >
            <span className="text-[11px] leading-[1.6] text-ak-muted">{name}</span>
            <span className="text-[15px] leading-[1.6] font-bold text-ak-dark sm:text-[19px]">
              {time}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-[11px] leading-[1.6] text-ak-muted">
        Sumber: Aladhan, metode Kemenag RI untuk wilayah Cimahi Selatan. Waktu dapat berbeda
        beberapa menit dari jadwal resmi.
      </p>
    </div>
  );
}

function AddressCard() {
  return (
    <div className="flex min-h-[360px] flex-col gap-[17px] bg-ak-cream px-[26px] py-9 lg:min-h-0 lg:rounded-lg lg:bg-white lg:p-7">
      <div className="flex flex-col gap-[17px] lg:hidden">
        <SectionLabel className="text-[9px] tracking-[1.3px]">Temukan Kami</SectionLabel>
        <h2 className="text-[25px] leading-[1.6] font-bold text-ak-dark">
          Dekat dengan warga,
          <br />
          mudah ditemukan.
        </h2>
      </div>
      <div className="hidden items-start justify-between lg:flex">
        <SectionLabel>Alamat Masjid</SectionLabel>
        <MapPinned aria-hidden="true" className="size-5 text-ak-icon" />
      </div>
      <div className="flex flex-col gap-3 rounded-[7px] bg-white p-5 lg:gap-[17px] lg:p-0">
        <h3 className="text-sm font-semibold text-ak-dark lg:hidden">{site.name}</h3>
        <p className="hidden text-xl leading-[1.6] font-bold text-ak-dark lg:block">
          {site.street}
        </p>
        <p className="text-xs leading-[1.7] text-ak-muted lg:text-sm lg:leading-[1.6]">
          <span className="lg:hidden">{site.street} · </span>
          {site.fullAddress}
        </p>
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 w-fit items-center text-xs leading-[1.6] font-semibold text-primary hover:underline lg:min-h-0 lg:py-0.5 lg:text-[13px]"
        >
          Buka petunjuk arah <span aria-hidden="true">↗</span>
        </a>
      </div>
    </div>
  );
}

export function PracticalInfo({ prayer }: { prayer: PrayerTimes }) {
  return (
    <section
      id="informasi-praktis"
      className="flex flex-col bg-ak-cream lg:min-h-[586px] lg:gap-7 lg:px-19 lg:py-[78px]"
    >
      <div className="hidden flex-col gap-2.5 lg:flex">
        <SectionLabel>Informasi untuk Anda</SectionLabel>
        <div className="grid items-center gap-2 lg:grid-cols-2">
          <h2 className="text-[25px] leading-[1.6] font-bold text-ak-dark lg:text-[34px]">
            Mulai dari sini.
          </h2>
          <p className="text-sm leading-[1.6] text-ak-body">
            Hal-hal penting sebelum Anda berkunjung.
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse lg:grid lg:min-h-[286px] lg:grid-cols-2 lg:gap-6">
        <PrayerCard prayer={prayer} />
        <AddressCard />
      </div>
    </section>
  );
}
