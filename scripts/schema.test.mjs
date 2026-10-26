import test from "node:test";
import assert from "node:assert/strict";
import {
  buildPageGraph,
  serializeStructuredData,
  PERSON_ID,
  ref,
} from "../src/utils/structuredData.js";
import { validateGraph } from "./lib/schema-validator.mjs";
const valid = () =>
  buildPageGraph({
    path: "/aboutme",
    title: "About",
    description: "About Taha Bouhsine.",
    pageType: "ProfilePage",
    mainEntity: ref(PERSON_ID),
  });
test("script serialization safely preserves hostile source text and Unicode", () => {
  const graph = valid();
  graph["@graph"][2].description =
    "</script><script>alert(1)</script>\u2028\u2029 أنا القلم";
  const encoded = serializeStructuredData(graph);
  assert.ok(!encoded.includes("<"));
  assert.deepEqual(JSON.parse(encoded), graph);
});
test("official vocabulary checks accept a linked profile and Google breadcrumb URL items", () => {
  assert.deepEqual(validateGraph(valid()), []);
});
test("validation rejects unknown types, properties, duplicate IDs, and dangling references", () => {
  for (const mutate of [
    (g) => {
      g["@graph"][2]["@type"] = "Poem";
    },
    (g) => {
      g["@graph"][2].inventedProperty = "x";
    },
    (g) => {
      g["@graph"].push({ ...g["@graph"][0] });
    },
    (g) => {
      g["@graph"][2].mainEntity = ref("https://www.tahabouhsine.com/#missing");
    },
  ]) {
    const graph = valid();
    mutate(graph);
    assert.ok(validateGraph(graph).length);
  }
});
test("Google video requirements catch missing or invalid upload metadata", () => {
  const graph = valid();
  graph["@graph"].push({
    "@type": "VideoObject",
    "@id": "https://www.tahabouhsine.com/talks/demo#video",
    name: "Demo",
    thumbnailUrl: ["https://www.tahabouhsine.com/demo.jpg"],
    embedUrl: "https://www.youtube-nocookie.com/embed/example",
  });
  assert.ok(validateGraph(graph).some((e) => e.includes("uploadDate")));
  graph["@graph"].at(-1).uploadDate = "2026";
  assert.ok(validateGraph(graph).some((e) => e.includes("uploadDate")));
  graph["@graph"].at(-1).uploadDate = "2026-02-31T10:00:00Z";
  assert.ok(validateGraph(graph).some((e) => e.includes("uploadDate")));
});
