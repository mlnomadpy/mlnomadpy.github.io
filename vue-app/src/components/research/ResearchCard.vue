<template>
  <div 
    class="research-card mobile-tap-highlight"
    :class="{ 'resp-card': true }"
  >
    <div class="research-header" @click="navigateToDetails">
      <div class="research-icon">
        <i :class="getCategoryIcon(item.category)"></i>
      </div>
      <div class="research-category-tag">{{ item.category }}</div>
      <div class="research-meta">
        <span class="research-year">{{ item.year }}</span>
        <span class="research-status">{{ item.status }}</span>
      </div>
      <h3 class="research-title resp-text-lg">{{ item.title }}</h3>
      <p class="research-author resp-text-sm">{{ item.author }}</p>
      <p class="research-summary resp-text-md">{{ item.summary }}</p>
      
      <div class="research-tags resp-gap-sm">
        <span v-for="(tag, index) in item.tags" :key="index" class="tag resp-text-sm">
          {{ tag }}
        </span>
      </div>
      
      <div class="expand-indicator">
        <i class="fas fa-arrow-right"></i>
        <span class="resp-text-sm">View Details</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResearchCard',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    navigateToDetails() {
      this.$router.push({
        name: 'ResearchDetails',
        params: { id: this.item.id }
      });
    },
    getCategoryIcon(category) {
      const icons = {
        'Machine Learning': 'fas fa-brain',
        'Deep Learning': 'fas fa-network-wired',
        'Computer Vision': 'fas fa-eye',
        'Natural Language Processing': 'fas fa-language',
        'Reinforcement Learning': 'fas fa-robot',
        'Data Science': 'fas fa-chart-line',
        'Explainable AI': 'fas fa-lightbulb',
        'Neural Networks': 'fas fa-project-diagram',
        'Signal Processing': 'fas fa-wave-square'
      };
      
      return icons[category] || 'fas fa-microscope';
    }
  }
}
</script>

<style scoped>
@import './responsive-utils.css';

.research-card {
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.6), rgba(20, 20, 20, 0.8));
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(244, 165, 96, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
}

.research-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  border-color: rgba(244, 165, 96, 0.3);
}

.research-header {
  padding: 25px;
  position: relative;
  cursor: pointer;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.research-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(244, 165, 96, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px dashed rgba(244, 165, 96, 0.3);
  float: left;
  margin-right: 15px;
}

.research-icon i {
  font-size: 1.2rem;
  color: var(--accent-color);
}

.research-card:hover .research-icon {
  transform: scale(1.1) rotate(5deg);
  background: rgba(244, 165, 96, 0.2);
  border-style: solid;
}

.research-category-tag {
  display: inline-block;
  background: rgba(244, 165, 96, 0.15);
  color: var(--accent-color);
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 10px;
  font-weight: 600;
  float: right;
}

.research-meta {
  clear: both;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.research-year {
  font-weight: 600;
}

.research-status {
  font-style: italic;
}

.research-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 10px;
  line-height: 1.4;
  transition: all 0.3s ease;
}

.research-card:hover .research-title {
  color: var(--accent-color);
}

.research-author {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 15px;
  font-style: italic;
}

.research-summary {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
  line-height: 1.7;
  margin-bottom: 20px;
  flex-grow: 1;
}

.research-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tag {
  background: rgba(30, 30, 30, 0.8);
  color: rgba(255, 255, 255, 0.8);
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.75rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.research-card:hover .tag {
  background: rgba(244, 165, 96, 0.1);
  border-color: rgba(244, 165, 96, 0.2);
}

.expand-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: var(--accent-color);
  font-size: 0.9rem;
  opacity: 0.8;
  transition: all 0.3s ease;
  margin-top: auto;
}

.research-card:hover .expand-indicator {
  opacity: 1;
  transform: translateX(5px);
}

/* Enhanced Mobile Responsiveness */
@media (max-width: 576px) {
  .research-header {
    padding: 16px;
  }
  
  .research-icon {
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
  
  .research-icon i {
    font-size: 1rem;
  }
  
  .research-category-tag {
    padding: 4px 8px;
    font-size: 0.7rem;
    margin-bottom: 8px;
  }
  
  .research-meta {
    margin-bottom: 10px;
    font-size: 0.75rem;
  }
  
  .research-title {
    font-size: 1.2rem;
    margin-bottom: 8px;
    line-height: 1.3;
  }
  
  .research-author {
    font-size: 0.85rem;
    margin-bottom: 10px;
  }
  
  .research-summary {
    font-size: 0.85rem;
    line-height: 1.5;
    margin-bottom: 15px;
  }
  
  .research-tags {
    gap: 6px;
    margin-bottom: 15px;
  }
  
  .tag {
    padding: 3px 8px;
    font-size: 0.65rem;
    white-space: nowrap;
  }
  
  .expand-indicator {
    font-size: 0.8rem;
  }
}
</style>