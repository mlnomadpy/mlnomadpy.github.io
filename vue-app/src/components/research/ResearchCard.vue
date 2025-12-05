<template>
  <div 
    class="research-card mobile-tap-highlight"
    :class="{ 'expanded': expanded, 'resp-card': true }"
  >
    <div class="research-header" @click="toggleExpanded">
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
        <i :class="expanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
        <span class="resp-text-sm">{{ expanded ? 'Less Details' : 'More Details' }}</span>
      </div>
    </div>
    
    <div v-if="expanded" class="research-details smooth-scroll">
      <div class="details-content">
        <h4 class="resp-text-lg">Abstract</h4>
        <p class="resp-text-md">{{ item.details }}</p>
        
        <div v-if="item.links && item.links.length" class="research-links">
          <h4 class="resp-text-lg">Resources</h4>
          <ul>
            <li v-for="(link, index) in item.links" :key="index">
              <a :href="link.url" target="_blank" class="resource-link touch-friendly resp-text-sm">
                <i class="fas fa-external-link-alt"></i>
                {{ link.text }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <button class="close-btn touch-friendly resp-text-sm" @click.stop="toggleExpanded">
        <i class="fas fa-times"></i>
        Close
      </button>
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
  data() {
    return {
      expanded: false
    }
  },
  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded;
      this.$emit('toggle-expanded', {
        id: this.item.id,
        expanded: this.expanded
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
}

.research-card.expanded .research-header {
  border-bottom: 1px dashed rgba(244, 165, 96, 0.2);
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
}

.research-card:hover .expand-indicator {
  opacity: 1;
}

.research-details {
  padding: 25px;
  background: rgba(20, 20, 20, 0.3);
  animation: slideDown 0.4s ease forwards;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.details-content {
  margin-bottom: 20px;
}

.research-details h4 {
  color: var(--accent-color);
  margin: 0 0 15px;
  font-size: 1.1rem;
  border-bottom: 1px solid rgba(244, 165, 96, 0.2);
  padding-bottom: 8px;
}

.research-details p {
  margin: 0 0 20px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
}

.research-links ul {
  list-style-type: none;
  padding: 0;
  margin: 15px 0;
}

.research-links li {
  margin-bottom: 10px;
}

.resource-link {
  color: var(--accent-color);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  padding: 8px 12px;
  background: rgba(244, 165, 96, 0.05);
  border-radius: 6px;
}

.resource-link:hover {
  background: rgba(244, 165, 96, 0.15);
  transform: translateX(5px);
}

.close-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: rgba(244, 165, 96, 0.1);
  border: 1px solid rgba(244, 165, 96, 0.3);
  color: var(--accent-color);
  border-radius: 6px;
  padding: 10px 15px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "Space Mono", monospace;
  width: 100%;
}

.close-btn:hover {
  background: var(--accent-color);
  color: var(--primary-bg);
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
  
  .research-details {
    padding: 16px;
  }
  
  .research-details h4 {
    font-size: 1rem;
    margin-bottom: 10px;
  }
  
  .research-details p {
    font-size: 0.85rem;
    line-height: 1.6;
    margin-bottom: 15px;
  }
  
  .resource-link {
    padding: 6px 10px;
    font-size: 0.8rem;
  }
  
  .close-btn {
    padding: 8px 12px;
    font-size: 0.8rem;
  }
}
</style> 