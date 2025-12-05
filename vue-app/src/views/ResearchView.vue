<template>
  <div class="research view-container">
    <div class="section-content scrollable-content smooth-scroll">
      <h1 class="resp-heading">research</h1>
      
      <div class="research-wrapper">
        <div class="research-filter-section">
          <SearchBar
            v-model="searchQuery"
            placeholder="Search research papers..."
            @clear="clearSearch"
          />
          
          <CategoryFilter
            v-model="selectedCategory"
            :categories="categories"
          />

          <ResearchStats
            :total-count="research.length"
            :category-count="categories.length"
            :display-count="filteredResearch.length"
          />
        </div>
        
        <div v-if="filteredResearch.length" class="research-grid">
          <ResearchCard
            v-for="item in filteredResearch"
            :key="item.id"
            :item="item"
            @toggle-expanded="handleExpandToggle"
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
import ResearchStats from '@/components/research/ResearchStats.vue';
import ResearchCard from '@/components/research/ResearchCard.vue';
import NoResults from '@/components/research/NoResults.vue';

export default {
  name: 'ResearchView',
  components: {
    SearchBar,
    CategoryFilter,
    ResearchStats,
    ResearchCard,
    NoResults
  },
  data() {
    return {
      research: [],
      categories: [],
      selectedCategory: 'All',
      expandedItems: [],
      searchQuery: '',
      filteredResults: []
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
      this.expandedItems = [];
    },
    handleExpandToggle({ id, expanded }) {
      if (expanded) {
        // Close any other expanded items first (accordion-like behavior)
        this.expandedItems = [id];
      } else {
        const index = this.expandedItems.indexOf(id);
        if (index !== -1) {
          this.expandedItems.splice(index, 1);
        }
      }
    },
    async loadResearchData() {
      try {
        // In a real app, you'd import the JSON directly or use fetch
        const researchData = require('@/data/research.json');
        this.research = researchData;
        
        // Extract unique categories
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
  margin-bottom: 40px;
  padding-bottom: 20px;
  position: relative;
  font-size: 2.5rem;
}

.section-content h1::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: var(--accent-color);
  transition: width 0.3s ease;
}

.section-content h1:hover::after {
  width: 150px;
}

.research-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 30px;
  position: relative;
  font-family: "Space Mono", monospace;
  background: linear-gradient(135deg, rgba(65, 44, 15, 0.6), rgba(65, 44, 15, 0.9));
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border: 1px solid rgba(244, 165, 96, 0.1);
}

.research-wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 90% 10%, rgba(244, 165, 96, 0.05), transparent 40%);
  pointer-events: none;
}

.research-filter-section {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin-bottom: 30px;
}

.research-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

@media (min-width: 768px) {
  .research-filter-section {
    flex-direction: row;
    flex-wrap: wrap;
  }
  
  :deep(.research-search) {
    flex: 0 0 100%;
  }
  
  :deep(.filter-section) {
    flex: 1;
  }
  
  :deep(.research-stats) {
    flex: 1;
    justify-content: flex-end;
  }
}

@media (max-width: 767px) {
  .scrollable-content {
    padding: 10px 6px;
  }
  
  .section-content h1 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .research-wrapper {
    width: calc(100% - 4px);
    margin: 0 2px;
    padding: 20px 15px;
  }
  
  .research-filter-section {
    padding: 15px 10px;
    gap: 15px;
  }
  
  .research-grid {
    gap: 1.2rem;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    margin-top: 20px;
  }
}

@media (max-width: 576px) {
  .research-wrapper {
    padding: 15px 10px;
  }
  
  .research-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .section-content h1 {
    font-size: 1.8rem;
    margin-bottom: 1.2rem;
    padding-bottom: 15px;
  }
  
  .section-content h1::after {
    width: 80px;
    height: 2px;
  }
  
  .section-content h1:hover::after {
    width: 120px;
  }
}

@media (max-width: 480px) {
  .scrollable-content {
    padding: 8px 4px;
  }
  
  .research-wrapper {
    width: 100%;
    margin: 0;
    padding: 15px 8px;
    border-radius: 12px;
  }
  
  .research-filter-section {
    padding: 12px 8px;
    gap: 12px;
  }
  
  .research-grid {
    gap: 15px;
    margin-top: 15px;
  }
  
  .section-content h1 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
    padding-bottom: 12px;
  }
}
</style> 