<template>
  <div class="tabs-navigation" role="tablist" aria-label="About Me Sections">
    <button 
      v-for="tab in tabs" 
      :key="tab.id"
      class="tab-button" 
      :class="{ 'active': activeTab === tab.id }"
      @click="$emit('tab-change', tab.id)"
      role="tab"
      :aria-selected="activeTab === tab.id"
      :aria-controls="`panel-${tab.id}`"
      :id="`tab-${tab.id}`"
      :tabindex="activeTab === tab.id ? 0 : -1"
    >
      <i :class="tab.icon" aria-hidden="true"></i>
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
/* ... */
.tabs-navigation {
  display: flex;
  /* Background and border handled by parent container for sticky effect */
  background: transparent;
  border-bottom: none;
  width: 100%;
  overflow-x: auto; /* Allow scrolling if needed on small screens even on desktop if resized */
  scrollbar-width: none;
}

.tabs-navigation::-webkit-scrollbar {
  display: none;
}

.tab-button {
  flex: 1;
  background: none;
  border: none;
  padding: 12px 20px;
  color: #ddd;
  font-size: 0.95rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  position: relative;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.tab-button i {
  font-size: 1.1rem;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.tab-button:hover {
  color: var(--accent-color, rgb(244, 165, 96));
  background: rgba(255, 255, 255, 0.02);
}

.tab-button.active {
  color: var(--accent-color, rgb(244, 165, 96));
  background: rgba(244, 165, 96, 0.05);
}

.tab-button.active i {
  opacity: 1;
  transform: translateY(-2px);
}

.tab-button.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--accent-color, rgb(244, 165, 96));
  box-shadow: 0 -2px 10px rgba(244, 165, 96, 0.5);
}

@media (max-width: 1024px) {
  .tab-button {
    padding: 15px;
    font-size: 0.85rem;
  }
}

@media (max-width: 767px) {
  .tabs-navigation {
    justify-content: center; /* Center since they should fit now */
    padding: 0.5rem;
    gap: 0.5rem;
  }
  
  .tab-button {
    flex: 0 0 auto;
    width: 50px; /* Fixed width for icon only */
    padding: 10px;
    border-radius: 25px;
    background: rgba(255, 255, 255, 0.05);
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    justify-content: center;
    overflow: hidden;
  }
  
  .tab-button span {
    display: none;
    opacity: 0;
    font-size: 0.85rem;
  }
  
  .tab-button.active {
    width: auto;
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    background: rgba(244, 165, 96, 0.15);
    color: var(--accent-color, rgb(244, 165, 96));
  }
  
  .tab-button.active span {
    display: inline-block;
    opacity: 1;
    margin-left: 8px;
    animation: fadeInLabel 0.3s ease forwards 0.2s;
  }
  
  /* Remove the bottom border indicator from desktop style for cleaner pill look on mobile */
  .tab-button.active::after {
    display: none;
  }
}

@keyframes fadeInLabel {
  from { opacity: 0; transform: translateX(5px); }
  to { opacity: 1; transform: translateX(0); }
}

@media (max-width: 480px) {
  .tab-button {
    width: 44px;
    height: 44px;
    padding: 0;
  }
  
  .tab-button.active {
    width: auto;
    padding: 0 16px;
  }
}
</style>