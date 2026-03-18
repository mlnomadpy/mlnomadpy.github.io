// Routes definition
// Router instance is created in main.js using ViteSSG
import HomeView from '../views/HomeView.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { index: 0 }
  },
  {
    path: '/aboutme',
    name: 'aboutme',
    component: () => import('../views/AboutMeView.vue'),
    meta: { index: 1 }
  },
  {
    path: '/talks',
    name: 'talks',
    component: () => import('../views/TalksView.vue'),
    meta: { index: 2 }
  },
  {
    path: '/talks/:id',
    name: 'TalkDetails',
    component: () => import('../views/TalkDetailsView.vue'),
    props: true,
    meta: { index: 2, isDetail: true }
  },
  {
    path: '/poetry',
    name: 'poetry',
    component: () => import('../views/PoetryView.vue'),
    meta: { index: 3 }
  },
  {
    path: '/poetry/:id',
    name: 'PoetryDetails',
    component: () => import('../views/PoetryDetailsView.vue'),
    props: true,
    meta: { index: 3, isDetail: true }
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: () => import('../views/BlogsView.vue'),
    meta: { index: 4 }
  },
  {
    path: '/blogs/:id',
    name: 'BlogDetails',
    component: () => import('../views/BlogDetailsView.vue'),
    props: true,
    meta: { index: 4, isDetail: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/NotFoundView.vue'),
    meta: { index: 99 }
  }
]