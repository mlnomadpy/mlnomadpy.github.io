<template>
  <footer class="site-footer wrap">
    <p>Taha Bouhsine <span class="muted">/ MLNomadpy</span></p>
    <nav aria-label="Elsewhere">
      <template v-for="item in navigation.elsewhere" :key="item.to">
        <router-link v-if="item.to.startsWith('/')" :to="item.to">{{
          item.label
        }}</router-link>
        <a v-else :href="item.to">{{ item.label }}</a>
      </template>
    </nav>
  </footer>
</template>
<script setup>
import navigation from "@/data/navigation.json";
</script>
