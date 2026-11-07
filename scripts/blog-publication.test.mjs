import test from "node:test";
import assert from "node:assert/strict";
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  rmSync,
  symlinkSync,
  cpSync,
  readFileSync,
  readdirSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { approvedPosts } from "../writing/lib/publication.mjs";
import { validateGraph } from "./lib/schema-validator.mjs";
import { writingGraph } from "../writing/lib/schema.mjs";
const digest = (text) => createHash("sha256").update(text).digest("hex");
const manifest = (id, content) => ({
  version: 1,
  posts: [
    {
      id,
      approvedBy: "Taha Bouhsine",
      approvedOn: "2026-11-01",
      sourceRevision: "a".repeat(40),
      contentSha256: digest(content),
    },
  ],
});

test("publication fails closed for unknown IDs, absent approval, and edited content", () => {
  const root = mkdtempSync(join(tmpdir(), "writing-approval-"));
  try {
    mkdirSync(join(root, "content/blog"), { recursive: true });
    const text = "reviewed fixture";
    writeFileSync(join(root, "content/blog/fixture.mdx"), text);
    const good = manifest("blog/fixture", text);
    for (const mutate of [
      (m) => (m.posts[0].id = "../fixture"),
      (m) => delete m.posts[0].approvedBy,
      (m) => m.posts.push(m.posts[0]),
      (m) => (m.posts[0].contentSha256 = "b".repeat(64)),
    ]) {
      const bad = structuredClone(good);
      mutate(bad);
      writeFileSync(join(root, "approved-posts.json"), JSON.stringify(bad));
      assert.throws(() => approvedPosts(root));
    }
    writeFileSync(join(root, "approved-posts.json"), JSON.stringify(good));
    assert.equal(approvedPosts(root).length, 1);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("empty blog has no invented articles; article graph preserves dates and author identity", () => {
  const empty = writingGraph([]);
  assert.deepEqual(
    validateGraph(empty, { pageUrl: "https://www.tahabouhsine.com/blog/" }),
    [],
  );
  assert.ok(!empty["@graph"].some((n) => n["@type"] === "BlogPosting"));
  const post = {
    id: "blog/fixture",
    data: {
      title: "Fixture",
      description: "Test fixture.",
      pubDate: "2026-10-01",
      updatedDate: "2026-11-01",
    },
  };
  const graph = writingGraph([], post);
  assert.deepEqual(
    validateGraph(graph, {
      pageUrl: "https://www.tahabouhsine.com/blog/fixture/",
    }),
    [],
  );
  const article = graph["@graph"].find((n) => n["@type"] === "BlogPosting");
  assert.equal(article.datePublished, "2026-10-01");
  article.dateModified = "2026-09-01";
  assert.ok(validateGraph(graph).some((e) => e.includes("precedes")));
  const personal = { ...post, id: "writeups/fixture" };
  const personalGraph = writingGraph([], personal);
  assert.deepEqual(
    validateGraph(personalGraph, {
      pageUrl: "https://www.tahabouhsine.com/writeups/fixture/",
    }),
    [],
  );
  assert.ok(personalGraph["@graph"].some((n) => n["@type"] === "Article"));
  assert.ok(
    !personalGraph["@graph"].some((n) =>
      ["Blog", "BlogPosting"].includes(n["@type"]),
    ),
  );
  assert.deepEqual(validateGraph(writingGraph([], undefined, "writeups")), []);
  const poem = {
    id: "writeups/poem-0-1",
    data: {
      title: "Poem 0.1",
      description: "Four original lines.",
      pubDate: "2021-09-20",
      schemaType: "CreativeWork",
      genre: "Poetry",
    },
  };
  const poemGraph = writingGraph([], poem);
  assert.deepEqual(validateGraph(poemGraph), []);
  const poemEntity = poemGraph["@graph"].find(
    (node) => node.genre === "Poetry",
  );
  assert.equal(poemEntity["@type"], "CreativeWork");
  assert.equal(poemEntity.datePublished, "2021-09-20");
  assert.ok(!poemEntity.dateModified);
});

test(
  "real Astro build excludes unapproved prose, routes, scripts, RSS and search even with SHOW_DRAFTS",
  { timeout: 120000 },
  () => {
    const root = mkdtempSync(join(tmpdir(), "writing-build-"));
    try {
      cpSync("writing", join(root, "writing"), {
        recursive: true,
        filter: (p) => !p.includes("/node_modules") && !p.includes("/.astro"),
      });
      cpSync("src", join(root, "src"), { recursive: true });
      symlinkSync(resolve("node_modules"), join(root, "node_modules"), "dir");
      symlinkSync(
        resolve("writing/node_modules"),
        join(root, "writing/node_modules"),
        "dir",
      );
      mkdirSync(join(root, "writing/content/blog"), { recursive: true });
      const source =
        '---\ntitle: "Publication gate test fixture"\ndescription: "A synthetic renderer fixture, never a portfolio post."\npubDate: "2026-10-01"\ndraft: false\nhasMath: true\n---\nAPPROVED_FIXTURE_BODY\n\n## A formula\n\n$a+b$\n';
      writeFileSync(join(root, "writing/content/blog/fixture.mdx"), source);
      mkdirSync(join(root, "writing/content/writeups"), { recursive: true });
      const personalSource = source
        .replace("Publication gate test fixture", "Personal essay test fixture")
        .replace("APPROVED_FIXTURE_BODY", "PERSONAL_FIXTURE_BODY");
      writeFileSync(
        join(root, "writing/content/writeups/fixture.mdx"),
        personalSource,
      );
      writeFileSync(
        join(root, "writing/content/blog/unapproved.mdx"),
        '---\ntitle: PRIVATE_TITLE_SENTINEL\ndraft: false\n---\nimport Leak from "./missing-private-component.astro";\nPRIVATE_BODY_SENTINEL\n<Leak />',
      );
      writeFileSync(
        join(root, "writing/approved-posts.json"),
        JSON.stringify({
          version: 1,
          posts: [
            ...manifest("blog/fixture", source).posts,
            ...manifest("writeups/fixture", personalSource).posts,
          ],
        }),
      );
      execFileSync(
        process.execPath,
        [resolve("writing/node_modules/astro/bin/astro.mjs"), "build"],
        {
          cwd: join(root, "writing"),
          encoding: "utf8",
          env: {
            ...process.env,
            SHOW_DRAFTS: "true",
            ASTRO_TELEMETRY_DISABLED: "1",
          },
          stdio: "pipe",
        },
      );
      const out = join(root, ".writing-dist");
      const files = (dir) =>
        readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
          e.isDirectory() ? files(join(dir, e.name)) : [join(dir, e.name)],
        );
      for (const file of files(out)) {
        const value = readFileSync(file, "utf8");
        assert.ok(
          !value.includes("PRIVATE_BODY_SENTINEL") &&
            !value.includes("PRIVATE_TITLE_SENTINEL"),
          file,
        );
      }
      const html = readFileSync(join(out, "blog/fixture/index.html"), "utf8");
      assert.match(html, /APPROVED_FIXTURE_BODY/);
      assert.match(html, /class="katex"/);
      assert.match(html, /BlogPosting/);
      assert.ok(!files(out).some((p) => p.includes("/unapproved/")));
      const search = JSON.parse(
        readFileSync(join(out, "blog/search.json"), "utf8"),
      );
      assert.equal(search.length, 2);
      assert.deepEqual(search.map((p) => p.url).sort(), [
        "/blog/fixture/",
        "/writeups/fixture/",
      ]);
      const technicalIndex = readFileSync(join(out, "blog/index.html"), "utf8");
      const personalIndex = readFileSync(
        join(out, "writeups/index.html"),
        "utf8",
      );
      assert.ok(
        technicalIndex.includes("Publication gate test fixture") &&
          !technicalIndex.includes("Personal essay test fixture"),
      );
      assert.ok(
        personalIndex.includes("Personal essay test fixture") &&
          !personalIndex.includes("Publication gate test fixture"),
      );
      const personalHTML = readFileSync(
        join(out, "writeups/fixture/index.html"),
        "utf8",
      );
      assert.match(personalHTML, /"@type":"Article"/);
      assert.ok(!personalHTML.includes('"@type":"BlogPosting"'));
      const legacy = readFileSync(
        join(out, "blog/writeups/fixture/index.html"),
        "utf8",
      );
      assert.ok(legacy.includes('content="0;url=/writeups/fixture/"'));
      assert.ok(!legacy.includes("PERSONAL_FIXTURE_BODY"));
      assert.ok(
        readFileSync(join(out, "writeups/rss.xml"), "utf8").includes(
          "Personal essay test fixture",
        ),
      );
      assert.ok(
        !readFileSync(join(out, "blog/rss.xml"), "utf8").includes(
          "Personal essay test fixture",
        ),
      );
      assert.equal(
        (readFileSync(join(out, "blog/rss.xml"), "utf8").match(/<item>/g) || [])
          .length,
        1,
      );
      // Revoke approval in the same checkout/cache. A previously built post
      // must disappear from routes and data, rather than surviving as stale HTML.
      writeFileSync(
        join(root, "writing/approved-posts.json"),
        JSON.stringify({ version: 1, posts: [] }),
      );
      execFileSync(
        process.execPath,
        [resolve("writing/node_modules/astro/bin/astro.mjs"), "build"],
        {
          cwd: join(root, "writing"),
          encoding: "utf8",
          env: {
            ...process.env,
            SHOW_DRAFTS: "true",
            ASTRO_TELEMETRY_DISABLED: "1",
          },
          stdio: "pipe",
        },
      );
      assert.ok(!files(out).some((p) => p.endsWith("/fixture/index.html")));
      assert.deepEqual(
        JSON.parse(readFileSync(join(out, "blog/search.json"), "utf8")),
        [],
      );
      assert.ok(
        !readFileSync(join(out, "blog/rss.xml"), "utf8").includes("<item>"),
      );
      for (const file of files(out))
        assert.ok(
          !/APPROVED_FIXTURE_BODY|PERSONAL_FIXTURE_BODY/.test(
            readFileSync(file, "utf8"),
          ),
          `Revoked content survived: ${file}`,
        );
    } catch (error) {
      if (error.status !== undefined)
        throw new Error(
          String(error.stdout || "").slice(-2500) +
            "\n" +
            String(error.stderr || ""),
        );
      throw error;
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  },
);
