import Vue from 'vue'
import VueRouter from 'vue-router'
import VendorView from '../views/vendor/vendorLayout'
// import AuthView from '../views/auth/authLayout'
import Wholesale from '../views/wholesale/wholesaleLayout'

import authRoutes from '../views/auth/router'
import showcaseRoutes from '../views/showcase/router'
import buyerRoutes from '../views/user/router'

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

  // Vendor Layout
  {
    path: '/vendor',
    async beforeEnter (to, from, next) {
      const
        loggedIn = localStorage.getItem('token')
      console.log(loggedIn)
      if (!loggedIn) {
        next({
          path: '/login',
          query: { redirectFrom: to.fullPath }
        })
      } else {
        next()
      }
    },
    name: 'vendor',
    component: VendorView,
    children: [{
      path: '/vendor',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/vendor/pages/indexPage.vue')
    },
    {
      path: '/vendor/all-products',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/vendor/pages/products/indexPage.vue')
    },
    {
      path: '/vendor/add-product',
      name: 'add-product',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/vendor/pages/products/addProduct.vue')
    },
    {
      path: '/vendor/edit-product',
      name: 'edit-product',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/vendor/pages/products/components/editProduct.vue')
    },
    {
      path: '/vendor/product/:slug',
      name: 'vendor-product-detail',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/vendor/pages/products/_id.vue')
    },

    {
      path: '/orders',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/vendor/pages/orders/indexPage.vue')
    },
    {
      path: '/payouts',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/vendor/pages/payouts/indexPage.vue')
    },
    {
      path: '/vendor/settings',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/vendor/pages/settings/indexPage.vue')
    },
    {
      path: '/vendor/applications/:id',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/vendor/pages/settings/components/singleApplication.vue')
    },
    {
      path: '/vendor/manufacturer-applications/:id',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/vendor/pages/settings/components/manufacturerSingleApplication.vue')
    },
    {
      path: '/transactions',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ '../views/vendor/pages/transactions/indexPage.vue')
    }
    ]
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
    authRoutes, showcaseRoutes, buyerRoutes
  ),
  scrollBehavior () {
    return window.scrollTo({ top: 0, behavior: 'smooth' })
  }

})

export default router
