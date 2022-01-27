import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import TestingPage from '@/views/TestingPage.vue'
import addItem from '@/views/AddItem.vue'
import Search from '../views/Search.vue'
import Login from '@/views/Login.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Search',
    name: 'Search',
    component: Search
  },
  {
    path: '/test',
    name: 'Test',
    component: TestingPage
  },
  {
    path: '/addItem',
    name: 'Add Item',
    component: addItem
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/shelf',
    name: 'Shelf',
    component: () => import(/* webpackChunkName: "about" */ '../components/Shelf.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../components/Register.vue')
  },
  {
    path: '/MAC',
    name: 'MACAdress',
    component: () => import('../components/MACAdress.vue')
  },
  {
    path: '/room',
    name: 'Room',
    component: () => import('../components/Room.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../components/Settings.vue')
  },
  {
    path: '/about',
    name: 'AboutUs',
    component: () => import('../components/AboutUs.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.path)
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')
  console.log(localStorage.getItem('user'))
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})
export default router
