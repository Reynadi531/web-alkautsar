import { SearchX } from "lucide-react";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[7px] bg-ak-pale p-[30px] text-center">
      <SearchX aria-hidden="true" className="size-[30px] text-primary" />
      <p className="text-xl leading-[1.65] font-semibold text-ak-dark">{title}</p>
      <p className="text-[13px] leading-[1.65] text-ak-muted">{description}</p>
    </div>
  );
}
