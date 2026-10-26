import assert from "node:assert/strict";
import {
  existsSync,
  readFileSync,
  readdirSync,
  mkdirSync,
  writeFileSync,
  statSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { parse } from "parse5";
import { SITE_ORIGIN } from "../src/utils/structuredData.js";

const root = resolve("dist");
const walk = function* (n) {
  yield n;
  for (const c of n.childNodes || []) yield* walk(c);
};
const attr = (n, k) => n?.attrs?.find((a) => a.name === k)?.value;
const text = (n) =>
  n.nodeName === "#text" ? n.value : (n.childNodes || []).map(text).join("");
const files = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? files(join(dir, e.name))
      : e.name.endsWith(".html")
        ? [join(dir, e.name)]
        : [],
  );
const documents = new Map();
const titles = new Set(),
  descriptions = new Set(),
  warnings = [];
const one = (nodes, predicate, label) => {
  const found = nodes.filter(predicate);
  assert.equal(found.length, 1, label);
  return found[0];
};
const localAsset = (url, label) => {
  const parsed = new URL(url, SITE_ORIGIN);
  assert.equal(
    parsed.origin,
    SITE_ORIGIN,
    `${label}: rendering asset must be local`,
  );
  assert.ok(
    existsSync(join(root, decodeURIComponent(parsed.pathname))),
    `${label}: missing asset ${url}`,
  );
};
for (const file of files(root)) {
  const nodes = [...walk(parse(readFileSync(file, "utf8")))];
  const meta = (name) =>
    attr(
      one(
        nodes,
        (n) =>
          n.tagName === "meta" &&
          (attr(n, "name") === name || attr(n, "property") === name),
        `${file}: one ${name}`,
      ),
      "content",
    );
  const title = text(
    one(nodes, (n) => n.tagName === "title", `${file}: one title`),
  );
  const description = meta("description");
  const canonical = attr(
    one(
      nodes,
      (n) => n.tagName === "link" && attr(n, "rel") === "canonical",
      `${file}: one canonical`,
    ),
    "href",
  );
  const robots = meta("robots");
  assert.ok(
    title.trim() && description.trim(),
    `${file}: empty search metadata`,
  );
  assert.equal(meta("og:title"), title, `${file}: social title agrees`);
  assert.equal(
    meta("og:description"),
    description,
    `${file}: social description agrees`,
  );
  assert.equal(meta("twitter:description"), description);
  assert.equal(meta("og:url"), canonical);
  assert.equal(meta("twitter:url"), canonical);
  assert.equal(new URL(canonical).origin, SITE_ORIGIN);
  assert.ok(
    !new URL(canonical).search && !new URL(canonical).hash,
    `${file}: clean canonical`,
  );
  assert.ok(meta("viewport").includes("width=device-width"));
  assert.ok(
    attr(
      nodes.find((n) => n.tagName === "html"),
      "lang",
    ),
  );
  assert.ok(meta("og:image:alt"));
  assert.ok(meta("twitter:image:alt"));
  const image = meta("og:image");
  assert.equal(meta("twitter:image"), image);
  localAsset(image, file);
  const ids = new Set();
  for (const node of nodes) {
    const id = attr(node, "id");
    if (id) {
      assert.ok(!ids.has(id), `${file}: duplicate fragment ${id}`);
      ids.add(id);
    }
    if (node.tagName === "img") {
      assert.notEqual(
        attr(node, "alt"),
        undefined,
        `${file}: image needs an alt attribute`,
      );
      assert.ok(
        Number(attr(node, "width")) > 0 && Number(attr(node, "height")) > 0,
        `${file}: reserve image dimensions`,
      );
      localAsset(attr(node, "src"), file);
      for (const candidate of (attr(node, "srcset") || "")
        .split(",")
        .filter(Boolean))
        localAsset(candidate.trim().split(/\s+/)[0], file);
    }
    const poster = attr(node, "poster");
    if (poster) localAsset(poster, file);
    const href = attr(node, "href") || "";
    const src = attr(node, "src") || "";
    if (node.tagName === "link" && attr(node, "rel") === "stylesheet")
      localAsset(href, file);
    if (node.tagName === "a") {
      assert.ok(
        !href.includes("kaggle.com/embed/") &&
          !href.includes("kernelSessionId="),
        `${file}: link to the current notebook page`,
      );
      assert.ok(
        !href.includes("gist.github.com/skywolfmo/"),
        `${file}: obsolete Gist owner URL`,
      );
    }
    assert.ok(
      !/^http:\/\//.test(href) && !/^http:\/\//.test(src),
      `${file}: insecure resource/link`,
    );
  }
  if (robots.includes("noindex")) continue;
  assert.ok(robots.includes("max-image-preview:large"));
  const alias = file === join(root, "about.html");
  if (alias) {
    assert.equal(canonical, SITE_ORIGIN + "/aboutme");
    continue;
  }
  assert.ok(!documents.has(canonical), `${file}: duplicate canonical`);
  assert.ok(!titles.has(title), `${file}: duplicate title`);
  assert.ok(!descriptions.has(description), `${file}: duplicate description`);
  titles.add(title);
  descriptions.add(description);
  if (title.length > 80)
    warnings.push(
      `${canonical}: review long title (${title.length} characters)`,
    );
  documents.set(canonical, {
    nodes,
    ids,
    title,
    description,
    links: [],
    image,
  });
}

// Follow real HTML anchors, including same-origin absolute links and fragments.
// Other repositories hosted below /blog and other project paths are external to this build.
const sharedProjects = [
  "/blog",
  "/awesome-kernels",
  "/flaxdocs",
  "/localllm",
  "/nmn",
  "/pitwall",
  "/trustable-ai-superapp",
  "/jaxpathways",
];
for (const [url, page] of documents) {
  for (const node of page.nodes.filter((n) => n.tagName === "a")) {
    const href = attr(node, "href");
    if (!href || /^(mailto:|tel:)/.test(href)) continue;
    const target = new URL(href, url);
    if (
      target.origin !== SITE_ORIGIN ||
      sharedProjects.some(
        (prefix) =>
          target.pathname === prefix ||
          target.pathname.startsWith(prefix + "/"),
      )
    )
      continue;
    const canonical =
      SITE_ORIGIN +
      (target.pathname === "/" ? "/" : target.pathname.replace(/\/$/, ""));
    assert.ok(documents.has(canonical), `${url}: broken content link ${href}`);
    if (target.hash)
      assert.ok(
        documents
          .get(canonical)
          .ids.has(decodeURIComponent(target.hash.slice(1))),
        `${url}: broken fragment ${href}`,
      );
    page.links.push(canonical);
  }
}
const depths = new Map([[SITE_ORIGIN + "/", 0]]),
  queue = [SITE_ORIGIN + "/"];
for (const url of queue)
  for (const target of documents.get(url).links)
    if (!depths.has(target)) {
      depths.set(target, depths.get(url) + 1);
      queue.push(target);
    }
for (const url of documents.keys())
  assert.ok(
    depths.has(url) && depths.get(url) <= 3,
    `${url}: must be reachable within three clicks from Home`,
  );

const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
assert.match(
  sitemap,
  /<urlset xmlns="http:\/\/www.sitemaps.org\/schemas\/sitemap\/0.9">/,
);
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
  m[1].replace(/&amp;/g, "&"),
);
assert.equal(
  new Set(sitemapUrls).size,
  sitemapUrls.length,
  "No duplicate sitemap URLs",
);
assert.deepEqual(
  sitemapUrls.sort(),
  [...documents.keys()].sort(),
  "Sitemap must contain exactly the indexable canonicals",
);
assert.ok(
  !/<(?:lastmod|priority|changefreq)>/.test(sitemap),
  "Do not assert unverified modification dates or default crawl hints",
);
const robots = readFileSync(join(root, "robots.txt"), "utf8");
assert.match(robots, /User-agent: \*/);
assert.ok(!/^Disallow:\s*\/\s*$/m.test(robots), "Do not block the portfolio");
assert.ok(robots.includes(`Sitemap: ${SITE_ORIGIN}/sitemap-index.xml`));
assert.ok(robots.includes(`Sitemap: ${SITE_ORIGIN}/sitemap.xml`));
const index = readFileSync(join(root, "sitemap-index.xml"), "utf8");
for (const file of readdirSync(join(root, "assets")).filter((f) =>
  f.endsWith(".css"),
)) {
  const css = readFileSync(join(root, "assets", file), "utf8");
  for (const match of css.matchAll(/url\(["']?([^"')]+)["']?\)/g)) {
    if (!match[1].startsWith("data:")) localAsset(match[1], file);
  }
}
for (const prefix of sharedProjects)
  assert.ok(
    index.includes(`${SITE_ORIGIN}${prefix}/sitemap`),
    `Preserve shared project sitemap ${prefix}`,
  );

const report = {
  canonicalPages: documents.size,
  sitemapUrls: sitemapUrls.length,
  maxClickDepth: Math.max(...depths.values()),
  warnings,
  pages: [...documents].map(([url, page]) => ({
    url,
    title: page.title,
    titleLength: page.title.length,
    description: page.description,
    descriptionLength: page.description.length,
    clickDepth: depths.get(url),
    socialImage: page.image,
    htmlBytes: statSync(
      join(
        root,
        new URL(url).pathname === "/"
          ? "index.html"
          : new URL(url).pathname + ".html",
      ),
    ).size,
  })),
};
mkdirSync(".seo-audit", { recursive: true });
writeFileSync(".seo-audit/report.json", JSON.stringify(report, null, 2) + "\n");
assert.deepEqual(warnings, [], warnings.join("\n"));
console.log(
  `SEO: ${documents.size} unique indexable pages; sitemap matches; all reachable within ${report.maxClickDepth} clicks; metadata, image assets and fragments passed.`,
);
