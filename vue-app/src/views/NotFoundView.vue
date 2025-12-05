<template>
  <div class="not-found-view">
    <div class="container">
      <div class="content">
        <h1 class="error-code">404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        <router-link to="/" class="btn-home">Go Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMeta } from '@/composables/useMeta'

const { setPageMeta } = useMeta()

onMounted(() => {
  setPageMeta({
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist',
  })
})
</script>

<style scoped>
.not-found-view {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.container {
  max-width: 600px;
  text-align: center;
}

.error-code {
  font-size: 8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.content h2 {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 1rem;
}

.content p {
  color: #999;
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.btn-home {
  display: inline-block;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-home:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }

  .content h2 {
    font-size: 1.5rem;
  }
}
</style>
