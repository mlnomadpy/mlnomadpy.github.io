<template>
  <div class="home-view">
    <section class="hero-section" ref="target">
      <div class="hero-content" :class="{ visible: hasIntersected }">
        <h1 class="hero-title">Taha Bouhsine</h1>
        <p class="hero-subtitle">ML Researcher & Google Developer Expert</p>
        <p class="hero-description">
          Machine Learning Researcher & Engineer, focusing on representation learning and
          interpretable AI models
        </p>
        <div class="hero-actions">
          <router-link to="/about" class="btn btn-primary">Learn More</router-link>
          <router-link to="/research" class="btn btn-secondary">View Research</router-link>
        </div>
      </div>
    </section>

    <section class="highlights-section">
      <div class="container">
        <h2 class="section-title">Highlights</h2>
        <div class="highlights-grid">
          <div v-for="highlight in highlights" :key="highlight.title" class="highlight-card">
            <div class="highlight-icon">{{ highlight.icon }}</div>
            <h3>{{ highlight.title }}</h3>
            <p>{{ highlight.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '@/composables/useIntersectionObserver'

const { target, hasIntersected } = useIntersectionObserver()

const highlights = ref([
  {
    icon: '🔬',
    title: 'Research',
    description: 'Published papers on neural networks and machine learning',
  },
  {
    icon: '🎤',
    title: 'Speaking',
    description: 'International talks and workshops on AI/ML',
  },
  {
    icon: '💼',
    title: 'Leadership',
    description: 'CEO of MLNomads LLC, driving AI innovation',
  },
  {
    icon: '🏆',
    title: 'Recognition',
    description: 'Google Developer Expert in AI/ML',
  },
])
</script>

<style scoped>
.home-view {
  min-height: 100vh;
}

.hero-section {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
}

.hero-content {
  text-align: center;
  max-width: 800px;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
}

.hero-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #999;
  margin-bottom: 1rem;
}

.hero-description {
  font-size: 1.1rem;
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.875rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: transparent;
  border: 2px solid #667eea;
  color: #667eea;
}

.btn-secondary:hover {
  background: rgba(102, 126, 234, 0.1);
}

.highlights-section {
  padding: 4rem 2rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.highlights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.highlight-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.highlight-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(102, 126, 234, 0.3);
}

.highlight-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.highlight-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #fff;
}

.highlight-card p {
  color: #999;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-description {
    font-size: 1rem;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>
