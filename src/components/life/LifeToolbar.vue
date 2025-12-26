<template>
  <div class="life-toolbar" role="region" aria-label="Life events controls">
    <div class="toolbar-header">
      <div class="timeline-stats" aria-label="Timeline statistics">
        <span>{{ totalEvents }} Events</span>
        <span class="separator" aria-hidden="true">•</span>
        <span>{{ activeYearRange }}</span>
      </div>
      
      <button 
        class="filter-toggle-btn" 
        :class="{ active: showFilters }"
        @click="$emit('update:showFilters', !showFilters)"
        :aria-expanded="showFilters"
        aria-controls="filter-panel"
        title="Toggle Filters"
      >
        <i class="fas fa-filter" aria-hidden="true"></i>
        <span class="desktop-only">Filters</span>
      </button>
    </div>
    
    <!-- Collapsible Filter Section -->
    <transition name="expand">
      <div 
        v-if="showFilters" 
        id="filter-panel"
        class="filter-panel glass-panel"
        role="region"
        aria-label="Category filters"
      >
        <div class="filter-header">
          <h3>Categories</h3>
          <button 
            v-if="selectedCategory !== 'all'" 
            @click="$emit('reset-filters')" 
            class="clear-filters-btn"
            aria-label="Clear all filters"
          >
            Clear
          </button>
        </div>
        
        <div class="filter-buttons" role="group" aria-label="Filter by category">
          <button 
            :class="{ active: selectedCategory === 'all' }"
            @click="$emit('update:selectedCategory', 'all')"
            :aria-pressed="selectedCategory === 'all'"
          >
            <i class="fas fa-globe" aria-hidden="true"></i>
            All
          </button>
          <button 
            v-for="category in categories" 
            :key="category.name"
            :class="{ active: selectedCategory === category.name }"
            @click="$emit('update:selectedCategory', category.name)"
            :aria-pressed="selectedCategory === category.name"
          >
            <i :class="category.icon" aria-hidden="true"></i>
            {{ formatCategory(category.name) }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'LifeToolbar',
  props: {
    totalEvents: {
      type: Number,
      default: 0
    },
    activeYearRange: {
      type: String,
      default: ''
    },
    showFilters: {
      type: Boolean,
      default: false
    },
    selectedCategory: {
      type: String,
      default: 'all'
    },
    categories: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:showFilters', 'update:selectedCategory', 'reset-filters'],
  methods: {
    formatCategory(category) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    }
  }
}
</script>

<style scoped>
/* Toolbar Styles */
.life-toolbar {
  margin-bottom: 40px;
  position: relative;
  z-index: 10;
}

.toolbar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--glass-bg);
  padding: 15px 25px;
  border-radius: 50px;
  border: 1px solid var(--glass-border);
  backdrop-filter: blur(10px);
}

.timeline-stats {
  display: flex;
  align-items: center;
  gap: 15px;
  font-family: var(--font-mono);
  color: var(--accent-color);
  font-weight: 600;
}

.separator {
  color: var(--secondary-text);
  opacity: 0.5;
}

.filter-toggle-btn {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid transparent;
  color: var(--primary-text);
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-family: var(--font-heading);
  font-size: 0.9rem;
}

.filter-toggle-btn:hover, .filter-toggle-btn.active {
  background: var(--accent-color);
  color: var(--primary-bg);
}

/* Filter Panel */
.filter-panel {
  margin-top: 15px;
  padding: 20px;
  background: rgba(30, 30, 30, 0.8);
  border-radius: 16px;
  border: 1px solid var(--glass-border);
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.filter-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--accent-color);
}

.clear-filters-btn {
  background: none;
  border: none;
  color: var(--secondary-text);
  cursor: pointer;
  font-size: 0.9rem;
  text-decoration: underline;
}

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

.filter-buttons button:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--primary-text);
  border-color: var(--accent-color);
}

.filter-buttons button.active {
  background: var(--accent-color);
  color: var(--primary-bg);
  border-color: var(--accent-color);
  font-weight: 600;
}

/* Transitions */
.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  opacity: 1;
  overflow: hidden;
}

.expand-enter-from, .expand-leave-to {
  max-height: 0;
  opacity: 0;
  margin-top: 0;
  padding-top: 0;
  padding-bottom: 0;
}

@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }
  
  .filter-toggle-btn {
    padding: 12px;
    width: 50px;
    justify-content: center;
  }
  
  .toolbar-header {
    flex-direction: column;
    gap: 15px;
    border-radius: 16px;
    align-items: stretch;
  }
  
  .timeline-stats {
    justify-content: center;
  }
  
  .filter-toggle-btn {
    width: 100%;
  }
}
</style>
