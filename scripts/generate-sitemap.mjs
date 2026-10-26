import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { parse } from "parse5";
import { SITE_ORIGIN } from "../src/utils/structuredData.js";

const walk = function* (node) {
  yield node;
  for (const child of node.childNodes || []) yield* walk(child);
};
const files = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? files(join(dir, entry.name))
      : entry.name.endsWith(".html")
        ? [join(dir, entry.name)]
        : [],
  );
const attr = (node, key) => node.attrs?.find((a) => a.name === key)?.value;
const escapeXml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");

export function generateSitemap(directory) {
  const urls = new Set();
  for (const file of files(directory)) {
    const nodes = [...walk(parse(readFileSync(file, "utf8")))];
    if (
      nodes.some(
        (n) =>
          n.tagName === "meta" &&
          attr(n, "name") === "robots" &&
          /\bnoindex\b/.test(attr(n, "content") || ""),
      )
    )
      continue;
    const canonical = nodes.find(
      (n) => n.tagName === "link" && attr(n, "rel") === "canonical",
    );
    const url = attr(canonical, "href");
    if (!url?.startsWith(SITE_ORIGIN + "/"))
      throw new Error(`Missing production canonical: ${file}`);
    urls.add(url);
  }
  // Build time is not a content modification date. Omit lastmod until accurate
  // per-page history is available; Google does not use priority or changefreq.
  writeFileSync(
    join(directory, "sitemap.xml"),
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      [...urls]
        .sort()
        .map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`)
        .join("\n") +
      "\n</urlset>\n",
  );
  console.log(`Sitemap: ${urls.size} unique, indexable canonical URLs.`);
}
