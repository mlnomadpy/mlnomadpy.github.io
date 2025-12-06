<template>
  <div class="talks view-container">
    <div class="section-content scrollable-content smooth-scroll">
      <!-- Removed Header -->
      
      <div class="talks-wrapper">
        <div v-if="isLoading" class="loading-container" role="status" aria-live="polite">
          <div class="loader"></div>
          <p>Loading talks...</p>
        </div>
        
        <div v-else-if="error" class="error-container" role="alert">
          <div class="error-icon">
            <i class="fas fa-exclamation-circle" aria-hidden="true"></i>
          </div>
          <h3>{{ error }}</h3>
          <button @click="loadTalksData" class="retry-btn">
            <i class="fas fa-redo" aria-hidden="true"></i>
            Retry
          </button>
        </div>
        
        <template v-else>
          <!-- Custom Toolbar (Inline for consistency with ResearchView) -->
          <div class="talks-toolbar" role="search" aria-label="Talks search and filters">
            <div class="search-group">
              <div class="search-container flex-grow">
                <i class="fas fa-search search-icon" aria-hidden="true"></i>
                <input 
                  type="text" 
                  v-model="searchQuery" 
                  placeholder="Search talks..." 
                  class="search-input"
                  aria-label="Search talks by title, description, or venue"
                >
                <button 
                  v-if="searchQuery" 
                  @click="clearSearch" 
                  class="clear-search"
                  aria-label="Clear search"
                >
                  <i class="fas fa-times" aria-hidden="true"></i>
                </button>
              </div>
              
              <!-- View Toggle -->
              <button 
                class="filter-toggle-btn"
                @click="toggleViewMode"
                :title="viewMode === 'list' ? 'Switch to Grid View' : 'Switch to List View'"
              >
                <i :class="viewMode === 'list' ? 'fas fa-th-large' : 'fas fa-list'"></i>
                <span class="desktop-only">{{ viewMode === 'list' ? 'Grid' : 'List' }}</span>
              </button>
              
              <button 
                class="filter-toggle-btn" 
                :class="{ active: showFilters }"
                @click="showFilters = !showFilters"
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
                    @click="resetFilters" 
                    class="clear-filters-btn"
                    aria-label="Clear all filters"
                  >
                    Clear
                  </button>
                </div>
                
                <div class="filter-buttons" role="group" aria-label="Filter by topic">
                  <button 
                    :class="{ active: selectedTopic === 'All' }"
                    @click="selectedTopic = 'All'"
                    :aria-pressed="selectedTopic === 'All'"
                  >
                    <i class="fas fa-globe" aria-hidden="true"></i>
                    All
                  </button>
                  <button 
                    v-for="topic in topics" 
                    :key="topic" 
                    :class="{ active: selectedTopic === topic }"
                    @click="selectedTopic = topic"
                    :aria-pressed="selectedTopic === topic"
                  >
                    {{ topic }}
                  </button>
                </div>
                
                <div class="stats-summary" aria-live="polite">
                  Showing {{ filteredTalks.length }} of {{ talks.length }} talks
                </div>
              </div>
            </transition>
          </div>
          
          <!-- Content Area -->
          <transition name="fade" mode="out-in">
            <!-- Compact List View -->
            <div v-if="viewMode === 'list' && paginatedTalks.length" key="list">
              <CompactList
                title=""
                :items="compactListItems"
                @item-click="openDetail"
              />
            </div>

            <!-- Grid View -->
            <div v-else-if="paginatedTalks.length > 0" class="talks-grid" key="grid">
              <TalkCard
                v-for="talk in paginatedTalks"
                :key="talk.id"
                :talk="talk"
                @select="openDetail"
              />
            </div>
            
            <div v-else class="no-talks-found" role="status" key="no-results">
              <div class="no-results-icon">
                <i class="fas fa-search" aria-hidden="true"></i>
              </div>
              <h3>No matching talks found</h3>
              <p>Try adjusting your search or filters.</p>
              <button @click="resetFilters" class="reset-filters-btn">
                <i class="fas fa-redo" aria-hidden="true"></i>
                Reset Filters
              </button>
            </div>
          </transition>

          <!-- Pagination Controls -->
          <div v-if="filteredTalks.length > itemsPerPage" class="pagination-controls">
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
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import TalkCard from '@/components/talks/TalkCard.vue';
import CompactList from '@/components/about/CompactList.vue';

export default {
  name: 'TalksView',
  components: {
    TalkCard,
    CompactList
  },
  data() {
    return {
      talks: [],
      filteredTalks: [],
      topics: [],
      selectedTopic: 'All',
      searchQuery: '',
      isLoading: true,
      error: null,
      showFilters: false,
      viewMode: 'list', // Default to list
      currentPage: 1,
      itemsPerPage: 9 // Grid 3x3
    }
  },
  watch: {
    searchQuery() {
      this.currentPage = 1;
      this.filterTalks();
    },
    selectedTopic() {
      this.currentPage = 1;
      this.filterTalks();
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredTalks.length / this.itemsPerPage);
    },
    paginatedTalks() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredTalks.slice(start, end);
    },
    compactListItems() {
      return this.paginatedTalks.map(talk => {
        // Prepare links logic if needed for CompactList internal buttons (optional)
        // But clicking the row will navigate to detail page.
        
        return {
          ...talk,
          period: talk.type, // Map 'type' (e.g., 'MLAscent') to period pill
          subtitle: talk.organization,
          location: talk.venue !== 'Unknown venue' ? talk.venue : '',
          description: talk.description
        };
      });
    }
  },
  methods: {
    filterTalks() {
      // First filter by topic
      let result = this.selectedTopic === 'All' 
        ? this.talks
        : this.talks.filter(talk => talk.tags.includes(this.selectedTopic));
      
      // Then filter by search query
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(talk => 
          talk.title.toLowerCase().includes(query) ||
          talk.description?.toLowerCase().includes(query) ||
          talk.venue.toLowerCase().includes(query) ||
          talk.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      this.filteredTalks = result;
    },
    clearSearch() {
      this.searchQuery = '';
    },
    resetFilters() {
      this.searchQuery = '';
      this.selectedTopic = 'All';
    },
    toggleViewMode() {
      this.viewMode = this.viewMode === 'list' ? 'grid' : 'list';
    },
    openDetail(item) {
      // Generate slug from title to match TalkDetailsView logic
      const talkSlug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      this.$router.push({ name: 'TalkDetails', params: { id: talkSlug } });
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        const wrapper = this.$el.querySelector('.scrollable-content');
        if (wrapper) wrapper.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    processTagsFromData(talksData) {
      return talksData.map(talk => {
        if (talk.tags && talk.tags.length > 0) {
          return talk;
        }
        const tags = [];
        if (talk.type) tags.push(talk.type);
        if (talk.organization) {
          const org = talk.organization.replace('@', '');
          tags.push(org);
        }
        const potentialTopics = ['AI', 'ML', 'NLP', 'CV', 'Vision', 'GAN', 'RL', 'TensorFlow', 'Keras', 'JAX', 'FLAX'];
        potentialTopics.forEach(topic => {
          if (talk.title.includes(topic)) {
            tags.push(topic);
          }
        });
        if (tags.length === 0) tags.push('Other');
        return {
          ...talk,
          tags: [...new Set(tags)]
        };
      });
    },
    async loadTalksData() {
      try {
        this.isLoading = true;
        this.error = null;
        
        const talksData = await import('@/data/talks.json');
        
        const processedTalks = this.processTagsFromData(talksData.default || talksData);
        
        const talks = processedTalks.map(talk => ({
          ...talk,
          venue: talk.organization || talk.venue || 'Unknown venue',
          date: talk.date || 'Unknown date',
          id: talk.id || `talk-${Math.random().toString(36).substr(2, 9)}`
        }));
        
        this.talks = talks;
        this.filteredTalks = talks;
        
        const allTags = talks.flatMap(talk => talk.tags || []);
        const topicsSet = new Set(allTags);
        this.topics = Array.from(topicsSet);
        
        this.isLoading = false;
      } catch (error) {
        console.error('Error loading talks data:', error);
        this.error = 'Failed to load talks data. Please try again later.';
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.loadTalksData();
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

.talks {
  padding: 0;
  height: 100%;
}

.talks-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 20px 20px 80px;
}

/* Toolbar Styles (Inlined) */
.talks-toolbar {
  margin-bottom: 20px;
  position: relative;
  z-index: 10;
  position: sticky;
  top: 0;
  background: rgba(18, 18, 18, 0.8);
  backdrop-filter: blur(10px);
  padding: 10px 0;
  margin-top: -10px;
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
.talks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 30px;
}

.no-talks-found {
  text-align: center;
  padding: 60px 20px;
  background: var(--glass-bg);
  border-radius: 16px;
  border: 1px solid var(--glass-border);
}

.no-results-icon {
  font-size: 3rem;
  color: var(--secondary-text);
  margin-bottom: 20px;
  opacity: 0.5;
}

.reset-filters-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background: var(--accent-color);
  color: var(--primary-bg);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.reset-filters-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(244, 165, 96, 0.3);
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
  
  .talks-grid {
    grid-template-columns: 1fr;
  }
}
</style>