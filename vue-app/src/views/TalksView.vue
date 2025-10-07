<template>
  <div class="talks-view">
    <section class="talks-hero">
      <div class="container">
        <h1 class="page-title">Talks & Presentations</h1>
        <p class="page-subtitle">Speaking Engagements and Workshops</p>
      </div>
    </section>

    <section class="talks-content">
      <div class="container">
        <div class="talks-grid">
          <article v-for="talk in talks" :key="talk.id" class="talk-card">
            <div class="talk-date">{{ talk.date }}</div>
            <h3>{{ talk.title }}</h3>
            <p class="event">{{ talk.event }}</p>
            <p class="description">{{ talk.description }}</p>
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

const talks = ref([
  {
    id: 1,
    title: 'The Future of Interpretable AI',
    event: 'AI Summit 2024',
    date: 'March 2024',
    description:
      'Exploring the latest advances in interpretable AI models and their applications in real-world scenarios.',
  },
  {
    id: 2,
    title: 'Deep Learning Best Practices',
    event: 'ML Conference 2023',
    date: 'November 2023',
    description:
      'A comprehensive workshop on best practices for building and deploying deep learning models.',
  },
  {
    id: 3,
    title: 'Neural Networks from Scratch',
    event: 'Developer Meetup',
    date: 'September 2023',
    description:
      'Hands-on session building neural networks from scratch to understand core concepts.',
  },
])

onMounted(() => {
  setPageMeta({
    title: 'Talks - Taha Bouhsine',
    description: 'Talks, presentations, and workshops by Taha Bouhsine',
    keywords: 'AI Talks, Machine Learning Presentations, Tech Workshops',
  })
})
</script>

<style scoped>
.talks-view {
  min-height: 100vh;
}

.talks-hero {
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

.talks-content {
  padding: 4rem 2rem;
}

.talks-grid {
  display: grid;
  gap: 2rem;
}

.talk-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.talk-card:hover {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(102, 126, 234, 0.3);
}

.talk-date {
  color: #667eea;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.talk-card h3 {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 0.5rem;
}

.event {
  color: #999;
  margin-bottom: 1rem;
  font-weight: 500;
}

.description {
  color: #ccc;
  line-height: 1.6;
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
