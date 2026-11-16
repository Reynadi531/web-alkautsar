import { createFileRoute } from "@tanstack/react-router";
import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { ArrowUpRight } from "lucide-react";

import { PageHeader } from "../../components/page-header";
import { RichText } from "../../components/rich-text";
import { getHistory } from "../../lib/profil";
import { site } from "../../lib/site";

export const Route = createFileRoute("/profil/sejarah")({
  loader: () => getHistory(),
  head: () => ({
    meta: [
      { title: `Sejarah Masjid | ${site.name}` },
      {
        name: "description",
        content: "Ruang untuk mendokumentasikan perjalanan Masjid Al-Kautsar Pharmindo.",
      },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const history = Route.useLoaderData();

  return (
    <div className="history-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: "Sejarah Masjid" }]}
        label="Masjid Al-Kautsar"
        title="Sejarah Masjid"
        intro="Ruang untuk mendokumentasikan perjalanan Masjid Al-Kautsar Pharmindo."
      />

      <div className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <section
          id="bangunan-masjid"
          aria-label="Bangunan masjid saat ini"
          className="grid gap-5 overflow-hidden rounded-[7px] bg-ak-cream lg:grid-cols-2"
        >
          <img
            src="/images/masjid-udara.webp"
            alt="Masjid Al-Kautsar Pharmindo dan lingkungan sekitarnya dilihat dari udara"
            width={1536}
            height={1024}
            fetchPriority="high"
            className="h-[260px] w-full object-cover md:h-[340px] lg:h-[360px]"
          />
          <img
            src="/images/masjid-tampak-depan.webp"
            alt="Tampak depan bangunan Masjid Al-Kautsar Pharmindo"
            width={1400}
            height={788}
            className="hidden h-[360px] w-full object-cover lg:block"
          />
        </section>

        {history.sample && (
          <aside
            id="catatan-validasi"
            aria-label="Catatan validasi konten sejarah"
            className="rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted"
          >
            Narasi sejarah, tahun pendirian, dan tonggak perjalanan belum diberikan. Seluruh
            keterangan berikut merupakan placeholder editorial, bukan fakta sejarah.
          </aside>
        )}

        <section
          id="narasi-dan-perjalanan-waktu"
          aria-labelledby="judul-narasi"
          className="grid gap-5 lg:grid-cols-2 lg:gap-7"
        >
          <div className="flex flex-col items-start gap-[18px]">
            <h2
              id="judul-narasi"
              className="text-[23px] leading-[1.4] font-semibold text-ak-dark lg:text-[30px]"
            >
              {history.title ?? "Perjalanan masjid"}
            </h2>
            {history.narrative ? (
              <RichText html={history.narrative} />
            ) : (
              <p className="text-sm leading-[1.65] text-ak-muted lg:text-base">
                Naskah sejarah akan ditampilkan setelah diverifikasi bersama pengurus.
              </p>
            )}
            <a href="/profil" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Kembali ke profil
              <ArrowUpRight aria-hidden="true" />
            </a>
          </div>

          {history.milestones.length > 0 && (
            <ol
              aria-label={history.sample ? "Linimasa, placeholder editorial" : "Linimasa"}
              className="flex flex-col gap-4 rounded-[7px] bg-ak-cream p-[26px]"
            >
              {history.milestones.map((milestone, index) => (
                <li
                  key={milestone.id}
                  className="flex flex-col gap-[7px] border-b border-ak-divider py-2.5"
                >
                  <h3 className="text-[17px] leading-[1.65] font-semibold text-ak-dark">
                    {String(index + 1).padStart(2, "0")} · {milestone.title}
                  </h3>
                  {milestone.description && (
                    <p className="text-[13px] leading-[1.65] text-ak-muted">
                      {milestone.description}
                    </p>
                  )}
                </li>
              ))}
            </ol>
          )}
        </section>
      </div>
    </div>
  );
}
