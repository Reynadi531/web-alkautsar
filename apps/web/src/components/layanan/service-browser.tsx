import { ArrowUpRight, MapPin, MessagesSquare } from "lucide-react";
import { useState } from "react";

import { serviceExamples, serviceNotice, serviceSummary } from "../../lib/layanan";
import { EmptyState } from "../empty-state";
import { SearchField, SelectField } from "../filter-controls";
import { SectionLabel } from "../section-label";

const categories = ["Semua layanan", ...serviceExamples.map((service) => service.title)];
const periods = ["Periode: semua"];

export function ServiceBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(categories[0]!);
  const normalized = query.trim().toLocaleLowerCase("id");
  const [period, setPeriod] = useState(periods[0]!);
  const results = serviceExamples.filter(
    (service) =>
      (category === categories[0] || category === service.title) &&
      `${service.title} Contoh konten ${serviceSummary}`
        .toLocaleLowerCase("id")
        .includes(normalized),
  );

  return (
    <div
      id="konten-utama"
      className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16"
    >
      <p className="rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted">
        {serviceNotice}
      </p>
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
          <span className="sr-only">Jadwal layanan belum dikonfirmasi.</span>
        </div>
      </search>
      <h2 className="text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]">
        Ruang layanan
      </h2>
      <p role="status" className="sr-only">
        {results.length} contoh layanan ditemukan
      </p>
      {results.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 lg:gap-7">
          {results.map((service) => {
            const Icon = service.id === 1 ? MapPin : MessagesSquare;
            return (
              <article
                key={service.id}
                className="flex flex-col items-start gap-4 rounded-[7px] bg-ak-cream p-7"
              >
                <Icon aria-hidden="true" className="size-7 text-primary" />
                <SectionLabel>Contoh konten</SectionLabel>
                <h3 className="text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]">
                  {service.title}
                </h3>
                <p className="text-sm leading-[1.65] text-ak-muted">{serviceSummary}</p>
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
        <div className="flex flex-col gap-4">
          <EmptyState
            title="Tidak ada layanan yang cocok"
            description="Coba kata kunci lain atau tampilkan semua contoh layanan."
          />
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory(categories[0]!);
            }}
            className="min-h-12 self-start rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale"
          >
            Reset pencarian
          </button>
        </div>
      )}
      <EmptyState
        title="Belum ada layanan terkonfirmasi"
        description="Daftar resmi akan ditambahkan setelah dikonfirmasi oleh pengurus."
      />
      <a
        href="/kontak"
        className="inline-flex min-h-12 items-center justify-center gap-2.5 self-start rounded-[5px] border border-primary bg-primary px-[18px] text-[13px] font-semibold text-white hover:bg-ak-dark"
      >
        Kontak &amp; lokasi <ArrowUpRight aria-hidden="true" className="size-[15px]" />
      </a>
    </div>
  );
}
