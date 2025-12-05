import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable for handling intersection observer (lazy loading, animations)
 * @param {Object} options - Intersection observer options
 * @returns {Object} Intersection observer state and ref
 */
export function useIntersectionObserver(options = {}) {
  const target = ref(null)
  const isIntersecting = ref(false)
  const hasIntersected = ref(false)

  let observer = null

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px',
    ...options,
  }

  const callback = entries => {
    entries.forEach(entry => {
      isIntersecting.value = entry.isIntersecting
      if (entry.isIntersecting && !hasIntersected.value) {
        hasIntersected.value = true
      }
    })
  }

  onMounted(() => {
    if (target.value) {
      observer = new IntersectionObserver(callback, defaultOptions)
      observer.observe(target.value)
    }
  })

  onUnmounted(() => {
    if (observer && target.value) {
      observer.unobserve(target.value)
      observer.disconnect()
    }
  })

  return {
    target,
    isIntersecting,
    hasIntersected,
  }
}
