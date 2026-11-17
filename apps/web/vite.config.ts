import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { varlockVitePlugin } from "@varlock/vite-integration";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

// node-server for Docker (default); cloudflare_module for Cloudflare Workers.
const preset = process.env.NITRO_PRESET ?? "node-server";
const isCloudflare = preset.startsWith("cloudflare");

// Workers bake these into the build (see ssrInjectMode below), and the schema's
// 127.0.0.1 default is unreachable from Cloudflare, so require public values.
// Varlock has already loaded .env and schema defaults into process.env here.
const isLocal = (value = "") => {
  try {
    return ["localhost", "127.0.0.1", "[::1]"].includes(new URL(value).hostname);
  } catch {
    return true;
  }
};
if (isCloudflare) {
  const missing = ["POCKETBASE_URL", "POCKETBASE_PUBLIC_URL"].filter((key) =>
    isLocal(process.env[key]),
  );
  if (missing.length > 0) {
    throw new Error(
      `Cloudflare build needs ${missing.join(" and ")} set to the public CMS URL, e.g. https://cms.example.org`,
    );
  }
}

export default defineConfig({
  server: {
    port: 3001,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    varlockVitePlugin({
      // Workers have no varlock CLI or .env files at runtime, so bake the
      // resolved values into the build there.
      ssrInjectMode: isCloudflare ? "resolved-env" : "auto-load",
    }),
    tailwindcss(),
    tanstackStart(),
    nitro({ preset }),
    viteReact(),
  ],
});
