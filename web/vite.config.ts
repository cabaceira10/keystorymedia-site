import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { HERO_FILM } from "./src/filme-heroi";

/** The absolute address in the share tags (canonical, og:url, og:image). SITE_URL at build time. */
const SITE = (process.env.SITE_URL || "https://cabaceira10.github.io/keystorymedia-site/").replace(/\/?$/, "/");

function cabeca(): Plugin {
  return {
    name: "ks-cabeca",
    transformIndexHtml: { order: "pre", handler: (html) => html.replaceAll("__HERO_POSTER__", HERO_FILM.poster).replaceAll("__SITE__", SITE) },
  };
}

export default defineConfig({
  base: "./",
  publicDir: "public",
  plugins: [react(), tailwindcss(), cabeca()],
  build: {
    outDir: process.env.OUT || "dist",
    emptyOutDir: !process.env.OUT,
    assetsDir: "app",
  },
  server: { port: 4870, strictPort: false },
});
