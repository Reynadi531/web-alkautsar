import { cn } from "@web-alkautsar/ui/lib/utils";

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  label?: string;
}

const cell =
  "flex size-12 items-center justify-center rounded-sm text-[13px] font-semibold transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";

export function Pagination({ page, pageCount, onPageChange, label = "Halaman" }: PaginationProps) {
  if (pageCount <= 1) return null;

  return (
    <nav aria-label={label} className="flex gap-2">
      <button
        type="button"
        aria-label="Halaman sebelumnya"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={cn(cell, "bg-ak-cream text-primary hover:bg-ak-pale")}
      >
        <span aria-hidden="true">←</span>
      </button>
      {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
        <button
          key={number}
          type="button"
          aria-label={`Halaman ${number}`}
          aria-current={number === page ? "page" : undefined}
          onClick={() => onPageChange(number)}
          className={cn(
            cell,
            number === page
              ? "bg-primary text-primary-foreground"
              : "bg-ak-cream text-primary hover:bg-ak-pale",
          )}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        aria-label="Halaman berikutnya"
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
        className={cn(cell, "bg-ak-cream text-primary hover:bg-ak-pale")}
      >
        <span aria-hidden="true">→</span>
      </button>
    </nav>
  );
}
