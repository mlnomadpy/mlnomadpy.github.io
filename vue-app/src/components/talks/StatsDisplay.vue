<template>
  <div class="filter-stats">
    <div class="stats-container">
      <div class="stat-item">
        <div class="stat-value">{{ totalCount }}</div>
        <div class="stat-label">Total Talks</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">{{ topicCount }}</div>
        <div class="stat-label">Topics</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">{{ showingCount }}</div>
        <div class="stat-label">Showing</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TalksStatsDisplay',
  props: {
    totalCount: {
      type: Number,
      required: true
    },
    topicCount: {
      type: Number,
      required: true
    },
    showingCount: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.filter-stats {
  width: 100%;
  padding: 10px 0;
}

.stats-container {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.stat-item {
  background: rgba(30, 30, 30, 0.6);
  border: 1px solid rgba(244, 165, 96, 0.3);
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  flex: 1;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .stats-container {
    gap: 10px;
  }
  
  .stat-value {
    font-size: 1.6rem;
  }
}

@media (max-width: 576px) {
  .stat-item {
    padding: 12px 10px;
  }
  
  .stat-value {
    font-size: 1.4rem;
  }
  
  .stat-label {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .stats-container {
    flex-direction: column;
    gap: 8px;
  }
  
  .stat-item {
    padding: 10px;
  }
  
  .stat-value {
    font-size: 1.3rem;
    margin-bottom: 2px;
  }
}
</style> 