<template>
  <article v-if="poem" class="collection-page wrap poem-reader-page">
    <div class="poem-reader-grid">
      <nav class="poem-rail" aria-label="Poems">
        <router-link class="rail-home" to="/poetry">The collection</router-link
        ><router-link
          v-for="entry in poems"
          :key="entry.id"
          :to="'/poetry/' + entry.id"
          :lang="isArabic(entry.title) ? 'ar' : undefined"
          dir="auto"
          ><span>{{ entry.title }}</span
          ><small>{{ entry.date }}</small></router-link
        >
      </nav>
      <div class="poem-reader">
        <p class="back-link">
          <router-link to="/poetry">Back to the poems</router-link>
        </p>
        <header class="detail-heading">
          <p class="small muted">
            {{ poem.date }} / {{ poem.language.join(" & ") }}
          </p>
          <h1 dir="auto" :lang="isArabic(poem.title) ? 'ar' : undefined">
            {{ poem.title }}
          </h1>
        </header>
        <div class="poem-body">
          <template v-for="(line, index) in poem.content" :key="index"
            ><hr class="stanza-break" v-if="line.type === 'divider'" />
            <p
              v-else
              :lang="poemLanguage(poem, line.text)"
              :dir="isArabic(line.text) ? 'rtl' : 'ltr'"
            >
              {{ line.text }}
            </p></template
          >
        </div>
        <nav class="poem-navigation" aria-label="More poems">
          <router-link to="/poetry">All poems</router-link
          ><router-link v-if="nextPoem" :to="'/poetry/' + nextPoem.id"
            >Next: <span dir="auto">{{ nextPoem.title }}</span></router-link
          >
        </nav>
      </div>
    </div>
  </article>
  <NotFoundView v-else />
</template>
<script setup>
import { computed } from "vue";
import poems from "@/data/poetry.json";
import { isArabic, poemLanguage } from "@/utils/content";
import { searchExcerpt } from "@/utils/searchMeta";
import { poemDetail } from "@/utils/structuredData";
import { usePageMeta } from "@/composables/usePageMeta";
import NotFoundView from "./NotFoundView.vue";
const props = defineProps({ id: String });
const poem = computed(() => poems.find((p) => p.id === props.id));
const nextPoem = computed(() => {
  const i = poems.findIndex((p) => p.id === props.id);
  return i >= 0 ? poems[i + 1] : null;
});
usePageMeta(
  computed(() => poem.value?.title || "Poem not found"),
  computed(() =>
    poem.value
      ? searchExcerpt(
          poem.value.content
            .filter((l) => l.type === "verse")
            .slice(0, 3)
            .map((l) => l.text)
            .join(" "),
        )
      : "Poems by Taha Bouhsine.",
  ),
  {
    noindex: computed(() => !poem.value),
    structuredData: computed(() => poemDetail(poem.value)),
  },
);
</script>
