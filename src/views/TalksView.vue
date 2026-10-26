<template>
  <div class="collection-page wrap talks-page">
    <header class="collection-heading">
      <div>
        <h1>Talks &amp; workshops</h1>
        <p>A few things learned, and shared.</p>
      </div>
    </header>
    <div class="catalog-tools">
      <div class="catalog-query">
        <label class="sr-only" for="talk-search">Find a talk</label
        ><input
          id="talk-search"
          type="search"
          v-model="query"
          placeholder="Find a talk, topic, or community"
        /><button v-if="query" class="link-button" @click="query = ''">
          Clear
        </button>
      </div>
      <div class="catalog-series">
        <label for="series">Series</label
        ><select id="series" v-model="series">
          <option value="">All</option>
          <option v-for="name in allSeries" :key="name">{{ name }}</option>
        </select>
      </div>
      <p role="status">
        {{ filtered.length }}
        {{ filtered.length === 1 ? "session" : "sessions" }}
      </p>
    </div>
    <div v-if="filtered.length" class="talk-catalog">
      <article v-for="(talk, index) in filtered" :key="talk.title">
        <router-link
          class="talk-tile"
          :to="'/talks/' + talkSlug(talk.title)"
          :aria-label="talk.title"
        >
          <div class="talk-thumbnail" aria-hidden="true">
            <img
              v-if="talk.thumbnail"
              :src="talkArt[talk.title] || talk.thumbnail"
              :srcset="recordingSrcset(talkArt[talk.title])"
              sizes="(max-width: 720px) 100vw, (max-width: 950px) 50vw, 33vw"
              alt=""
              :loading="index < 3 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : undefined"
              width="320"
              height="180"
              @error="hideImage"
            /><span v-if="talk.link" class="play-mark">▶</span
            ><span v-else class="thumbnail-note">{{ talk.type }}</span>
          </div>
          <div class="talk-tile-copy">
            <p class="talk-byline">
              {{ talk.organization
              }}<span v-if="talk.type"> / {{ talk.type }}</span>
            </p>
            <h2>{{ talk.title }}</h2>
            <p class="talk-tile-excerpt">{{ talkExcerpt(talk.description) }}</p>
          </div>
        </router-link>
      </article>
    </div>
    <div v-else class="empty-state">
      <h2>No matching sessions.</h2>
      <p>
        <button class="link-button" @click="resetSearch">
          Show the whole archive
        </button>
      </p>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import talks from "@/data/talks.json";
import talkArt from "@/data/talk-art.json";
import {
  talkSlug,
  plainText,
  talkExcerpt,
  recordingSrcset,
} from "@/utils/content";
import { talkCollection } from "@/utils/structuredData";
import { usePageMeta } from "@/composables/usePageMeta";
const route = useRoute();
const router = useRouter();
const query = computed({
  get: () => (typeof route.query.q === "string" ? route.query.q : ""),
  set: (value) =>
    router.replace({ query: { ...route.query, q: value || undefined } }),
});
const series = computed({
  get: () => (typeof route.query.series === "string" ? route.query.series : ""),
  set: (value) =>
    router.replace({ query: { ...route.query, series: value || undefined } }),
});
const allSeries = [...new Set(talks.map((t) => t.type).filter(Boolean))];
const filtered = computed(() =>
  talks.filter(
    (t) =>
      (!series.value || t.type === series.value) &&
      [t.title, plainText(t.description), t.organization, t.type]
        .join(" ")
        .toLowerCase()
        .includes(query.value.trim().toLowerCase()),
  ),
);
const hideImage = (event) => {
  event.currentTarget.hidden = true;
};
const resetSearch = () => router.replace({ query: {} });
usePageMeta(
  "Talks & workshops",
  "Community talks and workshops by Taha Bouhsine, with recordings, slides, and notebooks on machine learning.",
  { structuredData: computed(() => talkCollection(filtered.value, talkArt)) },
);
</script>
