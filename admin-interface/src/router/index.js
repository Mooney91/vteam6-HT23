import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CityView from '../views/CityView.vue'
import ScooterView from '../views/ScooterView.vue'
import RentalView from '../views/RentalView.vue'
import UserView from '../views/UserView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/city',
      name: 'Cities',
      component: CityView
    },
    {
      path: '/scooter',
      name: 'Scooters',
      component: ScooterView
    },
    {
      path: '/rental',
      name: 'Rental Log',
      component: RentalView
    },
    {
      path: '/user',
      name: 'Users',
      component: UserView
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
