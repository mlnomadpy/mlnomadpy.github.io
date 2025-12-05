<template>
  <div class="blogs view-container">
    <div class="section-content scrollable-content smooth-scroll">
      <h1 class="resp-heading">Blogs</h1>
      
      <div class="blogs-container">
        <ConstructionMessage />
      </div>
    </div>
  </div>
</template>

<script>
import ConstructionMessage from '@/components/blogs/ConstructionMessage.vue';

export default {
  name: 'BlogsView',
  components: {
    ConstructionMessage
  }
}
</script>

<style scoped>
@import '@/components/research/responsive-utils.css';

.view-container {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.scrollable-content {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
}

.blogs {
  padding: 20px;
  min-height: 100vh;
}

.section-content h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5rem;
  color: var(--primary-text);
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.blogs-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
}
</style>