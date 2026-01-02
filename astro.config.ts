import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, envField } from "astro/config";

import vercel from "@astrojs/vercel";

export default defineConfig({
  output: "server",
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            "react-icons": ["react-icons"],
            skinview3d: ["react-skinview3d"],
          },
        },
      },
    },
  },
  env: {
    schema: {
      R2_BUCKET_NAME: envField.string({ context: "server", access: "secret" }),
      R2_PUBLIC_URL: envField.string({ context: "server", access: "secret" }),
      R2_ACCOUNT_ID: envField.string({ context: "server", access: "secret" }),
      R2_ACCESS_KEY_ID: envField.string({ context: "server", access: "secret" }),
      R2_SECRET_ACCESS_KEY: envField.string({ context: "server", access: "secret" }),
      DEVTO_TOKEN: envField.string({ context: "server", access: "secret" }),
    }
  },
  integrations: [react(), mdx()],
  adapter: vercel(),
});
