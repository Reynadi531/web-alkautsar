import { footerExplore, footerQuickAccess, site, type NavLinkItem } from "../lib/site";

function FooterColumn({ title, links }: { title: string; links: readonly NavLinkItem[] }) {
  return (
    <nav aria-label={title} className="flex flex-col gap-3 lg:w-60">
      <p className="text-[11px] leading-[1.55] font-semibold text-ak-footer-head uppercase">
        {title}
      </p>
      <ul className="flex flex-col gap-1 lg:gap-0">
        {links.map((link) => (
          <li key={link.href}>
            {link.unavailable ? (
              <span
                aria-disabled="true"
                className="block py-1.5 text-xs leading-[1.65] text-ak-footer-text lg:py-1"
              >
                {link.label} <span className="text-[9px]">(Belum tersedia)</span>
              </span>
            ) : (
              <a
                href={link.href}
                className="block py-1.5 text-xs leading-[1.65] text-[#c6d6cb] transition-colors hover:text-white lg:py-1"
              >
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer
      id="footer"
      className="flex flex-col gap-2 bg-ak-dark px-[26px] py-6 lg:gap-9 lg:px-19 lg:pt-11"
    >
      <div className="hidden lg:flex lg:gap-[90px]">
        <div className="flex flex-col gap-3 lg:flex-1">
          <p className="text-sm leading-[1.55] font-semibold text-white uppercase">{site.name}</p>
          <address className="text-xs leading-[1.55] text-[#c6d6cb] not-italic">
            {site.street} · Kelurahan Melong
            <br />
            Cimahi Selatan, Kota Cimahi
          </address>
        </div>
        <FooterColumn title="Jelajahi" links={footerExplore} />
        <FooterColumn title="Akses Cepat" links={footerQuickAccess} />
      </div>

      <div className="flex flex-col gap-2 lg:hidden">
        <p className="text-[10px] leading-[1.6] font-semibold text-[#dce8da] uppercase">
          {site.name}
        </p>
        <p className="text-[10px] leading-[1.6] text-ak-footer-text">
          Melong, Cimahi Selatan · Kota Cimahi
        </p>
        <p className="text-[9px] leading-[1.6] text-ak-footer-text">© {site.name}</p>
        <nav aria-label="Akses cepat footer" className="py-2 text-[11px] text-[#d3e1d3]">
          {[
            [
              { label: "Profil", href: "/profil" },
              { label: "Agenda", href: "/agenda" },
              footerExplore[2]!,
            ],
            [
              { label: "Berita", href: "/berita", unavailable: true },
              { label: "Konten", href: "/video" },
              { label: "Layanan", href: "/layanan" },
            ],
            [footerQuickAccess[3]!, footerQuickAccess[4]!],
          ].map((row, index) => (
            <div key={index} className="flex min-h-12 flex-wrap items-center gap-x-2">
              {row.map((link, linkIndex) => (
                <span key={link.href} className="inline-flex items-center gap-2">
                  {linkIndex > 0 && <span aria-hidden="true">·</span>}
                  {"unavailable" in link && link.unavailable ? (
                    <span aria-disabled="true">
                      {link.label} <span className="text-[9px]">(Belum tersedia)</span>
                    </span>
                  ) : (
                    <a
                      href={link.href}
                      className="inline-flex min-h-11 items-center hover:underline"
                    >
                      {link.label}
                    </a>
                  )}
                </span>
              ))}
            </div>
          ))}
        </nav>
      </div>
      <hr className="hidden border-ak-footer-rule lg:block" />

      <div className="hidden gap-5 text-[10px] leading-[1.55] text-[#b7cabe] lg:flex">
        <p className="flex-1">© {site.name}</p>
        <p className="flex-1">{site.area}</p>
      </div>
    </footer>
  );
}
