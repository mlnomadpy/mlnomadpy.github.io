<template>
  <div class="lazy-image-wrapper" :class="{ 'is-loaded': loaded, 'has-error': error }">
    <div v-if="!loaded && !error" class="lazy-image-placeholder skeleton"></div>
    <img
      v-show="loaded"
      :src="src"
      :alt="alt"
      loading="lazy"
      decoding="async"
      @load="onLoad"
      @error="onError"
      class="lazy-image"
    >
    <div v-if="error" class="lazy-image-fallback">
      <i class="fas fa-image" aria-hidden="true"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LazyImage',
  props: {
    src: { type: String, required: true },
    alt: { type: String, default: '' }
  },
  data() {
    return {
      loaded: false,
      error: false
    }
  },
  methods: {
    onLoad() {
      this.loaded = true
    },
    onError() {
      this.error = true
    }
  }
}
</script>

<style scoped>
.lazy-image-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.lazy-image-placeholder {
  width: 100%;
  height: 100%;
  min-height: 120px;
}

.lazy-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.is-loaded .lazy-image {
  opacity: 1;
}

.lazy-image-fallback {
  width: 100%;
  height: 100%;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.03);
  color: rgba(255, 255, 255, 0.2);
  font-size: 2rem;
}
</style>
