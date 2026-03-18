<template>
  <div
    class="poetry-card"
    :class="{ 'poetry-card--grid': grid }"
    @click="navigateToDetails"
    @keydown.enter="navigateToDetails"
    tabindex="0"
    role="button"
    :aria-label="`Read poem: ${poem.title}`"
  >
    <div class="card-header">
      <div class="card-top">
        <h3>{{ poem.title }}</h3>
        <div class="expand-toggle" aria-hidden="true">
          <i class="fas fa-arrow-right"></i>
        </div>
      </div>
      <div class="card-meta">
        <span v-for="lang in poem.language" :key="lang" class="language-badge">
          <i :class="langIcon(lang)" aria-hidden="true"></i> {{ lang }}
        </span>
        <span class="date-badge"><i class="fas fa-calendar-alt" aria-hidden="true"></i> {{ poem.date }}</span>
        <span class="verse-count" v-if="verseCount">
          <i class="fas fa-feather-alt" aria-hidden="true"></i> {{ verseCount }} verses
        </span>
      </div>
      <p v-if="poem.description" class="card-description">{{ poem.description }}</p>
      <div v-if="grid && poem.content" class="card-preview">
        <p v-for="(line, i) in previewLines" :key="i" class="preview-verse" :class="{ rtl: isRTL(line.text) }">
          {{ line.text }}
        </p>
        <span class="preview-fade">...</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PoetryCard',
  props: {
    poem: {
      type: Object,
      required: true
    },
    grid: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    verseCount() {
      if (!this.poem.content) return 0;
      return this.poem.content.filter(l => l.type === 'verse' && l.text).length;
    },
    previewLines() {
      if (!this.poem.content) return [];
      return this.poem.content.filter(l => l.type === 'verse' && l.text).slice(0, 3);
    }
  },
  methods: {
    navigateToDetails() {
      this.$router.push({
        name: 'PoetryDetails',
        params: { id: this.poem.id }
      });
    },
    langIcon(lang) {
      const icons = { 'English': 'fas fa-language', 'Arabic': 'fas fa-moon', 'Darija': 'fas fa-comments' };
      return icons[lang] || 'fas fa-pen-nib';
    },
    isRTL(text) {
      if (!text) return false;
      return /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(text);
    }
  }
}
</script>

<style scoped>
.poetry-card {
  background: var(--card-bg);
  border-radius: var(--card-radius);
  transition: var(--card-transition);
  overflow: hidden;
  border: var(--card-border);
  cursor: pointer;
}

.poetry-card:hover, .poetry-card:focus {
  border-color: var(--card-border-hover);
  box-shadow: var(--card-shadow-hover);
  transform: translateY(var(--card-hover-lift));
  outline: none;
}

.card-header {
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.card-header h3 {
  margin: 0;
  color: var(--primary-text, white);
  font-size: 1.2rem;
  line-height: 1.3;
}

.poetry-card:hover h3 {
  color: var(--accent-color, rgb(244, 165, 96));
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
}

.language-badge, .date-badge, .verse-count {
  font-size: 0.8rem;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(244, 165, 96, 0.1);
  color: var(--accent-color, rgb(244, 165, 96));
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: 1px solid rgba(244, 165, 96, 0.15);
}

.verse-count {
  background: rgba(255, 255, 255, 0.05);
  color: var(--secondary-text, rgba(255,255,255,0.6));
  border-color: rgba(255, 255, 255, 0.1);
}

.card-description {
  margin: 0;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Grid-only preview */
.card-preview {
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.preview-verse {
  margin: 0.3rem 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.85rem;
  font-style: italic;
  line-height: 1.6;
}

.preview-verse.rtl {
  direction: rtl;
  text-align: right;
  font-family: 'Amiri', serif;
}

.preview-fade {
  color: rgba(244, 165, 96, 0.5);
  font-size: 0.85rem;
}

.expand-toggle {
  color: rgba(244, 165, 96, 0.4);
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: 4px;
}

.poetry-card:hover .expand-toggle {
  color: var(--accent-color, rgb(244, 165, 96));
  transform: translateX(5px);
}

/* Grid mode */
.poetry-card--grid {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.poetry-card--grid .card-header {
  flex: 1;
}

@media (max-width: 768px) {
  .card-header h3 { font-size: 1.1rem; }
  .card-header { padding: 1rem; }
  .card-description { -webkit-line-clamp: 1; }
}
</style>
