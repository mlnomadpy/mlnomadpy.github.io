import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Home - Taha Bouhsine',
      description: 'Welcome to Taha Bouhsine\'s portfolio',
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: 'About - Taha Bouhsine',
      description: 'Learn more about Taha Bouhsine',
    },
  },
  {
    path: '/research',
    name: 'research',
    component: () => import('@/views/ResearchView.vue'),
    meta: {
      title: 'Research - Taha Bouhsine',
      description: 'Research papers and academic contributions',
    },
  },
  {
    path: '/talks',
    name: 'talks',
    component: () => import('@/views/TalksView.vue'),
    meta: {
      title: 'Talks - Taha Bouhsine',
      description: 'Talks, presentations, and workshops',
    },
  },
  {
    path: '/life',
    name: 'life',
    component: () => import('@/views/LifeView.vue'),
    meta: {
      title: 'Life - Taha Bouhsine',
      description: 'Timeline of important life events',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: {
      title: '404 - Page Not Found',
      description: 'The page you are looking for does not exist',
    },
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0, behavior: 'smooth' }
  },
})

// Navigation guards for SEO meta tags
router.beforeEach((to, from, next) => {
  // Update document title
  const title = to.meta.title || 'Taha Bouhsine | ML Researcher'
  document.title = title

  // Update meta description
  const description =
    to.meta.description || 'Machine Learning Researcher & Google Developer Expert'
  let metaDescription = document.querySelector('meta[name="description"]')
  if (metaDescription) {
    metaDescription.setAttribute('content', description)
  }

  next()
})

export default router
