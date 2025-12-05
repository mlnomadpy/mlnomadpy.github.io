<template>
  <div class="research-stats">
    <div class="stat-item">
      <div class="stat-value">{{ totalCount }}</div>
      <div class="stat-label">Total Publications</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">{{ categoryCount }}</div>
      <div class="stat-label">Research Areas</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">{{ displayCount }}</div>
      <div class="stat-label">Showing</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResearchStats',
  props: {
    totalCount: {
      type: Number,
      required: true
    },
    categoryCount: {
      type: Number,
      required: true
    },
    displayCount: {
      type: Number,
      required: true
    }
  }
}
</script>

<style scoped>
.research-stats {
  display: flex;
  gap: 20px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.stat-item {
  background: rgba(30, 30, 30, 0.6);
  border: 1px solid rgba(244, 165, 96, 0.3);
  border-radius: 10px;
  padding: 15px;
  min-width: 100px;
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

/* Enhanced Mobile Responsiveness */
@media (max-width: 768px) {
  .research-stats {
    gap: 15px;
    justify-content: center;
  }
  
  .stat-item {
    min-width: 90px;
    padding: 12px;
  }
  
  .stat-value {
    font-size: 1.6rem;
  }
}

@media (max-width: 576px) {
  .research-stats {
    gap: 10px;
  }
  
  .stat-item {
    min-width: 80px;
    padding: 10px;
    border-radius: 8px;
  }
  
  .stat-value {
    font-size: 1.4rem;
    margin-bottom: 3px;
  }
  
  .stat-label {
    font-size: 0.75rem;
  }
}

@media (max-width: 380px) {
  .stat-item {
    padding: 8px;
    min-width: 70px;
  }
  
  .stat-value {
    font-size: 1.2rem;
  }
  
  .stat-label {
    font-size: 0.7rem;
  }
}
</style> 