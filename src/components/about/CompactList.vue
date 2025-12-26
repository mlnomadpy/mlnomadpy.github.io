<template>
  <div class="compact-list">
    <div v-if="title" class="list-header">
      <i v-if="icon" :class="icon"></i>
      <h2>{{ title }}</h2>
      <div class="list-controls">
        <slot name="controls"></slot>
      </div>
    </div>

    <div class="list-items">
      <div 
        v-for="(item, index) in items" 
        :key="index" 
        class="list-item"
        @click="$emit('item-click', item)"
        role="button"
        tabindex="0"
        @keypress.enter="$emit('item-click', item)"
      >
        <div class="item-main">
          <div class="item-title-row">
            <h3 class="item-title">{{ item.title }}</h3>
            <span v-if="item.period" class="item-date">{{ item.period }}</span>
          </div>
          <div class="item-subtitle-row">
            <span class="item-subtitle">{{ item.subtitle || item.company }}</span>
            <span v-if="item.location" class="item-location">
              <i class="fas fa-map-marker-alt"></i> {{ item.location }}
            </span>
          </div>
        </div>
        <div class="item-arrow">
          <i class="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompactList',
  props: {
    items: {
      type: Array,
      required: true
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
  emits: ['item-click']
}
</script>

<style scoped>
.compact-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.list-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid rgba(244, 165, 96, 0.2);
  margin-bottom: 0.5rem;
}

.list-header i {
  font-size: 1.8rem;
  color: var(--accent-color, rgb(244, 165, 96));
}

.list-header h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  flex-grow: 1;
}

.list-items {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.list-item:hover {
  background: rgba(244, 165, 96, 0.1);
  border-color: rgba(244, 165, 96, 0.3);
  transform: translateX(5px);
}

.item-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.item-title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.item-title {
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.item-date {
  font-size: 0.9rem;
  color: var(--accent-color, rgb(244, 165, 96));
  background: rgba(244, 165, 96, 0.1);
  padding: 2px 8px;
  border-radius: 12px;
  white-space: nowrap;
}

.item-subtitle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #aaa;
}

.item-subtitle {
  font-weight: 500;
}

.item-location {
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

.item-arrow {
  color: rgba(255, 255, 255, 0.2);
  margin-left: 1rem;
  transition: transform 0.2s ease;
}

.list-item:hover .item-arrow {
  color: var(--accent-color, rgb(244, 165, 96));
  transform: translateX(3px);
}

@media (max-width: 600px) {
  .item-title-row {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .item-subtitle-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2rem;
  }
  
  .item-date {
    align-self: flex-start;
    font-size: 0.8rem;
  }
}
</style>
