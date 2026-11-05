import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import { parse } from "parse5";
import { approvedPosts } from "../writing/lib/publication.mjs";
import { reading } from "../src/data/reading.js";
import { SITE_ORIGIN, canonicalUrl } from "../src/utils/structuredData.js";

const approved = approvedPosts();
const urls = new Set(approved.map((p) => canonicalUrl(p.url)));
const root = resolve("dist");
const files = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)],
  );
const walk = function* (n) {
  yield n;
  for (const c of n.childNodes || []) yield* walk(c);
};
const attr = (n, k) => n.attrs?.find((a) => a.name === k)?.value;
const allowedHTML = new Set([
  "blog/index.html",
  "blog/writeups/index.html",
  ...approved.map(
    (p) => "blog/" + p.url.replace(/^\/blog\//, "") + "index.html",
  ),
]);
for (const file of files(join(root, "blog"))) {
  if (file.endsWith(".html"))
    assert.ok(
      allowedHTML.has(relative(root, file)),
      `Unapproved writing page: ${file}`,
    );
  assert.ok(!/\.(mdx?|map)$/.test(file), `Do not ship source content: ${file}`);
}
for (const post of reading)
  assert.ok(
    urls.has(canonicalUrl(new URL(post.url, SITE_ORIGIN).pathname)),
    `Homepage selects unapproved writing: ${post.url}`,
  );
const search = JSON.parse(readFileSync(join(root, "blog/search.json"), "utf8"));
assert.deepEqual(
  search.map((p) => canonicalUrl(p.url)).sort(),
  [...urls].sort(),
);
for (const section of ["blog", "writeups"]) {
  const rss = readFileSync(
    join(root, section === "blog" ? "blog/rss.xml" : "blog/writeups/rss.xml"),
    "utf8",
  );
  const sectionUrls = approved
    .filter((p) => p.id.startsWith(section + "/"))
    .map((p) => canonicalUrl(p.url));
  assert.equal((rss.match(/<item>/g) || []).length, sectionUrls.length);
  const feedUrls = [
    ...rss.matchAll(/<guid isPermaLink="true">([^<]+)<\/guid>/g),
  ].map((m) => m[1]);
  assert.deepEqual(feedUrls.sort(), sectionUrls.sort());
}
const sitemap = readFileSync(join(root, "blog/sitemap-0.xml"), "utf8");
assert.deepEqual(
  [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).sort(),
  [canonicalUrl("/blog"), canonicalUrl("/blog/writeups"), ...urls].sort(),
);

for (const file of files(root).filter((f) => f.endsWith(".html"))) {
  const nodes = [...walk(parse(readFileSync(file, "utf8")))];
  const canonical = attr(
    nodes.find((n) => n.tagName === "link" && attr(n, "rel") === "canonical"),
    "href",
  );
  const isArticle = urls.has(canonical);
  if (
    [canonicalUrl("/blog"), canonicalUrl("/blog/writeups")].includes(canonical)
  )
    assert.equal(
      nodes.filter((n) => n.tagName === "script" && attr(n, "src")).length,
      0,
      "Writing index must ship no runtime JS",
    );
  for (const n of nodes) {
    const href = attr(n, "href");
    if (n.tagName === "a" && href) {
      const target = new URL(href, SITE_ORIGIN);
      if (
        target.origin === SITE_ORIGIN &&
        target.pathname.startsWith("/blog/")
      ) {
        if (
          [
            "/blog/",
            "/blog/rss.xml",
            "/blog/writeups/",
            "/blog/writeups/rss.xml",
          ].includes(target.pathname)
        )
          continue;
        assert.ok(
          urls.has(canonicalUrl(target.pathname)),
          `Unapproved blog link in ${file}: ${href}`,
        );
      }
    }
    if (n.tagName === "script" && attr(n, "type") === "application/ld+json") {
      const graph = JSON.parse(n.childNodes.map((c) => c.value || "").join(""));
      for (const entity of graph["@graph"] || [])
        if (["BlogPosting", "Article"].includes(entity["@type"]))
          assert.ok(
            urls.has(entity.url),
            `Unapproved article in schema: ${file}`,
          );
    }
  }
  if (isArticle)
    assert.ok(
      nodes.some((n) => n.tagName === "time"),
      "Article date must be visible",
    );
}
// Content and experiments live outside publication inputs until selected. No
// second public directory is allowed to bypass the approval-filtered loader.
assert.ok(
  !existsSync("writing/static") || files("writing/static").length === 0,
  "Use reviewed imports instead of an unfiltered writing public directory",
);
assert.ok(
  !existsSync("public/blog"),
  "Do not bypass the writing build with public/blog",
);
console.log(
  `Writing: ${approved.length} approved posts; routes, links, schema, RSS, search, sitemap, and zero-JS index verified.`,
);
