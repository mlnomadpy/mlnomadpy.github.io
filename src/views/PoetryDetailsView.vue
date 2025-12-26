<template>
  <div class="poetry-details-view view-container">
    <div class="section-content scrollable-content smooth-scroll">
      <div v-if="loading" class="loading-container">
        <div class="loader"></div>
        <p>Loading poem...</p>
      </div>
      
      <div v-else-if="error" class="error-container">
        <i class="fas fa-exclamation-circle"></i>
        <h3>{{ error }}</h3>
        <button @click="loadPoem" class="retry-btn">Retry</button>
        <router-link to="/poetry" class="back-link">Back to Poetry</router-link>
      </div>
      
      <div v-else-if="poem" class="poetry-details-content">
        <!-- Back Button -->
        <router-link to="/poetry" class="back-btn">
          <i class="fas fa-arrow-left"></i> Back to Poetry
        </router-link>
        
        <!-- Hero Section -->
        <div class="poetry-hero">
          <div class="hero-content">
            <div class="meta-badges">
              <span v-for="lang in poem.language" :key="lang" class="lang-badge">
                {{ lang }}
              </span>
            </div>
            <h1>{{ poem.title }}</h1>
            <div class="hero-meta">
              <span class="date"><i class="fas fa-calendar-alt"></i> {{ poem.date }}</span>
            </div>
          </div>
        </div>

        <!-- Content Section -->
        <div class="content-container">
          <div class="poem-card glass-card">
            <div class="description-text" v-if="poem.description">
              <p>{{ poem.description }}</p>
            </div>
            
            <div class="poem-body">
              <template v-for="(line, index) in poem.content" :key="index">
                <div v-if="line.type === 'divider'" class="content-divider">
                  <span>✦</span>
                </div>
                <p v-else class="verse" :class="{ 'rtl': isRTL(line.text) }">
                  {{ line.text }}
                </p>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PoetryDetailsView',
  props: ['id'],
  data() {
    return {
      poem: null,
      loading: true,
      error: null
    }
  },
  watch: {
    id: {
      immediate: true,
      handler() {
        this.loadPoem();
      }
    }
  },
  methods: {
    async loadPoem() {
      this.loading = true;
      this.error = null;
      try {
        const poetryData = await import('@/data/poetry.json');
        const poems = poetryData.default || poetryData;
        
        const foundPoem = poems.find(p => p.id === this.id);

        if (foundPoem) {
          this.poem = foundPoem;
        } else {
          this.error = 'Poem not found';
        }
      } catch (err) {
        console.error('Error loading poem:', err);
        this.error = 'Failed to load poem details';
      } finally {
        this.loading = false;
      }
    },
    isRTL(text) {
      if (!text) return false;
      const rtlRegex = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
      return rtlRegex.test(text);
    }
  }
}
</script>

<style scoped>
/* Use global CSS variables for consistency */
.poetry-details-view {
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
.poetry-details-content {
  max-width: 800px;
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
.poetry-hero {
  position: relative;
  width: 100%;
  padding: 4rem 2rem;
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

.poetry-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(244, 165, 96, 0.1), transparent 70%);
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}

.meta-badges {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 1.5rem;
}

.lang-badge {
  display: inline-block;
  padding: 6px 16px;
  background: rgba(244, 165, 96, 0.15);
  color: var(--accent-color);
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(244, 165, 96, 0.3);
}

.poetry-hero h1 {
  font-size: var(--font-size-h1, 2.5rem);
  margin-bottom: 1.5rem;
  color: var(--primary-text, white);
  font-family: 'Orbitron', sans-serif;
  line-height: 1.3;
  text-shadow: 0 4px 10px rgba(0,0,0,0.5);
}

.hero-meta {
  display: flex;
  justify-content: center;
  font-size: 1.1rem;
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

/* Glass Card */
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem;
  margin-bottom: var(--spacing-xl, 2rem);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.description-text {
  text-align: center;
  margin-bottom: 3rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.poem-body {
  font-family: 'Space Mono', monospace, 'Amiri', serif;
  font-size: 1.1rem;
  line-height: 2;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
}

.verse {
  margin: 0.8rem 0;
  transition: color 0.3s ease;
}

.verse:hover {
  color: var(--accent-color);
}

.verse.rtl {
  direction: rtl;
  font-family: 'Amiri', 'Scheherazade New', serif;
  font-size: 1.3rem;
}

.content-divider {
  margin: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent-color);
  opacity: 0.5;
  font-size: 1.2rem;
}

.content-divider::before,
.content-divider::after {
  content: '';
  height: 1px;
  width: 50px;
  background: var(--accent-color);
  margin: 0 15px;
  opacity: 0.5;
}

/* Responsive Design */
@media (max-width: 992px) {
  .poetry-hero h1 {
    font-size: var(--font-size-h2, 2rem);
  }
  
  .glass-card {
    padding: 2rem;
  }
}

@media (max-width: 768px) {
  .scrollable-content {
    padding: var(--spacing-md, 1rem);
  }
  
  .poetry-hero {
    padding: 2rem 1.5rem;
    border-radius: 12px;
  }
  
  .poetry-hero h1 {
    font-size: var(--font-size-h3, 1.6rem);
  }
  
  .glass-card {
    padding: 1.5rem;
    border-radius: 12px;
  }
  
  .poem-body {
    font-size: 1rem;
  }
  
  .verse.rtl {
    font-size: 1.1rem;
  }
  
  .back-btn {
    padding: 10px 16px;
    font-size: 0.9rem;
  }
}
</style>
