/**
 * Format a date string to a more readable format
 * @param {string} dateString - ISO date string
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date
 */
export const formatDate = (dateString, options = {}) => {
  const date = new Date(dateString)
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(date)
}

/**
 * Debounce function to limit function calls
 * @param {Function} fn - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (fn, delay = 300) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

/**
 * Throttle function to limit function calls
 * @param {Function} fn - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (fn, limit = 300) => {
  let inThrottle
  return (...args) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Check if an email is valid
 * @param {string} email - Email to validate
 * @returns {boolean} Whether the email is valid
 */
export const isValidEmail = email => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Truncate text to a specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Generate a unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Format a talk/event date string to MM/YYYY format
 * @param {string} dateStr - Date string (ISO, "Month Year", etc.)
 * @returns {string} Formatted date or original string
 */
export const formatTalkDate = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return dateStr
  try {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const monthYearMatch = dateStr.match(/([A-Za-z]+)\s+(\d{4})/)
    if (monthYearMatch) {
      const monthName = monthYearMatch[1]
      const month = months.findIndex(m => m.toLowerCase().startsWith(monthName.toLowerCase())) + 1
      const year = monthYearMatch[2]
      return `${month < 10 ? '0' + month : month}/${year}`
    }
    const date = new Date(dateStr)
    if (!isNaN(date.getTime())) {
      return `${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}/${date.getFullYear()}`
    }
    return dateStr
  } catch (e) {
    return dateStr
  }
}

/**
 * Extract YouTube video ID from various URL formats
 * @param {string} url - YouTube URL
 * @returns {string|null} Video ID or null
 */
export const extractYouTubeId = (url) => {
  if (!url) return null
  let videoId = null
  if (url.includes('v=')) {
    videoId = url.split('v=')[1]
    const ampersandPosition = videoId.indexOf('&')
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition)
    }
  } else if (url.includes('youtu.be/')) {
    videoId = url.split('youtu.be/')[1]
  } else if (url.includes('embed/')) {
    videoId = url.split('embed/')[1]
  }
  return videoId
}

/**
 * Get thumbnail URL for a talk
 * @param {Object} talk - Talk object with image/thumbnail/video fields
 * @returns {string} Thumbnail URL
 */
export const getTalkThumbnail = (talk) => {
  if (talk.image && talk.image.trim() !== '') return talk.image
  if (talk.thumbnail && talk.thumbnail.trim() !== '') return talk.thumbnail
  if (talk.video && talk.video.includes('youtube')) {
    const videoId = extractYouTubeId(talk.video)
    if (videoId) return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }
  return 'https://i.imgur.com/TwYAtdu.png'
}
