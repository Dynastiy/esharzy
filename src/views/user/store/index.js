// import Vue from 'vue';
import request from '@/config/https'
import createPersistedState from 'vuex-persistedstate'

// import router from '@/router'

import 'toastify-js/src/toastify.css'
import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
  return {
    wishlist: [],
    shipping_zones: [],
    orders: [],
    single_order: {},
    submittedApplication: {},
    submitted: null,
    loading: null,
    kycs: [],
    kyc: {}
  }
}

export default {
  namespaced: true,
  strict: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    allWishlist: state => {
      return state.wishlist
    },
    allShippingZones: state => {
      return state.shipping_zones
    },
    allOrders: state => {
      return state.orders
    },
    singleOrder: state => {
      return state.single_order
    },
    getSubmittedApplication: state => {
      return state.submittedApplication
    },
    isSubmitted: state => {
      return state.submitted
    },
    getKYCs: state => {
      return state.kycs
    },
    getKYC: state => {
      return state.kyc
    },
    isLoading: state => {
      return state.loading
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
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
    SET_SUBMITTED_APPLICATION: (state, data) => {
      state.submittedApplication = data
    },
    SET_SUBMITTED: (state, data) => {
      state.submitted = data
    },
    SET_KYC: (state, data) => {
      state.kyc = data
    },
    SET_KYCS: (state, data) => {
      state.kycs = data
    },
    SET_LOADING: (state, data) => {
      state.loading = data
    },
    SET_ORDER_BY_ID: (state, data) => {
      state.single_order = data
    }
  },
  actions: {
    // Get Shipping Zones
    getShippingZones ({ commit }) {
      request().get('/all-shipping-zones')
        .then((res) => {
          console.log(res.data.shipping_zones.data)
          commit('SHIPPING_ZONES', res.data.shipping_zones.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },

    becomeAVendor ({ commit }, payload) {
      commit('SET_LOADING', true)
      request().post('/create-vendor-application', payload)
        .then((res) => {
          commit('SET_SUBMITTED_APPLICATION', res.data.vendorApplication)
          commit('SET_SUBMITTED', true)
          Toastify({
            text: 'Vendor Application Submitted',
            className: 'info',
            style: {
              background: 'green',
              fontSize: '12px',
              borderRadius: '3px'
            }
          }).showToast()
        })
        .catch((err) => {
          console.log(err)
          Toastify({
            text: 'Error',
            className: 'info',
            style: {
              background: 'red',
              fontSize: '12px',
              borderRadius: '3px'
            }
          }).showToast()
        })
        .finally(() => {
          commit('SET_LOADING', false)
        })
    },

    getApplication ({ commit }, id) {
      commit('SET_LOADING', true)
      request().get(`/find-vendor-application/${id}`)
        .then((res) => {
          commit('SET_KYC', res.data.vendorApplication)
          console.log(res.data.vendorApplication)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          commit('SET_LOADING', false)
        })
    },

    getKYCs ({ commit }) {
      commit('SET_LOADING', true)
      request().get('/my-vendor-applications')
        .then((res) => {
          commit('SET_KYCS', res.data.userVendorApplications.data)
          console.log(res.data.userVendorApplications.data)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          commit('SET_LOADING', false)
        })
    },

    removeSubmitted ({ commit }) {
      commit('SET_SUBMITTED', false)
    },

    // Get Orders
    getOrders ({ commit }) {
      commit('SET_LOADING', true)
      request().get('/user-orders?status=delivered')
        .then((res) => {
          console.log(res.data)
          commit('SET_ORDERS', res.data.orders.data)
        })
        .catch((err) => {
          console.log(err)
        }).finally(() => {
          commit('SET_LOADING', false)
        })
    },

    // Get Order By Id
    getOrderByID ({ commit }, id) {
      commit('SET_LOADING', true)
      request().get('/find-order/' + id)
        .then((res) => {
          console.log(res.data)
          commit('SET_ORDER_BY_ID', res.data.order)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          commit('SET_LOADING', false)
        })
    }
  }
}
