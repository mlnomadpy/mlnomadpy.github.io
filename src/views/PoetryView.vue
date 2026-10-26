<template>
  <div class="collection-page wrap poetry-page">
    <header class="collection-heading">
      <div>
        <h1>With a pen in hand.</h1>
        <p>English, Arabic, Darija. Sometimes on the same page.</p>
      </div>
      <span class="collection-period">2017–2023</span>
    </header>
    <div class="poem-shelf">
      <article
        v-for="(poem, index) in poems"
        :key="poem.id"
        :class="index === 0 ? 'poem-sheet' : 'poem-slip'"
      >
        <router-link
          :to="'/poetry/' + poem.id"
          :aria-label="'Read ' + poem.title"
        >
          <p class="slip-date">
            {{ poem.date }} / {{ poem.language.join(" & ") }}
          </p>
          <h2 :lang="isArabic(poem.title) ? 'ar' : undefined" dir="auto">
            {{
              index === 0 ? "A cup of coffee, and a pen in hand" : poem.title
            }}
          </h2>
          <div class="slip-verses">
            <p
              v-for="(line, i) in previewLines(poem, index)"
              :key="i"
              :dir="isArabic(line.text) ? 'rtl' : 'ltr'"
              :lang="poemLanguage(poem, line.text)"
            >
              {{ line.text }}
            </p>
          </div>
          <span class="slip-read" aria-hidden="true">Read the poem</span>
        </router-link>
      </article>
    </div>
  </div>
</template>
<script setup>
import poems from "@/data/poetry.json";
import { isArabic, poemLanguage } from "@/utils/content";
import { poemCollection } from "@/utils/structuredData";
import { usePageMeta } from "@/composables/usePageMeta";
const previewLines = (poem, index) => {
  const verses = poem.content.filter((l) => l.type === "verse" && l.text);
  return index === 0
    ? [
        ...verses.slice(0, 2),
        ...verses.filter((l) => isArabic(l.text)).slice(0, 3),
      ]
    : verses.slice(0, isArabic(verses[0]?.text) ? 1 : 2);
};
usePageMeta(
  "Poems",
  "Poems by Taha Bouhsine in English, Arabic, and Darija, written between 2017 and 2023.",
  { structuredData: poemCollection(poems) },
);
</script>
