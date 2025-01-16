import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./", // necessary for GitHub Pages
  build: {
    outDir: './docs',
    relative: true, // necessary for GitHub Pages
    emptyOutDir: true, // also necessary
  }
});
