import { cn } from "@web-alkautsar/ui/lib/utils";
import type { ComponentProps } from "react";

export function SectionLabel({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-[11px] font-semibold tracking-[0.164em] text-ak-brown uppercase",
        className,
      )}
      {...props}
    />
  );
}
