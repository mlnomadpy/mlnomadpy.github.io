// Routes definition
// Router instance is created in main.js using ViteSSG
import HomeView from '../views/HomeView.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/aboutme',
    name: 'aboutme',
    component: () => import('../views/AboutMeView.vue')
  },
  {
    path: '/research',
    name: 'research',
    component: () => import('../views/ResearchView.vue')
  },
  {
    path: '/research/:id',
    name: 'ResearchDetails',
    component: () => import('../views/ResearchDetailsView.vue'),
    props: true
  },
  {
    path: '/talks',
    name: 'talks',
    component: () => import('../views/TalksView.vue')
  },
  {
    path: '/talks/:id',
    name: 'TalkDetails',
    component: () => import('../views/TalkDetailsView.vue'),
    props: true
  },
  {
    path: '/poetry',
    name: 'poetry',
    component: () => import('../views/PoetryView.vue')
  },
  {
    path: '/poetry/:id',
    name: 'PoetryDetails',
    component: () => import('../views/PoetryDetailsView.vue'),
    props: true
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: () => import('../views/BlogsView.vue')
  },
  {
    path: '/blogs/:id',
    name: 'BlogDetails',
    component: () => import('../views/BlogDetailsView.vue'),
    props: true
  },
  {
    path: '/life',
    name: 'life',
    component: () => import('../views/LifeView.vue')
  }
]