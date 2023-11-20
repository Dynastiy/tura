import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from "./dashboard"
import Auth from "./auth"

Vue.use(VueRouter)

const routes = []

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes.concat(Dashboard, Auth)
})

router.beforeEach((to, from, next) => {
  var isLoggedIn = localStorage.getItem('tura_token');
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is authenticated
    if (!isLoggedIn) {
      // Redirect to the login page
      next({ path: '/sign-in', query: { redirectFrom: to.fullPath } })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
