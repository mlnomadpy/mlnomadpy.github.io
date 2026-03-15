<template>
  <div class="poetry view-container">
    <div class="section-content scrollable-content smooth-scroll custom-scroll">
      <div class="poetry-wrapper">
        <!-- Toolbar -->
        <div class="poetry-toolbar" role="search" aria-label="Poetry search and filters">
          <div class="search-group">
            <div class="search-container flex-grow">
              <i class="fas fa-search search-icon" aria-hidden="true"></i>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Search poems..."
                class="search-input"
                aria-label="Search poems by title or description"
              >
              <button
                v-if="searchQuery"
                @click="searchQuery = ''"
                class="clear-search"
                aria-label="Clear search"
              >
                <i class="fas fa-times" aria-hidden="true"></i>
              </button>
            </div>

            <!-- View Toggle -->
            <button
              class="filter-toggle-btn"
              @click="viewMode = viewMode === 'list' ? 'grid' : 'list'"
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
              :aria-expanded="showFilters"
              title="Toggle Filters"
            >
              <i class="fas fa-filter" aria-hidden="true"></i>
              <span class="desktop-only">Filters</span>
            </button>
          </div>

          <!-- Collapsible Filter Section -->
          <transition name="expand">
            <div v-if="showFilters" class="filter-panel glass-panel" role="region" aria-label="Language filters">
              <div class="filter-header">
                <h3>Languages</h3>
                <button v-if="selectedLanguage !== 'All'" @click="selectedLanguage = 'All'" class="clear-filters-btn">
                  Clear
                </button>
              </div>
              <div class="filter-buttons" role="group" aria-label="Filter by language">
                <button
                  :class="{ active: selectedLanguage === 'All' }"
                  @click="selectedLanguage = 'All'"
                  :aria-pressed="selectedLanguage === 'All'"
                >
                  <i class="fas fa-globe" aria-hidden="true"></i> All
                </button>
                <button
                  v-for="lang in languages"
                  :key="lang"
                  :class="{ active: selectedLanguage === lang }"
                  @click="selectedLanguage = lang"
                  :aria-pressed="selectedLanguage === lang"
                >
                  <i :class="languageIcon(lang)" aria-hidden="true"></i>
                  {{ lang }}
                </button>
              </div>
              <div class="stats-summary" aria-live="polite">
                Showing {{ filteredPoems.length }} of {{ poems.length }} poems
              </div>
            </div>
          </transition>
        </div>

        <!-- Content Area -->
        <transition name="fade" mode="out-in">
          <!-- List View -->
          <div v-if="viewMode === 'list' && filteredPoems.length" class="poetry-list" key="list">
            <PoetryCard
              v-for="poem in filteredPoems"
              :key="poem.id"
              :poem="poem"
            />
          </div>

          <!-- Grid View -->
          <div v-else-if="filteredPoems.length" class="poetry-grid" key="grid">
            <PoetryCard
              v-for="poem in filteredPoems"
              :key="poem.id"
              :poem="poem"
              grid
            />
          </div>

          <!-- No Results -->
          <div v-else class="no-results" key="no-results" role="status">
            <div class="no-results-icon">
              <i class="fas fa-feather-alt" aria-hidden="true"></i>
            </div>
            <h3>No poems found</h3>
            <p>Try adjusting your search or filters.</p>
            <button @click="resetFilters" class="reset-btn">
              <i class="fas fa-redo" aria-hidden="true"></i>
              Reset Filters
            </button>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import poetryData from '@/data/poetry.json';
import PoetryCard from '@/components/poetry/PoetryCard.vue';
import { useMeta } from '@/composables/useMeta';

export default {
  name: 'PoetryView',
  components: {
    PoetryCard
  },
  data() {
    return {
      poems: poetryData,
      searchQuery: '',
      selectedLanguage: 'All',
      showFilters: false,
      viewMode: 'list'
    }
  },
  computed: {
    languages() {
      const langSet = new Set();
      this.poems.forEach(p => p.language.forEach(l => langSet.add(l)));
      return Array.from(langSet);
    },
    filteredPoems() {
      return this.poems.filter(poem => {
        const matchesLang = this.selectedLanguage === 'All' || poem.language.includes(this.selectedLanguage);
        if (!this.searchQuery) return matchesLang;
        const q = this.searchQuery.toLowerCase();
        const matchesSearch =
          poem.title.toLowerCase().includes(q) ||
          (poem.description && poem.description.toLowerCase().includes(q));
        return matchesLang && matchesSearch;
      });
    }
  },
  methods: {
    resetFilters() {
      this.searchQuery = '';
      this.selectedLanguage = 'All';
    },
    languageIcon(lang) {
      const icons = {
        'English': 'fas fa-language',
        'Arabic': 'fas fa-moon',
        'Darija': 'fas fa-comments'
      };
      return icons[lang] || 'fas fa-pen-nib';
    }
  },
  mounted() {
    const { setPageMeta } = useMeta();
    setPageMeta({
      title: 'Poetry | Taha Bouhsine',
      description: 'A collection of bilingual poetry in English and Arabic by Taha Bouhsine.',
      ogTitle: 'Poetry | Taha Bouhsine',
      ogDescription: 'A collection of bilingual poetry in English and Arabic by Taha Bouhsine.'
    });
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

.poetry-wrapper {
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  padding: 20px 20px 80px;
}

/* Toolbar */
.poetry-toolbar {
  margin-bottom: 20px;
  position: sticky;
  top: 0;
  z-index: 10;
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

.flex-grow { flex: 1; }

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

/* List View */
.poetry-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Grid View */
.poetry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 25px;
}

/* No Results */
.no-results {
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

.reset-btn {
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

.reset-btn:hover {
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
  .desktop-only { display: none; }
  .filter-toggle-btn { padding: 12px; width: 50px; justify-content: center; }
  .poetry-grid { grid-template-columns: 1fr; }
}
</style>
