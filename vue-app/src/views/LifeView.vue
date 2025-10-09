<template>
  <div class="life-view">
    <section class="life-hero">
      <div class="container">
        <h1 class="page-title">Life Timeline</h1>
        <p class="page-subtitle">Important Milestones and Events</p>
      </div>
    </section>

    <section class="timeline-content">
      <div class="container">
        <div class="timeline">
          <div
            v-for="(event, index) in lifeEvents"
            :key="event.id"
            class="timeline-item"
            :class="{ left: index % 2 === 0, right: index % 2 !== 0 }"
          >
            <div class="timeline-content">
              <div class="timeline-date">{{ event.date }}</div>
              <h3>{{ event.title }}</h3>
              <p>{{ event.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMeta } from '@/composables/useMeta'

const { setPageMeta } = useMeta()

const lifeEvents = ref([
  {
    id: 1,
    date: '2024',
    title: 'Google Developer Expert',
    description: 'Recognized as Google Developer Expert in AI/ML',
  },
  {
    id: 2,
    date: '2023',
    title: 'Founded MLNomads LLC',
    description: 'Established company focusing on AI innovation and consulting',
  },
  {
    id: 3,
    date: '2022',
    title: 'Published Research',
    description: 'Published multiple papers in top-tier ML conferences',
  },
  {
    id: 4,
    date: '2021',
    title: 'PhD Journey',
    description: 'Started doctoral research in Machine Learning',
  },
])

onMounted(() => {
  setPageMeta({
    title: 'Life - Taha Bouhsine',
    description: 'Timeline of important life events and milestones',
    keywords: 'Career Timeline, Professional Journey, Milestones',
  })
})
</script>

<style scoped>
.life-view {
  min-height: 100vh;
}

.life-hero {
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

.timeline-content {
  padding: 4rem 2rem;
}

.timeline {
  position: relative;
  padding: 2rem 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  margin-bottom: 3rem;
  width: 50%;
}

.timeline-item.left {
  left: 0;
  padding-right: 3rem;
  text-align: right;
}

.timeline-item.right {
  left: 50%;
  padding-left: 3rem;
  text-align: left;
}

.timeline-item::before {
  content: '';
  position: absolute;
  top: 0;
  width: 20px;
  height: 20px;
  background: #667eea;
  border-radius: 50%;
  border: 3px solid #0a0a0a;
}

.timeline-item.left::before {
  right: -10px;
}

.timeline-item.right::before {
  left: -10px;
}

.timeline-content {
  background: rgba(255, 255, 255, 0.05);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.timeline-content:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(102, 126, 234, 0.3);
  transform: translateY(-5px);
}

.timeline-date {
  color: #667eea;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.timeline-content h3 {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 0.5rem;
}

.timeline-content p {
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

  .timeline::before {
    left: 20px;
  }

  .timeline-item {
    width: 100%;
    left: 0 !important;
    padding-left: 3rem !important;
    padding-right: 0 !important;
    text-align: left !important;
  }

  .timeline-item::before {
    left: 10px !important;
  }
}
</style>
