<template>
  <div class="filter-buttons">
    <button 
      :class="{ active: selectedCategory === 'All' }"
      @click="selectCategory('All')"
    >
      <i class="fas fa-globe"></i>
      All
    </button>
    <button 
      v-for="category in categories" 
      :key="category" 
      :class="{ active: selectedCategory === category }"
      @click="selectCategory(category)"
    >
      <i :class="getCategoryIcon(category)"></i>
      {{ category }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CategoryFilter',
  props: {
    categories: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      default: 'All'
    }
  },
  computed: {
    selectedCategory() {
      return this.value;
    }
  },
  methods: {
    selectCategory(category) {
      this.$emit('input', category);
    },
    getCategoryIcon(category) {
      const icons = {
        'Machine Learning': 'fas fa-brain',
        'Deep Learning': 'fas fa-network-wired',
        'Computer Vision': 'fas fa-eye',
        'Natural Language Processing': 'fas fa-language',
        'Reinforcement Learning': 'fas fa-robot',
        'Data Science': 'fas fa-chart-line',
        'Explainable AI': 'fas fa-lightbulb',
        'Neural Networks': 'fas fa-project-diagram',
        'Signal Processing': 'fas fa-wave-square'
      };
      
      return icons[category] || 'fas fa-microscope';
    }
  }
}
</script>

<style scoped>
.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-buttons button {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--glass-border);
  color: var(--secondary-text);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: var(--font-body);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-buttons button i {
  color: var(--accent-color);
  opacity: 0.7;
  transition: all 0.2s ease;
}

.filter-buttons button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--primary-text);
  border-color: var(--accent-color);
}

.filter-buttons button:hover i {
  opacity: 1;
}

.filter-buttons button.active {
  background: var(--accent-color);
  color: var(--primary-bg);
  border-color: var(--accent-color);
  font-weight: 600;
}

.filter-buttons button.active i {
  color: var(--primary-bg);
  opacity: 1;
}

/* Mobile */
@media (max-width: 576px) {
  .filter-buttons {
    gap: 8px;
  }
  
  .filter-buttons button {
    padding: 6px 12px;
    font-size: 0.85rem;
  }
}
</style>