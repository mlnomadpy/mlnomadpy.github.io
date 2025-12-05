import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable for handling responsive behavior
 * @returns {Object} Reactive responsive state
 */
export function useResponsive() {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)
  const windowWidth = ref(window.innerWidth)

  const updateDimensions = () => {
    windowWidth.value = window.innerWidth
    isMobile.value = windowWidth.value < 768
    isTablet.value = windowWidth.value >= 768 && windowWidth.value < 1024
    isDesktop.value = windowWidth.value >= 1024
  }

  onMounted(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateDimensions)
  })

  return {
    isMobile,
    isTablet,
    isDesktop,
    windowWidth,
  }
}
