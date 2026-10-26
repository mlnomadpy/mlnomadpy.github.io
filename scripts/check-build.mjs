import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { parse } from "parse5";

const root = resolve("dist");
const json = (name) =>
  JSON.parse(readFileSync(`src/data/${name}.json`, "utf8"));
const slug = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
const text = (node) =>
  node.nodeName === "#text"
    ? node.value
    : (node.childNodes || []).map(text).join("");
const walk = function* (node) {
  yield node;
  for (const child of node.childNodes || []) yield* walk(child);
};
const attr = (node, name) => node.attrs?.find((a) => a.name === name)?.value;
const output = (path) =>
  path === "/"
    ? join(root, "index.html")
    : [join(root, path + ".html"), join(root, path, "index.html")].find(
        existsSync,
      );
const expected = [
  "/",
  "/aboutme",
  "/research",
  "/cv",
  "/talks",
  "/poetry",
  "/music",
  "/404",
  ...json("poetry").map((p) => "/poetry/" + p.id),
  ...json("talks").map((t) => "/talks/" + slug(t.title)),
];
const docs = new Map();
for (const path of expected) {
  assert.ok(output(path), `Missing generated route: ${path}`);
  const doc = [...walk(parse(readFileSync(output(path), "utf8")))];
  docs.set(path, doc);
  assert.equal(
    doc.filter((n) => n.tagName === "h1").length,
    1,
    `${path}: exactly one H1`,
  );
  assert.ok(
    doc.some((n) => n.tagName === "main" && attr(n, "id") === "main-content"),
    `${path}: missing main`,
  );
  assert.ok(
    doc.some(
      (n) =>
        n.tagName === "link" &&
        attr(n, "rel") === "canonical" &&
        attr(n, "href") === "https://www.tahabouhsine.com" + path,
    ),
    `${path}: canonical`,
  );
  const description = doc.filter(
    (n) => n.tagName === "meta" && attr(n, "name") === "description",
  );
  assert.equal(description.length, 1, `${path}: duplicate description`);
  assert.ok(attr(description[0], "content"), `${path}: empty description`);
  assert.ok(
    doc.some((n) => n.tagName === "title" && text(n).includes("Taha Bouhsine")),
    `${path}: title`,
  );
  for (const node of doc) {
    if (node.tagName === "iframe")
      assert.ok(attr(node, "title"), `${path}: unnamed iframe`);
    const href = attr(node, "href");
    if (
      node.tagName === "a" &&
      href?.startsWith("/") &&
      !href.startsWith("//")
    ) {
      const target = href.split("#")[0].split("?")[0] || path;
      assert.ok(output(target), `${path}: broken internal link ${href}`);
    }
    for (const key of ["src", "href"]) {
      const value = attr(node, key);
      if (
        value?.startsWith("/assets/") ||
        value?.startsWith("/sketch-") ||
        value?.startsWith("/talk-art/") ||
        value?.match(/^\/(portrait|social|favicon)\./)
      )
        assert.ok(
          existsSync(join(root, value)),
          `${path}: missing asset ${value}`,
        );
    }
  }
}
for (const poem of json("poetry")) {
  const doc = docs.get("/poetry/" + poem.id);
  const rendered = doc.filter((n) => n.tagName === "p").map(text);
  for (const line of poem.content.filter((l) => l.type === "verse"))
    assert.ok(
      rendered.includes(line.text),
      `${poem.id}: poem text changed: ${line.text}`,
    );
  assert.ok(
    text(doc.find((n) => n.tagName === "title")).includes(poem.title),
    `${poem.id}: poem title missing from metadata`,
  );
}
const home = docs.get("/");
const video = home.find((n) => n.tagName === "video");
assert.ok(video, "Homepage background video is missing");
assert.ok(attr(video, "muted") !== undefined, "Background video must be muted");
assert.ok(
  attr(video, "playsinline") !== undefined,
  "Background video must play inline",
);
assert.ok(
  attr(video, "autoplay") === undefined,
  "Playback must wait for the client motion preference check",
);
assert.equal(
  attr(video, "preload"),
  "none",
  "Do not fetch the film until playback is allowed",
);
assert.ok(
  existsSync(join(root, attr(video, "poster"))),
  "Background poster is missing",
);
assert.ok(
  home.some(
    (n) =>
      n.tagName === "button" &&
      (attr(n, "aria-label") || text(n)).includes("background video"),
  ),
  "Background video needs a playback control",
);
assert.ok(
  existsSync(join(root, "background-video.mp4")),
  "Background film is missing",
);
assert.equal(
  docs.get("/music").filter((n) => n.tagName === "iframe").length,
  0,
  "Spotify loads on request",
);
for (const talk of json("talks")) {
  const path = "/talks/" + slug(talk.title);
  const frames = docs.get(path).filter((n) => n.tagName === "iframe");
  const hasRecording = /^https:\/\/www\.youtube\.com\/embed\//.test(
    talk.link || "",
  );
  assert.equal(
    frames.length,
    hasRecording ? 1 : 0,
    `${path}: recording must be discoverable in static HTML`,
  );
  if (hasRecording) {
    assert.equal(
      attr(frames[0], "src"),
      talk.link.replace("www.youtube.com", "www.youtube-nocookie.com"),
    );
    assert.equal(attr(frames[0], "loading"), "lazy");
    assert.ok(!attr(frames[0], "src").includes("autoplay="));
  }
}
const papersText = docs
  .get("/research")
  .map((n) => (n.nodeName === "#text" ? n.value : ""))
  .join(" ");
for (const paper of json("publications"))
  assert.ok(
    papersText.includes(paper.title),
    `Publication absent: ${paper.title}`,
  );
assert.ok(
  docs
    .get("/404")
    .some(
      (n) =>
        n.tagName === "meta" &&
        attr(n, "name") === "robots" &&
        attr(n, "content").includes("noindex"),
    ),
  "404 must not be indexed",
);
console.log(
  `Checked ${expected.length} generated pages: content, internal links, assets, metadata, poem preservation, and discoverable recording players.`,
);
