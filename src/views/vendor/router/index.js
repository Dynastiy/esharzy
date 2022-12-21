function guardMyroute (to, from, next) {
  let isAuthenticated = false
  if (localStorage.getItem('token')) isAuthenticated = true
  else isAuthenticated = false
  if (isAuthenticated) {
    next() // allow to enter route
  } else {
    next({
      name: 'login',
      query: { redirectFrom: to.fullPath }
    })
    // go to '/login';
  }
}

export default [
  {
    path: '/vendor',
    name: 'vendor',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/indexPage.vue'),
    meta: {
      layout: 'vendorLayout'
    },
    beforeEnter: guardMyroute
  },

  {
    path: '/vendor/all-products',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/products/indexPage.vue'),
    meta: {
      layout: 'vendorLayout'
    },
    beforeEnter: guardMyroute
  },
  {
    path: '/vendor/add-product',
    name: 'add-product',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/products/addProduct.vue'),
    meta: {
      layout: 'vendorLayout'
    },
    beforeEnter: guardMyroute
  },
  {
    path: '/vendor/edit-product/:slug',
    name: 'edit-product',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/products/components/editProduct.vue'),
    meta: {
      layout: 'vendorLayout'
    },
    beforeEnter: guardMyroute
  },
  {
    path: '/vendor/product/:slug',
    name: 'vendor-product-detail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/products/_id.vue'),
    meta: {
      layout: 'vendorLayout'
    },
    beforeEnter: guardMyroute
  },

  {
    path: '/orders',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/orders/indexPage.vue'),
    meta: {
      layout: 'vendorLayout'
    },
    beforeEnter: guardMyroute
  },
  {
    path: '/payouts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/payouts/indexPage.vue'),
    meta: {
      layout: 'vendorLayout'
    },
    beforeEnter: guardMyroute
  },
  {
    path: '/vendor/settings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/settings/indexPage.vue'),
    meta: {
      layout: 'vendorLayout'
    },
    beforeEnter: guardMyroute
  },
  {
    path: '/vendor/applications/:id',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/settings/components/singleApplication.vue'),
    meta: {
      layout: 'vendorLayout'
    },
    beforeEnter: guardMyroute
  },
  {
    path: '/vendor/manufacturer-applications/:id',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/settings/components/manufacturerSingleApplication.vue'),
    meta: {
      layout: 'vendorLayout'
    },
    beforeEnter: guardMyroute
  },
  {
    path: '/transactions',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../pages/transactions/indexPage.vue'),
    meta: {
      layout: 'vendorLayout'
    },
    beforeEnter: guardMyroute
  }
]
