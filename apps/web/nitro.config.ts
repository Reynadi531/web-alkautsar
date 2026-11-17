import evlog from "evlog/nitro/v3";
import { defineConfig } from "nitro";

export default defineConfig({
  serverDir: "./server",
  // Used only by the cloudflare_module preset (NITRO_PRESET=cloudflare_module).
  cloudflare: {
    wrangler: {
      name: "web-alkautsar",
      compatibility_date: "2026-11-01",
    },
  },
  experimental: {
    asyncContext: true,
  },
  modules: [
    evlog({
      env: { service: "web-alkautsar-web" },
    }),
  ],
});
