<template>
  <div class="research view-container">
    <div class="section-content scrollable-content smooth-scroll">
      <h1 class="resp-heading">Research</h1>
      
      <div class="research-wrapper">
        <!-- Compact Toolbar -->
        <div class="research-toolbar">
          <div class="search-group">
            <SearchBar
              v-model="searchQuery"
              placeholder="Search papers..."
              @clear="clearSearch"
              class="flex-grow"
            />
            <button 
              class="filter-toggle-btn" 
              :class="{ active: showFilters }"
              @click="showFilters = !showFilters"
              title="Toggle Filters"
            >
              <i class="fas fa-filter"></i>
              <span class="desktop-only">Filters</span>
            </button>
          </div>

          <!-- Collapsible Filter Section -->
          <transition name="expand">
            <div v-if="showFilters" class="filter-panel glass-panel">
              <div class="filter-header">
                <h3>Categories</h3>
                <button v-if="selectedCategory !== 'All'" @click="selectedCategory = 'All'" class="clear-filters-btn">
                  Clear
                </button>
              </div>
              <CategoryFilter
                v-model="selectedCategory"
                :categories="categories"
              />
              <div class="stats-summary">
                Showing {{ filteredResearch.length }} of {{ research.length }} publications
              </div>
            </div>
          </transition>
        </div>
        
        <div v-if="filteredResearch.length" class="research-grid">
          <ResearchCard
            v-for="item in filteredResearch"
            :key="item.id"
            :item="item"
          />
        </div>
        
        <NoResults 
          v-else
          @reset="resetFilters"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from '@/components/research/SearchBar.vue';
import CategoryFilter from '@/components/research/CategoryFilter.vue';
import ResearchCard from '@/components/research/ResearchCard.vue';
import NoResults from '@/components/research/NoResults.vue';

export default {
  name: 'ResearchView',
  components: {
    SearchBar,
    CategoryFilter,
    ResearchCard,
    NoResults
  },
  data() {
    return {
      research: [],
      categories: [],
      selectedCategory: 'All',
      searchQuery: '',
      showFilters: false
    }
  },
  computed: {
    filteredResearch() {
      if (!this.searchQuery && this.selectedCategory === 'All') {
        return this.research;
      }
      
      return this.research.filter(item => {
        const matchesCategory = this.selectedCategory === 'All' || item.category === this.selectedCategory;
        
        if (!this.searchQuery) {
          return matchesCategory;
        }
        
        const query = this.searchQuery.toLowerCase();
        const matchesSearch = 
          item.title.toLowerCase().includes(query) ||
          item.author.toLowerCase().includes(query) ||
          item.summary.toLowerCase().includes(query) ||
          (item.details && item.details.toLowerCase().includes(query)) ||
          (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)));
        
        return matchesCategory && matchesSearch;
      });
    }
  },
  methods: {
    clearSearch() {
      this.searchQuery = '';
    },
    resetFilters() {
      this.searchQuery = '';
      this.selectedCategory = 'All';
    },
    async loadResearchData() {
      try {
        const researchData = await import('@/data/research.json');
        this.research = researchData.default || researchData;
        const categoriesSet = new Set(this.research.map(item => item.category));
        this.categories = Array.from(categoriesSet);
      } catch (error) {
        console.error('Error loading research data:', error);
      }
    }
  },
  mounted() {
    this.loadResearchData();
  }
}
</script>

<style scoped>
@import '@/components/research/responsive-utils.css';

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

.research {
  padding: 20px;
  min-height: 100vh;
}

.section-content h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
  color: var(--primary-text);
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.research-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
}

/* Toolbar Styles */
.research-toolbar {
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
  height: 50px; /* Match search bar height */
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

.clear-filters-btn:hover {
  color: var(--primary-text);
}

.stats-summary {
  margin-top: 15px;
  text-align: right;
  font-size: 0.9rem;
  color: var(--secondary-text);
  font-family: var(--font-mono);
}

/* Grid */
.research-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 25px;
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

/* Responsive */
@media (max-width: 768px) {
  .desktop-only {
    display: none;
  }
  
  .filter-toggle-btn {
    padding: 12px;
    width: 50px;
    justify-content: center;
  }
  
  .research-grid {
    grid-template-columns: 1fr;
  }
}
</style>