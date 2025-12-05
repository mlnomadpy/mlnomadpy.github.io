<template>
  <div class="talks-toolbar" role="search" aria-label="Talks search and filters">
    <div class="search-group">
      <div class="search-container flex-grow">
        <i class="fas fa-search search-icon" aria-hidden="true"></i>
        <input 
          type="text" 
          :value="searchQuery" 
          @input="$emit('update:searchQuery', $event.target.value)"
          placeholder="Search talks..." 
          class="search-input"
          aria-label="Search talks by title, description, or venue"
        >
        <button 
          v-if="searchQuery" 
          @click="$emit('clear-search')" 
          class="clear-search"
          aria-label="Clear search"
        >
          <i class="fas fa-times" aria-hidden="true"></i>
        </button>
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
        aria-label="Topic filters"
      >
        <div class="filter-header">
          <h3>Topics</h3>
          <button 
            v-if="selectedTopic !== 'All'" 
            @click="$emit('reset-filters')" 
            class="clear-filters-btn"
            aria-label="Clear all filters"
          >
            Clear
          </button>
        </div>
        
        <div class="filter-buttons" role="group" aria-label="Filter by topic">
          <button 
            :class="{ active: selectedTopic === 'All' }"
            @click="$emit('update:selectedTopic', 'All')"
            :aria-pressed="selectedTopic === 'All'"
          >
            <i class="fas fa-globe" aria-hidden="true"></i>
            All
          </button>
          <button 
            v-for="topic in topics" 
            :key="topic" 
            :class="{ active: selectedTopic === topic }"
            @click="$emit('update:selectedTopic', topic)"
            :aria-pressed="selectedTopic === topic"
          >
            {{ topic }}
          </button>
        </div>
        
        <div class="stats-summary" aria-live="polite">
          Showing {{ filteredCount }} of {{ totalCount }} talks
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'TalksToolbar',
  props: {
    searchQuery: {
      type: String,
      default: ''
    },
    showFilters: {
      type: Boolean,
      default: false
    },
    selectedTopic: {
      type: String,
      default: 'All'
    },
    topics: {
      type: Array,
      default: () => []
    },
    filteredCount: {
      type: Number,
      default: 0
    },
    totalCount: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:searchQuery', 'update:showFilters', 'update:selectedTopic', 'clear-search', 'reset-filters']
}
</script>

<style scoped>
.talks-toolbar {
  margin-bottom: 30px;
  position: relative;
  z-index: 10;
}

.search-group {
  display: flex;
  gap: 15px;
  align-items: center;
}

.flex-grow {
  flex: 1;
}

.search-container {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 12px 45px;
  border-radius: 30px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  color: var(--primary-text);
  font-family: var(--font-mono);
  font-size: 1rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-color);
  box-shadow: 0 0 15px rgba(244, 165, 96, 0.2);
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--accent-color);
  font-size: 1rem;
}

.clear-search {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--secondary-text);
  cursor: pointer;
  font-size: 0.9rem;
}

.filter-toggle-btn {
  padding: 12px 20px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--primary-text);
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-family: var(--font-heading);
  height: 50px;
}

.filter-toggle-btn:hover, .filter-toggle-btn.active {
  background: var(--accent-color);
  color: var(--primary-bg);
  border-color: var(--accent-color);
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

.stats-summary {
  margin-top: 15px;
  text-align: right;
  font-size: 0.9rem;
  color: var(--secondary-text);
  font-family: var(--font-mono);
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
}
</style>
