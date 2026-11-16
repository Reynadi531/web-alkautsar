import type { VideoItem } from "../../lib/video";

export function VideoCard({ video, contain = false }: { video: VideoItem; contain?: boolean }) {
  return (
    <article className="relative flex flex-col overflow-hidden rounded-[7px] border border-ak-line bg-white">
      <div className="relative flex h-[185px] items-end bg-ak-cream p-4">
        <img
          src={video.image.src}
          alt={video.image.alt}
          width={1200}
          height={540}
          loading="lazy"
          className={`absolute inset-0 size-full ${contain ? "object-cover lg:object-contain" : "object-cover"}`}
        />
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
        <p className="text-[13px] leading-[1.65] text-ak-muted">{video.summary}</p>
        <p className="text-xs leading-[1.65] text-ak-muted">Pemutaran belum tersedia.</p>
      </div>
    </article>
  );
}
