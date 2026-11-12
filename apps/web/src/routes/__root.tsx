import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { evlogErrorHandler } from "evlog/nitro/v3";

import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";
import { site } from "../lib/site";

import appCss from "../index.css?url";

export interface RouterAppContext {}

export const Route = createRootRouteWithContext<RouterAppContext>()({
  server: {
    middleware: [createMiddleware().server(evlogErrorHandler)],
  },

  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: `${site.name} — Cimahi Selatan`,
      },
      {
        name: "description",
        content:
          "Ruang ibadah dan kebersamaan warga di Komplek Pharmindo, Cimahi Selatan. Alamat, jadwal salat, dan kabar kegiatan Masjid Al-Kautsar Pharmindo.",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/images/logo-masjid.png",
      },
    ],
  }),

  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="id">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-[5px] focus:bg-primary focus:px-4 focus:py-2 focus:text-[13px] focus:font-semibold focus:text-primary-foreground"
        >
          Lewati ke konten
        </a>
        <Navbar />
        <main id="konten" tabIndex={-1} className="outline-none">
          <Outlet />
        </main>
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}
