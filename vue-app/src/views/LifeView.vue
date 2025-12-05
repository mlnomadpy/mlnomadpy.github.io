<template>
  <div class="life view-container">
    <div class="section-content scrollable-content">
      <h1>life</h1>
      
      <div class="life-container">
        <div v-if="isLoading" class="loading-container">
          <div class="loader"></div>
          <p>Loading life events...</p>
        </div>
        
        <div v-else-if="error" class="error-container">
          <div class="error-icon">
            <i class="fas fa-exclamation-circle"></i>
          </div>
          <h3>{{ error }}</h3>
          <button @click="loadLifeData" class="retry-btn">
            <i class="fas fa-redo"></i>
            Retry
          </button>
        </div>
        
        <template v-else>
          <div class="life-header">
            <div class="life-stats">
              <div class="stat-item">
                <div class="stat-value">{{ lifeEvents.length }}</div>
                <div class="stat-label">Life Events</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ categories.length }}</div>
                <div class="stat-label">Categories</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">{{ activeYearRange }}</div>
                <div class="stat-label">Timeline</div>
              </div>
            </div>
            
            <div class="category-filter">
              <button 
                :class="{ active: selectedCategory === 'all' }"
                @click="filterByCategory('all')"
              >
                <i class="fas fa-globe"></i>
                All
              </button>
              <button 
                v-for="category in categories" 
                :key="category.name"
                :class="{ active: selectedCategory === category.name }"
                @click="filterByCategory(category.name)"
              >
                <i :class="category.icon"></i>
                {{ formatCategory(category.name) }}
              </button>
            </div>
          </div>
          
          <div class="timeline-container">
            <div class="timeline-line"></div>
            
            <div 
              v-for="(event, index) in filteredEvents" 
              :key="event.id"
              class="timeline-event"
              :class="[
                index % 2 === 0 ? 'left' : 'right',
                `category-${event.category}`,
                { 'expanded': expandedEvents.includes(event.id) }
              ]"
              @click="toggleEventExpansion(event.id)"
            >
              <div class="timeline-dot">
                <i :class="getCategoryIcon(event.category)"></i>
              </div>
              
              <div class="event-card">
                <div class="event-date">{{ event.date }}</div>
                <div class="event-category">
                  <i :class="getCategoryIcon(event.category)"></i>
                  {{ formatCategory(event.category) }}
                </div>
                
                <h3 class="event-title">{{ event.title }}</h3>
                <div class="event-location">
                  <i class="fas fa-map-marker-alt"></i>
                  {{ event.location }}
                </div>
                
                <div class="event-image" v-if="event.image">
                  <img :src="event.image" :alt="event.title" loading="lazy" @error="handleImageError">
                </div>
                
                <p class="event-description">{{ event.description }}</p>
                
                <div v-if="event.highlights && expandedEvents.includes(event.id)" class="event-highlights">
                  <h4><i class="fas fa-star"></i> Highlights</h4>
                  <ul>
                    <li v-for="(highlight, i) in event.highlights" :key="i">{{ highlight }}</li>
                  </ul>
                </div>
                
                <a 
                  v-if="event.link && expandedEvents.includes(event.id)" 
                  :href="event.link" 
                  class="event-link" 
                  target="_blank"
                >
                  <i class="fas fa-external-link-alt"></i>
                  Learn More
                </a>
                
                <div class="expand-indicator">
                  <i :class="expandedEvents.includes(event.id) ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
                  {{ expandedEvents.includes(event.id) ? 'Show Less' : 'Show More' }}
                </div>
              </div>
            </div>
            
            <div v-if="filteredEvents.length === 0" class="no-events">
              <div class="no-events-icon">
                <i class="fas fa-search"></i>
              </div>
              <h3>No events found</h3>
              <p>Try selecting a different category</p>
              <button @click="filterByCategory('all')" class="reset-filter-btn">
                <i class="fas fa-redo"></i>
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
export default {
  name: 'LifeView',
  data() {
    return {
      lifeEvents: [],
      filteredEvents: [],
      categories: [],
      selectedCategory: 'all',
      expandedEvents: [],
      isLoading: true,
      error: null
    }
  },
  computed: {
    activeYearRange() {
      if (this.lifeEvents.length === 0) return '';
      
      const years = this.lifeEvents
        .map(event => {
          const dateStr = event.date.toString();
          // Handle ranges like "2019-2021" or single years like "2019"
          if (dateStr.includes('-')) {
            return dateStr.split('-').map(y => parseInt(y));
          }
          return [parseInt(dateStr)];
        })
        .flat()
        .filter(year => !isNaN(year));
      
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
        
        // Import life events data
        const lifeData = await import('@/data/life.json');
        this.lifeEvents = lifeData.default || lifeData;
        
        // Sort events by date (try to be smart about handling different date formats)
        this.lifeEvents.sort((a, b) => {
          // Extract the last year in case of ranges like "2019-2021"
          const getLastYear = date => {
            if (typeof date !== 'string') return 0;
            const parts = date.split('-');
            return parseInt(parts[parts.length - 1]);
          };
          
          const yearA = getLastYear(a.date);
          const yearB = getLastYear(b.date);
          
          return yearB - yearA; // Most recent first
        });
        
        // Extract unique categories and add icons
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
      
      // Reset expanded events when changing category
      this.expandedEvents = [];
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
    },
    toggleEventExpansion(eventId) {
      const index = this.expandedEvents.indexOf(eventId);
      if (index === -1) {
        this.expandedEvents.push(eventId);
      } else {
        this.expandedEvents.splice(index, 1);
      }
    },
    handleImageError(e) {
      e.target.src = 'https://i.imgur.com/TwYAtdu.png'; // Default fallback image
    }
  },
  mounted() {
    this.loadLifeData();
  }
}
</script>

<style scoped>
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

.life-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  position: relative;
  font-family: "Space Mono", monospace;
  background: linear-gradient(135deg, rgba(65, 44, 15, 0.6), rgba(65, 44, 15, 0.9));
  border-radius: 16px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  border: 1px solid rgba(244, 165, 96, 0.1);
}

.life-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 90% 10%, rgba(244, 165, 96, 0.05), transparent 40%);
  pointer-events: none;
}

.loading-container, .error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  text-align: center;
}

.loader {
  border: 5px solid rgba(244, 165, 96, 0.2);
  border-radius: 50%;
  border-top: 5px solid var(--accent-color);
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-icon {
  font-size: 3rem;
  color: #ff6b6b;
  margin-bottom: 20px;
}

.retry-btn, .reset-filter-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(244, 165, 96, 0.15);
  border: none;
  color: var(--accent-color);
  padding: 12px 25px;
  border-radius: 30px;
  font-family: "Space Mono", monospace;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.retry-btn:hover, .reset-filter-btn:hover {
  background: rgba(244, 165, 96, 0.3);
  transform: translateY(-3px);
}

.life-header {
  margin-bottom: 30px;
}

.life-stats {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 25px;
}

.stat-item {
  background: rgba(30, 30, 30, 0.6);
  border: 1px solid rgba(244, 165, 96, 0.3);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  flex: 1;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

.category-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.category-filter button {
  padding: 10px 15px;
  background: rgba(30, 30, 30, 0.6);
  border: 1px solid rgba(244, 165, 96, 0.3);
  color: var(--primary-text);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Space Mono", monospace;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.category-filter button i {
  color: var(--accent-color);
  transition: all 0.3s ease;
}

.category-filter button:hover {
  background: rgba(244, 165, 96, 0.2);
  border-color: var(--accent-color);
  transform: translateY(-2px);
}

.category-filter button.active {
  background: var(--accent-color);
  color: var(--primary-bg);
  border-color: var(--accent-color);
  box-shadow: 0 4px 12px rgba(244, 165, 96, 0.3);
}

.category-filter button.active i {
  color: var(--primary-bg);
}

.timeline-container {
  position: relative;
  padding: 20px 0;
}

.timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 4px;
  background: rgba(244, 165, 96, 0.3);
  transform: translateX(-50%);
  z-index: 1;
}

.timeline-event {
  position: relative;
  margin-bottom: 40px;
  width: 50%;
  z-index: 2;
}

.timeline-event.left {
  padding-right: 40px;
  align-self: flex-start;
  left: 0;
}

.timeline-event.right {
  padding-left: 40px;
  align-self: flex-end;
  left: 50%;
}

.timeline-dot {
  position: absolute;
  width: 30px;
  height: 30px;
  background: var(--accent-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  box-shadow: 0 0 10px rgba(244, 165, 96, 0.5);
  transition: all 0.3s ease;
}

.timeline-event.left .timeline-dot {
  right: -15px;
}

.timeline-event.right .timeline-dot {
  left: -15px;
}

.timeline-dot i {
  color: var(--primary-bg);
  font-size: 0.8rem;
}

.timeline-event:hover .timeline-dot {
  transform: scale(1.2);
  box-shadow: 0 0 15px rgba(244, 165, 96, 0.7);
}

.event-card {
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.6), rgba(20, 20, 20, 0.8));
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(244, 165, 96, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  border-color: rgba(244, 165, 96, 0.3);
}

.event-date {
  display: inline-block;
  background: rgba(244, 165, 96, 0.2);
  color: var(--accent-color);
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.event-category {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(30, 30, 30, 0.7);
  color: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  margin-left: 10px;
}

.event-category i {
  color: var(--accent-color);
}

.event-title {
  font-size: 1.3rem;
  margin: 10px 0;
  color: #fff;
  transition: color 0.3s ease;
}

.event-card:hover .event-title {
  color: var(--accent-color);
}

.event-location {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.event-location i {
  color: var(--accent-color);
}

.event-image {
  width: 100%;
  height: 180px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.event-card:hover .event-image img {
  transform: scale(1.05);
}

.event-description {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.7;
  font-size: 0.95rem;
  margin-bottom: 15px;
}

.event-highlights {
  background: rgba(30, 30, 30, 0.5);
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
  border-left: 3px solid var(--accent-color);
}

.event-highlights h4 {
  color: var(--accent-color);
  font-size: 1.1rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.event-highlights ul {
  padding-left: 20px;
  margin: 10px 0;
}

.event-highlights li {
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
  line-height: 1.6;
}

.event-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--accent-color);
  text-decoration: none;
  padding: 8px 15px;
  background: rgba(244, 165, 96, 0.1);
  border-radius: 20px;
  margin-top: 15px;
  transition: all 0.3s ease;
}

.event-link:hover {
  background: rgba(244, 165, 96, 0.2);
  transform: translateX(5px);
}

.expand-indicator {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.85rem;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: all 0.3s ease;
}

.event-card:hover .expand-indicator {
  color: var(--accent-color);
}

.no-events {
  text-align: center;
  padding: 50px 20px;
  background: rgba(30, 30, 30, 0.6);
  border-radius: 12px;
  border: 1px dashed rgba(244, 165, 96, 0.3);
  margin-top: 30px;
}

.no-events-icon {
  font-size: 3rem;
  color: rgba(244, 165, 96, 0.5);
  margin-bottom: 20px;
}

.no-events h3 {
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 10px;
}

.no-events p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 20px;
}

/* Category-specific styling */
.category-education .timeline-dot {
  background: #3498db;
}

.category-career .timeline-dot {
  background: #2ecc71;
}

.category-milestone .timeline-dot {
  background: #e74c3c;
}

.category-travel .timeline-dot {
  background: #9b59b6;
}

.category-personal .timeline-dot {
  background: #e67e22;
}

.category-award .timeline-dot {
  background: #f1c40f;
}

/* Animation for expanded state */
.event-highlights, .event-link {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  margin-top: 0;
  transition: all 0.5s ease;
}

.expanded .event-highlights, .expanded .event-link {
  max-height: 500px;
  opacity: 1;
  margin-top: 20px;
}

/* Responsive design */
@media (max-width: 992px) {
  .timeline-line {
    left: 40px;
  }
  
  .timeline-event {
    width: 100%;
    padding-left: 80px;
    left: 0;
  }
  
  .timeline-event.left, .timeline-event.right {
    padding-right: 0;
    padding-left: 80px;
    left: 0;
  }
  
  .timeline-event.left .timeline-dot, .timeline-event.right .timeline-dot {
    left: 25px;
    right: auto;
  }
}

@media (max-width: 768px) {
  .life-stats {
    flex-direction: column;
    gap: 10px;
  }
  
  .category-filter {
    justify-content: center;
  }
  
  .category-filter button {
    font-size: 0.8rem;
    padding: 8px 12px;
  }
  
  .timeline-line {
    left: 20px;
  }
  
  .timeline-event.left, .timeline-event.right {
    padding-left: 50px;
  }
  
  .timeline-event.left .timeline-dot, .timeline-event.right .timeline-dot {
    left: 5px;
  }
  
  .event-date, .event-category {
    font-size: 0.75rem;
  }
  
  .event-title {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .section-content h1 {
    font-size: 2rem;
  }
  
  .life-container {
    padding: 20px 15px;
  }
  
  .event-date, .event-category {
    display: block;
    margin: 0 0 8px 0;
  }
  
  .timeline-event.left, .timeline-event.right {
    padding-left: 40px;
  }
}
</style> 