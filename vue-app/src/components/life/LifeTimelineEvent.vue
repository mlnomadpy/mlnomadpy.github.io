<template>
  <div 
    class="timeline-event"
    :class="[
      `category-${event.category}`,
      position
    ]"
    @click="$emit('select', event)"
    @keydown.enter="$emit('select', event)"
    @keydown.space.prevent="$emit('select', event)"
    tabindex="0"
    role="button"
    :aria-label="`${event.title}, ${event.date}. Click to view details`"
  >
    <div class="timeline-dot" aria-hidden="true">
      <i :class="getCategoryIcon(event.category)"></i>
    </div>
    
    <div class="event-connector" aria-hidden="true"></div>
    
    <div class="event-card">
      <div class="event-header">
        <span class="event-date">{{ event.date }}</span>
        <i :class="getCategoryIcon(event.category)" class="category-icon" aria-hidden="true"></i>
      </div>
      
      <h3 class="event-title">{{ event.title }}</h3>
      
      <div class="event-location" v-if="event.location">
        <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
        {{ event.location }}
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
      validator: value => ['top', 'bottom'].includes(value)
    }
  },
  emits: ['select'],
  methods: {
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
    }
  }
}
</script>

<style scoped>
.timeline-event {
  position: relative;
  flex: 0 0 auto;
  width: 280px;
  margin: 0 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center; /* Default center, overridden by classes */
  transition: transform 0.3s ease;
}

.timeline-event.top {
  justify-content: flex-start;
  padding-top: 80px; /* Push card down closer to center */
}

.timeline-event.bottom {
  justify-content: flex-end;
  padding-bottom: 80px; /* Push card up closer to center */
}

.timeline-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background: var(--accent-color);
  border-radius: 50%;
  z-index: 2;
  box-shadow: 0 0 10px rgba(244, 165, 96, 0.5);
  transition: all 0.3s ease;
}

.timeline-dot i {
  display: none;
}

.timeline-event:hover .timeline-dot {
  transform: translate(-50%, -50%) scale(1.3);
  box-shadow: 0 0 15px rgba(244, 165, 96, 0.8);
}

.event-connector {
  position: absolute;
  left: 50%;
  width: 2px;
  background: rgba(244, 165, 96, 0.3);
  transform: translateX(-50%);
  z-index: 1;
}

.timeline-event.top .event-connector {
  top: auto;
  bottom: 50%;
  height: 40px; /* Connect from card bottom (at 210px) to center (250px) */
}

.timeline-event.bottom .event-connector {
  top: 50%;
  bottom: auto;
  height: 40px; /* Connect from center (250px) to card top (at 290px) */
}

/* Refined connector strategy: use flex/absolute relative to card */
.timeline-event .event-connector {
  display: block; /* Ensure it's visible */
}

/* Remove old pseudo-element connectors if any */
.timeline-event::before {
  display: none;
}


.event-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  cursor: pointer;
  transition: all 0.3s ease;
  height: 130px; /* Fixed height for consistency */
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
}

.timeline-event:hover .event-card {
  transform: translateY(-5px);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(244, 165, 96, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.event-date {
  font-family: 'Space Mono', monospace;
  color: var(--accent-color);
  font-size: 0.85rem;
  font-weight: 600;
}

.category-icon {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.9rem;
}

.event-title {
  font-size: 1.1rem;
  margin: 0 0 10px;
  color: var(--primary-text);
  font-family: 'Orbitron', sans-serif;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-location {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  margin-top: auto;
}

.event-location i {
  color: var(--accent-color);
  opacity: 0.7;
}
</style>
