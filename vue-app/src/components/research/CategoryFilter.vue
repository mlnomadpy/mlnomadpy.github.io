<template>
  <div class="filter-section">
    <h2>Filter by Category</h2>
    <div class="filter-buttons">
      <button 
        v-for="category in categories" 
        :key="category" 
        :class="{ active: selectedCategory === category }"
        @click="selectCategory(category)"
      >
        <i :class="getCategoryIcon(category)"></i>
        {{ category }}
      </button>
      <button 
        :class="{ active: selectedCategory === 'All' }"
        @click="selectCategory('All')"
      >
        <i class="fas fa-globe"></i>
        All
      </button>
    </div>
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
.filter-section {
  margin-bottom: 15px;
}

.filter-section h2 {
  margin-bottom: 15px;
  font-size: 1.5rem;
  color: var(--accent-color);
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-section h2::before {
  content: "\f0b0";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 1.2rem;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-buttons button {
  padding: 10px 15px;
  background: rgba(30, 30, 30, 0.6);
  border: 1px solid rgba(244, 165, 96, 0.3);
  color: var(--primary-text);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Space Mono", monospace;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-buttons button i {
  color: var(--accent-color);
  transition: all 0.3s ease;
}

.filter-buttons button:hover {
  background: rgba(244, 165, 96, 0.2);
  border-color: var(--accent-color);
  transform: translateY(-2px);
}

.filter-buttons button.active {
  background: var(--accent-color);
  color: var(--primary-bg);
  border-color: var(--accent-color);
  box-shadow: 0 4px 12px rgba(244, 165, 96, 0.3);
}

.filter-buttons button.active i {
  color: var(--primary-bg);
}

/* Enhanced Mobile Responsiveness */
@media (max-width: 768px) {
  .filter-section h2 {
    font-size: 1.3rem;
    margin-bottom: 12px;
  }
  
  .filter-section h2::before {
    font-size: 1.1rem;
  }
  
  .filter-buttons {
    gap: 8px;
  }
}

@media (max-width: 576px) {
  .filter-section h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  
  .filter-section h2::before {
    font-size: 1rem;
  }
  
  .filter-buttons {
    gap: 6px;
  }
  
  .filter-buttons button {
    padding: 8px 12px;
    font-size: 0.8rem;
    gap: 6px;
    border-radius: 16px;
  }
  
  .filter-buttons button i {
    font-size: 0.9rem;
  }
}

@media (max-width: 380px) {
  .filter-section h2 {
    font-size: 1.1rem;
  }
  
  .filter-buttons {
    gap: 5px;
  }
  
  .filter-buttons button {
    padding: 6px 10px;
    font-size: 0.75rem;
    gap: 4px;
    border-radius: 14px;
  }
  
  .filter-buttons button i {
    font-size: 0.8rem;
  }
}
</style> 