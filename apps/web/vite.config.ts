

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: "http://localhost:3000",
    proxy: {
      "/presence": {
        target: "http://localhost:5001/biofun/us-central1/app",
      },
    },
  },
  resolve: {
    alias: {
      service: path.resolve(__dirname, "src/service"),
    },
  },
});