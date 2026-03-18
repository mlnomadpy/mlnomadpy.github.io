import { ref, onMounted, onUnmounted } from 'vue'
import { debounce } from '@/utils/helpers'

/**
 * Composable for handling responsive behavior
 * @returns {Object} Reactive responsive state
 */
export function useResponsive() {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)
  const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const prefersReducedMotion = ref(false)

  const updateDimensions = () => {
    windowWidth.value = window.innerWidth
    isMobile.value = windowWidth.value < 768
    isTablet.value = windowWidth.value >= 768 && windowWidth.value < 1024
    isDesktop.value = windowWidth.value >= 1024
  }

  const debouncedUpdate = debounce(updateDimensions, 150)

  onMounted(() => {
    updateDimensions()
    window.addEventListener('resize', debouncedUpdate)

    // Check reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.value = motionQuery.matches
    motionQuery.addEventListener('change', (e) => {
      prefersReducedMotion.value = e.matches
    })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', debouncedUpdate)
  })

  return {
    isMobile,
    isTablet,
    isDesktop,
    windowWidth,
    prefersReducedMotion,
  }
}
