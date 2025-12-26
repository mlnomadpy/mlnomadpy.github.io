<template>
  <div class="talk-details-view view-container">
    <div class="section-content scrollable-content smooth-scroll">
      <div v-if="loading" class="loading-container">
        <div class="loader"></div>
        <p>Loading talk details...</p>
      </div>
      
      <div v-else-if="error" class="error-container">
        <i class="fas fa-exclamation-circle"></i>
        <h3>{{ error }}</h3>
        <button @click="loadTalk" class="retry-btn">Retry</button>
        <router-link to="/talks" class="back-link">Back to Talks</router-link>
      </div>
      
      <div v-else-if="talk" class="talk-details-content">
        <!-- Back Button -->
        <router-link to="/talks" class="back-btn">
          <i class="fas fa-arrow-left"></i> Back to Talks
        </router-link>
        
        <!-- Hero Section with Video/Image -->
        <div class="talk-hero">
          <div class="media-container">
            <iframe 
              v-if="talk.link && talk.link.includes('youtube')" 
              :src="talk.link" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
              class="hero-video"
            ></iframe>
            <img 
              v-else 
              :src="talk.thumbnail" 
              :alt="talk.title" 
              class="hero-image"
            />
          </div>
        </div>
        
        <!-- Title and Meta -->
        <div class="talk-header">
          <h1>{{ talk.title }}</h1>
          <div class="meta-info">
            <span class="organization">
              <i class="fas fa-building"></i> {{ talk.organization }}
            </span>
            <span class="type" v-if="talk.type">
              <i class="fas fa-tag"></i> {{ talk.type }}
            </span>
          </div>
        </div>

        <!-- Content Section -->
        <div class="content-container">
          <div class="description-card glass-card" v-if="hasDescription">
            <h2>About this Talk</h2>
            <div class="description-text" v-html="talk.description"></div>
          </div>
          
          <div class="resources-card glass-card" v-if="hasResources">
            <h2>Resources</h2>
            <div class="links-grid">
              <a v-if="talk.slides" :href="talk.slides" target="_blank" class="resource-link slides">
                <i class="fas fa-file-powerpoint"></i>
                <span>Slides</span>
              </a>
              <a v-if="talk.kaggle_notebook" :href="talk.kaggle_notebook" target="_blank" class="resource-link kaggle">
                <i class="fab fa-kaggle"></i>
                <span>Kaggle Notebook</span>
              </a>
              <a v-if="talk.github_gist" :href="extractGistUrl(talk.github_gist)" target="_blank" class="resource-link github">
                <i class="fab fa-github"></i>
                <span>Gist / Code</span>
              </a>
              <a v-if="talk.link && !talk.link.includes('youtube')" :href="talk.link" target="_blank" class="resource-link external">
                <i class="fas fa-external-link-alt"></i>
                <span>Watch Video</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useHead } from '@vueuse/head';
import { useRoute } from 'vue-router';

const props = defineProps(['id']);
const route = useRoute();

const talk = ref(null);
const loading = ref(true);
const error = ref(null);

// Computeds
const hasResources = computed(() => {
  const t = talk.value;
  return t && (t.slides || t.kaggle_notebook || t.github_gist || (t.link && !t.link.includes('youtube')));
});

const hasDescription = computed(() => {
  const t = talk.value;
  if (!t || !t.description) return false;
  const desc = t.description.trim();
  return desc !== '' && desc !== '.' && desc !== 'TBD' && desc !== '<p>.</p>';
});

// SEO
const pageTitle = computed(() => talk.value ? talk.value.title : 'Talk Details');
const pageDescription = computed(() => talk.value ? `Talk at ${talk.value.organization}: ${talk.value.title}` : 'Presentation details');
const pageImage = computed(() => talk.value ? talk.value.thumbnail : null);

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: pageImage },
  ]
});

// Watch
watch(() => props.id, (newId) => {
  if (newId) loadTalk();
}, { immediate: true });

async function loadTalk() {
  loading.value = true;
  error.value = null;
  console.log('Loading talk with ID:', props.id);
  try {
    // Import data dynamically
    const talksData = await import('@/data/talks.json');
    const talks = talksData.default || talksData;
    
    // Match by title slug
    const slug = props.id;
    const foundTalk = talks.find(t => {
      const tSlug = t.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      return tSlug === slug;
    });

    console.log('Found talk:', foundTalk);

    if (foundTalk) {
      talk.value = foundTalk;
    } else {
      error.value = 'Talk not found';
      console.warn('Talk not found for slug:', slug);
    }
  } catch (err) {
    console.error('Error loading talk:', err);
    error.value = 'Failed to load talk details';
  } finally {
    loading.value = false;
  }
}

function extractGistUrl(gistHtml) {
  // Extract URL from gist embed script tag
  if (!gistHtml) return '#';
  const match = gistHtml.match(/src=['"]([^'"]+)['"]/);
  if (match) {
    return match[1].replace('.js', '');
  }
  return '#';
}
</script>

<script>
export default {
  name: 'TalkDetailsView'
}
</script>

<style scoped>
/* Use global CSS variables for consistency */
.talk-details-view {
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
.talk-details-content {
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

/* Hero Section with Video/Image */
.talk-hero {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: var(--spacing-xl, 2rem);
  box-shadow: 0 15px 50px rgba(0,0,0,0.4);
  background: linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.media-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.hero-video, .hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.talk-hero:hover .hero-image {
  transform: scale(1.02);
}

/* Title and Meta */
.talk-header {
  margin-bottom: var(--spacing-xl, 2rem);
  padding-bottom: var(--spacing-lg, 1.5rem);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.talk-header h1 {
  font-size: var(--font-size-h1, 2.5rem);
  margin-bottom: var(--spacing-md, 1rem);
  color: var(--primary-text, white);
  font-family: 'Orbitron', sans-serif;
  line-height: 1.3;
  background: linear-gradient(135deg, #fff 0%, var(--accent-color, rgb(244, 165, 96)) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.meta-info {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-lg, 1.5rem);
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
}

.meta-info span {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.meta-info span i {
  color: var(--accent-color, rgb(244, 165, 96));
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
  line-height: 1.9;
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.9);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.description-text :deep(p) {
  margin-bottom: var(--spacing-md, 1rem);
}

.description-text :deep(a) {
  color: var(--accent-color, rgb(244, 165, 96));
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s ease;
}

.description-text :deep(a:hover) {
  border-bottom-color: var(--accent-color, rgb(244, 165, 96));
}

/* Resource Links Grid */
.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
  font-size: 0.9rem;
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
.resource-link.slides:hover {
  border-color: #e74c3c;
  box-shadow: 0 10px 30px rgba(231, 76, 60, 0.2);
}

.resource-link.kaggle:hover {
  border-color: #20beff;
  box-shadow: 0 10px 30px rgba(32, 190, 255, 0.2);
}

.resource-link.github:hover {
  border-color: #6e5494;
  box-shadow: 0 10px 30px rgba(110, 84, 148, 0.2);
}

/* Responsive Design */
@media (max-width: 992px) {
  .talk-header h1 {
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
  
  .talk-header h1 {
    font-size: var(--font-size-h3, 1.6rem);
    -webkit-text-fill-color: var(--primary-text, white);
    background: none;
  }
  
  .talk-hero {
    border-radius: 12px;
    margin-bottom: var(--spacing-lg, 1.5rem);
  }
  
  .glass-card {
    padding: var(--spacing-md, 1rem);
    border-radius: 12px;
  }
  
  .meta-info {
    gap: var(--spacing-sm, 0.5rem);
  }
  
  .meta-info span {
    font-size: 0.9rem;
    padding: 6px 12px;
  }
  
  .links-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .resource-link {
    padding: 12px 16px;
    font-size: 0.85rem;
  }
  
  .back-btn {
    padding: 10px 16px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .talk-header h1 {
    font-size: 1.4rem;
  }
  
  .links-grid {
    grid-template-columns: 1fr;
  }
  
  .meta-info {
    flex-direction: column;
    gap: var(--spacing-sm, 0.5rem);
  }
  
  .meta-info span {
    width: 100%;
    justify-content: center;
  }
}
</style>
