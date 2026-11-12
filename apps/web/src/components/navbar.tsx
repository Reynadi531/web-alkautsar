import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { cn } from "@web-alkautsar/ui/lib/utils";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useId, useState } from "react";

import { mainNav, site } from "../lib/site";

function Brand() {
  return (
    <a href="/" className="flex items-center gap-3" aria-label={`${site.name} — Beranda`}>
      <img
        src="/images/logo-masjid.png"
        alt=""
        width={38}
        height={30}
        className="size-7 object-contain lg:size-[38px]"
      />
      <span className="flex flex-col gap-[3px] text-primary">
        <span className="text-xs leading-none font-bold tracking-[0.1em] lg:text-base">
          AL-KAUTSAR
        </span>
        <span className="text-[8px] leading-none tracking-[0.175em]">PHARMINDO · CIMAHI</span>
      </span>
    </a>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="relative z-20 bg-ak-cream">
      <div className="flex h-[76px] items-center justify-between px-[26px] lg:h-23 lg:px-19">
        <Brand />

        <nav aria-label="Navigasi utama" className="hidden items-center gap-8 lg:flex">
          {mainNav.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={index === 0 ? "page" : undefined}
              className={cn(
                "text-[13px] leading-normal text-ak-dark transition-opacity hover:opacity-70",
                index === 0 && "font-bold",
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants(), "hidden lg:inline-flex")}
        >
          Petunjuk Arah
          <ArrowUpRight aria-hidden="true" />
        </a>

        <button
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Tutup menu" : "Buka menu"}
          onClick={() => setOpen((value) => !value)}
          className="flex size-8 items-center justify-center rounded-full bg-[#eaf0e5] text-primary transition-colors outline-none hover:bg-ak-pale focus-visible:ring-2 focus-visible:ring-ring/50 lg:hidden"
        >
          {open ? <X className="size-[17px]" /> : <Menu className="size-[17px]" />}
        </button>
      </div>

      <div
        id={menuId}
        hidden={!open}
        className="absolute inset-x-0 top-full border-t border-ak-line bg-white px-[26px] pt-3 pb-6 shadow-lg lg:hidden"
      >
        <nav aria-label="Menu seluler" className="flex flex-col">
          {mainNav.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={index === 0 ? "page" : undefined}
              onClick={() => setOpen(false)}
              className="flex h-12 items-center border-b border-[#dce5d7] text-base font-semibold text-ak-dark"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <a
          href={site.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants(), "mt-5 w-full")}
        >
          Petunjuk Arah
          <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
    </header>
  );
}
