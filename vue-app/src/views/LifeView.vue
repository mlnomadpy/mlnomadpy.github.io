<template>
  <div class="life view-container">
    <div class="section-content">
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
          
          <div class="timeline-scroll-container smooth-scroll">
            <div class="timeline-track">
              <div class="timeline-line" aria-hidden="true"></div>
              
              <LifeTimelineEvent
                v-for="(event, index) in filteredEvents" 
                :key="event.id"
                :event="event"
                :position="index % 2 === 0 ? 'top' : 'bottom'"
                @select="selectEvent"
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
          </div>
        </template>
      </div>

      <!-- Event Details Modal -->
      <div v-if="selectedEvent" class="modal-overlay" @click="closeModal">
        <div class="modal-content glass-card" @click.stop>
          <button class="close-btn" @click="closeModal" aria-label="Close details">
            <i class="fas fa-times"></i>
          </button>
          
          <div class="modal-header">
            <span class="modal-date">{{ selectedEvent.date }}</span>
            <span class="modal-category">
              <i :class="getCategoryIcon(selectedEvent.category)"></i>
              {{ formatCategory(selectedEvent.category) }}
            </span>
          </div>
          
          <h2 class="modal-title">{{ selectedEvent.title }}</h2>
          
          <div class="modal-location" v-if="selectedEvent.location">
            <i class="fas fa-map-marker-alt"></i>
            {{ selectedEvent.location }}
          </div>
          
          <div class="modal-image" v-if="selectedEvent.image">
            <img :src="selectedEvent.image" :alt="selectedEvent.title" loading="lazy">
          </div>
          
          <div class="modal-body">
            <p class="modal-description">{{ selectedEvent.description }}</p>
            
            <div v-if="selectedEvent.highlights" class="modal-highlights">
              <h4><i class="fas fa-star"></i> Highlights</h4>
              <ul>
                <li v-for="(highlight, i) in selectedEvent.highlights" :key="i">{{ highlight }}</li>
              </ul>
            </div>
            
            <a 
              v-if="selectedEvent.link" 
              :href="selectedEvent.link" 
              class="modal-link" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="fas fa-external-link-alt"></i>
              Learn More
            </a>
          </div>
        </div>
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
      selectedEvent: null,
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
    },
    selectEvent(event) {
      this.selectedEvent = event;
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    },
    closeModal() {
      this.selectedEvent = null;
      document.body.style.overflow = ''; // Restore scrolling
    },
    formatCategory(category) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    },
    getCategoryIcon(category) {
      const iconMap = {
        education: 'fas fa-graduation-cap',
        career: 'fas fa-briefcase',
        milestone: 'fas fa-flag',
        travel: 'fas fa-plane',
        personal: 'fas fa-heart',
        award: 'fas fa-trophy',
        project: 'fas fa-code',
        publication: 'fas fa-book'
      };
      return iconMap[category] || 'fas fa-star';
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
  display: flex;
  flex-direction: column;
}

.section-content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.life {
  padding: 0;
  min-height: 100vh;
}

.resp-heading {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2.5rem;
  color: var(--primary-text);
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  flex-shrink: 0;
}

.life-container {
  max-width: 100%;
  margin: 0 auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Horizontal Timeline */
.timeline-scroll-container {
  flex-grow: 1;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 40px 20px;
  display: flex;
  align-items: center;
  /* Custom Scrollbar */
  scrollbar-width: thin;
  scrollbar-color: var(--accent-color) rgba(255, 255, 255, 0.1);
}

.timeline-scroll-container::-webkit-scrollbar {
  height: 8px;
}

.timeline-scroll-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

.timeline-scroll-container::-webkit-scrollbar-thumb {
  background-color: var(--accent-color);
  border-radius: 4px;
}

.timeline-track {
  display: flex;
  position: relative;
  padding: 0 50px;
  min-width: min-content;
  height: 500px; /* Fixed height for alternating layout */
  align-items: stretch; /* Ensure items take full height */
}

.timeline-line {
  position: absolute;
  top: 50%; /* Center line */
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(244, 165, 96, 0.3);
  z-index: 1;
  transform: translateY(-50%);
}

.no-events {
  text-align: center;
  padding: 40px;
  background: var(--glass-bg);
  border-radius: 16px;
  border: 1px solid var(--glass-border);
  margin: auto;
  min-width: 300px;
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

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: #1a1a1a;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 20px;
  padding: 30px;
  position: relative;
  border: 1px solid rgba(244, 165, 96, 0.3);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s ease;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s ease;
  z-index: 10;
}

.close-btn:hover {
  color: var(--accent-color);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.modal-date {
  font-family: 'Space Mono', monospace;
  color: var(--accent-color);
}

.modal-category {
  display: flex;
  align-items: center;
  gap: 6px;
}

.modal-title {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: var(--primary-text);
  font-family: 'Orbitron', sans-serif;
  line-height: 1.2;
}

.modal-location {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
}

.modal-location i {
  color: var(--accent-color);
}

.modal-image {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  max-height: 300px;
}

.modal-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-description {
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 20px;
}

.modal-highlights {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.modal-highlights h4 {
  color: var(--accent-color);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.modal-highlights ul {
  padding-left: 20px;
}

.modal-highlights li {
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.8);
}

.modal-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--accent-color);
  color: var(--primary-bg);
  padding: 10px 20px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.modal-link:hover {
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>