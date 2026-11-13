import { createFileRoute } from "@tanstack/react-router";

import { EmptyState } from "../../components/empty-state";
import { PageHeader } from "../../components/page-header";
import { articles, sampleArticleBody } from "../../lib/artikel";
import { site } from "../../lib/site";

export const Route = createFileRoute("/artikel/detail")({
  validateSearch: (search: Record<string, unknown>) => ({
    contoh: Number(search.contoh) === 2 ? 2 : 1,
  }),
  head: ({ match }) => ({
    meta: [{ title: `${articles[match.search.contoh - 1]!.title} | ${site.name}` }],
  }),
  component: ArticleDetail,
});

function ArticleDetail() {
  const { contoh } = Route.useSearch();
  const article = articles[contoh - 1]!;

  return (
    <div className="article-page">
      <PageHeader
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Artikel Pilihan", href: "/artikel" },
          { label: article.title },
        ]}
        label="Artikel"
        title={article.title}
        intro="Contoh konten · Artikel · naskah ilustratif untuk kebutuhan desain."
      />
      <article className="mx-auto flex max-w-[1000px] flex-col gap-7 px-[26px] py-8 lg:gap-9 lg:px-19 lg:py-[52px]">
        <a
          href="/artikel"
          className="inline-flex min-h-12 items-center self-start rounded-[5px] border border-ak-button-line px-[18px] text-[13px] font-semibold text-primary hover:bg-ak-pale"
        >
          Kembali ke daftar
        </a>
        <p className="whitespace-pre-line text-xs leading-[1.65] text-ak-muted">
          {
            "Penulis: belum diberikan · Tanggal: belum dikonfirmasi\nSumber naskah: menunggu konfirmasi pengurus"
          }
        </p>
        <img
          src={article.image}
          alt={article.alt}
          width={1200}
          height={680}
          fetchPriority="high"
          className="aspect-video w-full rounded-[7px] object-cover"
        />
        <p className="rounded-[7px] bg-ak-pale p-6 text-sm leading-[1.65] text-primary">
          CONTOH KONTEN: teks berikut hanya memperlihatkan tata baca, bukan berita peristiwa atau
          pernyataan resmi Al-Kautsar.
        </p>
        {contoh === 1 ? (
          <>
            {sampleArticleBody.map((section) => (
              <section key={section.text} className="flex flex-col gap-4">
                {section.heading && (
                  <h2 className="text-[23px] leading-[1.4] font-semibold">{section.heading}</h2>
                )}
                <p className="text-base leading-[1.85] text-ak-muted">{section.text}</p>
              </section>
            ))}
            <p className="text-sm leading-[1.65] text-ak-muted">
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
        <section aria-labelledby="artikel-terkait" className="flex flex-col gap-7">
          <h2 id="artikel-terkait" className="text-[23px] font-semibold">
            Artikel terkait
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
