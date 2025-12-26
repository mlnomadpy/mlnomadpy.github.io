<template>
  <div class="poetry-card" @click="navigateToDetails">
    <div class="card-header">
      <h3>{{ poem.title }}</h3>
      <div class="card-meta">
        <span v-for="lang in poem.language" :key="lang" class="language-badge">{{ lang }}</span>
        <span class="date-badge">{{ poem.date }}</span>
      </div>
      <div class="expand-toggle">
        <i class="fas fa-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PoetryCard',
  props: {
    poem: {
      type: Object,
      required: true
    }
  },
  methods: {
    navigateToDetails() {
      this.$router.push({
        name: 'PoetryDetails',
        params: { id: this.poem.id }
      });
    }
  }
}
</script>

<style scoped>
.poetry-card {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid transparent;
  cursor: pointer;
}

.poetry-card:hover {
  border-color: rgba(244, 165, 96, 0.3);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transform: translateY(-4px);
}

.card-header {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
}

.card-header h3 {
  margin: 0;
  color: rgb(244, 165, 96);
  font-size: 1.4rem;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.language-badge, .date-badge {
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  background-color: rgba(244, 165, 96, 0.1);
  color: rgb(244, 165, 96);
}

.expand-toggle {
  position: absolute;
  right: 1.25rem;
  top: 1.25rem;
  color: rgba(244, 165, 96, 0.5);
  transition: all 0.3s ease;
}

.poetry-card:hover .expand-toggle {
  color: rgb(244, 165, 96);
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .card-header h3 {
    font-size: 1.2rem;
  }
  
  .card-header {
    padding: 1rem;
  }
}
</style>