import { buttonVariants } from "@web-alkautsar/ui/components/button";
import { cn } from "@web-alkautsar/ui/lib/utils";

import { site } from "../../lib/site";
import { InstagramIcon } from "../instagram-icon";

export function Connect() {
  return (
    <section
      id="tetap-terhubung"
      className="relative flex flex-col items-start gap-[13px] overflow-hidden bg-primary px-[26px] py-8 lg:min-h-[350px] lg:gap-4 lg:px-19 lg:py-[58px]"
    >
      <div
        aria-hidden="true"
        className="absolute -top-[230px] -right-[120px] hidden size-[450px] rounded-full border border-ak-ring-line opacity-55 lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute -top-[290px] -right-[180px] hidden size-[570px] rounded-full border border-ak-ring-line opacity-55 lg:block"
      />
      <p className="relative hidden text-[11px] font-semibold tracking-[0.164em] text-ak-on-dark-muted uppercase lg:block">
        Terhubung dengan komunitas
      </p>
      <h2 className="relative text-2xl leading-[1.55] font-semibold text-white lg:text-4xl">
        Mari tetap terhubung.
      </h2>
      <p className="relative max-w-[620px] text-xs leading-[1.6] text-ak-on-dark lg:text-[15px] lg:leading-[1.55]">
        <span className="lg:hidden">
          Ikuti kabar masjid, kegiatan, dan kebersamaan warga melalui Instagram.
        </span>
        <span className="hidden lg:inline">
          Ikuti kabar masjid, kegiatan, dan kebersamaan warga melalui akun Instagram Masjid
          Al-Kautsar Pharmindo.
        </span>
      </p>
      <a
        href={site.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ variant: "inverse" }),
          "relative border-transparent px-0 text-[11px] lg:border-ak-button-line lg:px-5 lg:text-[13px]",
        )}
      >
        {site.instagramHandle}
        <InstagramIcon />
      </a>
    </section>
  );
}
