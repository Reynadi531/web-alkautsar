import { useLocation } from "@tanstack/react-router";
import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { cn } from "@web-alkautsar/ui/lib/utils";
import { ArrowUpRight, ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import {
  isActivePath,
  navGroups,
  site,
  topNav,
  type NavGroup,
  type NavLinkItem,
} from "../lib/site";

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

const isGroup = (item: NavLinkItem | NavGroup): item is NavGroup => "items" in item;

const slug = (label: string) => label.toLowerCase().replace(/\s+/g, "-");

function DesktopMenu({
  pathname,
  openGroup,
  baseId,
  onToggle,
  onNavigate,
}: {
  pathname: string;
  openGroup: string | null;
  baseId: string;
  onToggle: (label: string, trigger: HTMLElement) => void;
  onNavigate: () => void;
}) {
  const itemClass = (active: boolean) =>
    cn(
      "text-xs leading-[1.65] text-primary transition-opacity hover:opacity-70",
      active ? "font-bold" : "font-normal",
    );

  return (
    <nav aria-label="Navigasi utama" className="hidden items-center gap-[23px] lg:flex">
      {topNav.map((item) => {
        if (!isGroup(item)) {
          const active = isActivePath(pathname, item.href);
          if (item.unavailable) {
            return (
              <span
                key={item.label}
                aria-disabled="true"
                className="flex flex-col text-xs text-primary"
              >
                {item.label}
                <span className="text-[8px]">Belum tersedia</span>
              </span>
            );
          }
          return (
            <a
              key={item.label}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(itemClass(active), "flex h-12 items-center")}
            >
              {item.label}
            </a>
          );
        }

        const active = item.items.some((child) => isActivePath(pathname, child.href));
        const open = openGroup === item.label;
        const panelId = `${baseId}-${slug(item.label)}`;
        return (
          <div key={item.label} className="relative flex h-12 items-center gap-[5px]">
            {item.href ? (
              <a
                href={item.href}
                aria-current={isActivePath(pathname, item.href) ? "page" : undefined}
                className={cn(itemClass(active), "flex h-12 items-center")}
              >
                {item.label}
              </a>
            ) : (
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={(event) => onToggle(item.label, event.currentTarget)}
                className={cn(itemClass(active), "flex h-12 cursor-pointer items-center")}
              >
                {item.label}
              </button>
            )}
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={`Buka submenu ${item.label}`}
              onClick={(event) => onToggle(item.label, event.currentTarget)}
              className="-m-2 cursor-pointer rounded-sm p-2 text-primary outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
            >
              <ChevronDown aria-hidden="true" className={cn("size-3", open && "rotate-180")} />
            </button>

            <ul
              id={panelId}
              hidden={!open}
              data-open={open}
              aria-label={item.label}
              className="absolute top-[calc(100%+14px)] -left-5 z-30 hidden min-w-[220px] flex-col rounded-[7px] border border-[#d9e3d5] bg-white p-2 lg:flex lg:data-[open=false]:hidden"
            >
              {item.items.map((child) => {
                const childActive = isActivePath(pathname, child.href);
                return (
                  <li key={child.href}>
                    {child.unavailable ? (
                      <span
                        aria-disabled="true"
                        className="flex min-h-12 items-center justify-between gap-4 px-3 text-xs text-ak-muted"
                      >
                        {child.label}
                        <span className="text-[9px]">Belum tersedia</span>
                      </span>
                    ) : (
                      <a
                        href={child.href}
                        aria-current={childActive ? "page" : undefined}
                        onClick={onNavigate}
                        className={cn(
                          "flex h-12 items-center rounded-[5px] px-3 text-xs leading-[1.65] whitespace-nowrap text-ak-muted transition-colors hover:bg-ak-pale hover:text-primary",
                          childActive && "font-bold text-primary",
                        )}
                      >
                        {child.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </nav>
  );
}

function MobileMenu({
  id,
  open,
  pathname,
  onNavigate,
}: {
  id: string;
  open: boolean;
  pathname: string;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState<ReadonlySet<string>>(new Set());
  const toggle = (label: string) =>
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });

  return (
    <div
      id={id}
      hidden={!open}
      className="absolute inset-x-0 top-full z-30 max-h-[calc(100svh-76px)] overflow-y-auto border-t border-ak-line bg-white p-[26px] lg:hidden"
    >
      <nav aria-label="Menu seluler" className="flex flex-col gap-3">
        <a
          href="/"
          aria-current={pathname === "/" ? "page" : undefined}
          onClick={onNavigate}
          className="flex h-12 items-center text-base font-semibold text-ak-dark"
        >
          Beranda
        </a>
        {navGroups.map((group) => {
          const isOpen = expanded.has(group.label);
          const submenuId = `${id}-${group.label.toLowerCase().replace(/\s+/g, "-")}`;
          const Chevron = isOpen ? ChevronUp : ChevronDown;
          return (
            <div key={group.label}>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={submenuId}
                onClick={() => toggle(group.label)}
                className="flex h-12 w-full items-center gap-3 border-b border-ak-divider text-left text-base font-semibold text-ak-dark"
              >
                <span className="flex-1">{group.label}</span>
                <Chevron aria-hidden="true" className="size-[17px] text-primary" />
              </button>
              <ul id={submenuId} hidden={!isOpen} className="pr-0 pb-2 pl-4">
                {group.items.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <li key={item.href}>
                      {item.unavailable ? (
                        <span
                          aria-disabled="true"
                          className="flex min-h-12 items-center justify-between gap-4 text-[13px] text-ak-muted"
                        >
                          {item.label}
                          <span className="text-[9px]">Belum tersedia</span>
                        </span>
                      ) : (
                        <a
                          href={item.href}
                          aria-current={active ? "page" : undefined}
                          onClick={onNavigate}
                          className={cn(
                            "flex h-12 items-center text-[13px] leading-[1.65] text-ak-muted",
                            active && "font-bold",
                          )}
                        >
                          {item.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </div>
  );
}

export function Navbar() {
  const { pathname } = useLocation();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const desktopId = useId();
  const mobileId = useId();

  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (openGroup === null && !mobileOpen) return;
    const close = () => {
      setOpenGroup(null);
      setMobileOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
        triggerRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) close();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [openGroup, mobileOpen]);

  return (
    <header ref={headerRef} className="relative z-20 bg-ak-cream">
      <div className="flex h-[76px] items-center justify-between px-[26px] lg:h-23 lg:px-19">
        <Brand />

        <DesktopMenu
          pathname={pathname}
          openGroup={openGroup}
          baseId={desktopId}
          onToggle={(label, trigger) => {
            triggerRef.current = trigger;
            setOpenGroup((current) => (current === label ? null : label));
          }}
          onNavigate={() => setOpenGroup(null)}
        />

        <a href="/kontak" className={cn(buttonVariants({ size: "lg" }), "hidden lg:inline-flex")}>
          Petunjuk Arah
          <ArrowUpRight aria-hidden="true" />
        </a>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-controls={mobileId}
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          onClick={(event) => {
            triggerRef.current = event.currentTarget;
            setMobileOpen((value) => !value);
          }}
          className="flex size-12 items-center justify-center rounded-full bg-ak-pale text-primary transition-colors outline-none hover:bg-[#e3ebde] focus-visible:ring-2 focus-visible:ring-ring/50 lg:hidden"
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <MobileMenu
        id={mobileId}
        open={mobileOpen}
        pathname={pathname}
        onNavigate={() => setMobileOpen(false)}
      />
    </header>
  );
}
