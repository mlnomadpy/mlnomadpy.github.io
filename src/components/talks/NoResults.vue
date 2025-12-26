<template>
  <div class="no-talks-found">
    <div class="no-results-icon">
      <i class="fas fa-search"></i>
    </div>
    <h3>No matching talks found</h3>
    <p>Try adjusting your search or filters to find what you're looking for.</p>
    <button @click="$emit('reset')" class="reset-filters-btn">
      <i class="fas fa-redo"></i>
      Reset Filters
    </button>
  </div>
</template>

<script>
export default {
  name: 'NoResults'
}
</script>

<style scoped>
.no-talks-found {
  text-align: center;
  padding: 50px 20px;
  background: rgba(30, 30, 30, 0.6);
  border-radius: 12px;
  border: 1px dashed rgba(244, 165, 96, 0.3);
  margin-top: 30px;
}

.no-results-icon {
  font-size: 3rem;
  color: rgba(244, 165, 96, 0.5);
  margin-bottom: 20px;
}

.no-talks-found h3 {
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 10px;
}

.no-talks-found p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 25px;
}

.reset-filters-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(244, 165, 96, 0.15);
  border: none;
  color: var(--accent-color);
  padding: 12px 25px;
  border-radius: 30px;
  font-family: "Space Mono", monospace;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-filters-btn:hover {
  background: rgba(244, 165, 96, 0.3);
  transform: translateY(-3px);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .no-talks-found {
    padding: 40px 15px;
  }
  
  .no-results-icon {
    font-size: 2.5rem;
  }
  
  .no-talks-found h3 {
    font-size: 1.5rem;
  }
}

@media (max-width: 576px) {
  .no-talks-found {
    padding: 30px 15px;
  }
  
  .no-results-icon {
    font-size: 2rem;
    margin-bottom: 15px;
  }
  
  .no-talks-found h3 {
    font-size: 1.3rem;
  }
  
  .no-talks-found p {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
  
  .reset-filters-btn {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}

@media (max-width: 380px) {
  .reset-filters-btn {
    padding: 8px 16px;
    font-size: 0.85rem;
  }
}
</style> 