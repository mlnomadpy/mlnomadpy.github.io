<template>
  <article class="page wrap about-page">
    <div class="about-layout">
      <figure class="about-portrait">
        <img
          src="/portrait.webp"
          alt="Taha sitting at his laptop"
          width="512"
          height="512"
          fetchpriority="high"
        />
        <figcaption>
          <span lang="zgh-Tfng">ⵉⵙⴽⴰⵏⵎⴰⴳⴰⵔ</span><span>Iskanmagar</span>
        </figcaption>
      </figure>
      <div class="about-copy">
        <h1>A little about me.</h1>
        <div class="prose">
          <p class="lede">From Tamazgha, following questions.</p>
          <p>
            My studies took me from Agadir to Rowan University. These days, I
            work on
            <router-link to="/research"
              >interpretable neural networks</router-link
            >
            at Azetta.ai.
          </p>
          <p>
            Mathematics is one way I ask a question.
            <router-link to="/poetry">Poetry</router-link> is another. I write
            in English, Arabic, and Darija; sometimes the languages share a
            page.
          </p>
          <blockquote class="about-thought">
            <p>The path itself is the destination.</p>
          </blockquote>
          <p class="about-cv">
            For dates and details, there’s a
            <router-link to="/cv">CV</router-link>.
          </p>
        </div>
      </div>
    </div>
  </article>
</template>
<script setup>
import { PERSON_ID, ref } from "@/utils/structuredData";
import { usePageMeta } from "@/composables/usePageMeta";
usePageMeta(
  "About",
  "Taha Bouhsine on research, writing, Tamazgha, and the questions that connect them.",
  { structuredData: { pageType: "ProfilePage", mainEntity: ref(PERSON_ID) } },
);
</script>
