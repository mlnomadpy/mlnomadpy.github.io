import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

import fs from "fs";
import { fileURLToPath } from "node:url";
import { generateSitemap } from "./scripts/generate-sitemap.mjs";
const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  base: "/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(rootDir, "src"),
    },
  },
  ssgOptions: {
    script: "async",
    formatting: "minify",
    onFinished() {
      generateSitemap(resolve(rootDir, "dist"));
    },
    includedRoutes(paths, routes) {
      // Static routes are already in 'paths'
      const extraRoutes = [];

      // Helper to read JSON and extract IDs/Slugs
      const readData = (filename, slugFn) => {
        try {
          const filePath = resolve(rootDir, "src/data", filename);
          if (fs.existsSync(filePath)) {
            const content = fs.readFileSync(filePath, "utf-8");
            const data = JSON.parse(content);
            // Handle array or object structure
            const items = Array.isArray(data) ? data : data.default || [];
            items.forEach((item) => {
              const slug = slugFn(item);
              if (slug) extraRoutes.push(slug);
            });
          }
        } catch (e) {
          console.warn(`Failed to process ${filename} for sitemap`, e);
        }
      };

      // 1. Talks - /talks/:id (slug from title)
      readData("talks.json", (item) => {
        const slug = item.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");
        return `/talks/${slug}`;
      });

      // 2. Poetry - /poetry/:id (using item.id)
      readData("poetry.json", (item) => {
        return item.id ? `/poetry/${item.id}` : null;
      });

      // Note: the blog lives in a separate repo / Pages project at /blog,
      // with its own sitemap. It is intentionally not generated here.

      return paths.filter((p) => !p.includes(":")).concat(extraRoutes);
    },
  },
});
