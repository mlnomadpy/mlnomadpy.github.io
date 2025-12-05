<template>
  <div class="loading-container">
    <div class="loader"></div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    message: {
      type: String,
      default: 'Loading...'
    }
  }
}
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.loader {
  border: 5px solid rgba(244, 165, 96, 0.2);
  border-radius: 50%;
  border-top: 5px solid var(--accent-color);
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-container p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
}

/* Mobile Responsiveness */
@media (max-width: 576px) {
  .loader {
    width: 40px;
    height: 40px;
    border-width: 4px;
  }
  
  .loading-container p {
    font-size: 1rem;
  }
}
</style> 