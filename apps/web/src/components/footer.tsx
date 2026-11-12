import { footerQuickLinks, mainNav, site } from "../lib/site";

const exploreLinks = mainNav.filter((item) => item.label !== "Kontak");

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string; external?: boolean }[];
}) {
  return (
    <nav aria-label={title} className="flex flex-col gap-3 lg:w-[190px]">
      <p className="text-[11px] leading-[1.55] font-semibold text-ak-footer-head uppercase">
        {title}
      </p>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-xs leading-[1.55] text-ak-footer-text transition-colors hover:text-white"
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
        <FooterColumn title="Jelajahi" links={exploreLinks} />
        <FooterColumn title="Akses Cepat" links={footerQuickLinks} />
      </div>

      <hr className="border-ak-footer-rule" />

      <div className="flex gap-5 text-[10px] leading-[1.55] text-[#b7cabe]">
        <p className="flex-1">© {site.name}</p>
        <p className="flex-1">{site.area}</p>
      </div>
    </footer>
  );
}
