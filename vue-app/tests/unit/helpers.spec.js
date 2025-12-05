import { describe, it, expect } from 'vitest'
import {
  formatDate,
  debounce,
  throttle,
  isValidEmail,
  truncateText,
  generateId,
} from '@/utils/helpers'

describe('Helper Functions', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = '2024-01-15'
      const formatted = formatDate(date)
      expect(formatted).toContain('2024')
      expect(formatted).toContain('January')
    })

    it('accepts custom options', () => {
      const date = '2024-01-15'
      const formatted = formatDate(date, { year: 'numeric', month: 'short' })
      expect(formatted).toContain('2024')
      expect(formatted).toContain('Jan')
    })
  })

  describe('debounce', () => {
    it('delays function execution', async () => {
      let counter = 0
      const increment = () => counter++
      const debouncedIncrement = debounce(increment, 100)

      debouncedIncrement()
      debouncedIncrement()
      debouncedIncrement()

      expect(counter).toBe(0)

      await new Promise(resolve => setTimeout(resolve, 150))
      expect(counter).toBe(1)
    })
  })

  describe('throttle', () => {
    it('limits function execution', async () => {
      let counter = 0
      const increment = () => counter++
      const throttledIncrement = throttle(increment, 100)

      throttledIncrement()
      throttledIncrement()
      throttledIncrement()

      expect(counter).toBe(1)

      await new Promise(resolve => setTimeout(resolve, 150))
      throttledIncrement()
      expect(counter).toBe(2)
    })
  })

  describe('isValidEmail', () => {
    it('validates correct email', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name@domain.co.uk')).toBe(true)
    })

    it('rejects invalid email', () => {
      expect(isValidEmail('invalid')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
      expect(isValidEmail('test @example.com')).toBe(false)
    })
  })

  describe('truncateText', () => {
    it('truncates long text', () => {
      const text = 'This is a very long text that should be truncated'
      const truncated = truncateText(text, 20)
      expect(truncated.length).toBeLessThan(text.length)
      expect(truncated).toContain('...')
    })

    it('does not truncate short text', () => {
      const text = 'Short text'
      const truncated = truncateText(text, 20)
      expect(truncated).toBe(text)
      expect(truncated).not.toContain('...')
    })
  })

  describe('generateId', () => {
    it('generates unique IDs', () => {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toBe(id2)
      expect(typeof id1).toBe('string')
      expect(typeof id2).toBe('string')
    })
  })
})
