import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { unified } from "@astrojs/markdown-remark";
import { approvedPosts } from "./lib/publication.mjs";

export default defineConfig({
  site: "https://www.tahabouhsine.com",
  base: "/blog",
  output: "static",
  outDir: "../.writing-dist",
  // Never copy a second, unfiltered public directory into the deployment.
  publicDir: "./static",
  devToolbar: { enabled: false },
  integrations: [mdx()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
  vite: { worker: { format: "es" }, server: { fs: { allow: [".."] } } },
});

// Validate before Astro scans any article or builds any client scripts.
approvedPosts();
