<template>
  <div class="life view-container">
    <div class="section-content scrollable-content smooth-scroll">
      <h1 class="resp-heading">Life</h1>
      
      <div class="life-container">
        <div v-if="isLoading" class="loading-container" role="status" aria-live="polite">
          <div class="loader"></div>
          <p>Loading life events...</p>
        </div>
        
        <div v-else-if="error" class="error-container" role="alert">
          <div class="error-icon">
            <i class="fas fa-exclamation-circle" aria-hidden="true"></i>
          </div>
          <h3>{{ error }}</h3>
          <button @click="loadLifeData" class="retry-btn">
            <i class="fas fa-redo" aria-hidden="true"></i>
            Retry
          </button>
        </div>
        
        <template v-else>
          <LifeToolbar
            :totalEvents="lifeEvents.length"
            :activeYearRange="activeYearRange"
            v-model:showFilters="showFilters"
            :selectedCategory="selectedCategory"
            :categories="categories"
            @update:selectedCategory="filterByCategory"
            @reset-filters="filterByCategory('all')"
          />
          
          <div class="timeline-container">
            <div class="timeline-line" aria-hidden="true"></div>
            
            <LifeTimelineEvent
              v-for="(event, index) in filteredEvents" 
              :key="event.id"
              :event="event"
              :position="index % 2 === 0 ? 'left' : 'right'"
              :isExpanded="expandedEvents.includes(event.id)"
              @toggle-expand="toggleEventExpansion(event.id)"
            />
            
            <div v-if="filteredEvents.length === 0" class="no-events" role="status">
              <div class="no-events-icon">
                <i class="fas fa-search" aria-hidden="true"></i>
              </div>
              <h3>No events found</h3>
              <p>Try selecting a different category</p>
              <button @click="filterByCategory('all')" class="reset-filter-btn">
                <i class="fas fa-redo" aria-hidden="true"></i>
                Show All Events
              </button>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import LifeToolbar from '@/components/life/LifeToolbar.vue';
import LifeTimelineEvent from '@/components/life/LifeTimelineEvent.vue';

export default {
  name: 'LifeView',
  components: {
    LifeToolbar,
    LifeTimelineEvent
  },
  data() {
    return {
      lifeEvents: [],
      filteredEvents: [],
      categories: [],
      selectedCategory: 'all',
      expandedEvents: [],
      isLoading: true,
      error: null,
      showFilters: false
    }
  },
  computed: {
    activeYearRange() {
      if (this.lifeEvents.length === 0) return '';
      
      const years = this.lifeEvents
        .map(event => {
          const dateStr = event.date.toString();
          if (dateStr.includes('-')) {
            return dateStr.split('-').map(y => parseInt(y));
          }
          return [parseInt(dateStr)];
        })
        .flat()
        .filter(year => !isNaN(year));
      
      if (years.length === 0) return '';
      
      const minYear = Math.min(...years);
      const maxYear = Math.max(...years);
      
      return `${minYear}-${maxYear}`;
    }
  },
  methods: {
    async loadLifeData() {
      try {
        this.isLoading = true;
        this.error = null;
        
        // Use dynamic import for Vite compatibility
        const lifeData = await import('@/data/life.json');
        this.lifeEvents = lifeData.default || lifeData;
        
        this.lifeEvents.sort((a, b) => {
          const getLastYear = date => {
            if (typeof date !== 'string') return 0;
            const parts = date.split('-');
            return parseInt(parts[parts.length - 1]);
          };
          
          const yearA = getLastYear(a.date);
          const yearB = getLastYear(b.date);
          
          return yearB - yearA;
        });
        
        const categoryIcons = {
          education: 'fas fa-graduation-cap',
          career: 'fas fa-briefcase',
          milestone: 'fas fa-flag',
          travel: 'fas fa-plane',
          personal: 'fas fa-heart',
          award: 'fas fa-trophy',
          project: 'fas fa-code',
          publication: 'fas fa-book'
        };
        
        const categoriesSet = new Set(this.lifeEvents.map(event => event.category));
        this.categories = Array.from(categoriesSet).map(category => ({
          name: category,
          icon: categoryIcons[category] || 'fas fa-star'
        }));
        
        this.filteredEvents = [...this.lifeEvents];
        this.isLoading = false;
      } catch (error) {
        console.error('Error loading life data:', error);
        this.error = 'Failed to load life events. Please try again later.';
        this.isLoading = false;
      }
    },
    filterByCategory(category) {
      this.selectedCategory = category;
      
      if (category === 'all') {
        this.filteredEvents = [...this.lifeEvents];
      } else {
        this.filteredEvents = this.lifeEvents.filter(event => event.category === category);
      }
      
      this.expandedEvents = [];
    },
    toggleEventExpansion(eventId) {
      const index = this.expandedEvents.indexOf(eventId);
      if (index === -1) {
        this.expandedEvents.push(eventId);
      } else {
        this.expandedEvents.splice(index, 1);
      }
    }
  },
  mounted() {
    this.loadLifeData();
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

.life {
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

.life-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Timeline */
.timeline-container {
  position: relative;
  padding: 20px 0;
}

.timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background: rgba(244, 165, 96, 0.3);
  transform: translateX(-50%);
  z-index: 1;
}

.no-events {
  text-align: center;
  padding: 60px 20px;
  background: var(--glass-bg);
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  position: relative;
  z-index: 2;
  margin-top: 40px;
}

.no-events-icon {
  font-size: 3rem;
  color: var(--secondary-text);
  margin-bottom: 20px;
  opacity: 0.5;
}

.reset-filter-btn {
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

.reset-filter-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(244, 165, 96, 0.3);
}

/* Responsive */
@media (max-width: 992px) {
  .timeline-line {
    left: 40px;
  }
}

@media (max-width: 768px) {
  .timeline-line {
    left: 20px;
  }
}
</style>