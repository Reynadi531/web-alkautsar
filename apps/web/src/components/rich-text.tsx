import { cn } from "@web-alkautsar/ui/lib/utils";

/**
 * Renders editor content from the CMS. `html` must come from `cmsHtml`, which
 * sanitizes it on the server.
 */
export function RichText({
  html,
  lead = false,
  className,
}: {
  html: string;
  /** Emphasize the opening paragraph, as on article pages. */
  lead?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("ak-richtext", lead && "ak-richtext-lead", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
