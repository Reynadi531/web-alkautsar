import {
  ArrowUpRight,
  GraduationCap,
  HeartHandshake,
  LayoutGrid,
  MapPin,
  MessagesSquare,
  MoonStar,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";

import type { Service, ServiceIcon } from "../../lib/layanan";
import { matchesQuery } from "../../lib/site";
import { EmptyState } from "../empty-state";
import { SearchField, SelectField } from "../filter-controls";
import { SectionLabel } from "../section-label";

const ALL_SERVICES = "Semua layanan";
const periods = ["Periode: semua"];
const icons: Record<ServiceIcon, LucideIcon> = {
  lokasi: MapPin,
  percakapan: MessagesSquare,
  ibadah: MoonStar,
  pendidikan: GraduationCap,
  kepedulian: HeartHandshake,
  umum: LayoutGrid,
};

export function ServiceBrowser({ services }: { services: readonly Service[] }) {
  const categories = [ALL_SERVICES, ...services.map((service) => service.title)];
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL_SERVICES);
  const [period, setPeriod] = useState(periods[0]!);
  const results = services.filter(
    (service) =>
      (category === ALL_SERVICES || category === service.title) &&
      matchesQuery(query, service.title, service.summary),
  );
  const hasOfficial = services.some((service) => !service.sample);

  return (
    <div
      id="konten-utama"
      className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16"
    >
      {!hasOfficial && (
        <p className="rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted">
          Daftar layanan resmi belum diberikan. Contoh di bawah bukan pernyataan bahwa layanan
          Salman tersedia di Al-Kautsar.
        </p>
      )}
      <search aria-label="Cari layanan" className="flex flex-col gap-5 lg:flex-row lg:gap-7">
        <SearchField value={query} onChange={setQuery} />
        <SelectField
          label="Jenis layanan"
          value={category}
          options={categories}
          onChange={setCategory}
        />
        <div>
          <SelectField
            label="Periode layanan"
            value={period}
            options={periods}
            onChange={setPeriod}
          />
          <span className="sr-only">Layanan tidak dikelompokkan menurut periode.</span>
        </div>
      </search>
      <h2 className="text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]">
        Ruang layanan
      </h2>
      <p role="status" className="sr-only">
        {results.length} layanan ditemukan
      </p>
      {results.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:gap-7">
          {results.map((service) => {
            const Icon = icons[service.icon] ?? LayoutGrid;
            return (
              <article
                key={service.id}
                className="flex flex-col items-start gap-4 rounded-[7px] bg-ak-cream p-7"
              >
                <Icon aria-hidden="true" className="size-7 text-primary" />
                {service.sample && <SectionLabel>Contoh konten</SectionLabel>}
                <h3 className="text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]">
                  {service.title}
                </h3>
                {service.summary && (
                  <p className="text-sm leading-[1.65] text-ak-muted">{service.summary}</p>
                )}
                <a
                  href={service.href}
                  aria-label={`Lihat detail layanan: ${service.title}`}
                  className="inline-flex min-h-12 items-center justify-center gap-2.5 rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale"
                >
                  Lihat detail layanan <ArrowUpRight aria-hidden="true" className="size-[15px]" />
                </a>
              </article>
            );
          })}
        </div>
      ) : (
        services.length > 0 && (
          <div className="flex flex-col gap-4">
            <EmptyState
              title="Tidak ada layanan yang cocok"
              description="Coba kata kunci lain atau tampilkan semua layanan."
            />
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory(ALL_SERVICES);
              }}
              className="min-h-12 self-start rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale"
            >
              Reset pencarian
            </button>
          </div>
        )
      )}
      {!hasOfficial && (
        <EmptyState
          title="Belum ada layanan terkonfirmasi"
          description="Daftar resmi akan ditambahkan setelah dikonfirmasi oleh pengurus."
        />
      )}
      <a
        href="/kontak"
        className="inline-flex min-h-12 items-center justify-center gap-2.5 self-start rounded-[5px] border border-primary bg-primary px-[18px] text-[13px] font-semibold text-white hover:bg-ak-dark"
      >
        Kontak &amp; lokasi <ArrowUpRight aria-hidden="true" className="size-[15px]" />
      </a>
    </div>
  );
}
