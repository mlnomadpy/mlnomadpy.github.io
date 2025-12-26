<template>
  <div class="error-container">
    <div class="error-icon">
      <i class="fas fa-exclamation-circle"></i>
    </div>
    <h3>{{ message }}</h3>
    <button @click="$emit('retry')" class="retry-btn">
      <i class="fas fa-redo"></i>
      Retry
    </button>
  </div>
</template>

<script>
export default {
  name: 'ErrorDisplay',
  props: {
    message: {
      type: String,
      default: 'Something went wrong. Please try again.'
    }
  }
}
</script>

<style scoped>
.error-container {
  text-align: center;
  padding: 50px 20px;
  background: rgba(30, 30, 30, 0.6);
  border-radius: 12px;
  border: 1px dashed rgba(244, 165, 96, 0.3);
}

.error-icon {
  font-size: 3rem;
  color: #ff6b6b;
  margin-bottom: 20px;
}

.error-container h3 {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 20px;
}

.retry-btn {
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
  margin-top: 20px;
}

.retry-btn:hover {
  background: rgba(244, 165, 96, 0.3);
  transform: translateY(-3px);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .error-container {
    padding: 40px 20px;
  }
  
  .error-icon {
    font-size: 2.5rem;
  }
  
  .error-container h3 {
    font-size: 1.3rem;
  }
}

@media (max-width: 576px) {
  .error-container {
    padding: 30px 15px;
  }
  
  .error-icon {
    font-size: 2rem;
  }
  
  .retry-btn {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
}
</style> 