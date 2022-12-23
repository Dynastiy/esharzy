// import store from '../../../store'

const Buyer = () =>
  import('../pages/indexPage.vue')
const OrderHistory = () =>
  import('../pages/orderHistory.vue')
const SingleOrder = () =>
  import('../pages/orderId.vue')
const Wishlist = () =>
  import('../pages/wishList.vue')
const VendorApplications = () =>
  import('../pages/vendorApplications.vue')
const Cart = () =>
  import('../pages/cart/indexPage.vue')
const CartPage = () =>
  import('../pages/cart/cartPage.vue')
const CheckOut = () =>
  import('../pages/cart/checkOut.vue')
const VendorApplication = () =>
  import('../pages/applicationID.vue')

export default [{
  path: '/buyer',
  async beforeEnter (to, from, next) {
    let loggedIn = ''
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
  component: Buyer,
  name: 'buyer',
  meta: {
    layout: 'userLayout'
  }
},

{
  path: '/buyer/order-history',
  async beforeEnter (to, from, next) {
    let loggedIn = ''
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
  component: OrderHistory,
  name: 'order-history',
  meta: {
    layout: 'userLayout'
  }
},

{
  path: '/buyer/wishlist',
  async beforeEnter (to, from, next) {
    let loggedIn = ''
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
  component: Wishlist,
  name: 'wishlist',
  meta: {
    layout: 'userLayout'
  }
},

{
  path: '/order-history/single-order',
  async beforeEnter (to, from, next) {
    let loggedIn = ''
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
  component: SingleOrder,
  name: 'single-order',
  meta: {
    layout: 'userLayout'
  }
},

{
  path: '/buyer/vendor-applications',
  async beforeEnter (to, from, next) {
    let loggedIn = ''
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
  component: VendorApplications,
  name: 'vendor-applications',
  meta: {
    layout: 'userLayout'
  }
},

{
  path: '/vendor-application/:id',
  async beforeEnter (to, from, next) {
    let loggedIn = ''
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
  component: VendorApplication,
  name: 'vendor-application',
  meta: {
    layout: 'userLayout'
  }
},

{
  path: '/cart',
  async beforeEnter (to, from, next) {
    let loggedIn = ''
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
  component: Cart,
  children: [
    {
      path: '',
      name: 'cart',
      component: CartPage
    }
  ],
  meta: {
    layout: 'homeLayout'
  }
},

{
  path: '/check-out',
  async beforeEnter (to, from, next) {
    let loggedIn = ''
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
  component: Cart,
  children: [
    {
      path: '',
      name: 'checkout',
      component: CheckOut
    }
  ],
  meta: {
    layout: 'homeLayout'
  }
}

]
