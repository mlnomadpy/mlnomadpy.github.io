<template>
  <div class="no-results">
    <div class="no-results-icon">
      <i class="fas fa-search"></i>
    </div>
    <h3>No matching research found</h3>
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
.no-results {
  text-align: center;
  padding: 50px 20px;
  background: rgba(30, 30, 30, 0.6);
  border-radius: 12px;
  border: 1px dashed rgba(244, 165, 96, 0.3);
}

.no-results-icon {
  font-size: 3rem;
  color: rgba(244, 165, 96, 0.5);
  margin-bottom: 20px;
}

.no-results h3 {
  font-size: 1.8rem;
  color: #fff;
  margin-bottom: 10px;
}

.no-results p {
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

/* Enhanced Mobile Responsiveness */
@media (max-width: 768px) {
  .no-results {
    padding: 40px 20px;
  }
  
  .no-results-icon {
    font-size: 2.5rem;
    margin-bottom: 15px;
  }
  
  .no-results h3 {
    font-size: 1.6rem;
  }
}

@media (max-width: 576px) {
  .no-results {
    padding: 30px 15px;
    border-radius: 10px;
  }
  
  .no-results-icon {
    font-size: 2rem;
    margin-bottom: 12px;
  }
  
  .no-results h3 {
    font-size: 1.4rem;
    margin-bottom: 8px;
  }
  
  .no-results p {
    font-size: 0.9rem;
    margin-bottom: 20px;
  }
  
  .reset-filters-btn {
    padding: 10px 20px;
    font-size: 0.9rem;
    border-radius: 25px;
  }
}

@media (max-width: 380px) {
  .no-results {
    padding: 25px 12px;
  }
  
  .no-results-icon {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }
  
  .no-results h3 {
    font-size: 1.2rem;
  }
  
  .no-results p {
    font-size: 0.85rem;
    margin-bottom: 15px;
  }
  
  .reset-filters-btn {
    padding: 8px 16px;
    font-size: 0.85rem;
    gap: 6px;
  }
}
</style> 