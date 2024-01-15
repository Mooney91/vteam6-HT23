import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AuthCallbackView from '../views/AuthCallbackView.vue'
import LogoutView from '../views/LogoutView.vue'

import AboutView from '../views/AboutView.vue'
import AccountView from '../views/AccountView.vue'
import TravelView from '../views/TravelView.vue'
import PaymentView from '../views/PaymentView.vue'


import entryMiddleware from '../middleware/auth.js';
import logoutMiddleware from '../middleware/logout.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/authCallback',
      name: 'authCallback',
      component: AuthCallbackView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView,
      beforeEnter: (to, from, next) => logoutMiddleware({ next, router })
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
      beforeEnter: (to, from, next) => entryMiddleware({ next, router })
    },
    {
      path: '/travel',
      name: 'travel',
      component: TravelView,
      beforeEnter: (to, from, next) => entryMiddleware({ next, router })
    },
    {
      path: '/payment',
      name: 'payment',
      component: PaymentView,
      beforeEnter: (to, from, next) => entryMiddleware({ next, router })
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      beforeEnter: (to, from, next) => entryMiddleware({ next, router })
    }
  ]
})

export default router
