<template>
  <section class="page reading-width not-found">
    <p class="handnote">404</p>
    <h1>This page isn’t here.</h1>
    <p class="lede">
      The address may have changed, or the link may be incomplete.
    </p>
    <p>
      <router-link to="/">Go home</router-link>, browse the
      <router-link to="/poetry">poems</router-link>, or find the
      <router-link to="/research">research</router-link>.
    </p>
  </section>
</template>
<script setup>
import { usePageMeta } from "@/composables/usePageMeta";
usePageMeta(
  "Page not found",
  "This page could not be found. Return to Taha Bouhsine’s homepage.",
  { noindex: true },
);
</script>
