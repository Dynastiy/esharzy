import Vue from 'vue'
import VueRouter from 'vue-router'
import Wholesale from '../views/wholesale/wholesaleLayout'

import authRoutes from '../views/auth/router'
import showcaseRoutes from '../views/showcase/router'
import buyerRoutes from '../views/user/router'
import VendorRoutes from '../views/vendor/router'

// import store from '@/store/index'

Vue.use(VueRouter)

const routes = [

  // Wholesale page Layout
  {
    path: '/wholesale',
    component: Wholesale,
    children: [{
      path: '/wholesale',
      name: 'wholesale',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/showcase/pages/indexPage.vue')
    }]
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes.concat(
    authRoutes, showcaseRoutes, buyerRoutes, VendorRoutes
  ),
  scrollBehavior () {
    return window.scrollTo({ top: 0, behavior: 'smooth' })
  }

})

export default router
