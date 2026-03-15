<template>
  <div class="tabs-navigation" role="tablist" aria-label="About Me Sections" @keydown="handleKeydown">
    <button
      v-for="(tab, index) in tabs"
      :key="tab.id"
      :ref="el => { if (el) tabRefs[index] = el }"
      class="tab-btn"
      :class="{ active: activeTab === tab.id }"
      @click="$emit('tab-change', tab.id)"
      role="tab"
      :aria-selected="activeTab === tab.id"
      :aria-controls="`panel-${tab.id}`"
      :id="`tab-${tab.id}`"
      :tabindex="activeTab === tab.id ? 0 : -1"
    >
      <i :class="tab.icon" aria-hidden="true"></i>
      <span class="tab-label">{{ tab.label }}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'TabNavigation',
  props: {
    activeTab: { type: String, required: true },
    tabs: { type: Array, required: true }
  },
  data() {
    return { tabRefs: [] }
  },
  methods: {
    handleKeydown(e) {
      const currentIdx = this.tabs.findIndex(t => t.id === this.activeTab);
      let newIdx = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); newIdx = (currentIdx + 1) % this.tabs.length; }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); newIdx = (currentIdx - 1 + this.tabs.length) % this.tabs.length; }
      else if (e.key === 'Home') { e.preventDefault(); newIdx = 0; }
      else if (e.key === 'End') { e.preventDefault(); newIdx = this.tabs.length - 1; }
      if (newIdx >= 0) {
        this.$emit('tab-change', this.tabs[newIdx].id);
        this.$nextTick(() => { if (this.tabRefs[newIdx]) this.tabRefs[newIdx].focus(); });
      }
    }
  },
  beforeUpdate() { this.tabRefs = []; }
}
</script>

<style scoped>
/* Container — always centered pills */
.tabs-navigation {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 6px;
  padding: 0.6rem 1rem;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tabs-navigation::-webkit-scrollbar { display: none; }

/* Base button — pill style at ALL sizes */
.tab-btn {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 9px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid transparent;
  border-radius: 100px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.82rem;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}

.tab-btn i {
  font-size: 0.95rem;
  transition: color 0.25s ease;
}

.tab-btn:hover {
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.08);
}

/* Active — highlighted pill */
.tab-btn.active {
  color: var(--accent-color, rgb(244, 165, 96));
  background: rgba(244, 165, 96, 0.1);
  border-color: rgba(244, 165, 96, 0.2);
}

/* Focus */
.tab-btn:focus-visible {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Mobile — icon-only, expand active */
@media (max-width: 767px) {
  .tabs-navigation {
    flex-wrap: nowrap;
    gap: 6px;
    padding: 0.5rem 0.75rem;
  }

  .tab-btn {
    width: 46px;
    height: 46px;
    padding: 0;
    border-radius: 50%;
    overflow: hidden;
  }

  .tab-label {
    display: none;
    opacity: 0;
    font-size: 0.78rem;
  }

  .tab-btn.active {
    width: auto;
    padding: 0 1.1rem;
    border-radius: 24px;
  }

  .tab-btn.active .tab-label {
    display: inline;
    opacity: 1;
    margin-left: 5px;
    animation: labelIn 0.25s ease 0.12s both;
  }
}

@keyframes labelIn {
  from { opacity: 0; transform: translateX(4px); }
  to { opacity: 1; transform: translateX(0); }
}

@media (max-width: 480px) {
  .tab-btn { width: 42px; height: 42px; }
  .tab-btn.active { padding: 0 0.9rem; }
}
</style>
