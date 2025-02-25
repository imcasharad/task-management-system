import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js", // Ensure PostCSS is set up
  },
  resolve: {
    alias: {
      "@": "/src", // Optional: Add an alias for easier imports
    },
  },
});