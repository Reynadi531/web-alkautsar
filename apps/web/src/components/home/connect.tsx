import { buttonVariants } from "@web-alkautsar/ui/components/button";

import { site } from "../../lib/site";
import { InstagramIcon } from "../instagram-icon";

export function Connect() {
  return (
    <section
      id="tetap-terhubung"
      className="relative flex flex-col items-start gap-4 overflow-hidden bg-primary px-[26px] py-12 lg:px-19 lg:py-[58px]"
    >
      <div
        aria-hidden="true"
        className="absolute -top-[230px] -right-[120px] size-[450px] rounded-full border border-ak-ring-line opacity-55"
      />
      <div
        aria-hidden="true"
        className="absolute -top-[290px] -right-[180px] size-[570px] rounded-full border border-ak-ring-line opacity-55"
      />
      <p className="relative text-[11px] font-semibold tracking-[0.164em] text-ak-on-dark-muted uppercase">
        Terhubung dengan komunitas
      </p>
      <h2 className="relative text-2xl leading-[1.55] font-semibold text-white lg:text-4xl">
        Mari tetap terhubung.
      </h2>
      <p className="relative max-w-[620px] text-sm leading-[1.55] text-ak-on-dark lg:text-[15px]">
        Ikuti kabar masjid, kegiatan, dan kebersamaan warga melalui akun Instagram Masjid Al-Kautsar
        Pharmindo.
      </p>
      <a
        href={site.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonVariants({ variant: "inverse", className: "relative" })}
      >
        {site.instagramHandle}
        <InstagramIcon />
      </a>
    </section>
  );
}
