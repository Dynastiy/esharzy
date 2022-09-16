import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/showcase/showCaseLayout'
import UserView from '../views/user/userLayout'
import VendorView from '../views/vendor/vendorLayout'
import AuthView from '../views/auth/authLayout'
import Wholesale from '../views/wholesale/wholesaleLayout'

Vue.use(VueRouter)

const routes = [
    // Showcase/Landing page Layout
    {
        path: '/',
        component: HomeView,
        children: [{
                path: '/',
                name: 'home',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/showcase/pages/indexPage.vue')
            },
            {
                path: '/shop',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/showcase/pages/indexView.vue'),
                children: [{
                        path: '/shop',
                        name: 'Shop',
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/showcase/pages/allProducts.vue')
                    },
                    {
                        path: '/store-listing',
                        name: 'Store List',
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/showcase/pages/storeListing.vue')
                    },
                    {
                        path: '/store-listing/:slug',
                        name: 'Store',
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/showcase/pages/storeId.vue')
                    },
                ]
            },

            {
                path: '/product/:slug',
                name: 'product-detail',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/showcase/pages/_id.vue')
            },
            {
                path: '/cart',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/user/pages/cart/indexPage.vue'),
                children: [{
                        path: '/cart',
                        name: 'view-cart',
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/user/pages/cart/cartPage.vue')
                    },

                    {
                        path: '/check-out',
                        name: 'check-out',
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/user/pages/cart/checkOut.vue')
                    }
                ]
            },

        ]
    },

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
                    import ( /* webpackChunkName: "about" */ '../views/showcase/pages/indexPage.vue')
            },
            {
                path: '/shop',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/showcase/pages/indexView.vue'),
                children: [{
                        path: '/shop',
                        name: 'Shop',
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/showcase/pages/allProducts.vue')
                    },
                    {
                        path: '/store-listing',
                        name: 'Store List',
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/showcase/pages/storeListing.vue')
                    },
                    {
                        path: '/store-listing/:slug',
                        name: 'Store',
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/showcase/pages/storeId.vue')
                    },
                ]
            },

            {
                path: '/product/:slug',
                name: 'product-detail',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/showcase/pages/_id.vue')
            },
            {
                path: '/cart',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/user/pages/cart/indexPage.vue'),
                children: [{
                        path: '/cart',
                        name: 'view-cart',
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/user/pages/cart/cartPage.vue')
                    },

                    {
                        path: '/check-out',
                        name: 'check-out',
                        // route level code-splitting
                        // this generates a separate chunk (about.[hash].js) for this route
                        // which is lazy-loaded when the route is visited.
                        component: () =>
                            import ( /* webpackChunkName: "about" */ '../views/user/pages/cart/checkOut.vue')
                    }
                ]
            },

        ]
    },



    // User Layout
    {
        path: '/buyer',
        name: 'user',
        component: UserView,
        children: [{
                path: '/buyer',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/user/pages/indexPage.vue')
            },
            {
                path: '/wishlist',
                name: 'wishlist',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/user/pages/wishList.vue')
            },
            {
                path: '/order-history',
                name: 'order-history',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/user/pages/orderHistory.vue')
            },

        ]
    },

    // Vendor Layout
    {
        path: '/vendor',
        name: 'vendor',
        component: VendorView,
        children: [{
                path: '/vendor',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/vendor/pages/indexPage.vue')
            },
            {
                path: '/vendor/all-products',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/vendor/pages/products/indexPage.vue')
            },
            {
                path: '/vendor/product/:slug',
                name: "vendor-product-detail",
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/vendor/pages/products/_id.vue')
            },
            {
                path: '/add-product',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/vendor/pages/products/addProduct.vue')
            },
            {
                path: '/orders',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/vendor/pages/orders/indexPage.vue')
            },
            {
                path: '/payouts',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/vendor/pages/payouts/indexPage.vue')
            },
            {
                path: '/vendor/profile',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/vendor/pages/profile/indexPage.vue')
            },
        ]
    },

    // Auth Layout
    {
        path: '/login',
        component: AuthView,
        children: [{
                path: '/login',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/auth/pages/loginPage.vue')
            },
            {
                path: '/register',
                name: 'register',
                // route level code-splitting
                // this generates a separate chunk (about.[hash].js) for this route
                // which is lazy-loaded when the route is visited.
                component: () =>
                    import ( /* webpackChunkName: "about" */ '../views/auth/pages/registerPage.vue')
            },
        ]
    },


    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior() {
        return window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    routes
})


export default router