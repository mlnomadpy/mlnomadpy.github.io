<template>
  <div class="blogs view-container">
    <div class="section-content scrollable-content">
      <h1>blogs</h1>
      <div class="blogs-container">
        <p>Blog content coming soon...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogsView'
}
</script>

<style scoped>
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

.section-content h1 {
  text-align: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  position: relative;
  font-size: 2.5rem;
}

.section-content h1::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 3px;
  background: var(--accent-color);
}

.blogs-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  font-family: "Space Mono", monospace;
  background: linear-gradient(to bottom, rgba(65, 44, 15, 0.6), rgba(65, 44, 15, 0.9));
  border-radius: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  text-align: center;
}
</style> 