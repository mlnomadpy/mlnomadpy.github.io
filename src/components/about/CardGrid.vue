<template>
  <div class="card-grid" :class="gridClass">
    <div v-if="title" class="grid-section-header">
      <i v-if="icon" :class="icon"></i>
      <h2>{{ title }}</h2>
    </div>
    <slot name="before-grid"></slot>
    
    <div class="card-items">
      <div v-for="(item, index) in items" :key="index" class="card-item">
        <slot name="item" v-bind:item="item" v-bind:index="index">
          <!-- Default card item rendering -->
          <div class="card-icon" v-if="item.icon">
            <i :class="item.icon"></i>
          </div>
          <div class="card-content">
            <h3 class="card-title" v-if="item.title">{{ item.title }}</h3>
            <div class="card-details">
              <p class="card-subtitle" v-if="item.subtitle">{{ item.subtitle }}</p>
              <p class="card-description" v-if="item.description">{{ item.description }}</p>
              <p class="card-info" v-if="item.skills">
                <i class="fas fa-tools"></i> {{ item.skills }}
              </p>
              <p class="card-info" v-if="item.issuer">
                <i class="fas fa-building"></i> {{ item.issuer }}
              </p>
              <p class="card-info" v-if="item.date">
                <i class="fas fa-calendar-alt"></i> {{ item.date }}
              </p>
            </div>
          </div>
        </slot>
      </div>
    </div>
    
    <slot name="after-grid"></slot>
  </div>
</template>

<script>
export default {
  name: 'CardGrid',
  props: {
    items: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      default: 'default',
      validator: value => ['default', 'certification', 'award', 'skill'].includes(value)
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  },
  computed: {
    gridClass() {
      return `card-grid-${this.type}`;
    }
  }
}
</script>

<style scoped>
.card-grid {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
}

.card-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.8rem;
  width: 100%;
}

.card-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: rgba(20, 20, 20, 0.3);
  border-radius: 12px;
  border: 1px solid rgba(244, 165, 96, 0.15);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.card-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 5px;
  height: 100%;
  background: var(--accent-color, rgb(244, 165, 96));
  opacity: 0.7;
}

.card-item:hover {
  transform: translateY(-5px);
  background: rgba(30, 30, 30, 0.4);
  border-color: rgba(244, 165, 96, 0.3);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  height: 60px;
  background: rgba(244, 165, 96, 0.1);
  border-radius: 50%;
  color: var(--accent-color, rgb(244, 165, 96));
  font-size: 1.5rem;
  border: 1px solid rgba(244, 165, 96, 0.3);
  transition: all 0.3s ease;
}

.card-item:hover .card-icon {
  background: rgba(244, 165, 96, 0.9);
  color: #222;
  transform: scale(1.1) rotate(10deg);
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.8rem;
  transition: color 0.3s ease;
}

.card-item:hover .card-title {
  color: var(--accent-color, rgb(244, 165, 96));
}

.card-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-subtitle {
  color: var(--accent-color, rgb(244, 165, 96));
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.card-description {
  color: #eee;
  line-height: 1.5;
}

.card-info {
  color: #aaa;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
}

.card-info i {
  color: rgba(244, 165, 96, 0.7);
}

.card-grid-certification .card-item {
  padding-left: 1.8rem;
}

.card-grid-certification .card-skills {
  color: #ddd;
  font-size: 0.95rem;
  background: rgba(255, 255, 255, 0.05);
  display: inline-block;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  margin-bottom: 0.8rem;
}

.card-grid-award .card-item {
  padding-left: 1.8rem;
}

@media (max-width: 767px) {
  .card-items {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    width: 100%;
  }
  
  .card-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.2rem;
    margin: 0 4px;
    width: calc(100% - 8px);
  }
  
  .card-icon {
    margin-bottom: 0.5rem;
  }
  
  .card-title {
    font-size: 1.25rem;
    margin-bottom: 0.6rem;
  }
  
  .card-description {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .card-items {
    gap: 1rem;
  }
  
  .card-item {
    padding: 1rem;
    margin: 0 2px;
    width: calc(100% - 4px);
    border-radius: 10px;
  }
  
  .card-icon {
    min-width: 50px;
    height: 50px;
    font-size: 1.3rem;
  }
  
  .card-details {
    gap: 0.3rem;
  }
}

/* Header Styles */
.grid-section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(244, 165, 96, 0.2);
}

.grid-section-header i {
  font-size: 1.8rem;
  color: var(--accent-color, rgb(244, 165, 96));
}

.grid-section-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  text-transform: capitalize;
}

@media (max-width: 768px) {
  .grid-section-header h2 {
    font-size: 1.5rem;
  }
  
  .grid-section-header i {
    font-size: 1.5rem;
  }
}
</style>