import { Clock3, MapPinned } from "lucide-react";

import type { PrayerTimes } from "../../lib/prayer-times";
import { site } from "../../lib/site";
import { SectionLabel } from "../section-label";

function PrayerCard({ prayer }: { prayer: PrayerTimes }) {
  if (prayer.status === "unavailable") {
    return (
      <div className="flex flex-col gap-4 rounded-lg bg-ak-pale p-7">
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
    <div className="flex flex-col gap-6 rounded-lg bg-ak-sage p-7">
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
            <span className="text-[11px] leading-[1.6] text-[#6c7f66]">{name}</span>
            <span className="text-[15px] leading-[1.6] font-bold text-ak-dark sm:text-[19px]">
              {time}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-[11px] leading-[1.6] text-[#6d7d65]">
        Sumber: Aladhan, metode Kemenag RI untuk wilayah Cimahi Selatan. Waktu dapat berbeda
        beberapa menit dari jadwal resmi.
      </p>
    </div>
  );
}

function AddressCard() {
  return (
    <div className="flex flex-col gap-[17px] rounded-lg bg-white p-7">
      <div className="flex items-start justify-between">
        <SectionLabel>Alamat Masjid</SectionLabel>
        <MapPinned aria-hidden="true" className="size-5 text-ak-icon" />
      </div>
      <p className="text-xl leading-[1.6] font-bold text-ak-dark">{site.street}</p>
      <p className="text-sm leading-[1.6] text-ak-body">{site.fullAddress}</p>
      <a
        href={site.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-fit py-0.5 text-[13px] leading-[1.6] font-semibold text-primary hover:underline"
      >
        Buka petunjuk arah <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}

export function PracticalInfo({ prayer }: { prayer: PrayerTimes }) {
  return (
    <section
      id="informasi-praktis"
      className="flex flex-col gap-7 bg-ak-cream px-[26px] py-12 lg:px-19 lg:py-[78px]"
    >
      <div className="flex flex-col gap-2.5">
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
      <div className="grid gap-6 lg:grid-cols-2">
        <PrayerCard prayer={prayer} />
        <AddressCard />
      </div>
    </section>
  );
}
