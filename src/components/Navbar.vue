<template>
  <header class="site-header">
    <nav class="site-nav wrap" aria-label="Main navigation">
      <router-link class="wordmark" to="/" aria-label="Taha Bouhsine, home"
        >Taha Bouhsine<span class="wordmark-note">
          / MLNomadpy</span
        ></router-link
      >
      <ul class="nav-links">
        <li v-for="item in navigation.main" :key="item.to">
          <a v-if="item.document" :href="item.to">{{ item.label }}</a>
          <router-link v-else :to="item.to">{{ item.label }}</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>
<script setup>
import navigation from "@/data/navigation.json";
</script>
