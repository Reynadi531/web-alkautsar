import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { ArrowUpRight } from "lucide-react";

export function ManagementViews({ chart = false }: { chart?: boolean }) {
  return (
    <nav
      aria-label="Tampilan kepengurusan"
      className="flex flex-col items-start gap-5 sm:flex-row lg:gap-7"
    >
      {[
        { label: "Daftar pengurus", href: "/profil/pengurus", active: !chart },
        { label: "Bagan organisasi", href: "/profil/pengurus/bagan", active: chart },
      ].map(({ label, href, active }) => (
        <a
          key={href}
          href={href}
          aria-current={active ? "page" : undefined}
          className={buttonVariants({ variant: active ? "default" : "outline", size: "lg" })}
        >
          {label}
          <ArrowUpRight aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
