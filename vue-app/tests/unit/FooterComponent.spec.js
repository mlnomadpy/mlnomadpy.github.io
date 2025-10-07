import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FooterComponent from '@/components/FooterComponent.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

describe('FooterComponent', () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/', component: { template: '<div>Home</div>' } }],
  })

  it('renders properly', () => {
    const wrapper = mount(FooterComponent, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.find('.footer').exists()).toBe(true)
  })

  it('displays current year in copyright', () => {
    const wrapper = mount(FooterComponent, {
      global: {
        plugins: [router],
      },
    })
    const currentYear = new Date().getFullYear()
    expect(wrapper.text()).toContain(currentYear.toString())
  })

  it('displays social links', () => {
    const wrapper = mount(FooterComponent, {
      global: {
        plugins: [router],
      },
    })
    const socialLinks = wrapper.findAll('.social-links a')
    expect(socialLinks.length).toBeGreaterThan(0)
  })

  it('social links have proper attributes', () => {
    const wrapper = mount(FooterComponent, {
      global: {
        plugins: [router],
      },
    })
    const firstSocialLink = wrapper.findAll('.social-links a')[0]
    expect(firstSocialLink.attributes('target')).toBe('_blank')
    expect(firstSocialLink.attributes('rel')).toBe('noopener noreferrer')
  })
})
