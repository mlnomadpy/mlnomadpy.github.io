<template>
  <div class="home">
    <HeroSection />
  </div>
</template>

<script>
import HeroSection from '@/components/home/HeroSection.vue';

export default {
  name: 'HomeView',
  components: {
    HeroSection
  }
}
</script>

<style scoped>
.home {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
</style>