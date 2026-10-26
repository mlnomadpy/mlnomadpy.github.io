import test from "node:test";
import assert from "node:assert/strict";
import { searchExcerpt, talkSearchTitle } from "../src/utils/searchMeta.js";

test("search snippets preserve complete sentences and never cut a word", () => {
  const sentence =
    "A practical introduction to representation learning for computer vision.";
  assert.equal(
    searchExcerpt(sentence + " " + "More detail. ".repeat(30)),
    sentence,
  );
  const excerpt = searchExcerpt(
    "alpha beta gamma delta epsilon zeta eta theta",
    22,
  );
  assert.equal(excerpt, "alpha beta gamma…");
  assert.equal(searchExcerpt("<p>أنا القلم أتكلم</p>"), "أنا القلم أتكلم");
});
test("editorial titles do not mutate source session titles or URLs", () => {
  const talk = {
    title: "ML in Depth 7 - Generative AI Fine-tuning LLMs with LoRA",
  };
  const original = talk.title;
  assert.equal(talkSearchTitle(talk), "Fine-tuning LLMs with LoRA");
  assert.equal(talk.title, original);
  assert.equal(talkSearchTitle({ title: "A new talk" }), "A new talk");
});
