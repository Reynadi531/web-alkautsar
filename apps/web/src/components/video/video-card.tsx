import { ArrowUpRight } from "lucide-react";

import type { VideoItem } from "../../lib/video";

export function VideoCard({ video }: { video: VideoItem }) {
  return (
    <article className="relative flex flex-col overflow-hidden rounded-[7px] border border-ak-line bg-white">
      <div className="relative flex h-[185px] items-end bg-ak-cream p-4">
        {video.image && (
          <img
            src={video.image.src}
            alt={video.image.alt}
            width={1200}
            height={540}
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
        )}
        {video.sample && (
          <span className="relative rounded-[3px] bg-ak-cream px-2 py-[5px] text-[9px] leading-[1.65] font-semibold text-ak-brown">
            CONTOH KONTEN
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2.5 p-[22px]">
        <p className="text-[10px] leading-[1.65] font-semibold text-ak-brown uppercase">Video</p>
        <h3 className="text-[19px] leading-[1.65] font-semibold text-ak-dark">{video.title}</h3>
        <p className="text-[11px] leading-[1.65] text-ak-muted">{video.meta}</p>
        {video.summary && (
          <p className="text-[13px] leading-[1.65] text-ak-muted">{video.summary}</p>
        )}
        {video.url ? (
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Tonton video: ${video.title}`}
            className="flex min-h-12 items-center gap-2 text-xs font-semibold text-primary underline-offset-4 after:absolute after:inset-0 hover:underline"
          >
            Tonton video <ArrowUpRight aria-hidden="true" className="size-[15px]" />
          </a>
        ) : (
          <p className="text-xs leading-[1.65] text-ak-muted">Pemutaran belum tersedia.</p>
        )}
      </div>
    </article>
  );
}
