<template>
  <div 
    class="timeline-event"
    :class="[
      position,
      `category-${event.category}`,
      { 'expanded': isExpanded }
    ]"
    @click="$emit('toggle-expand')"
    @keydown.enter="$emit('toggle-expand')"
    @keydown.space.prevent="$emit('toggle-expand')"
    tabindex="0"
    role="button"
    :aria-expanded="isExpanded"
    :aria-label="`${event.title}, ${event.date}. Click to ${isExpanded ? 'collapse' : 'expand'}`"
  >
    <div class="timeline-dot" aria-hidden="true">
      <i :class="getCategoryIcon(event.category)"></i>
    </div>
    
    <div class="event-card">
      <div class="event-date">{{ event.date }}</div>
      <div class="event-category">
        <i :class="getCategoryIcon(event.category)" aria-hidden="true"></i>
        {{ formatCategory(event.category) }}
      </div>
      
      <h3 class="event-title">{{ event.title }}</h3>
      <div class="event-location">
        <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
        {{ event.location }}
      </div>
      
      <div class="event-image" v-if="event.image">
        <img :src="event.image" :alt="`Image for ${event.title}`" loading="lazy" @error="handleImageError">
      </div>
      
      <p class="event-description">{{ event.description }}</p>
      
      <div v-if="event.highlights && isExpanded" class="event-highlights">
        <h4><i class="fas fa-star" aria-hidden="true"></i> Highlights</h4>
        <ul>
          <li v-for="(highlight, i) in event.highlights" :key="i">{{ highlight }}</li>
        </ul>
      </div>
      
      <a 
        v-if="event.link && isExpanded" 
        :href="event.link" 
        class="event-link" 
        target="_blank"
        rel="noopener noreferrer"
        @click.stop
        aria-label="Learn more about this event (opens in new tab)"
      >
        <i class="fas fa-external-link-alt" aria-hidden="true"></i>
        Learn More
      </a>
      
      <div class="expand-indicator" aria-hidden="true">
        <i :class="isExpanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
        {{ isExpanded ? 'Show Less' : 'Show More' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LifeTimelineEvent',
  props: {
    event: {
      type: Object,
      required: true
    },
    position: {
      type: String,
      required: true,
      validator: value => ['left', 'right'].includes(value)
    },
    isExpanded: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-expand'],
  methods: {
    formatCategory(category) {
      return category.charAt(0).toUpperCase() + category.slice(1);
    },
    getCategoryIcon(category) {
      const iconMap = {
        education: 'fas fa-graduation-cap',
        career: 'fas fa-briefcase',
        milestone: 'fas fa-flag',
        travel: 'fas fa-plane',
        personal: 'fas fa-heart',
        award: 'fas fa-trophy',
        project: 'fas fa-code',
        publication: 'fas fa-book'
      };
      
      return iconMap[category] || 'fas fa-star';
    },
    handleImageError(e) {
      e.target.src = 'https://i.imgur.com/TwYAtdu.png';
    }
  }
}
</script>

<style scoped>
.timeline-event {
  position: relative;
  margin-bottom: 40px;
  width: 50%;
  z-index: 2;
}

.timeline-event.left {
  padding-right: 40px;
  align-self: flex-start;
  left: 0;
}

.timeline-event.right {
  padding-left: 40px;
  align-self: flex-end;
  left: 50%;
}

.timeline-dot {
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--accent-color);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  box-shadow: 0 0 10px rgba(244, 165, 96, 0.5);
  transition: all 0.3s ease;
  top: 20px;
}

.timeline-event.left .timeline-dot {
  right: -10px;
}

.timeline-event.right .timeline-dot {
  left: -10px;
}

.timeline-dot i {
  display: none; /* Hide icon in dot for cleaner look */
}

.timeline-event:hover .timeline-dot, .timeline-event:focus-within .timeline-dot {
  transform: scale(1.5);
  box-shadow: 0 0 15px rgba(244, 165, 96, 0.7);
}

.event-card {
  background: var(--glass-bg);
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--glass-border);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  backdrop-filter: blur(5px);
}

.event-card:hover, .timeline-event:focus .event-card {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  border-color: var(--accent-color);
}

.timeline-event:focus {
  outline: none;
}

.timeline-event:focus .event-card {
  border-color: var(--accent-color);
  box-shadow: 0 0 0 2px rgba(244, 165, 96, 0.5);
}

.event-date {
  display: inline-block;
  background: rgba(244, 165, 96, 0.2);
  color: var(--accent-color);
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 10px;
  font-family: var(--font-mono);
}

.event-category {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.7);
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 0.75rem;
  margin-left: 10px;
}

.event-title {
  font-size: 1.2rem;
  margin: 10px 0;
  color: var(--primary-text);
  transition: color 0.3s ease;
}

.event-card:hover .event-title {
  color: var(--accent-color);
}

.event-location {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--secondary-text);
  font-size: 0.85rem;
  margin-bottom: 15px;
}

.event-location i {
  color: var(--accent-color);
}

.event-image {
  width: 100%;
  height: 160px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 15px;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.event-card:hover .event-image img {
  transform: scale(1.05);
}

.event-description {
  color: var(--secondary-text);
  line-height: 1.6;
  font-size: 0.9rem;
  margin-bottom: 15px;
}

.event-highlights {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 15px;
  margin-top: 20px;
  border-left: 2px solid var(--accent-color);
}

.event-highlights h4 {
  color: var(--accent-color);
  font-size: 1rem;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.event-highlights ul {
  padding-left: 20px;
  margin: 10px 0;
}

.event-highlights li {
  color: var(--secondary-text);
  margin-bottom: 6px;
  line-height: 1.5;
  font-size: 0.9rem;
}

.event-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--accent-color);
  text-decoration: none;
  padding: 8px 15px;
  background: rgba(244, 165, 96, 0.1);
  border-radius: 20px;
  margin-top: 15px;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.event-link:hover {
  background: rgba(244, 165, 96, 0.2);
  transform: translateX(5px);
}

.expand-indicator {
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  transition: all 0.3s ease;
}

.event-card:hover .expand-indicator {
  color: var(--accent-color);
}

/* Animation for expanded state */
.event-highlights, .event-link {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  margin-top: 0;
  transition: all 0.5s ease;
}

.expanded .event-highlights, .expanded .event-link {
  max-height: 500px;
  opacity: 1;
  margin-top: 20px;
}

@media (max-width: 992px) {
  .timeline-event {
    width: 100%;
    padding-left: 80px;
    left: 0;
  }
  
  .timeline-event.left, .timeline-event.right {
    padding-right: 0;
    padding-left: 80px;
    left: 0;
  }
  
  .timeline-event.left .timeline-dot, .timeline-event.right .timeline-dot {
    left: 30px;
    right: auto;
  }
}

@media (max-width: 768px) {
  .timeline-event.left, .timeline-event.right {
    padding-left: 50px;
  }
  
  .timeline-event.left .timeline-dot, .timeline-event.right .timeline-dot {
    left: 10px;
  }
}
</style>
