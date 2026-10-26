<template>
  <article v-if="talk" class="collection-page wrap talk-detail">
    <p class="back-link">
      <router-link to="/talks">Back to all talks</router-link>
    </p>
    <header class="detail-heading">
      <p class="small muted">
        {{ talk.organization }} / {{ talk.type }}
        <span v-if="recording">
          ·
          <time :datetime="recording.uploadDate"
            >Recording published {{ publicationDay }}</time
          ></span
        >
      </p>
      <h1>{{ talk.title }}</h1>
    </header>
    <div class="talk-detail-grid">
      <div v-if="youtubeEmbed" class="recording-panel">
        <iframe
          :src="youtubeEmbed"
          :title="talk.title + ' — video recording'"
          loading="lazy"
          referrerpolicy="strict-origin-when-cross-origin"
          allow="encrypted-media; fullscreen; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="session-notes">
        <h2>About the session</h2>
        <p>{{ plainText(talk.description) }}</p>
        <h2 v-if="resources.length">Resources</h2>
        <ul class="session-resources" v-if="resources.length">
          <li v-for="resource in resources" :key="resource.href">
            <a :href="resource.href">{{ resource.label }}</a>
          </li>
        </ul>
        <p v-if="!talk.link && !resources.length" class="small muted">
          No recording or resources archived yet.
        </p>
      </div>
    </div>
  </article>
  <NotFoundView v-else />
</template>
<script setup>
import { computed } from "vue";
import talks from "@/data/talks.json";
import talkArt from "@/data/talk-art.json";
import { talkSlug, plainText, gistUrl } from "@/utils/content";
import { talkSearchTitle, searchExcerpt } from "@/utils/searchMeta";
import { talkDetail } from "@/utils/structuredData";
import videoMetadata from "@/data/video-metadata.json";
import { usePageMeta } from "@/composables/usePageMeta";
import NotFoundView from "./NotFoundView.vue";
const props = defineProps({ id: String });
const talk = computed(() => talks.find((t) => talkSlug(t.title) === props.id));
const recording = computed(() => {
  const id = talk.value?.link?.match(
    /^https:\/\/www\.youtube\.com\/embed\/([\w-]+)$/,
  )?.[1];
  return id ? videoMetadata[id] : null;
});
const publicationDay = computed(() =>
  recording.value
    ? new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
      }).format(
        new Date(recording.value.uploadDate.slice(0, 10) + "T00:00:00Z"),
      )
    : "",
);
const youtubeEmbed = computed(() =>
  talk.value?.link?.startsWith("https://www.youtube.com/embed/")
    ? talk.value.link.replace("www.youtube.com", "www.youtube-nocookie.com")
    : "",
);
const watchUrl = computed(() =>
  talk.value?.link?.replace("/embed/", "/watch?v="),
);
const resources = computed(() => {
  const t = talk.value;
  if (!t) return [];
  return [
    {
      label: "Watch on YouTube",
      href: youtubeEmbed.value ? watchUrl.value : "",
    },
    { label: "Slides", href: t.slides },
    { label: "Kaggle notebook", href: t.kaggle_notebook },
    { label: "Code on GitHub Gist", href: gistUrl(t.github_gist) },
    { label: "Recording", href: !youtubeEmbed.value ? t.link : "" },
  ].filter((r) => r.href);
});
usePageMeta(
  computed(() => (talk.value ? talkSearchTitle(talk.value) : "Talk not found")),
  computed(
    () =>
      searchExcerpt(talk.value?.description) ||
      "Talks and workshops by Taha Bouhsine.",
  ),
  {
    image: computed(() => (talk.value ? talkArt[talk.value.title] : undefined)),
    imageAlt: computed(() =>
      talk.value ? `Session artwork: ${talk.value.title}` : undefined,
    ),
    noindex: computed(() => !talk.value),
    structuredData: computed(() =>
      talkDetail(talk.value, talkArt, videoMetadata),
    ),
  },
);
</script>
