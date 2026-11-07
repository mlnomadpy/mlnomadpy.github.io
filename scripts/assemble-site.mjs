import { cpSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { generateSitemap } from "./generate-sitemap.mjs";

if (!existsSync(".writing-dist/blog/index.html"))
  throw new Error("Writing build is missing");
cpSync(".writing-dist", "dist", { recursive: true });
generateSitemap("dist");
// Keep the old blog sitemap address usable, containing only current approved URLs.
const sitemap = readFileSync("dist/sitemap.xml", "utf8");
const blogEntries = [
  ...sitemap.matchAll(
    /  <url><loc>https:\/\/www\.tahabouhsine\.com\/blog(?:\/[^<]*)?<\/loc><\/url>/g,
  ),
].map((m) => m[0]);
writeFileSync(
  "dist/blog/sitemap-0.xml",
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    blogEntries.join("\n") +
    "\n</urlset>\n",
);
