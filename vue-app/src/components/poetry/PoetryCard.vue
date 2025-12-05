<template>
  <div class="poetry-card" :class="{ 'expanded': expanded }">
    <div class="card-header" @click="toggleExpand">
      <h3>{{ poem.title }}</h3>
      <div class="card-meta">
        <span v-for="lang in poem.language" :key="lang" class="language-badge">{{ lang }}</span>
        <span class="date-badge">{{ poem.date }}</span>
      </div>
      <div class="expand-toggle">
        <i class="fas fa-chevron-down" :class="{ 'rotate': expanded }"></i>
      </div>
    </div>
    
    <transition name="fade">
      <div v-if="expanded" class="card-content">
        <p class="description">{{ poem.description }}</p>
        
        <div class="poem-content">
          <template v-for="(line, index) in poem.content" :key="index">
            <hr v-if="line.type === 'divider'" class="content-divider">
            <p v-else class="verse" :class="{ 'rtl': isRTL(line.text) }">{{ line.text }}</p>
          </template>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'PoetryCard',
  props: {
    poem: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      expanded: false
    }
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
      
      if (this.expanded) {
        this.$nextTick(() => {
          this.$el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    },
    isRTL(text) {
      const rtlRegex = /[\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/;
      return rtlRegex.test(text);
    }
  }
}
</script>

<style scoped>
.poetry-card {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  overflow: hidden;
  border: 1px solid transparent;
}

.poetry-card:hover {
  border-color: rgba(244, 165, 96, 0.3);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.poetry-card.expanded {
  border-color: rgba(244, 165, 96, 0.5);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.card-header {
  padding: 1.25rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
}

.card-header h3 {
  margin: 0;
  color: rgb(244, 165, 96);
  font-size: 1.4rem;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.language-badge, .date-badge {
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border-radius: 20px;
  background-color: rgba(244, 165, 96, 0.1);
  color: rgb(244, 165, 96);
}

.expand-toggle {
  position: absolute;
  right: 1.25rem;
  top: 1.25rem;
}

.expand-toggle i {
  transition: transform 0.3s ease;
}

.expand-toggle i.rotate {
  transform: rotate(180deg);
}

.card-content {
  padding: 0 1.25rem 1.25rem;
}

.description {
  font-style: italic;
  opacity: 0.8;
  margin-bottom: 1.25rem;
  color: #ddd;
}

.poem-content {
  font-family: 'Space Mono', monospace, 'Amiri', 'Scheherazade New', serif;
}

.verse {
  margin: 0.4rem 0;
  line-height: 1.6;
  color: #fff;
}

.content-divider {
  margin: 1.25rem 0;
  border: none;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.15);
}

.rtl {
  direction: rtl;
  text-align: right;
}

/* Transition animations */
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@media (max-width: 768px) {
  .card-header h3 {
    font-size: 1.2rem;
  }
  
  .card-header {
    padding: 1rem;
  }
  
  .card-content {
    padding: 0 1rem 1rem;
  }
}
</style> 