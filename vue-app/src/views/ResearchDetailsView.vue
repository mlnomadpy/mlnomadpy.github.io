<template>
  <div class="research-details-view view-container">
    <div class="section-content scrollable-content smooth-scroll">
      <div v-if="loading" class="loading-container">
        <div class="loader"></div>
        <p>Loading research details...</p>
      </div>
      
      <div v-else-if="error" class="error-container">
        <i class="fas fa-exclamation-circle"></i>
        <h3>{{ error }}</h3>
        <button @click="loadResearch" class="retry-btn">Retry</button>
        <router-link to="/research" class="back-link">Back to Research</router-link>
      </div>
      
      <div v-else-if="item" class="research-details-content">
        <!-- Back Button -->
        <router-link to="/research" class="back-btn">
          <i class="fas fa-arrow-left"></i> Back to Research
        </router-link>
        
        <!-- Hero Section (Gradient since no images) -->
        <div class="research-hero">
          <div class="hero-content">
            <div class="category-badge">
              <i :class="getCategoryIcon(item.category)"></i>
              {{ item.category }}
            </div>
            <h1>{{ item.title }}</h1>
            <div class="hero-meta">
              <span class="author"><i class="fas fa-user"></i> {{ item.author }}</span>
              <span class="year"><i class="fas fa-calendar-alt"></i> {{ item.year }}</span>
              <span class="status"><i class="fas fa-info-circle"></i> {{ item.status }}</span>
            </div>
          </div>
        </div>

        <!-- Content Section -->
        <div class="content-container">
          <div class="description-card glass-card">
            <h2>Abstract & Details</h2>
            <div class="description-text">
              <p class="summary-highlight">{{ item.summary }}</p>
              <div class="details-body" v-html="formatDetails(item.details)"></div>
            </div>
          </div>
          
          <div class="tags-card glass-card" v-if="item.tags && item.tags.length">
            <h2>Keywords</h2>
            <div class="tags-list">
              <span v-for="(tag, index) in item.tags" :key="index" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div class="resources-card glass-card" v-if="item.links && item.links.length">
            <h2>Resources</h2>
            <div class="links-grid">
              <a 
                v-for="(link, index) in item.links" 
                :key="index"
                :href="link.url" 
                target="_blank" 
                class="resource-link"
                :class="getLinkClass(link.text)"
              >
                <i :class="getLinkIcon(link.text)"></i>
                <span>{{ link.text }}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResearchDetailsView',
  props: ['id'],
  data() {
    return {
      item: null,
      loading: true,
      error: null
    }
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        this.loadResearch();
      }
    }
  },
  methods: {
    async loadResearch() {
      this.loading = true;
      this.error = null;
      try {
        const researchData = await import('@/data/research.json');
        const research = researchData.default || researchData;
        
        const foundItem = research.find(r => r.id === this.id);

        if (foundItem) {
          this.item = foundItem;
        } else {
          this.error = 'Research item not found';
        }
      } catch (err) {
        console.error('Error loading research:', err);
        this.error = 'Failed to load research details';
      } finally {
        this.loading = false;
      }
    },
    formatDetails(text) {
      if (!text) return '';
      // Simple formatting: convert newlines to <br> if needed, or wrap in paragraphs
      return text.replace(/\n/g, '<br>');
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
        'Neural Networks': 'fas fa-project-diagram',
        'Signal Processing': 'fas fa-wave-square'
      };
      return icons[category] || 'fas fa-microscope';
    },
    getLinkIcon(text) {
      const lower = text.toLowerCase();
      if (lower.includes('github') || lower.includes('repo') || lower.includes('code')) return 'fab fa-github';
      if (lower.includes('arxiv') || lower.includes('paper') || lower.includes('preprint')) return 'fas fa-file-alt';
      if (lower.includes('demo') || lower.includes('interactive')) return 'fas fa-play-circle';
      if (lower.includes('video') || lower.includes('youtube')) return 'fab fa-youtube';
      if (lower.includes('slide') || lower.includes('presentation')) return 'fas fa-file-powerpoint';
      return 'fas fa-external-link-alt';
    },
    getLinkClass(text) {
      const lower = text.toLowerCase();
      if (lower.includes('github') || lower.includes('repo')) return 'github';
      if (lower.includes('arxiv') || lower.includes('paper')) return 'paper';
      if (lower.includes('demo')) return 'demo';
      return 'external';
    }
  }
}
</script>

<style scoped>
/* Use global CSS variables for consistency */
.research-details-view {
  background-color: var(--primary-bg, #412c0f);
  min-height: 100%;
}

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
  padding: var(--spacing-lg, 1.5rem);
  background-color: var(--primary-bg, #412c0f);
}

/* Loading & Error States */
.loading-container, .error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60vh;
  color: var(--primary-text, white);
  gap: var(--spacing-md, 1rem);
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.error-container i {
  font-size: 3rem;
  color: var(--accent-color, rgb(244, 165, 96));
  opacity: 0.8;
}

.loader {
  width: 50px;
  height: 50px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--accent-color, rgb(244, 165, 96));
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.retry-btn {
  margin-top: var(--spacing-md, 1rem);
  padding: 12px 24px;
  background: var(--accent-color, rgb(244, 165, 96));
  color: var(--primary-bg, #412c0f);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  font-family: 'Orbitron', sans-serif;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.retry-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(244, 165, 96, 0.4);
}

.back-link {
  display: block;
  margin-top: var(--spacing-md, 1rem);
  color: var(--accent-color, rgb(244, 165, 96));
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.back-link:hover {
  opacity: 0.8;
}

/* Main Content */
.research-details-content {
  max-width: 1000px;
  margin: 0 auto;
  padding-bottom: 60px;
  animation: fadeIn 0.6s ease-out;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--accent-color, rgb(244, 165, 96));
  text-decoration: none;
  font-weight: 600;
  margin-bottom: var(--spacing-lg, 1.5rem);
  padding: 12px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  backdrop-filter: blur(5px);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-family: 'Orbitron', sans-serif;
}

.back-btn:hover {
  transform: translateX(-8px);
  background: var(--accent-color, rgb(244, 165, 96));
  color: var(--primary-bg, #412c0f);
  box-shadow: 0 5px 20px rgba(244, 165, 96, 0.3);
}

/* Hero Section */
.research-hero {
  position: relative;
  width: 100%;
  padding: 3rem 2rem;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: var(--spacing-xl, 2rem);
  box-shadow: 0 15px 50px rgba(0,0,0,0.3);
  background: linear-gradient(135deg, rgba(30,30,30,0.8) 0%, rgba(20,20,20,0.9) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.research-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at top right, rgba(244, 165, 96, 0.15), transparent 60%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.category-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  background: rgba(244, 165, 96, 0.15);
  color: var(--accent-color);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(244, 165, 96, 0.3);
}

.research-hero h1 {
  font-size: var(--font-size-h1, 2.5rem);
  margin-bottom: 1.5rem;
  color: var(--primary-text, white);
  font-family: 'Orbitron', sans-serif;
  line-height: 1.3;
  text-shadow: 0 4px 10px rgba(0,0,0,0.5);
}

.hero-meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.hero-meta span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.hero-meta i {
  color: var(--accent-color);
}

/* Glass Cards */
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: var(--spacing-xl, 2rem);
  margin-bottom: var(--spacing-xl, 2rem);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.glass-card:hover {
  border-color: rgba(244, 165, 96, 0.2);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
}

.glass-card h2 {
  color: var(--accent-color, rgb(244, 165, 96));
  margin-bottom: var(--spacing-lg, 1.5rem);
  font-family: 'Orbitron', sans-serif;
  font-size: var(--font-size-h3, 1.5rem);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: var(--spacing-md, 1rem);
  display: flex;
  align-items: center;
  gap: 12px;
}

.glass-card h2::before {
  content: '';
  width: 4px;
  height: 24px;
  background: var(--accent-color, rgb(244, 165, 96));
  border-radius: 2px;
}

.description-text {
  line-height: 1.8;
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.9);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.summary-highlight {
  font-size: 1.2rem;
  font-weight: 500;
  color: white;
  margin-bottom: 1.5rem;
  padding-left: 1rem;
  border-left: 3px solid var(--accent-color);
  font-style: italic;
}

.details-body {
  margin-top: 1rem;
}

/* Tags */
.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.9);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.tag:hover {
  background: rgba(244, 165, 96, 0.15);
  border-color: var(--accent-color);
  color: var(--accent-color);
  transform: translateY(-2px);
}

/* Resource Links Grid */
.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-md, 1rem);
}

.resource-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--primary-text, white);
  text-decoration: none;
  font-weight: 600;
  font-family: 'Orbitron', sans-serif;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
}

.resource-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, var(--accent-color, rgb(244, 165, 96)) 0%, #e67e22 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 0;
}

.resource-link i, .resource-link span {
  position: relative;
  z-index: 1;
}

.resource-link i {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.resource-link:hover {
  transform: translateY(-4px);
  border-color: var(--accent-color, rgb(244, 165, 96));
  box-shadow: 0 10px 30px rgba(244, 165, 96, 0.2);
}

.resource-link:hover::before {
  opacity: 1;
}

.resource-link:hover {
  color: var(--primary-bg, #412c0f);
}

.resource-link:hover i {
  transform: scale(1.1);
}

/* Specific resource link colors on hover */
.resource-link.paper:hover {
  border-color: #e74c3c;
  box-shadow: 0 10px 30px rgba(231, 76, 60, 0.2);
}

.resource-link.github:hover {
  border-color: #6e5494;
  box-shadow: 0 10px 30px rgba(110, 84, 148, 0.2);
}

.resource-link.demo:hover {
  border-color: #2ecc71;
  box-shadow: 0 10px 30px rgba(46, 204, 113, 0.2);
}

/* Responsive Design */
@media (max-width: 992px) {
  .research-hero h1 {
    font-size: var(--font-size-h2, 2rem);
  }
  
  .glass-card {
    padding: var(--spacing-lg, 1.5rem);
  }
}

@media (max-width: 768px) {
  .scrollable-content {
    padding: var(--spacing-md, 1rem);
  }
  
  .research-hero {
    padding: 2rem 1.5rem;
    border-radius: 12px;
  }
  
  .research-hero h1 {
    font-size: var(--font-size-h3, 1.6rem);
  }
  
  .glass-card {
    padding: var(--spacing-md, 1rem);
    border-radius: 12px;
  }
  
  .hero-meta {
    flex-direction: column;
    gap: 0.8rem;
  }
  
  .links-grid {
    grid-template-columns: 1fr;
  }
  
  .back-btn {
    padding: 10px 16px;
    font-size: 0.9rem;
  }
}
</style>
