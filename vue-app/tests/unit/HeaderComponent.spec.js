import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HeaderComponent from '@/components/HeaderComponent.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

describe('HeaderComponent', () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: { template: '<div>Home</div>' } },
      { path: '/about', component: { template: '<div>About</div>' } },
    ],
  })

  it('renders properly', () => {
    const wrapper = mount(HeaderComponent, {
      global: {
        plugins: [router],
      },
    })
    expect(wrapper.find('.header').exists()).toBe(true)
    expect(wrapper.find('.logo h1').text()).toBe('Taha Bouhsine')
  })

  it('displays all navigation links', () => {
    const wrapper = mount(HeaderComponent, {
      global: {
        plugins: [router],
      },
    })
    const links = wrapper.findAll('.nav-links a')
    expect(links.length).toBe(5) // Home, About, Research, Talks, Life
  })

  it('toggles mobile menu when button is clicked', async () => {
    const wrapper = mount(HeaderComponent, {
      global: {
        plugins: [router],
      },
    })
    const menuToggle = wrapper.find('.mobile-menu-toggle')
    const navLinks = wrapper.find('.nav-links')

    expect(navLinks.classes()).not.toContain('active')
    await menuToggle.trigger('click')
    expect(navLinks.classes()).toContain('active')
    await menuToggle.trigger('click')
    expect(navLinks.classes()).not.toContain('active')
  })

  it('closes mobile menu when a link is clicked', async () => {
    const wrapper = mount(HeaderComponent, {
      global: {
        plugins: [router],
      },
    })
    const menuToggle = wrapper.find('.mobile-menu-toggle')
    const firstLink = wrapper.findAll('.nav-links a')[0]

    await menuToggle.trigger('click')
    expect(wrapper.find('.nav-links').classes()).toContain('active')
    
    await firstLink.trigger('click')
    expect(wrapper.find('.nav-links').classes()).not.toContain('active')
  })
})
