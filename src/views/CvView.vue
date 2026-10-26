<template>
  <article class="collection-page wrap cv-page">
    <header class="page-heading">
      <p><router-link to="/aboutme">Back to About</router-link></p>
      <h1>Taha Bouhsine</h1>
      <p class="lede">Research &amp; experience</p>
      <p>
        <a href="mailto:contact@tahabouhsine.com">contact@tahabouhsine.com</a>
      </p>
      <button class="plain-button print-control" @click="printPage">
        Print / save as PDF
      </button>
    </header>
    <div class="cv-layout">
      <section>
        <h2>Experience</h2>
        <article
          class="cv-entry"
          v-for="item in experienceItems"
          :key="item.company + item.title"
        >
          <p class="small muted">{{ item.period }} · {{ item.location }}</p>
          <h3>{{ item.title }}</h3>
          <p class="cv-company">{{ item.company }}</p>
          <ul v-if="item.details">
            <li v-for="detail in item.details" :key="detail">
              {{ plainText(detail) }}
            </li>
          </ul>
          <div v-for="section in item.sections || []" :key="section.title">
            <h4>{{ section.title }}</h4>
            <ul>
              <li v-for="detail in section.details" :key="detail">
                {{ plainText(detail) }}
              </li>
            </ul>
          </div>
        </article>
      </section>
      <aside class="cv-sidebar">
        <section class="section-space">
          <h2>Education</h2>
          <article
            class="cv-entry"
            v-for="item in educationItems"
            :key="item.title"
          >
            <p class="small muted">{{ item.period.trim() }}</p>
            <h3>{{ item.title }}</h3>
            <p>{{ item.subtitle }}</p>
          </article>
        </section>
        <section class="section-space">
          <h2>Recognition</h2>
          <ul class="simple-list">
            <li v-for="item in awardItems" :key="item.title">
              <a v-if="item.link" :href="item.link">{{ item.title }}</a
              ><span v-else>{{ item.title }}</span
              ><span class="small muted">
                — {{ item.subtitle }}, {{ item.period }}</span
              >
            </li>
          </ul>
        </section>
        <section class="section-space">
          <h2>Courses &amp; certificates</h2>
          <ul class="simple-list">
            <li v-for="item in certificates" :key="item.title">
              {{ item.title
              }}<span class="small muted">
                — {{ item.issuer }}, {{ item.date }}</span
              >
            </li>
          </ul>
        </section>
      </aside>
    </div>
    <p class="section-space">
      <router-link to="/research">Papers and research writing</router-link>
    </p>
  </article>
</template>
<script setup>
import {
  experienceItems,
  educationItems,
  awardItems,
  certificates,
} from "@/data/about-me-data";
import { plainText } from "@/utils/content";
import { PERSON_ID, SITE_ORIGIN, ref } from "@/utils/structuredData";
import { usePageMeta } from "@/composables/usePageMeta";
const printPage = () => window.print();
usePageMeta(
  "CV",
  "Taha Bouhsine’s research, teaching, education, and professional experience.",
  {
    structuredData: {
      pageType: "ProfilePage",
      mainEntity: ref(PERSON_ID),
      breadcrumbs: [
        { name: "About", url: SITE_ORIGIN + "/aboutme" },
        { name: "CV", url: SITE_ORIGIN + "/cv" },
      ],
    },
  },
);
</script>
