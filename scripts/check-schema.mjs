import assert from "node:assert/strict";
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import { parse } from "parse5";
import { validateGraph } from "./lib/schema-validator.mjs";
import {
  SITE_ORIGIN,
  PERSON_ID,
  WEBSITE_ID,
} from "../src/utils/structuredData.js";
const root = resolve("dist");
const walk = function* (n) {
  yield n;
  for (const c of n.childNodes || []) yield* walk(c);
};
const htmlFiles = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? htmlFiles(join(dir, e.name))
      : e.name.endsWith(".html")
        ? [join(dir, e.name)]
        : [],
  );
const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;
const text = (node) =>
  node.nodeName === "#text"
    ? node.value
    : (node.childNodes || []).map(text).join(" ");
const normalize = (s) => s.replace(/\s+/g, " ").trim();
const json = (name) =>
  JSON.parse(readFileSync(`src/data/${name}.json`, "utf8"));
const reports = [],
  allNodes = new Map(),
  canonicalPages = new Set();
let videoPages = 0,
  notFoundPages = 0;
const schemaOutput = resolve(".schema-validation");
mkdirSync(schemaOutput, { recursive: true });
for (const file of htmlFiles(root)) {
  const html = readFileSync(file, "utf8");
  const nodes = [...walk(parse(html))];
  const scripts = nodes.filter(
    (n) => n.tagName === "script" && attr(n, "type") === "application/ld+json",
  );
  const noindex = nodes.some(
    (n) =>
      n.tagName === "meta" &&
      attr(n, "name") === "robots" &&
      attr(n, "content").includes("noindex"),
  );
  if (noindex) {
    assert.equal(
      scripts.length,
      0,
      `${file}: error pages must not advertise rich results`,
    );
    assert.ok(
      nodes.some(
        (n) =>
          n.tagName === "script" &&
          attr(n, "id") === "portfolio-schema" &&
          attr(n, "type") === "application/json" &&
          text(n).trim() === "{}",
      ),
      `${file}: neutral head marker must replace stale schema during navigation`,
    );
    notFoundPages++;
    continue;
  }
  assert.equal(
    scripts.length,
    1,
    `${file}: expected one JSON-LD graph, not duplicate static/client scripts`,
  );
  assert.equal(
    attr(scripts[0], "id"),
    "portfolio-schema",
    `${file}: missing stable head-script identity`,
  );
  const graph = JSON.parse(
    scripts[0].childNodes.map((n) => n.value || "").join(""),
  );
  const canonical = nodes.find(
    (n) => n.tagName === "link" && attr(n, "rel") === "canonical",
  );
  const url = attr(canonical, "href");
  assert.ok(
    url?.startsWith(SITE_ORIGIN + "/") &&
      !url.includes("?") &&
      !url.includes("#"),
    `${file}: clean production canonical`,
  );
  const errors = validateGraph(graph, { pageUrl: url });
  assert.deepEqual(errors, [], `${file}:\n${errors.join("\n")}`);
  const entities = new Map(graph["@graph"].map((n) => [n["@id"], n]));
  const page = entities.get(url + "#webpage");
  assert.equal(entities.get(PERSON_ID)?.name, "Taha Bouhsine");
  assert.equal(entities.get(WEBSITE_ID)?.url, SITE_ORIGIN + "/");
  const body = nodes.find((n) => n.tagName === "body");
  const visible = normalize(text(body));
  const labels = nodes
    .flatMap((n) =>
      (n.attrs || [])
        .filter((a) => a.name === "aria-label")
        .map((a) => a.value),
    )
    .join(" ");
  const content = visible + " " + normalize(labels);
  const references = nodes.flatMap((n) =>
    (n.attrs || [])
      .filter((a) => ["href", "src"].includes(a.name))
      .map((a) => a.value),
  );
  const videos = graph["@graph"].filter((n) => n["@type"] === "VideoObject");
  for (const entity of graph["@graph"]) {
    if (entity["@type"] === "MusicRecording")
      assert.ok(
        !entity.author && !entity.creator,
        "Playlist owner must not become the recording artist",
      );
    if (
      [
        "ScholarlyArticle",
        "CreativeWork",
        "MusicRecording",
        "MusicPlaylist",
        "VideoObject",
      ].includes(entity["@type"])
    )
      assert.ok(
        content.includes(normalize(entity.name)),
        `${file}: schema entity is absent from page content: ${entity.name}`,
      );
    if (entity["@type"] === "ScholarlyArticle") {
      assert.ok(
        references.includes(entity.url),
        `${file}: paper URL must be linked`,
      );
      assert.ok(
        !entity.datePublished,
        "Do not turn a submission/presentation date into publication metadata",
      );
    }
    if (entity.genre === "Poetry") {
      assert.ok(
        !entity.datePublished && !entity.dateCreated,
        "Year-only poetry labels must not become fabricated complete dates",
      );
      if (entity.text)
        assert.ok(
          visible.includes(normalize(entity.text)),
          `${file}: poem text disagrees with rendered text`,
        );
    }
    if (entity["@type"] === "ItemList")
      for (const item of entity.itemListElement) {
        const work = entities.get(item.item["@id"]);
        assert.ok(work, `${file}: unresolved collection item`);
        assert.ok(
          content.includes(normalize(work.name)),
          `${file}: collection item is not visible`,
        );
      }
    if (entity["@type"] === "MusicPlaylist")
      assert.ok(
        !entity.numTracks,
        "The six preview tracks are not the total playlist length",
      );
    if (entity["@type"] === "VideoObject") {
      const id = new URL(entity.embedUrl).pathname.split("/").at(-1);
      const verified = json("video-metadata")[id];
      assert.ok(verified, `${file}: upload metadata has no recorded source`);
      assert.equal(entity.uploadDate, verified.uploadDate);
      assert.equal(entity.duration, verified.duration);
      assert.ok(
        nodes.some(
          (n) =>
            n.tagName === "time" && attr(n, "datetime") === entity.uploadDate,
        ),
        `${file}: recording publication date must also be visible`,
      );
      assert.ok(
        references.includes(entity.url),
        `${file}: recording source is not linked`,
      );
      const thumbnail = entity.thumbnailUrl[0];
      assert.ok(thumbnail.startsWith(SITE_ORIGIN + "/talk-art/"));
      assert.ok(
        references.includes(new URL(thumbnail).pathname) ||
          nodes.some(
            (n) =>
              n.tagName === "meta" &&
              attr(n, "property") === "og:image" &&
              attr(n, "content") === thumbnail,
          ),
        `${file}: recording thumbnail must agree with its displayed artwork or social preview`,
      );
      assert.ok(
        nodes.some(
          (n) => n.tagName === "iframe" && attr(n, "src") === entity.embedUrl,
        ),
        `${file}: recording must be discoverable without a click`,
      );
      // contentUrl must be the actual video bytes, never a YouTube watch page.
      assert.ok(!entity.contentUrl);
    }
    const existing = allNodes.get(entity["@id"]);
    allNodes.set(entity["@id"], {
      ...existing,
      ...entity,
      ...((existing?.description?.length || 0) >
      (entity.description?.length || 0)
        ? { description: existing.description }
        : {}),
    });
  }
  if (url.endsWith("/aboutme") || url.endsWith("/cv")) {
    assert.equal(page["@type"], "ProfilePage");
    assert.equal(page.mainEntity["@id"], PERSON_ID);
  }
  if (url.endsWith("/talks"))
    assert.equal(
      entities.get(page.mainEntity["@id"]).numberOfItems,
      json("talks").length,
    );
  if (url.endsWith("/poetry"))
    assert.equal(
      entities.get(page.mainEntity["@id"]).numberOfItems,
      json("poetry").length,
    );
  if (url.endsWith("/research"))
    assert.equal(
      entities.get(page.mainEntity["@id"]).numberOfItems,
      json("publications").length,
    );
  const path = new URL(url).pathname;
  if (
    ["/", "/aboutme", "/research", "/music", "/poetry"].includes(path) ||
    path.includes("/talks/ml-ascent-3-")
  )
    writeFileSync(
      join(
        schemaOutput,
        path === "/" ? "home.html" : path.replaceAll("/", "_") + ".html",
      ),
      html,
    );
  canonicalPages.add(url);
  if (videos.length) videoPages++;
  reports.push({
    file: relative(root, file),
    canonical: url,
    pageType: page["@type"],
    entities: graph["@graph"].length,
    videos: videos.length,
  });
}
assert.equal(
  canonicalPages.size,
  44,
  "All canonical content pages must be covered",
);
assert.equal(notFoundPages, 1, "The generated 404 must be excluded");
const report = {
  canonicalPages: canonicalPages.size,
  generatedDocuments: reports.length,
  errorPagesExcluded: notFoundPages,
  videoPages,
  entityTypes: [
    ...new Set([...allNodes.values()].map((n) => n["@type"])),
  ].sort(),
  pages: reports,
};
writeFileSync(
  join(schemaOutput, "report.json"),
  JSON.stringify(report, null, 2) + "\n",
);
writeFileSync(
  join(schemaOutput, "schemaorg-input.html"),
  '<!doctype html><html><head><script type="application/ld+json">' +
    JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [...allNodes.values()],
    }).replace(/</g, "\\u003c") +
    "</script></head><body></body></html>",
);
console.log(
  `Validated structured data on ${canonicalPages.size} canonical pages (${reports.length} generated documents); ${videoPages} recording pages; 404 excluded. Reports: .schema-validation/`,
);
