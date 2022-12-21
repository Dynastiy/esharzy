import Axios from '@/config/https'

import 'toastify-js/src/toastify.css'
import Toastify from 'toastify-js'

export default {
  namespaced: true,
  strict: true,
  state: {
    products: [],
    errors: [],
    loading: false,
    bank_details: {},
    shipping_classes: [],
    payouts: [],
    transactions: [],
    orders: [],
    applications: [],
    application: {},
    submittedApplication: {},
    submitted: false,
    product: {}
  },
  mutations: {
    SET_PRODUCTS (state, data) {
      state.products = data
    },

    SET_SINGLE_PRODUCT (state, data) {
      state.product = data
    },
    SET_ERRORS (state, data) {
      state.errors = data
    },
    SET_BANK_DETAILS (state, data) {
      state.bank_details = data
    },
    SHIPPING_CLASSES (state, data) {
      state.shipping_classes = data
    },
    SET_PAYOUTS (state, data) {
      state.payouts = data
    },
    SET_TRANSACTIONS (state, data) {
      state.transactions = data
    },
    SET_APPLICATIONS (state, data) {
      state.applications = data
    },
    SET_APPLICATION (state, data) {
      state.application = data
    },
    SET_SUBMITTED_APPLICATION (state, data) {
      state.submittedApplication = data
    },
    SET_SUBMITTED (state, data) {
      state.submitted = data
    },
    SET_ORDERS (state, data) {
      state.orders = data
    },
    SET_LOADING: (state, data) => {
      state.loading = data
    }

  },
  actions: {
    async getProducts ({ commit }) {
      try {
        const res = await Axios().get('vendor-products')
        commit('SET_PRODUCTS', res.data.vendor_products.data)
        return res
      } catch (error) {
        console.log(error)
      }
    },

    async getProductBySlug ({ commit }, slug) {
      commit('SET_LOADING', true)
      try {
        const res = await Axios().get(`show-product/${slug}`)
        commit('SET_SINGLE_PRODUCT', res.data.product)
        console.log(res.data.product)
        return res
      } catch (error) {
        return error
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async editProduct ({ commit, dispatch }, payload) {
      commit('SET_LOADING', true)
      try {
        const res = await Axios().post(`edit-product/${payload.id}`, payload.formData)
        Toastify({
          text: 'Product updated Succesfully',
          className: 'info',
          style: {
            background: 'green',
            borderRadius: '3px',
            fontSize: '13px'
          }
        }).showToast()
        dispatch('getProductBySlug', payload.slug)
        console.log(res)
      } catch (error) {
        console.log(error.response.data.errors)
        Toastify({
          text: 'Error!',
          className: 'info',
          style: {
            background: 'red',
            borderRadius: '3px',
            fontSize: '13px'
          }
        }).showToast()
        commit('SET_ERRORS', error.response.data.errors)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async updateStock ({ commit, dispatch }, payload) {
      commit('SET_LOADING', true)
      try {
        const res = await Axios().post(`/update-stock/${payload.id}`, payload)
        Toastify({
          text: 'Stock Updated Succesfully',
          className: 'info',
          style: {
            background: 'green',
            borderRadius: '3px',
            fontSize: '13px'
          }
        }).showToast()
        console.log(res)
        dispatch('getProducts')
      } catch (error) {
        console.log(error.response.data.errors)
        Toastify({
          text: 'Error!',
          className: 'info',
          style: {
            background: 'red',
            borderRadius: '3px',
            fontSize: '13px'
          }
        }).showToast()
        commit('SET_ERRORS', error.response.data.errors)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async createProduct ({ dispatch, commit }, payload) {
      commit('SET_LOADING', true)
      try {
        const res = await Axios().post('create-product', payload)
        Toastify({
          text: 'Product Created Succesfully',
          className: 'info',
          style: {
            background: 'green',
            borderRadius: '3px',
            fontSize: '13px'
          }
        }).showToast()
        console.log(res)
        dispatch('getProducts')
      } catch (error) {
        console.log(error.response.data.errors)
        Toastify({
          text: 'Error!',
          className: 'info',
          style: {
            background: 'red',
            borderRadius: '3px',
            fontSize: '13px'
          }
        }).showToast()
        commit('SET_ERRORS', error.response.data.errors)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async addDiscount ({ commit, dispatch }, payload) {
      commit('SET_LOADING', true)
      try {
        const res = await Axios().post(`add-discount/${payload.id}`, payload)
        Toastify({
          text: 'Discount Added Succesfully',
          className: 'info',
          style: {
            background: 'green',
            borderRadius: '3px',
            fontSize: '13px'
          }
        }).showToast()
        console.log(res)
        dispatch('getProductBySlug', payload.slug)
      } catch (error) {
        console.log(error.response.data.errors)
        Toastify({
          text: 'Error!',
          className: 'info',
          style: {
            background: 'red',
            borderRadius: '3px',
            fontSize: '13px'
          }
        }).showToast()
        commit('SET_ERRORS', error.response.data.errors)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    async removeDiscount ({ commit, dispatch }, payload) {
      commit('SET_LOADING', true)
      try {
        const res = await Axios().post(`remove-discount/${payload.id}`)
        Toastify({
          text: 'Discount Removed Succesfully',
          className: 'info',
          style: {
            background: 'green',
            borderRadius: '3px',
            fontSize: '13px'
          }
        }).showToast()
        dispatch('getProductBySlug', payload.slug)
        console.log(res)
      } catch (error) {
        console.log(error.response.data.errors)
        Toastify({
          text: 'Error!',
          className: 'info',
          style: {
            background: 'red',
            borderRadius: '3px',
            fontSize: '13px'
          }
        }).showToast()
        commit('SET_ERRORS', error.response.data.errors)
      } finally {
        commit('SET_LOADING', false)
      }
    },

    // Delete Payout Account
    async deleteProduct ({ dispatch, commit }, id) {
      commit('SET_LOADING', true)
      try {
        const token = localStorage.getItem('token')
        console.log(token)
        const res = await Axios().post(`delete-product/${id}`)
        Toastify({
          text: 'Product deleted Succesfully',
          className: 'info',
          style: {
            background: 'green',
            fontSize: '12px',
            borderRadius: '3px'
          }
        }).showToast()
        console.log(res)
      } catch (error) {
        console.log(error.response.data.errors)
        Toastify({
          text: 'Error!',
          className: 'info',
          style: {
            background: 'red',
            fontSize: '12px',
            borderRadius: '3px'
          }
        }).showToast()
        commit('SET_ERRORS', error.response.data.errors)
      } finally {
        commit('SET_LOADING', false)
        dispatch('getProducts')
      }
    },

    // User Payouts
    async getPayouts ({ commit }) {
      try {
        const res = await Axios().get('user-payouts')
        console.log(res)
        commit('SET_PAYOUTS', res.data.payouts.data)
      } catch (error) {
        console.log(error)
      }
    },

    // Request Payout
    async requestPayout ({ dispatch, commit }, payload) {
      commit('SET_LOADING', true)
      try {
        const res = await Axios().post('request-payout/', payload)
        Toastify({
          text: 'Payout Requested Succesfully',
          className: 'info',
          style: {
            background: 'green',
            fontSize: '12px',
            borderRadius: '3px'
          }
        }).showToast()
        console.log(res)
      } catch (error) {
        console.log(error.response.data.errors)
        Toastify({
          text: 'Error!',
          className: 'info',
          style: {
            background: 'red',
            fontSize: '12px',
            borderRadius: '3px'
          }
        }).showToast()
        commit('SET_ERRORS', error.response.data.errors)
      } finally {
        commit('SET_LOADING', false)
        dispatch('getPayouts')
      }
    },

    // Vendor Transactions
    async getTransactions ({ commit }) {
      try {
        const res = await Axios().get('user-transactions')
        console.log(res)
        commit('SET_TRANSACTIONS', res.data.transactions.data)
      } catch (error) {
        console.log(error)
      }
    },

    // Vendor Orders
    async getOrders ({ commit }) {
      try {
        const res = await Axios().get('vendor-orders')
        console.log(res)
        commit('SET_ORDERS', res.data.vendor_orders.data)
      } catch (error) {
        console.log(error)
      }
    },

    // Shipping Classes
    async getShippingClasses ({ commit }) {
      try {
        const res = await Axios().get('all-shipping-classes')
        console.log(res)
        commit('SHIPPING_CLASSES', res.data.shipping_classes.data)
      } catch (error) {
        console.log(error)
      }
    },

    // Become a Manufacturer
    becomeAManufacturer ({ commit, dispatch }, payload) {
      commit('SET_LOADING', true)
      Axios().post('/create-manufacturer-application', payload)
        .then((res) => {
          commit('SET_SUBMITTED_APPLICATION', res.data.manufacturerApplication)
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
          dispatch('getApplications')
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
      Axios().get(`/find-manufacturer-application/${id}`)
        .then((res) => {
          commit('SET_APPLICATION', res.data.manufacturerApplication)
          console.log(res.data.manufacturerApplication)
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          commit('SET_LOADING', false)
        })
    },

    getApplications ({ commit }) {
      commit('SET_LOADING', true)
      Axios().get('/my-manufacturer-applications')
        .then((res) => {
          commit('SET_APPLICATIONS', res.data.manufacturerApplications.data)
          console.log(res.data)
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
    }

  },
  getters: {
    getProducts: (state) => state.products,
    isErrors: (state) => state.errors,
    isLoading: (state) => state.loading,
    bankDetails: (state) => state.bank_details,
    shippingClasses: (state) => state.shipping_classes,
    getPayouts: (state) => state.payouts,
    getTransactions: (state) => state.transactions,
    getOrders: (state) => state.orders,
    getApplications: (state) => state.applications,
    getApplication: (state) => state.application,
    submittedApplication: (state) => state.submittedApplication,
    isSubmitted: (state) => state.submitted,
    getSingleProduct: (state) => state.product
  }
}
