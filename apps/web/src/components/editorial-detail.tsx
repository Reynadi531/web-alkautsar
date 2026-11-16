import { ArrowUpRight, Share2 } from "lucide-react";
import { useState } from "react";

import type { ArticleDetail } from "../lib/tulisan";
import { EditorialCard } from "./editorial-browser";
import { EmptyState } from "./empty-state";
import { PageHeader } from "./page-header";
import { RichText } from "./rich-text";

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
  article: ArticleDetail;
  label: "Artikel" | "Berita" | "Kolom";
  listHref: string;
}) {
  const image = article.detailImage?.desktop ?? article.image;
  const credits = [
    `Penulis: ${article.author ?? "belum diberikan"} · Tanggal: ${article.dateLabel ?? "belum dikonfirmasi"}`,
    article.source
      ? `Sumber naskah: ${article.source}`
      : article.sample
        ? "Sumber naskah: menunggu konfirmasi pengurus"
        : "",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <div className="article-page">
      <PageHeader
        breadcrumb={[{ label: "Beranda", href: "/" }, { label: article.title }]}
        label={label}
        title={article.title}
        intro={
          article.sample
            ? `Contoh konten · ${label} · naskah ilustratif untuk kebutuhan desain.`
            : article.summary || `${label} Masjid Al-Kautsar Pharmindo.`
        }
      />
      <article className="flex flex-col gap-7 px-[26px] pt-8 pb-10 lg:gap-9 lg:px-19 lg:pt-[52px] lg:pb-16">
        <a href={listHref} className={buttonClass}>
          Kembali ke daftar
          <ArrowUpRight aria-hidden="true" className="size-[15px]" />
        </a>
        <div className="flex flex-col gap-5 md:flex-row md:justify-between md:gap-7">
          <p className="whitespace-pre-line text-xs leading-[1.65] text-ak-muted">{credits}</p>
          <ShareButton />
        </div>
        {image && (
          <picture>
            {article.detailImage?.mobile && (
              <source media="(max-width: 767px)" srcSet={article.detailImage.mobile} />
            )}
            <img
              src={image}
              alt={article.alt}
              width={1200}
              height={680}
              fetchPriority="high"
              className="h-[230px] w-full rounded-[7px] object-cover object-center md:h-[340px] lg:h-[450px]"
            />
          </picture>
        )}
        <div className="mx-auto flex w-full max-w-[780px] flex-col gap-6">
          {article.sample && (
            <p className="rounded-[5px] bg-ak-pale px-[18px] py-3.5 text-xs leading-[1.65] text-ak-muted">
              CONTOH KONTEN: teks berikut hanya memperlihatkan tata baca, bukan berita peristiwa
              atau pernyataan resmi Al-Kautsar.
            </p>
          )}
          {article.body ? (
            <>
              <RichText html={article.body} lead />
              {article.sample && (
                <p className="text-[13px] leading-[1.65] text-ak-muted">
                  Akhir contoh naskah. Judul, isi, tanggal, penulis, dan sumber perlu diganti dengan
                  materi yang disetujui sebelum publikasi.
                </p>
              )}
            </>
          ) : (
            <EmptyState
              title="Naskah belum tersedia"
              description={
                article.sample
                  ? "Judul ini merupakan contoh tata letak. Naskah lengkap belum diberikan oleh pengurus."
                  : "Naskah lengkap akan ditampilkan setelah diterbitkan oleh pengurus."
              }
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
          {article.related.length > 0 ? (
            <div className="grid gap-5 md:grid-cols-2 lg:gap-7">
              {article.related.map((related) => (
                <EditorialCard key={related.id} article={related} label={label} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Belum ada bacaan terkait"
              description="Tautan bacaan terkait akan muncul setelah konten resmi diterbitkan."
            />
          )}
        </section>
      </article>
    </div>
  );
}
