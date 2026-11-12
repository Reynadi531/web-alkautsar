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
            <a
              href={link.href}
              className="block py-1.5 text-xs leading-[1.65] text-[#c6d6cb] transition-colors hover:text-white lg:py-1"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer id="footer" className="flex flex-col gap-9 bg-ak-dark px-[26px] pt-11 pb-6 lg:px-19">
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-[90px]">
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

      <hr className="border-ak-footer-rule" />

      <div className="flex gap-5 text-[10px] leading-[1.55] text-[#b7cabe]">
        <p className="flex-1">© {site.name}</p>
        <p className="flex-1">{site.area}</p>
      </div>
    </footer>
  );
}
