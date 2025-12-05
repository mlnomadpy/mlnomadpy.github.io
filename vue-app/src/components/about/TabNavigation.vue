<template>
  <div class="tabs-navigation">
    <button 
      v-for="tab in tabs" 
      :key="tab.id"
      class="tab-button" 
      :class="{ 'active': activeTab === tab.id }"
      @click="$emit('tab-change', tab.id)"
    >
      <i :class="tab.icon"></i>
      <span>{{ tab.label }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'TabNavigation',
  props: {
    activeTab: {
      type: String,
      required: true
    },
    tabs: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.tabs-navigation {
  display: flex;
  background: rgba(20, 20, 20, 0.3);
  border-bottom: 1px solid rgba(244, 165, 96, 0.1);
  width: 100%;
}

.tab-button {
  flex: 1;
  background: none;
  border: none;
  padding: 15px 20px;
  color: #ddd;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  transition: all 0.3s ease;
}

.tab-button i {
  font-size: 1.1rem;
}

.tab-button:hover {
  color: var(--accent-color, rgb(244, 165, 96));
  background: rgba(244, 165, 96, 0.05);
}

.tab-button.active {
  color: var(--accent-color, rgb(244, 165, 96));
  background: rgba(244, 165, 96, 0.1);
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--accent-color, rgb(244, 165, 96));
}

@media (max-width: 767px) {
  .tabs-navigation {
    flex-wrap: wrap;
    overflow-x: auto;
    width: 100%;
    padding: 5px;
    gap: 4px;
  }
  
  .tab-button {
    flex: 1 1 auto;
    padding: 10px 8px;
    font-size: 0.95rem;
    min-width: 100px;
  }
  
  .tab-button i {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .tabs-navigation {
    padding: 4px;
    gap: 2px;
  }
  
  .tab-button {
    padding: 8px 6px;
    font-size: 0.9rem;
    min-width: 80px;
    gap: 6px;
  }
  
  .tab-button i {
    font-size: 0.95rem;
  }
}
</style> 