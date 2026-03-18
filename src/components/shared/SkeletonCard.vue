<template>
  <div class="skeleton-card" :class="{ 'skeleton-card--grid': grid }">
    <div v-if="showImage" class="skeleton skeleton-image"></div>
    <div class="skeleton-body">
      <div class="skeleton skeleton-title"></div>
      <div class="skeleton skeleton-text"></div>
      <div class="skeleton skeleton-text skeleton-text--short"></div>
      <div v-if="showTags" class="skeleton-tags">
        <div class="skeleton skeleton-tag"></div>
        <div class="skeleton skeleton-tag"></div>
        <div class="skeleton skeleton-tag"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonCard',
  props: {
    grid: { type: Boolean, default: false },
    showImage: { type: Boolean, default: false },
    showTags: { type: Boolean, default: true }
  }
}
</script>

<style scoped>
.skeleton-card {
  background: var(--card-bg, linear-gradient(135deg, rgba(30, 30, 30, 0.6), rgba(20, 20, 20, 0.8)));
  border-radius: var(--card-radius, 12px);
  border: var(--card-border, 1px solid rgba(244, 165, 96, 0.1));
  overflow: hidden;
}

.skeleton-image {
  width: 100%;
  height: 180px;
}

.skeleton-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.skeleton-title {
  height: 20px;
  width: 75%;
}

.skeleton-text {
  height: 14px;
  width: 100%;
}

.skeleton-text--short {
  width: 50%;
}

.skeleton-tags {
  display: flex;
  gap: 8px;
  margin-top: 4px;
}

.skeleton-tag {
  height: 24px;
  width: 60px;
  border-radius: 12px;
}
</style>
