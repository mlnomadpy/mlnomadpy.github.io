import { createRouter, createWebHashHistory } from 'vue-router'
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
    path: '/talks',
    name: 'talks',
    component: () => import('../views/TalksView.vue')
  },
  {
    path: '/poetry',
    name: 'poetry',
    component: () => import('../views/PoetryView.vue')
  },
  {
    path: '/blogs',
    name: 'blogs',
    component: () => import('../views/BlogsView.vue')
  },
  {
    path: '/life',
    name: 'life',
    component: () => import('../views/LifeView.vue')
  }
]