<template>
  <a class="skip-link" href="#main-content">Skip to content</a>
  <MainNavbar />
  <main id="main-content" tabindex="-1"><router-view /></main>
  <SiteFooter />
</template>
<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@vueuse/head";
import MainNavbar from "./components/Navbar.vue";
import SiteFooter from "./components/FooterComponent.vue";
import { canonicalUrl } from "./utils/structuredData";
const route = useRoute();
const canonical = computed(() => canonicalUrl(route.path));
useHead(
  computed(() => ({
    titleTemplate: "%s | Taha Bouhsine",
    link: [{ rel: "canonical", href: canonical.value }],
    meta: [
      { property: "og:url", content: canonical.value },
      { name: "twitter:url", content: canonical.value },
    ],
  })),
);
</script>
