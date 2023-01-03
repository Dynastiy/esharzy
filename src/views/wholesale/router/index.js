const Home = () =>
  import('../pages/indexPage.vue')
const ProductDetails = () =>
  import('../pages/details/productDetails.vue')
const Shop = () =>
  import('../pages/allProducts.vue')
const Stores = () =>
  import('../pages/storeListing.vue')
const StoreDetails = () =>
  import('../pages/details/storeDetails.vue')
const CategoryDetails = () =>
  import('../pages/details/categoryDetails.vue')
const PrivacyPolicy = () =>
  import('../pages/privacyPolicy.vue')
const TermsAndConditions = () =>
  import('../pages/termsAndConditions.vue')
const RefundPolicy = () =>
  import('../pages/refundPolicy.vue')

// Auth
const Login = () =>
  import('@/views/auth/pages/loginPage.vue')
const Register = () =>
  import('@/views/auth/pages/registerPage.vue')

// Buyer Routes
const Buyer = () =>
  import('@/views/user/pages/indexPage.vue')
const OrderHistory = () =>
  import('@/views/user/pages/orderHistory.vue')
const SingleOrder = () =>
  import('@/views/user/pages/orderId.vue')
const Wishlist = () =>
  import('@/views/user/pages/wishList.vue')
const VendorApplications = () =>
  import('@/views/user/pages/vendorApplications.vue')
const Cart = () =>
  import('@/views/user/pages/cart/indexPage.vue')
const CartPage = () =>
  import('@/views/user/pages/cart/cartPage.vue')
const CheckOut = () =>
  import('@/views/user/pages/cart/checkOut.vue')
const VendorApplication = () =>
  import('@/views/user/pages/applicationID.vue')

export default [{
  path: '/wholesale',
  component: Home,
  name: 'home-page',
  meta: {
    layout: 'WholesaleLayout',
    parent: 'wholesale'
  }
},
{
  path: '/wholesale/shop',
  component: Shop,
  name: 'all-products',
  meta: {
    layout: 'WholesaleLayout',
    parent: 'shop'
  }
},
{
  path: '/wholesale/product/:slug',
  component: ProductDetails,
  name: 'product-details',
  meta: {
    layout: 'WholesaleLayout',
    parent: 'shop'
  }
},
{
  path: '/wholesale/store-listing',
  component: Stores,
  name: 'store-listing',
  meta: {
    layout: 'WholesaleLayout',
    parent: 'vendor'
  }
},
{
  path: '/wholesale/store-listing/:slug',
  component: StoreDetails,
  name: 'store-details',
  meta: {
    layout: 'WholesaleLayout',
    parent: 'vendor'
  }
},
{
  path: '/wholesale/category/:slug',
  component: CategoryDetails,
  name: 'category-details',
  meta: {
    layout: 'WholesaleLayout',
    parent: 'home'
  }
},
{
  path: '/wholesale/privacy-policy',
  component: PrivacyPolicy,
  name: 'privacy-policy',
  meta: {
    layout: 'WholesaleLayout'
  }
},
{
  path: '/wholesale/terms-and-conditions',
  component: TermsAndConditions,
  name: 'terms-and-conditions',
  meta: {
    layout: 'WholesaleLayout'
  }
},
{
  path: '/wholesale/refund-policy',
  component: RefundPolicy,
  name: 'refund-policy',
  meta: {
    layout: 'WholesaleLayout'
  }
},

// Auth Routes
{
  path: '/user-login',
  component: Login,
  name: 'login',
  meta: {
    layout: 'authLayout'
  }
},
{
  path: '/user-register',
  name: 'register',
  component: Register,
  meta: {
    layout: 'authLayout'
  }
},

// User Routes
{
  path: '/wholesale/buyer',
  async beforeEnter (to, from, next) {
    let loggedIn = ''
    loggedIn = localStorage.getItem('token')
    console.log(loggedIn)
    if (!loggedIn) {
      next({
        path: '/user-login',
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
  path: '/wholesale/buyer/order-history',
  async beforeEnter (to, from, next) {
    let loggedIn = ''
    loggedIn = localStorage.getItem('token')
    console.log(loggedIn)
    if (!loggedIn) {
      next({
        path: '/user-login',
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
  path: '/wholesale/buyer/wishlist',
  async beforeEnter (to, from, next) {
    let loggedIn = ''
    loggedIn = localStorage.getItem('token')
    console.log(loggedIn)
    if (!loggedIn) {
      next({
        path: '/user-login',
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
  path: '/wholesale/order-history/single-order',
  async beforeEnter (to, from, next) {
    let loggedIn = ''
    loggedIn = localStorage.getItem('token')
    console.log(loggedIn)
    if (!loggedIn) {
      next({
        path: '/luser-ogin',
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
  path: '/wholesale/buyer/vendor-applications',
  async beforeEnter (to, from, next) {
    let loggedIn = ''
    loggedIn = localStorage.getItem('token')
    console.log(loggedIn)
    if (!loggedIn) {
      next({
        path: '/user-login',
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
  path: '/wholesale/vendor-application/:id',
  async beforeEnter (to, from, next) {
    let loggedIn = ''
    loggedIn = localStorage.getItem('token')
    console.log(loggedIn)
    if (!loggedIn) {
      next({
        path: '/user-login',
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
  path: '/wholesale/cart',
  async beforeEnter (to, from, next) {
    let loggedIn = ''
    loggedIn = localStorage.getItem('token')
    console.log(loggedIn)
    if (!loggedIn) {
      next({
        path: '/user-login',
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
        path: '/user-login',
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
