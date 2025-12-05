<template>
  <div class="timeline-list">
    <slot name="before-list"></slot>
    
    <div class="timeline-items">
      <div v-for="(item, index) in items" :key="index" class="timeline-item">
        <slot name="item" v-bind:item="item" v-bind:index="index">
          <!-- Default timeline item rendering -->
          <div class="timeline-header">
            <div v-if="item.period" class="timeline-date">{{ item.period }}</div>
            <div v-if="item.location" class="timeline-location">{{ item.location }}</div>
          </div>
          <div class="timeline-content">
            <h3 v-if="item.title">{{ item.title }}</h3>
            <p v-if="item.subtitle" class="timeline-subtitle">{{ item.subtitle }}</p>
            <p v-if="item.description" class="timeline-description">{{ item.description }}</p>
            
            <div v-if="item.details && item.details.length" class="timeline-details">
              <ul>
                <li v-for="(detail, dIndex) in item.details" :key="dIndex">{{ detail }}</li>
              </ul>
            </div>
            
            <div v-if="item.sections && item.sections.length" class="timeline-sections">
              <div v-for="(section, sIndex) in item.sections" :key="sIndex" class="timeline-section">
                <h4 class="section-title">{{ section.title }}:</h4>
                <ul class="section-details">
                  <li v-for="(detail, dIndex) in section.details" :key="dIndex">{{ detail }}</li>
                </ul>
              </div>
            </div>
          </div>
        </slot>
      </div>
    </div>
    
    <slot name="after-list"></slot>
  </div>
</template>

<script>
export default {
  name: 'TimelineList',
  props: {
    items: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'default',
      validator: value => ['default', 'education', 'experience', 'certification'].includes(value)
    }
  },
  computed: {
    listClass() {
      return `timeline-list-${this.type}`;
    }
  }
}
</script>

<style scoped>
.timeline-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
}

.timeline-items {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 100%;
}

.timeline-item {
  background: rgba(20, 20, 20, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(244, 165, 96, 0.15);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.timeline-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  border-color: rgba(244, 165, 96, 0.3);
}

.timeline-header {
  padding: 1.5rem;
  background: rgba(30, 30, 30, 0.5);
  border-bottom: 1px solid rgba(244, 165, 96, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.timeline-date {
  color: var(--accent-color, rgb(244, 165, 96));
  font-weight: 600;
  padding: 0.3rem 0.8rem;
  background: rgba(244, 165, 96, 0.1);
  border-radius: 20px;
  display: inline-block;
}

.timeline-location {
  color: #aaa;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}

.timeline-location::before {
  content: "\f3c5"; /* Font Awesome map marker icon */
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  font-size: 0.8rem;
  color: rgba(244, 165, 96, 0.7);
}

.timeline-content {
  padding: 1.5rem;
}

.timeline-content h3 {
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.8rem;
}

.timeline-subtitle {
  color: var(--accent-color, rgb(244, 165, 96));
  font-weight: 500;
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 1rem;
}

.timeline-description {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.timeline-details ul,
.section-details {
  list-style-type: none;
  padding-left: 0.5rem;
  margin: 0;
}

.timeline-details li,
.section-details li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.8rem;
  line-height: 1.6;
}

.timeline-details li::before,
.section-details li::before {
  content: "\f105"; /* Font Awesome angle-right icon */
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  position: absolute;
  left: 0;
  color: rgba(244, 165, 96, 0.7);
}

.timeline-sections {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline-section {
  background: rgba(20, 20, 20, 0.3);
  padding: 1.2rem;
  border-radius: 8px;
  border-left: 3px solid rgba(244, 165, 96, 0.5);
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--accent-color, rgb(244, 165, 96));
  margin-bottom: 0.8rem;
}

@media (min-width: 768px) {
  .timeline-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  
  .timeline-sections {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
  
  .timeline-section {
    flex: 1;
    min-width: 280px;
  }
}

@media (max-width: 767px) {
  .timeline-items {
    gap: 1.5rem;
  }
  
  .timeline-item {
    margin: 0 4px;
    width: calc(100% - 8px);
    border-radius: 10px;
  }
  
  .timeline-header {
    padding: 1.2rem 1rem;
  }
  
  .timeline-content {
    padding: 1.2rem 1rem;
  }
  
  .timeline-section {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .timeline-items {
    gap: 1rem;
  }
  
  .timeline-item {
    margin: 0 2px;
    width: calc(100% - 4px);
    border-radius: 8px;
  }
  
  .timeline-header {
    padding: 1rem 0.8rem;
  }
  
  .timeline-content {
    padding: 1rem 0.8rem;
  }
  
  .timeline-section {
    padding: 0.8rem;
  }
  
  .timeline-content h3 {
    font-size: 1.2rem;
    margin-bottom: 0.6rem;
  }
  
  .timeline-subtitle {
    font-size: 1rem;
    margin-bottom: 0.8rem;
  }
}
</style> 