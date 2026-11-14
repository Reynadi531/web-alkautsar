import { ArrowUpRight, Share2 } from "lucide-react";
import { useState } from "react";

import { type ArticleItem, sampleArticleBody } from "../lib/artikel";
import { EmptyState } from "./empty-state";
import { PageHeader } from "./page-header";

const buttonClass =
  "inline-flex min-h-12 items-center justify-center gap-2.5 self-start rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale disabled:cursor-not-allowed disabled:opacity-60";

function ShareButton() {
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");

  async function share() {
    setStatus("copying");
    try {
      await navigator.clipboard.writeText(window.location.href);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button type="button" className={buttonClass} onClick={share} disabled={status === "copying"}>
        <Share2 aria-hidden="true" className="size-[17px]" />
        Bagikan
      </button>
      <p
        role="status"
        className={status === "idle" ? "sr-only" : "text-xs leading-[1.65] text-ak-muted"}
      >
        {status === "copying"
          ? "Menyalin tautan…"
          : status === "copied"
            ? "Tautan disalin. Tempel untuk membagikan bacaan."
            : status === "error"
              ? "Tautan tidak dapat disalin. Salin alamat halaman dari bilah peramban."
              : ""}
      </p>
    </div>
  );
}

export function EditorialDetail({
  article,
  label,
  listHref,
}: {
  article: ArticleItem;
  label: "Artikel" | "Berita" | "Kolom";
  listHref: string;
}) {
  return (
    <div className="article-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: article.title }]}
        label={label}
        title={article.title}
        intro={`Contoh konten · ${label} · naskah ilustratif untuk kebutuhan desain.`}
      />
      <article className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <a href={listHref} className={buttonClass}>
          Kembali ke daftar
          <ArrowUpRight aria-hidden="true" className="size-[15px]" />
        </a>
        <div className="flex flex-col gap-5 md:flex-row md:justify-between md:gap-7">
          <p className="whitespace-pre-line text-xs leading-[1.65] text-ak-muted">
            {
              "Penulis: belum diberikan · Tanggal: belum dikonfirmasi\nSumber naskah: menunggu konfirmasi pengurus"
            }
          </p>
          <ShareButton />
        </div>
        <img
          src={article.image}
          alt={article.alt}
          width={1200}
          height={680}
          fetchPriority="high"
          className="h-[230px] w-full rounded-[7px] object-cover object-center md:h-[340px] lg:h-[450px]"
        />
        <div className="mx-auto flex w-full max-w-[780px] flex-col gap-6">
          <p className="rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted">
            CONTOH KONTEN: teks berikut hanya memperlihatkan tata baca, bukan berita peristiwa atau
            pernyataan resmi Al-Kautsar.
          </p>
          {article.id === 1 ? (
            <>
              {sampleArticleBody.map((section) => (
                <section key={section.text} className="flex flex-col gap-3">
                  {section.heading ? (
                    <>
                      <h2 className="text-[23px] leading-[1.4] font-semibold lg:text-[30px]">
                        {section.heading}
                      </h2>
                      <p className="text-sm leading-[1.65] text-ak-muted lg:text-base">
                        {section.text}
                      </p>
                    </>
                  ) : (
                    <p className="text-[15px] leading-[1.65] text-ak-dark lg:text-[17px]">
                      {section.text}
                    </p>
                  )}
                </section>
              ))}
              <p className="text-[13px] leading-[1.65] text-ak-muted">
                Akhir contoh naskah. Judul, isi, tanggal, penulis, dan sumber perlu diganti dengan
                materi yang disetujui sebelum publikasi.
              </p>
            </>
          ) : (
            <EmptyState
              title="Naskah belum tersedia"
              description="Judul ini merupakan contoh tata letak. Naskah lengkap belum diberikan oleh pengurus."
            />
          )}
          <ShareButton />
        </div>
        <section aria-labelledby="bacaan-terkait" className="flex flex-col gap-7 lg:gap-9">
          <h2
            id="bacaan-terkait"
            className="text-[23px] leading-[1.4] font-semibold lg:text-[30px]"
          >
            {label} terkait
          </h2>
          <EmptyState
            title="Belum ada bacaan terkait"
            description="Tautan bacaan terkait akan muncul setelah konten resmi diterbitkan."
          />
        </section>
      </article>
    </div>
  );
}
