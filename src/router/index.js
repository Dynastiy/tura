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

export default router
