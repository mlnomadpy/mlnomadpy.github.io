<template>
  <div class="research-view">
    <section class="research-hero">
      <div class="container">
        <h1 class="page-title">Research</h1>
        <p class="page-subtitle">Publications and Academic Contributions</p>
      </div>
    </section>

    <section class="research-content">
      <div class="container">
        <div class="research-grid">
          <article
            v-for="paper in researchPapers"
            :key="paper.id"
            class="research-card"
          >
            <h3>{{ paper.title }}</h3>
            <p class="authors">{{ paper.authors }}</p>
            <p class="venue">{{ paper.venue }}</p>
            <p class="description">{{ paper.description }}</p>
            <div class="card-actions">
              <a v-if="paper.link" :href="paper.link" target="_blank" rel="noopener noreferrer" class="btn-link">
                Read Paper
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMeta } from '@/composables/useMeta'

const { setPageMeta } = useMeta()

const researchPapers = ref([
  {
    id: 1,
    title: 'Advanced Neural Network Architectures for Representation Learning',
    authors: 'Taha Bouhsine, et al.',
    venue: 'Journal of Machine Learning Research, 2024',
    description:
      'Novel approaches to representation learning in deep neural networks with improved interpretability.',
    link: '#',
  },
  {
    id: 2,
    title: 'Interpretable AI Models for Real-World Applications',
    authors: 'Taha Bouhsine, et al.',
    venue: 'NeurIPS 2023',
    description:
      'A framework for building interpretable AI models that maintain high performance while providing transparency.',
    link: '#',
  },
])

onMounted(() => {
  setPageMeta({
    title: 'Research - Taha Bouhsine',
    description: 'Research papers and academic contributions by Taha Bouhsine',
    keywords: 'Machine Learning Research, AI Papers, Neural Networks, Deep Learning',
  })
})
</script>

<style scoped>
.research-view {
  min-height: 100vh;
}

.research-hero {
  padding: 4rem 2rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 3rem;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 1.3rem;
  color: #999;
}

.research-content {
  padding: 4rem 2rem;
}

.research-grid {
  display: grid;
  gap: 2rem;
}

.research-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.research-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(102, 126, 234, 0.3);
}

.research-card h3 {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1rem;
}

.authors {
  color: #999;
  font-style: italic;
  margin-bottom: 0.5rem;
}

.venue {
  color: #667eea;
  font-weight: 600;
  margin-bottom: 1rem;
}

.description {
  color: #ccc;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.card-actions {
  display: flex;
  gap: 1rem;
}

.btn-link {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.btn-link:hover {
  color: #764ba2;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2.5rem;
  }

  .page-subtitle {
    font-size: 1.1rem;
  }
}
</style>
