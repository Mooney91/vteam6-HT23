import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BigMapView from '../views/BigMapView.vue'
import CityView from '../views/CityView.vue'
import CitySingle from '../views/CitySingle.vue'
import ScooterView from '../views/ScooterView.vue'
import ChargingView from '../views/ChargingView.vue'
import ParkingView from '../views/ParkingView.vue'
import RentalView from '../views/RentalView.vue'
import UserView from '../views/UserView.vue'
import UserSingle from '../views/UserSingle.vue'
import SettingsView from '../views/SettingsView.vue'

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
      path: '/city/:id',
      name: 'CitySingle',
      component: CitySingle,
      props: true
    },
    {
      path: '/scooter',
      name: 'Scooters',
      component: ScooterView
    },
    {
      path: '/parking',
      name: 'Parking',
      component: ParkingView
    },
    {
      path: '/charging',
      name: 'Charging',
      component: ChargingView
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
    {
      path: '/user/:id',
      name: 'UserSingle',
      component: UserSingle,
      props: true
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsView
    },
    {
      path: '/map',
      name: 'BigMap',
      component: BigMapView,
    }
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
