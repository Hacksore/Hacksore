

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: "http://localhost:3000",
    proxy: {
      "/api": {
        target: "http://localhost:5001/buildtray/us-central1/server",
        changeOrigin: true,
        cookieDomainRewrite: "http://localhost:5001",
      },
    },
  },
  resolve: {
    alias: {
      service: path.resolve(__dirname, "src/service"),
    },
  },
});