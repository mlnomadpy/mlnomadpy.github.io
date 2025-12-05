import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

describe('HomeView', () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: HomeView },
      { path: '/about', component: { template: '<div>About</div>' } },
      { path: '/research', component: { template: '<div>Research</div>' } },
    ],
  })

  it('renders properly', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.find('.home-view').exists()).toBe(true)
  })

  it('displays hero section', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.find('.hero-section').exists()).toBe(true)
    expect(wrapper.find('.hero-title').text()).toBe('Taha Bouhsine')
    expect(wrapper.find('.hero-subtitle').text()).toContain('ML Researcher')
  })

  it('displays highlights section', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    })
    const highlights = wrapper.findAll('.highlight-card')
    expect(highlights.length).toBeGreaterThan(0)
  })

  it('has call-to-action buttons', () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [router],
      },
    })
    const buttons = wrapper.findAll('.hero-actions a')
    expect(buttons.length).toBeGreaterThan(0)
  })
})
