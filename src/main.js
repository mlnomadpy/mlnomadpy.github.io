import { ViteSSG } from 'vite-ssg'
import { createWebHistory, createMemoryHistory } from 'vue-router'
import App from './App.vue'
import { routes } from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/styles.css'
import './assets/styles/responsive.css'
import './assets/styles/mobile.css'
import { Buffer } from 'buffer'

// Polyfill Buffer for client-side usage (required by gray-matter)
if (typeof window !== 'undefined') {
  window.Buffer = Buffer;
}

const history = import.meta.env.SSR
  ? createMemoryHistory(import.meta.env.BASE_URL)
  : createWebHistory(import.meta.env.BASE_URL)

export const createApp = ViteSSG(
  App,
  {
    routes,
    base: import.meta.env.BASE_URL,
    history
  },
  ({ app, router, routes, isClient, initialState }) => {
    // install plugins etc.
  }
)