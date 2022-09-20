// import Vue from 'vue';
import request from '@/config/https'
import createPersistedState from 'vuex-persistedstate';

// import router from '@/router'

// import "toastify-js/src/toastify.css"
// import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        wishlist: [],
        shipping_zones: [],
        orders: [],
        single_order: {}
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        allWishlist: state => {
            return state.wishlist;
        },
        allShippingZones: state => {
            return state.shipping_zones
        },
        allOrders: state => {
            return state.orders
        },
        singleOrder: state => {
            return state.single_order
        }
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        ADD_WISHLIST_ITEM: (state, data) => {
            state.wishlist = data
        },
        SHIPPING_ZONES: (state, data) => {
            state.shipping_zones = data
        },
        SET_ORDERS: (state, data) => {
            state.orders = data
        },
        SET_ORDER_BY_ID: (state, data) => {
            state.single_order = data
        }
    },
    actions: {
        // Get Shipping Zones
        getShippingZones({ commit }) {
            request().get('/all-shipping-zones')
                .then((res) => {
                    console.log(res.data.shipping_zones.data);
                    commit("SHIPPING_ZONES", res.data.shipping_zones.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        },


        // Get Orders
        getOrders({ commit }) {
            request().get('/user-orders')
                .then((res) => {
                    console.log(res.data);
                    commit("SET_ORDERS", res.data.orders.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        // Get Order By Id
        getOrderByID({ commit }, id) {
            request().get('/find-order/' + id)
                .then((res) => {
                    console.log(res.data);
                    commit("SET_ORDER_BY_ID", res.data.order)
                })
                .catch((err) => {
                    console.log(err);
                })
        },
    }
};