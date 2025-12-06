<template>
  <div class="story-timeline-container">
    <!-- Interactive timeline navigation -->
    <div class="timeline-navigation">
      <div 
        v-for="(item, index) in storyItems" 
        :key="item.id"
        class="timeline-nav-item" 
        :class="{ 'active': currentIndex === index }"
        @click="setActiveStory(index)"
      >
        <div class="nav-indicator"><span>{{ String(index + 1).padStart(2, '0') }}</span></div>
        <div class="nav-label">{{ item.title }}</div>
      </div>
      <div class="timeline-progress-bar">
        <div class="timeline-progress" :style="{ width: `${(currentIndex + 1) / storyItems.length * 100}%` }"></div>
      </div>
    </div>
    
    <!-- Interactive story panels -->
    <div class="story-viewport">
      <div 
        v-for="(item, index) in storyItems" 
        :key="item.id"
        class="story-scene"
        :class="{ 'active': currentIndex === index }"
        :id="`story-${item.id}`"
      >
        <div class="scene-background" :style="{ backgroundImage: item.backgroundImage }">
          <div class="scene-overlay"></div>
        </div>
        <div class="scene-content">
          <h3>{{ item.heading }}</h3>
          <div class="scene-text" v-html="item.content"></div>
          <div class="scene-quote">
            {{ item.quote }}
          </div>
        </div>
      </div>
    </div>
    
    <!-- Story controls -->
    <div class="story-controls">
      <button class="story-nav-btn prev-btn" @click="navigateStory(-1)">
        <i class="fas fa-chevron-left"></i>
      </button>
      <div class="story-page-indicator">
        <span class="current-page">{{ currentIndex + 1 }}</span>/<span class="total-pages">{{ storyItems.length }}</span>
      </div>
      <button class="story-nav-btn next-btn" @click="navigateStory(1)">
        <i class="fas fa-chevron-right"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StoryTab',
  props: {
    storyItems: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    setActiveStory(index) {
      this.currentIndex = index;
    },
    navigateStory(direction) {
      let newIndex = this.currentIndex + direction;
      if (newIndex < 0) newIndex = this.storyItems.length - 1;
      if (newIndex >= this.storyItems.length) newIndex = 0;
      this.currentIndex = newIndex;
    }
  },
  mounted() {
    // Add keyboard navigation for stories
    this.keyListener = (e) => {
      if (e.key === 'ArrowRight') {
        this.navigateStory(1);
      } else if (e.key === 'ArrowLeft') {
        this.navigateStory(-1);
      }
    };
    
    document.addEventListener('keydown', this.keyListener);
  },
  beforeUnmount() {
    // Remove keyboard event listener
    document.removeEventListener('keydown', this.keyListener);
  }
}
</script>

<style scoped>
.story-timeline-container {
  width: 100%;
}

.timeline-navigation {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;
  background: rgba(20, 20, 20, 0.5);
  padding: 1.2rem;
  border-radius: 12px;
  border: 1px solid rgba(244, 165, 96, 0.15);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.timeline-nav-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1.2rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid transparent;
}

.timeline-nav-item:hover {
  background: rgba(244, 165, 96, 0.15);
  transform: translateX(3px);
}

.timeline-nav-item.active {
  background: rgba(244, 165, 96, 0.2);
  border-color: rgba(244, 165, 96, 0.4);
  transform: translateX(5px) scale(1.02);
}

.nav-indicator {
  background: rgba(244, 165, 96, 0.2);
  color: var(--accent-color, rgb(244, 165, 96));
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(244, 165, 96, 0.3);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.timeline-nav-item.active .nav-indicator {
  background: rgba(244, 165, 96, 0.9);
  color: #222;
  transform: scale(1.1);
}

.nav-label {
  font-size: 1.05rem;
  font-weight: 500;
  color: #eee;
  transition: color 0.3s ease, transform 0.3s ease;
}

.timeline-nav-item.active .nav-label {
  color: var(--accent-color, rgb(244, 165, 96));
  transform: scale(1.05);
  font-weight: 600;
}

.timeline-progress-bar {
  height: 5px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  margin-top: 0.8rem;
  overflow: hidden;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
}

.timeline-progress {
  height: 100%;
  background: linear-gradient(90deg, rgba(244, 165, 96, 0.7) 0%, rgba(244, 165, 96, 0.9) 100%);
  transition: width 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-radius: 3px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.story-scene {
  position: relative;
  width: 100%;
  min-height: 400px;
  overflow: hidden;
  border-radius: 12px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.5s ease;
  display: none;
  margin-top: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(244, 165, 96, 0.15);
}

.story-scene.active {
  opacity: 1;
  pointer-events: auto;
  display: block;
  animation: fadeInScene 0.6s ease forwards;
}

@keyframes fadeInScene {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.scene-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  filter: brightness(0.3) saturate(1.2);
  transition: all 0.8s ease;
  z-index: 1;
}

.story-scene.active .scene-background {
  transform: scale(1.05);
  filter: brightness(0.35) saturate(1.3);
}

.scene-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 100%);
  z-index: 1;
}

.scene-content {
  z-index: 2;
  position: relative;
  padding: 2.5rem;
  padding-top: 3rem;
  max-height: 400px;
  height: 400px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(244, 165, 96, 0.5) rgba(30, 30, 30, 0.3);
}

.scene-content::-webkit-scrollbar {
  width: 8px;
}

.scene-content::-webkit-scrollbar-track {
  background: rgba(30, 30, 30, 0.3);
  border-radius: 10px;
}

.scene-content::-webkit-scrollbar-thumb {
  background-color: rgba(244, 165, 96, 0.5);
  border-radius: 10px;
}

.scene-content h3 {
  color: var(--accent-color, rgb(244, 165, 96));
  font-size: 2.2rem;
  margin-bottom: 1.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  display: inline-block;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.3);
}

.scene-content h3::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 40%;
  height: 2px;
  background-color: var(--accent-color, rgb(244, 165, 96));
  transition: width 0.3s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.scene-content h3:hover::after {
  width: 100%;
}

.scene-text p {
  margin-bottom: 1.4rem;
  line-height: 1.9;
  opacity: 0.95;
  text-align: justify;
  position: relative;
  font-size: 1.05rem;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.015em;
  hyphens: auto;
}

.scene-text p:first-of-type {
  font-size: 1.15rem;
  font-weight: 500;
  color: #fff;
}

.scene-text p strong {
  color: var(--accent-color, rgb(244, 165, 96));
  font-weight: 600;
}

.scene-text p em {
  font-style: italic;
  opacity: 0.9;
}

.scene-quote {
  font-style: italic;
  font-size: 1.1rem;
  color: var(--accent-color, rgb(244, 165, 96));
  margin: 2rem 0;
  padding: 1rem 1.5rem;
  border-left: 3px solid var(--accent-color, rgb(244, 165, 96));
  background: rgba(244, 165, 96, 0.08);
  border-radius: 0 8px 8px 0;
  position: relative;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  letter-spacing: 0.02em;
  font-weight: 400;
}

.scene-quote::before {
  content: '"';
  position: absolute;
  top: -10px;
  left: 10px;
  font-size: 3rem;
  color: rgba(244, 165, 96, 0.2);
  font-family: Georgia, serif;
}

.story-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.8rem;
  padding: 1.2rem;
  background: rgba(20, 20, 20, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(244, 165, 96, 0.15);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
}

.story-nav-btn {
  background: rgba(244, 165, 96, 0.15);
  color: var(--accent-color, rgb(244, 165, 96));
  border: 1px solid rgba(244, 165, 96, 0.3);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-size: 1.1rem;
}

.story-nav-btn:hover {
  background: rgba(244, 165, 96, 0.9);
  color: #222;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.story-nav-btn:active {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.story-page-indicator {
  display: flex;
  align-items: center;
  font-size: 1.05rem;
  background: rgba(244, 165, 96, 0.08);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 1px solid rgba(244, 165, 96, 0.2);
}

.current-page {
  color: var(--accent-color, rgb(244, 165, 96));
  font-weight: 600;
  font-size: 1.3rem;
  margin: 0 0.3rem;
}

.total-pages {
  color: #aaa;
  margin: 0 0.3rem;
}

@media (min-width: 768px) {
  /* Timeline navigation for desktop */
  .timeline-navigation {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .timeline-nav-item {
    flex: 1;
    min-width: 120px;
    max-width: 180px;
    flex-direction: column;
    text-align: center;
    padding: 1.2rem 0.7rem;
  }
  
  .timeline-nav-item:hover {
    transform: translateY(-3px);
  }
  
  .timeline-nav-item.active {
    transform: translateY(-5px) scale(1.05);
  }
  
  .nav-indicator {
    margin-bottom: 0.8rem;
  }
  
  .timeline-progress-bar {
    width: 100%;
    margin-top: 1.2rem;
  }
  
  .scene-content {
    padding: 3rem;
    padding-top: 3.5rem;
  }
  
  .scene-content h3 {
    font-size: 2.2rem;
  }
}

@media (max-width: 767px) {
  /* Timeline navigation for mobile - modern compact style */
  .timeline-navigation {
    flex-direction: row;
    overflow-x: auto;
    flex-wrap: nowrap;
    justify-content: center;
    padding: 1rem 0.5rem;
    gap: 0.4rem;
    scrollbar-width: none; /* Hide scrollbar Firefox */
    -ms-overflow-style: none; /* Hide scrollbar IE and Edge */
  }
  
  .timeline-navigation::-webkit-scrollbar {
    display: none; /* Hide scrollbar Chrome, Safari, Opera */
  }
  
  .timeline-nav-item {
    flex: 0 0 auto;
    min-width: 0;
    width: 44px;
    height: 44px;
    flex-direction: row; /* Horizontal layout for active state expansion */
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    border-radius: 22px;
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid transparent;
  }
  
  .timeline-nav-item.active {
    width: auto;
    padding: 0 1.2rem 0 0.5rem;
    background: rgba(244, 165, 96, 0.15);
    border-color: rgba(244, 165, 96, 0.3);
  }
  
  .nav-indicator {
    margin-bottom: 0;
    width: 32px;
    height: 32px;
    min-width: 32px;
    font-size: 0.8rem;
    z-index: 2;
    background: transparent;
    box-shadow: none;
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: #ccc;
  }
  
  .timeline-nav-item.active .nav-indicator {
    background: rgba(244, 165, 96, 0.9);
    color: #222;
    border-color: transparent;
    margin-bottom: 0;
    transform: none;
  }
  
  .nav-label {
    position: static;
    opacity: 0;
    width: 0;
    font-size: 0.9rem;
    white-space: nowrap;
    pointer-events: none;
    transform: none;
    margin-left: 0;
    overflow: hidden;
    transition: all 0.3s ease;
  }
  
  .timeline-nav-item.active .nav-label {
    opacity: 1;
    width: auto;
    margin-left: 0.8rem;
    pointer-events: auto;
    color: var(--accent-color, rgb(244, 165, 96));
  }
  
  .timeline-progress-bar {
    display: none; /* Hide progress bar on mobile to save space */
  }
  
  .scene-content {
    padding: 1.5rem;
    padding-top: 2rem;
    max-height: 400px;
    height: auto;
    min-height: 300px;
  }

  .scene-content h3 {
    font-size: 1.6rem;
  }
  
  .scene-text p {
    font-size: 0.95rem;
  }
  
  /* Improved story controls */
  .story-controls {
    margin-top: 1.5rem;
    padding: 1rem;
  }
  
  .story-nav-btn {
    width: 44px;
    height: 44px;
    font-size: 1rem;
  }
}
</style> 