import { Archive } from "lucide-react";

import type { ArchiveEntry } from "../lib/agenda";

/** Past activities: plain rows, linked when the entry has its own page. */
export function ArchiveList({
  entries,
  className,
}: {
  entries: readonly ArchiveEntry[];
  className: string;
}) {
  return (
    <ul className={className}>
      {entries.map((entry) => (
        <li key={entry.id} className="flex items-center gap-4 rounded-[5px] bg-ak-cream px-5 py-4">
          <Archive aria-hidden="true" className="size-5 shrink-0 text-primary" />
          <p className="min-w-0 flex-1 text-base leading-[1.65] font-semibold text-ak-dark">
            {entry.href ? (
              <a href={entry.href} className="hover:underline">
                {entry.title}
              </a>
            ) : (
              entry.title
            )}
          </p>
          <p className="w-[100px] shrink-0 text-[11px] leading-[1.65] text-ak-brown sm:w-[200px]">
            {entry.status}
          </p>
        </li>
      ))}
    </ul>
  );
}
