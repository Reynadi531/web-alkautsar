import { CalendarDays } from "lucide-react";

import type { AgendaEvent } from "../../lib/agenda";

export function AgendaCard({ event }: { event: AgendaEvent }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[7px] border border-ak-line bg-white">
      <div className="relative flex h-[185px] items-end p-4">
        <img
          src={event.image.src}
          alt={event.image.alt}
          width={1200}
          height={540}
          loading="lazy"
          className="absolute inset-0 size-full object-cover object-[50%_53%]"
        />
        {event.sample && (
          <span className="relative rounded-[3px] bg-ak-cream px-2 py-[5px] text-[9px] leading-[1.65] font-semibold text-ak-brown">
            CONTOH KONTEN
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2.5 p-[22px]">
        <p className="text-[10px] leading-[1.65] font-semibold text-ak-brown uppercase">
          {event.category}
        </p>
        <h3 className="text-[19px] leading-[1.65] font-semibold text-ak-dark">
          <a
            href={event.href}
            className="outline-none after:absolute after:inset-0 focus-visible:after:ring-2 focus-visible:after:ring-ring/50 focus-visible:after:ring-inset"
          >
            {event.title}
          </a>
        </h3>
        <p className="text-[11px] leading-[1.65] text-ak-muted">{event.schedule}</p>
        <p className="text-[13px] leading-[1.65] text-ak-muted">{event.summary}</p>
        <div
          aria-hidden="true"
          className="flex h-12 items-center gap-2 text-xs font-semibold text-primary group-hover:underline"
        >
          <CalendarDays className="size-[17px]" />
          <span>Lihat selengkapnya ↗</span>
        </div>
      </div>
    </article>
  );
}
