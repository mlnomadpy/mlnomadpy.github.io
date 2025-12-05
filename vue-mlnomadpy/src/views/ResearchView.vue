<template>
  <div class="research">
    <div class="section-content">
      <h1>research</h1>
      
      <div class="research-wrapper">
        <div class="research-categories">
          <div class="filter-section">
            <h2>Filter by Category</h2>
            <div class="filter-buttons">
              <button 
                v-for="category in categories" 
                :key="category" 
                :class="{ active: selectedCategory === category }"
                @click="filterByCategory(category)"
              >
                {{ category }}
              </button>
              <button 
                :class="{ active: selectedCategory === 'All' }"
                @click="filterByCategory('All')"
              >
                All
              </button>
            </div>
          </div>
        </div>
        
        <div class="research-grid">
          <div 
            v-for="item in filteredResearch" 
            :key="item.id"
            class="research-card"
            @click="toggleExpanded(item.id)"
            :class="{ 'expanded': expandedItems.includes(item.id) }"
          >
            <div class="research-icon">
              <i :class="item.icon"></i>
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.summary }}</p>
            
            <div v-if="expandedItems.includes(item.id)" class="additional-info">
              <p v-if="item.details">{{ item.details }}</p>
              <div v-if="item.links && item.links.length" class="research-links">
                <h4>Related Links:</h4>
                <ul>
                  <li v-for="(link, index) in item.links" :key="index">
                    <a :href="link.url" target="_blank">{{ link.text }}</a>
                  </li>
                </ul>
              </div>
              <button class="close-btn" @click.stop="toggleExpanded(item.id)">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResearchView',
  data() {
    return {
      research: [],
      categories: [],
      selectedCategory: 'All',
      expandedItems: []
    }
  },
  computed: {
    filteredResearch() {
      if (this.selectedCategory === 'All') {
        return this.research;
      }
      return this.research.filter(item => item.category === this.selectedCategory);
    }
  },
  methods: {
    filterByCategory(category) {
      this.selectedCategory = category;
    },
    toggleExpanded(id) {
      const index = this.expandedItems.indexOf(id);
      if (index === -1) {
        this.expandedItems.push(id);
      } else {
        this.expandedItems.splice(index, 1);
      }
    },
    async loadResearchData() {
      try {
        // In a real app, you'd import the JSON directly or use fetch
        const researchData = require('@/data/research.json');
        this.research = researchData.map(item => ({
          ...item,
          icon: this.getCategoryIcon(item.category)
        }));
        
        // Extract unique categories
        const categoriesSet = new Set(this.research.map(item => item.category));
        this.categories = Array.from(categoriesSet);
      } catch (error) {
        console.error('Error loading research data:', error);
      }
    },
    getCategoryIcon(category) {
      const icons = {
        'Machine Learning': 'fas fa-brain',
        'Deep Learning': 'fas fa-network-wired',
        'Computer Vision': 'fas fa-eye',
        'Natural Language Processing': 'fas fa-language',
        'Reinforcement Learning': 'fas fa-robot',
        'Data Science': 'fas fa-chart-line',
        'Explainable AI': 'fas fa-lightbulb',
        'Neural Networks': 'fas fa-project-diagram'
      };
      
      return icons[category] || 'fas fa-microscope';
    }
  },
  mounted() {
    this.loadResearchData();
  }
}
</script>

<style scoped>
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
}

.research-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  font-family: "Space Mono", monospace;
  background: linear-gradient(to bottom, rgba(65, 44, 15, 0.6), rgba(65, 44, 15, 0.9));
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.filter-section {
  margin-bottom: 30px;
  text-align: center;
}

.filter-section h2 {
  margin-bottom: 15px;
  font-size: 1.5rem;
  color: var(--accent-color);
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}

.filter-buttons button {
  padding: 8px 15px;
  background: rgba(65, 44, 15, 0.8);
  border: 1px solid rgba(244, 165, 96, 0.3);
  color: var(--primary-text);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Space Mono", monospace;
  font-size: 0.9rem;
}

.filter-buttons button:hover {
  background: rgba(244, 165, 96, 0.2);
  border-color: var(--accent-color);
}

.filter-buttons button.active {
  background: var(--accent-color);
  color: var(--primary-bg);
  border-color: var(--accent-color);
}

.research-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.research-card {
  padding: 25px;
  border-radius: 8px;
  background: linear-gradient(to bottom, rgba(65, 44, 15, 0.4), rgba(65, 44, 15, 0.7));
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(244, 165, 96, 0.1);
  height: 100%;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.research-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 90% 10%, rgba(244, 165, 96, 0.15), transparent 60%);
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 0;
}

.research-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  border-color: rgba(244, 165, 96, 0.3);
}

.research-card:hover::before {
  opacity: 1;
}

.research-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: rgba(244, 165, 96, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px dashed rgba(244, 165, 96, 0.3);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.research-icon i {
  font-size: 1.5rem;
  color: var(--accent-color);
  transition: all 0.3s ease;
}

.research-card:hover .research-icon {
  transform: scale(1.1) rotate(5deg);
  background: rgba(244, 165, 96, 0.2);
  border-style: solid;
}

.research-card:hover .research-icon i {
  transform: scale(1.1);
  color: var(--accent-color);
}

.research-card h3 {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--primary-text);
  margin: 0 0 15px;
  position: relative;
  z-index: 1;
  transition: all 0.3s ease;
}

.research-card:hover h3 {
  color: var(--accent-color);
}

.research-card p {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  position: relative;
  z-index: 1;
  flex-grow: 1;
  line-height: 1.7;
}

.research-card:hover p {
  color: var(--primary-text);
}

.research-card.expanded {
  min-height: 320px;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(65, 44, 15, 0.7), rgba(65, 44, 15, 0.9));
}

.additional-info {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px dashed rgba(244, 165, 96, 0.3);
  font-style: italic;
  color: rgba(255, 255, 255, 0.9);
}

.research-links h4 {
  margin: 10px 0 5px;
  font-size: 1rem;
  color: var(--accent-color);
}

.research-links ul {
  list-style-type: none;
  padding-left: 5px;
  margin: 5px 0;
}

.research-links a {
  color: var(--accent-color);
  text-decoration: none;
  transition: all 0.3s ease;
}

.research-links a:hover {
  text-decoration: underline;
}

.close-btn {
  margin-top: 15px;
  align-self: center;
  background: rgba(244, 165, 96, 0.2);
  border: 1px solid rgba(244, 165, 96, 0.3);
  color: var(--accent-color);
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Space Mono", monospace;
}

.close-btn:hover {
  background: var(--accent-color);
  color: var(--primary-bg);
}

@media (max-width: 768px) {
  .research-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-buttons {
    flex-direction: row;
  }
  
  .filter-buttons button {
    font-size: 0.8rem;
    padding: 6px 12px;
  }
}

@media (max-width: 480px) {
  .section-content h1 {
    font-size: 2rem;
  }
  
  .research-card h3 {
    font-size: 1.2rem;
  }
  
  .research-card p {
    font-size: 0.9rem;
  }
}
</style> 