<template>
  <div class="home-page">
    <section class="home-intro" aria-labelledby="hello">
      <div class="hero-film" aria-hidden="true">
        <video
          ref="backgroundVideo"
          muted
          loop
          playsinline
          preload="none"
          poster="/background-poster.webp"
          tabindex="-1"
          @play="paused = false"
          @pause="paused = true"
          @error="videoUnavailable = true"
        >
          <source src="/background-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div class="wrap intro-layout">
        <div class="intro-copy">
          <h1 id="hello">Taha<br />Bouhsine<span class="name-dot">.</span></h1>
          <p class="native-name">
            <span lang="zgh-Tfng">ⵉⵙⴽⴰⵏⵎⴰⴳⴰⵔ</span> <span>Iskanmagar</span>
          </p>
          <p class="intro-text">
            I trace the geometry of learning,<br />and leave the rest in poems.
          </p>
          <router-link class="text-link" to="/aboutme"
            >A little about me</router-link
          >
        </div>
        <button
          v-if="!videoUnavailable"
          class="film-control"
          :aria-label="
            paused ? 'Play background video' : 'Pause background video'
          "
          @click="togglePlayback"
        >
          {{ paused ? "Play" : "Pause" }}
        </button>
      </div>
    </section>
    <div class="wrap landing-pages">
      <section class="landing-desk" aria-labelledby="work-title">
        <header class="landing-heading">
          <h2 id="work-title">Open questions.</h2>
          <router-link to="/research">Research &amp; papers</router-link>
        </header>
        <div class="landing-spread">
          <div class="landing-notes">
            <article v-for="(post, index) in reading" :key="post.url">
              <a class="landing-note" :href="post.url" :aria-label="post.title">
                <img
                  :src="
                    index === 0 ? '/sketch-kernel.svg' : '/sketch-attention.svg'
                  "
                  alt=""
                  width="160"
                  height="110"
                  loading="lazy"
                />
                <div>
                  <h3>{{ post.title }}</h3>
                  <p>{{ post.note }}</p>
                </div>
              </a>
            </article>
            <a
              class="landing-blog-link"
              href="https://www.tahabouhsine.com/blog/"
              >Records of the !mmortal Data Scientist</a
            >
          </div>
          <aside class="landing-leaf" aria-labelledby="poem-title">
            <p class="leaf-date">English &amp; Arabic / 2018–2023</p>
            <h3 id="poem-title">
              <router-link to="/poetry/el_bic"
                >A cup of coffee,<br />and a pen in hand</router-link
              >
            </h3>
            <blockquote>
              <p lang="ar" dir="rtl">
                جلست مرة أتأمل<br />فنجان قهوة بيدي<br />و عقلي يسأل
              </p>
              <p class="leaf-english">
                will there be someone who listens when I begin to stutter
              </p>
            </blockquote>
            <router-link class="leaf-link" to="/poetry">More poems</router-link>
          </aside>
        </div>
      </section>
      <section class="landing-companions" aria-label="Talks and music">
        <div class="landing-workshop">
          <header class="landing-heading">
            <h2>Learning together.</h2>
            <router-link to="/talks">All talks</router-link>
          </header>
          <router-link
            v-if="featuredTalk"
            class="landing-session"
            :to="'/talks/' + talkSlug(featuredTalk.title)"
            :aria-label="featuredTalk.title"
          >
            <div class="session-still">
              <img
                :src="talkArt[featuredTalk.title] || featuredTalk.thumbnail"
                :srcset="recordingSrcset(talkArt[featuredTalk.title])"
                sizes="(max-width: 720px) 40vw, 180px"
                alt=""
                width="320"
                height="180"
                loading="lazy"
              /><span aria-hidden="true">▶</span>
            </div>
            <div>
              <p>{{ featuredTalk.organization }}</p>
              <h3>{{ featuredTalk.title }}</h3>
              <span class="session-caption">{{
                featuredTalk.slides ? "Recording & slides" : "Watch the session"
              }}</span>
            </div>
          </router-link>
        </div>
        <router-link class="landing-listening" to="/music">
          <span class="small-record" aria-hidden="true"><span></span></span>
          <div>
            <p>git Motivated</p>
            <h2>Music I live with.</h2>
            <span>A playlist for the road.</span>
          </div>
        </router-link>
      </section>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { reading } from "@/data/reading";
import talks from "@/data/talks.json";
import talkArt from "@/data/talk-art.json";
import { talkSlug, recordingSrcset } from "@/utils/content";
import { PERSON_ID, ref as schemaRef } from "@/utils/structuredData";
import { usePageMeta } from "@/composables/usePageMeta";
const featuredTalk =
  talks.find((talk) => talk.title.includes("Intro to JAX/Flax")) || talks[0];
const backgroundVideo = ref(null);
const paused = ref(true);
const videoUnavailable = ref(false);
let motionQuery;
const pauseForReducedMotion = () => {
  if (motionQuery?.matches) backgroundVideo.value?.pause();
};
const play = () =>
  backgroundVideo.value?.play().catch(() => {
    paused.value = true;
  });
const togglePlayback = () => {
  const shouldPause = !backgroundVideo.value?.paused;
  if (shouldPause) backgroundVideo.value?.pause();
  else play();
  try {
    sessionStorage.setItem("portfolio-film-paused", String(shouldPause));
  } catch {
    /* Playback still works when storage is unavailable. */
  }
};
onMounted(() => {
  motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  motionQuery.addEventListener("change", pauseForReducedMotion);
  let manuallyPaused = false;
  try {
    manuallyPaused = sessionStorage.getItem("portfolio-film-paused") === "true";
  } catch {
    /* Respect the motion preference even without storage. */
  }
  if (!motionQuery.matches && !manuallyPaused) play();
});
onBeforeUnmount(() =>
  motionQuery?.removeEventListener("change", pauseForReducedMotion),
);
usePageMeta(
  "Research, poems & the long road",
  "Taha Bouhsine’s personal space for neural networks, research, poems in English, Arabic and Darija, talks, and music.",
  { structuredData: { about: schemaRef(PERSON_ID), inLanguage: ["en", "ar"] } },
);
</script>
