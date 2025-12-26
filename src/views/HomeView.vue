<template>
  <div class="home">
    <HeroSection />
  </div>
</template>

<script>
import HeroSection from '@/components/home/HeroSection.vue';
import { useHead } from '@vueuse/head';

export default {
  name: 'HomeView',
  components: {
    HeroSection
  },
  setup() {
    useHead({
      title: 'AI & Machine Learning Engineer',
      meta: [
        {
          name: 'description',
          content: 'Portfolio of Taha Bouhsine (MLNomadpy) - AI/ML Researcher & Engineer specializing in Deep Learning, Computer Vision, and Interpretable AI.'
        }
      ]
    })
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