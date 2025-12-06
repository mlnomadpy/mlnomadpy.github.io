<template>
  <div class="research view-container">
    <div class="section-content scrollable-content smooth-scroll">
      <!-- Removed Header as requested to save space -->
      
      <div class="research-wrapper">
        <!-- Toolbar -->
        <div class="research-toolbar">
          <div class="search-group">
            <SearchBar
              v-model="searchQuery"
              placeholder="Search papers..."
              @clear="clearSearch"
              class="flex-grow"
            />
            
            <!-- View Toggle -->
            <button 
              class="filter-toggle-btn"
              @click="toggleViewMode"
              :title="viewMode === 'list' ? 'Switch to Grid View' : 'Switch to List View'"
            >
              <i :class="viewMode === 'list' ? 'fas fa-th-large' : 'fas fa-list'"></i>
              <span class="desktop-only">{{ viewMode === 'list' ? 'Grid' : 'List' }}</span>
            </button>

            <!-- Filter Toggle -->
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
        
        <!-- Content Area -->
        <transition name="fade" mode="out-in">
          <!-- Compact List View -->
          <div v-if="viewMode === 'list' && paginatedResearch.length" key="list">
             <CompactList
               title=""
               :items="compactListItems"
               @item-click="openDetail"
             />
          </div>

          <!-- Grid View -->
          <div v-else-if="paginatedResearch.length" class="research-grid" key="grid">
            <ResearchCard
              v-for="item in paginatedResearch"
              :key="item.id"
              :item="item"
            />
          </div>
          
          <!-- No Results -->
          <NoResults 
            v-else
            key="no-results"
            @reset="resetFilters"
          />
        </transition>

          <!-- Pagination Controls -->
          <div v-if="filteredResearch.length > itemsPerPage" class="pagination-controls">
            <button 
              class="page-btn" 
              :disabled="currentPage === 1" 
              @click="changePage(currentPage - 1)"
            >
              <i class="fas fa-chevron-left"></i> Previous
            </button>
            <span class="page-info">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button 
              class="page-btn" 
              :disabled="currentPage === totalPages" 
              @click="changePage(currentPage + 1)"
            >
              Next <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    
  </div>
</template>

<script>
import SearchBar from '@/components/research/SearchBar.vue';
import CategoryFilter from '@/components/research/CategoryFilter.vue';
import ResearchCard from '@/components/research/ResearchCard.vue';
import NoResults from '@/components/research/NoResults.vue';
import CompactList from '@/components/about/CompactList.vue';

export default {
  name: 'ResearchView',
  components: {
    SearchBar,
    CategoryFilter,
    ResearchCard,
    NoResults,
    CompactList
  },
  data() {
    return {
      research: [],
      categories: [],
      selectedCategory: 'All',
      searchQuery: '',
      showFilters: false,
      viewMode: 'list', // Default to list
      currentPage: 1,
      itemsPerPage: 10
    }
  },
  watch: {
    // Reset to page 1 when filters change
    searchQuery() {
      this.currentPage = 1;
    },
    selectedCategory() {
      this.currentPage = 1;
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
    },
    totalPages() {
      return Math.ceil(this.filteredResearch.length / this.itemsPerPage);
    },
    paginatedResearch() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredResearch.slice(start, end);
    },
    compactListItems() {
      return this.paginatedResearch.map(item => ({
        ...item,
        // Map fields for CompactList
        period: item.year,
        subtitle: item.category,
        location: item.status, // e.g., "Independent Research"
        description: item.details || item.summary // For modal
      }));
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
    toggleViewMode() {
      this.viewMode = this.viewMode === 'list' ? 'grid' : 'list';
    },
    openDetail(item) {
      this.$router.push({ name: 'ResearchDetails', params: { id: item.id } });
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        // Scroll to top of list
        const wrapper = this.$el.querySelector('.scrollable-content');
        if (wrapper) wrapper.scrollTo({ top: 0, behavior: 'smooth' });
      }
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

.research {
  padding: 0; /* Remove padding that might cause overflow */
  /* min-height: 100vh; REMOVED to fix scroll issue */
  height: 100%;
}

.research-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 20px 20px 80px; /* Add bottom padding for scroll space */
}

/* Toolbar Styles */
.research-toolbar {
  margin-bottom: 20px;
  position: relative;
  z-index: 10;
  position: sticky; /* Sticky toolbar */
  top: 0;
  background: rgba(18, 18, 18, 0.8); /* Background to hide content behind */
  backdrop-filter: blur(10px);
  padding: 10px 0;
  margin-top: -10px; /* Offset to stick at top */
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
  background: rgba(30, 30, 30, 0.95);
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
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

/* Pagination Controls */
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.page-btn {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.page-btn:hover:not(:disabled) {
  background: var(--accent-color);
  color: #000;
  transform: translateY(-2px);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: #aaa;
  font-size: 0.95rem;
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