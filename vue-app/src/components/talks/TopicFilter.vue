<template>
  <div class="filter-section">
    <h2><i class="fas fa-tag"></i> Filter by Topic</h2>
    <div class="filter-buttons">
      <button 
        v-for="topic in topics" 
        :key="topic" 
        :class="{ active: selectedTopic === topic }"
        @click="selectTopic(topic)"
      >
        {{ topic }}
      </button>
      <button 
        :class="{ active: selectedTopic === 'All' }"
        @click="selectTopic('All')"
      >
        <i class="fas fa-globe"></i>
        All
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TalksTopicFilter',
  props: {
    topics: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      default: 'All'
    }
  },
  computed: {
    selectedTopic() {
      return this.value;
    }
  },
  methods: {
    selectTopic(topic) {
      this.$emit('input', topic);
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

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .filter-buttons {
    justify-content: center;
  }
  
  .filter-section h2 {
    font-size: 1.3rem;
    margin-bottom: 12px;
  }
}

@media (max-width: 576px) {
  .filter-buttons {
    gap: 8px;
  }
  
  .filter-buttons button {
    font-size: 0.8rem;
    padding: 8px 12px;
  }
  
  .filter-section h2 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
}

@media (max-width: 380px) {
  .filter-buttons button {
    font-size: 0.75rem;
    padding: 6px 10px;
  }
}
</style> 