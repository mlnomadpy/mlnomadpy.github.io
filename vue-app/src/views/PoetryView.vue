<template>
  <div class="poetry view-container">
    <div class="section-content scrollable-content">
      <h1>poetry</h1>
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
}

.poetry-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  color: var(--text-color, #fff);
  position: relative;
  padding-bottom: 1rem;
}

h1::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background-color: rgb(244, 165, 96);
}

@media (max-width: 768px) {
  .scrollable-content {
    padding: 1rem;
  }
  
  h1 {
    font-size: 2rem;
  }
}
</style> 