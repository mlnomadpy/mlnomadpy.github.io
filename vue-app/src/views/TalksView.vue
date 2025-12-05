<template>
  <div class="talks view-container">
    <div class="section-content scrollable-content smooth-scroll">
      <h1 class="resp-heading">Talks</h1>
      
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
          <TalksToolbar
            v-model:searchQuery="searchQuery"
            v-model:showFilters="showFilters"
            v-model:selectedTopic="selectedTopic"
            :topics="topics"
            :filteredCount="filteredTalks.length"
            :totalCount="talks.length"
            @clear-search="clearSearch"
            @reset-filters="resetFilters"
          />
          
          <div v-if="filteredTalks.length > 0" class="talks-grid">
            <TalkCard
              v-for="talk in filteredTalks"
              :key="talk.id"
              :talk="talk"
              @select="openTalkDetails"
            />
          </div>
          
          <div v-else class="no-talks-found" role="status">
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
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import TalksToolbar from '@/components/talks/TalksToolbar.vue';
import TalkCard from '@/components/talks/TalkCard.vue';

export default {
  name: 'TalksView',
  components: {
    TalksToolbar,
    TalkCard
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
      showFilters: false
    }
  },
  watch: {
    searchQuery() {
      this.filterTalks();
    },
    selectedTopic() {
      this.filterTalks();
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
    openTalkDetails(talk) {
      // Generate a slug from the title for the URL
      const talkSlug = talk.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      this.$router.push({ name: 'TalkDetails', params: { id: talkSlug } });
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
        
        // Use dynamic import for Vite compatibility
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
}

.talks {
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

.talks-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
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
</style>