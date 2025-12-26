<template>
  <div class="poetry view-container">
    <div class="section-content scrollable-content">
      <div class="poetry-container">
        <PoetryCard 
          v-for="poem in poems" 
          :key="poem.id" 
          :poem="poem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import poetryData from '@/data/poetry.json';
import PoetryCard from '@/components/poetry/PoetryCard.vue';

export default {
  name: 'PoetryView',
  components: {
    PoetryCard
  },
  data() {
    return {
      poems: poetryData
    }
  }
}
</script>

<style scoped>
.view-container {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.scrollable-content {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  /* Custom Scrollbar Styles to match About Me */
  scrollbar-width: thin;
  scrollbar-color: rgba(244, 165, 96, 0.3) transparent;
}

.scrollable-content::-webkit-scrollbar {
  width: 6px;
}

.scrollable-content::-webkit-scrollbar-track {
  background: transparent;
}

.scrollable-content::-webkit-scrollbar-thumb {
  background-color: rgba(244, 165, 96, 0.3);
  border-radius: 20px;
}

.poetry-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 40px;
}

@media (max-width: 768px) {
  .scrollable-content {
    padding: 1rem;
  }
}
</style> 