// @ts-check

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  output: "static",
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
  integrations: [react(), mdx()],
});
