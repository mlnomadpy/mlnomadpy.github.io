import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable for scroll-triggered entrance animations.
 * Uses IntersectionObserver to add animation classes when elements enter the viewport.
 *
 * @param {Object} options
 * @param {string} options.animation - Animation type: 'fade-up', 'fade-left', 'fade-right', 'scale-in'
 * @param {number} options.threshold - Intersection threshold (0-1)
 * @param {string} options.rootMargin - Root margin for observer
 * @param {boolean} options.once - Only animate once (default true)
 * @returns {Object} { target, isVisible, hasAnimated }
 */
export function useScrollAnimation(options = {}) {
  const target = ref(null)
  const isVisible = ref(false)
  const hasAnimated = ref(false)

  const {
    threshold = 0.15,
    rootMargin = '0px 0px -50px 0px',
    once = true
  } = options

  let observer = null

  onMounted(() => {
    // Skip on SSR
    if (typeof window === 'undefined') return

    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isVisible.value = true
      hasAnimated.value = true
      return
    }

    if (!target.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isVisible.value = true
            hasAnimated.value = true
            if (once && observer) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            isVisible.value = false
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(target.value)
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    target,
    isVisible,
    hasAnimated
  }
}

/**
 * Directive-style helper for staggered list animations.
 * Call in a v-for with the index to get per-item delay.
 *
 * @param {number} index - Item index in the list
 * @param {number} baseDelay - Base delay per item in ms (default 60)
 * @param {number} maxDelay - Maximum delay cap in ms (default 600)
 * @returns {Object} Style object with transition-delay
 */
export function staggerDelay(index, baseDelay = 60, maxDelay = 600) {
  const delay = Math.min(index * baseDelay, maxDelay)
  return { transitionDelay: `${delay}ms` }
}
