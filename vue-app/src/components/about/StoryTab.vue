<template>
  <div class="story-timeline-container">
    <!-- Interactive story panels - Maximize space -->
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
    
    <!-- Story controls - Carousel Style -->
    <div class="story-controls">
      <button class="story-nav-btn prev-btn" @click="navigateStory(-1)" aria-label="Previous Story">
        <i class="fas fa-chevron-left"></i>
      </button>
      
      <!-- Dot Indicators -->
      <div class="carousel-indicators">
        <button 
          v-for="(item, index) in storyItems" 
          :key="index"
          class="indicator-dot"
          :class="{ 'active': currentIndex === index }"
          @click="setActiveStory(index)"
          :aria-label="`Go to story ${index + 1}`"
          :title="item.title"
        ></button>
      </div>

      <button class="story-nav-btn next-btn" @click="navigateStory(1)" aria-label="Next Story">
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
  height: 100%;
  display: flex;
  flex-direction: column;
}

.story-viewport {
  flex-grow: 1;
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(244, 165, 96, 0.15);
  background: rgba(20, 20, 20, 0.3);
  min-height: 0; /* Important for flex child */
}

.story-scene {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.6s ease;
  display: flex; /* Flex layout to stretch background */
}

.story-scene.active {
  opacity: 1;
  pointer-events: auto;
  z-index: 1;
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
  transition: transform 6s ease; /* Slow zoom effect */
  z-index: 0;
  transform: scale(1);
}

.story-scene.active .scene-background {
  transform: scale(1.1); /* Subtle zoom in when active */
}

.scene-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, 
    rgba(0,0,0,0.3) 0%, 
    rgba(0,0,0,0.6) 60%,
    rgba(0,0,0,0.9) 100%);
  z-index: 1;
}

.scene-content {
  z-index: 2;
  position: relative;
  width: 100%;
  height: 100%;
  padding: 3rem;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(244, 165, 96, 0.5) rgba(30, 30, 30, 0.3);
  display: flex;
  flex-direction: column;
}

.scene-content::-webkit-scrollbar {
  width: 6px;
}

.scene-content::-webkit-scrollbar-track {
  background: rgba(30, 30, 30, 0.1);
}

.scene-content::-webkit-scrollbar-thumb {
  background-color: rgba(244, 165, 96, 0.5);
  border-radius: 10px;
}

.scene-content h3 {
  color: var(--accent-color, rgb(244, 165, 96));
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
}

.scene-text {
  flex-grow: 1;
}

.scene-text p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
  color: #eee;
  font-size: 1.1rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  max-width: 800px;
}

.scene-quote {
  font-style: italic;
  font-size: 1.2rem;
  color: var(--accent-color, rgb(244, 165, 96));
  margin: 2rem 0;
  padding: 1.5rem;
  border-left: 4px solid var(--accent-color, rgb(244, 165, 96));
  background: rgba(0, 0, 0, 0.3);
  border-radius: 0 10px 10px 0;
  max-width: 800px;
  flex-shrink: 0;
}

/* Controls */
.story-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  background: rgba(20, 20, 20, 0.6);
  border-radius: 50px; /* Pill shape */
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  width: 100%;
  max-width: 600px;
  align-self: center; /* Center horizontally in flex container */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.story-nav-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.story-nav-btn:hover {
  background: var(--accent-color, rgb(244, 165, 96));
  color: #000;
  transform: scale(1.1);
}

.carousel-indicators {
  display: flex;
  gap: 12px;
  align-items: center;
}

.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
}

.indicator-dot:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: scale(1.2);
}

.indicator-dot.active {
  background: var(--accent-color, rgb(244, 165, 96));
  transform: scale(1.4);
  box-shadow: 0 0 10px rgba(244, 165, 96, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
  .scene-content {
    padding: 1.5rem;
    padding-top: 2rem;
  }
  
  .scene-content h3 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
  
  .scene-text p {
    font-size: 1rem;
  }
  
  .scene-quote {
    font-size: 1rem;
    padding: 1rem;
    margin: 1.5rem 0;
  }
  
  .story-controls {
    width: 100%;
    border-radius: 12px;
    padding: 0.8rem;
    margin-top: 0.5rem;
  }
  
  .indicator-dot {
    width: 8px;
    height: 8px;
    gap: 8px;
  }
}
</style> 