<template>
  <header class="site-header">
    <nav class="site-nav wrap" aria-label="Main navigation">
      <router-link class="wordmark" to="/" aria-label="Taha Bouhsine, home"
        >Taha Bouhsine<span class="wordmark-note">
          / MLNomadpy</span
        ></router-link
      >
      <ul class="nav-links">
        <li v-for="item in links" :key="item.to">
          <router-link :to="item.to">{{ item.label }}</router-link>
        </li>
        <li><a href="https://www.tahabouhsine.com/blog/">Blog</a></li>
      </ul>
    </nav>
  </header>
</template>
<script setup>
const links = [
  { to: "/aboutme", label: "About" },
  { to: "/research", label: "Research" },
  { to: "/talks", label: "Talks" },
  { to: "/poetry", label: "Poetry" },
  { to: "/music", label: "Music" },
];
</script>
