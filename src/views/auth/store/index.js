// import Vue from 'vue';
import request from '@/config/https'
import createPersistedState from 'vuex-persistedstate'

import router from '@/router'

import 'toastify-js/src/toastify.css'
import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
  return {
    token: '',
    user: {},
    loggedIn: false,
    loading: false,
    errors: [],
    dataSet: ''
  }
}

export default {
  namespaced: true,
  strict: true,
  plugins: [createPersistedState()],
  state: getDefaultState(),
  getters: {
    isAuthenticated: state => {
      return state.token
    },
    isLoggedIn: state => {
      return state.loggedIn
    },
    getUser: state => {
      return state.user
    },
    isLoading: state => {
      return state.loading
    },
    isError: state => {
      return state.errors
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_LOGGED_IN: state => {
      state.loggedIn = true
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_LOADING: (state) => {
      state.loading = true
    },
    END_LOADING: (state) => {
      state.loading = false
    },
    SET_ERRORS: (state, data) => {
      state.errors = data
    },
    SET_DATA: (state, payload) => {
      state.dataSet = payload
    },
    RESET: state => {
      Object.assign(state, getDefaultState())
    }
  },
  actions: {
    logout: ({ commit }) => {
      localStorage.clear()
      commit('RESET', '')
      window.location.href = '/'
    },
    // User Login
    userLogin ({ commit, dispatch }, payload) {
      commit('SET_LOADING')
      request().post('/auth/signin', payload)
        .then((res) => {
          commit('SET_TOKEN', res.data.token)
          commit('SET_USER', res.data.user)
          const token = res.data.token
          localStorage.setItem('token', token)
          const loggedIn = true
          commit('SET_LOGGED_IN', loggedIn)
          console.log(res)
          Toastify({
            text: 'Logged In!',
            className: 'info',
            style: {
              background: 'green',
              fontSize: '12px',
              borderRadius: '5px'
            }
          }).showToast()
          //   router.push('/buyer')
          // console.log(res);
          //   Check User Role before Redirecting to Login Page
          const userRole = res.data.user.role
          if (userRole === 'buyer') {
            router.push('/buyer')
          } else if (userRole === 'vendor') {
            router.push('/vendor')
          }

          // Check redirect URL
          const url = window.location.search
          console.log(url)
          const params = new URLSearchParams(url)
          const q = params.get('return_url')
          const d = params.get('redirectFrom')
          // console.log(q);

          if (q === '/cart') {
            const data = JSON.parse(localStorage.getItem('cart_details'))
            dispatch('addToCart', data)
            dispatch('setUser')
            router.push(q)
          } else {
            router.push(q || d)
          }
        })
        .catch((err) => {
          // console.log(err);
          commit('SET_ERRORS', err.response.data.error)
          Toastify({
            text: 'Email or Password Incorrect!',
            className: 'info',
            style: {
              background: 'red',
              fontSize: '12px',
              borderRadius: '5px'
            }
          }).showToast()
        })
        .finally(() => {
          commit('END_LOADING')
        })
    },
    userRegister ({ commit }, payload) {
      commit('SET_LOADING')
      request().post('/auth/signup', payload)
        .then((res) => {
          router.push('/login')
          Toastify({
            text: 'Registration Successful',
            className: 'info',
            style: {
              background: 'green',
              fontSize: '12px',
              borderRadius: '5px'
            }
          }).showToast()
          return res
        })
        .catch((err) => {
          console.log(err)
          commit('SET_ERRORS', err.response.data.errors)
          Toastify({
            text: 'Error!',
            className: 'info',
            style: {
              background: 'red',
              fontSize: '12px',
              borderRadius: '5px'
            }
          }).showToast()
        })
        .finally(() => {
          commit('END_LOADING')
        })
    },

    // Forgot Password
    forgotPassword ({ commit }, payload) {
      commit('SET_LOADING')
      request().post('/auth/forgot-password', payload)
        .then((res) => {
          console.log(res.data.message)
          const payload = res.data.message
          router.push('/forgot-password/reset-link-sent')
          commit('SET_DATA', payload)
          return res
        })
        .catch((err) => {
          const payload = err.response.data.message
          // console.log(err.response.data.message)
          Toastify({
            text: payload,
            className: 'info',
            style: {
              background: 'red',
              fontSize: '12px',
              borderRadius: '5px'
            }
          }).showToast()
        })
        .finally(() => [
          commit('END_LOADING')
        ])
    },

    // Forgot Password
    resetPassword ({ commit }, payload) {
      commit('SET_LOADING')
      request().post(`/auth/reset-password?token=${payload.token}&email=${payload.email}`, payload)
        .then((res) => {
          console.log(res.data)
          Toastify({
            text: 'Password Updated!',
            className: 'info',
            style: {
              background: '#333',
              fontSize: '12px',
              borderRadius: '5px'
            }
          }).showToast()
          // const payload = res.data.message
          router.push('/login')

          // commit('SET_DATA', payload)
          return res
        })
        .catch((err) => {
          // const payload = err.response.data.message
          console.log(err.response.data.message)
          Toastify({
            text: 'Error!',
            className: 'info',
            style: {
              background: 'red',
              fontSize: '12px',
              borderRadius: '5px'
            }
          }).showToast()
        })
        .finally(() => [
          commit('END_LOADING')
        ])
    },

    updateUser ({ dispatch, commit }, payload) {
      commit('SET_LOADING')
      request().post('/auth/update-profile-details', payload)
        .then((res) => {
          Toastify({
            text: 'User Data Update Successful',
            className: 'info',
            style: {
              background: 'green',
              fontSize: '12px',
              borderRadius: '5px'
            }
          }).showToast()
          return res
        })
        .catch((err) => {
          console.log(err)
          commit('SET_ERRORS', err.response.data.errors)
          Toastify({
            text: 'Error!',
            className: 'info',
            style: {
              background: 'red',
              fontSize: '12px',
              borderRadius: '5px'
            }
          }).showToast()
        })
        .finally(() => {
          commit('END_LOADING')
          dispatch('setUser')
        })
    },

    setUser ({ commit }) {
      request().get('/auth/user-profile')
        .then((res) => {
          commit('SET_USER', res.data.user)
          console.log(res.data.user)
          return res
        })
        .catch((err) => {
          console.log(err)
          commit('SET_ERRORS', err.response.data.errors)
        })
    },

    becomeAVendor ({ dispatch, commit }, payload) {
      commit('SET_LOADING')
      request().post('/user-role-upgrade', payload)
        .then((res) => {
          Toastify({
            text: 'Congratulations!',
            className: 'info',
            style: {
              background: 'green',
              fontSize: '12px',
              borderRadius: '5px'
            }
          }).showToast()
          router.push('/vendor')
          return res
        })
        .catch((err) => {
          console.log(err)
          commit('SET_ERRORS', err.response.data.errors)
          Toastify({
            text: 'Error!',
            className: 'info',
            style: {
              background: 'red',
              fontSize: '12px',
              borderRadius: '5px'
            }
          }).showToast()
        })
        .finally(() => {
          commit('END_LOADING')
          dispatch('setUser')
        })
    },
    createShop ({ commit, dispatch }, payload) {
      commit('SET_LOADING')
      request().post('/create-shop', payload)
        .then((res) => {
          Toastify({
            text: 'Shop Created Successfully!',
            className: 'info',
            style: {
              background: 'green',
              fontSize: '12px',
              borderRadius: '5px'
            }
          }).showToast()
          return res
        })
        .catch((err) => {
          console.log(err)
          commit('SET_ERRORS', err.response.data.errors)
          Toastify({
            text: 'Error!',
            className: 'info',
            style: {
              background: 'red',
              fontSize: '12px',
              borderRadius: '5px'
            }
          }).showToast()
        })
        .finally(() => {
          commit('END_LOADING')
          dispatch('setUser')
        })
    },

    // Add to cart With Login Check
    addToCart ({ commit, dispatch }, payload) {
      // To check if User is logged in
      const
        token = localStorage.getItem('token')
      if (!token) {
        router.push({
          path: '/login',
          query: { return_url: '/cart' }
        })
      } else {
        commit('SET_LOADING')
        request().post('/add-to-cart', payload)
          .then((res) => {
            Toastify({
              text: 'Item Added to Cart!',
              className: 'info',
              style: {
                background: 'green',
                fontSize: '13px',
                borderRadius: '5px'
              }
            }).showToast()
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
            commit('SET_ERRORS', err.response.data.errors)
            Toastify({
              text: 'Error!',
              className: 'info',
              style: {
                background: 'red',
                fontSize: '12px',
                borderRadius: '5px'
              }
            }).showToast()
          })
          .finally(() => {
            commit('END_LOADING')
            dispatch('setUser')
          })
      }
    },

    // Remove Item from Cart
    deleteItemFromCart ({ dispatch, commit }, id) {
      commit('SET_LOADING')
      request().post(`/remove-cart-item/${id}`)
        .then((res) => {
          Toastify({
            text: 'Item Removed from Cart!',
            className: 'info',
            style: {
              background: 'green',
              fontSize: '12px',
              borderRadius: '5px'
            }
          }).showToast()
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
          commit('SET_ERRORS', err.response.data.errors)
          Toastify({
            text: 'Error!',
            className: 'info',
            style: {
              background: 'red',
              fontSize: '12px',
              borderRadius: '5px'
            }
          }).showToast()
        })
        .finally(() => {
          commit('END_LOADING')
          dispatch('setUser')
        })
    },

    // Update Cart Item
    updateCart ({ dispatch, commit }, { id, payload }) {
      commit('SET_LOADING')
      request().post(`/update-cart-item/${id}`, payload)
        .then((res) => {
          Toastify({
            text: 'Cart Item Updated!',
            className: 'info',
            style: {
              background: 'green',
              fontSize: '12px',
              borderRadius: '5px'
            }
          }).showToast()
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
          commit('SET_ERRORS', err.response.data.errors)
          Toastify({
            text: 'Error!',
            className: 'info',
            style: {
              background: 'red',
              fontSize: '12px',
              borderRadius: '5px'
            }
          }).showToast()
        })
        .finally(() => {
          commit('END_LOADING')
          dispatch('setUser')
        })
    },

    // Add Address
    async addNewAddress ({ dispatch, commit }, payload) {
      commit('SET_LOADING')
      try {
        const res = await request().post('add-address/', payload)
        Toastify({
          text: 'Address added Succesfully',
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
        commit('END_LOADING')
        dispatch('setUser')
      }
    },

    // Remove Address
    removeAddress ({ dispatch }, id) {
      request().post(`remove-address/${id}`)
        .then((res) => {
          Toastify({
            text: 'Delivery address deleted!',
            className: 'info',
            style: {
              background: 'green',
              fontSize: '12px',
              borderRadius: '5px'
            }
          }).showToast()
          dispatch('setUser')
          return res
        })
        .catch((err) => {
          console.log(err)
        })
    },

    // Make Payment
    createOrder ({ commit }, payload) {
      commit('SET_LOADING')
      request().post('make-order/', payload)
        .then((res) => {
          console.log(res.data)
          // dispatch('setUser')
          // window.location(res.data.payment)
          // window.open(res.data.payment, '_blank', 'toolbar=yes,top=300,left=300,width=1000,height=1000')
          return res
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          commit('END_LOADING')
        })
    },

    // Make Payment
    makePayment ({ commit, dispatch }, payload) {
      commit('SET_LOADING')
      request().post('pay/', payload)
        .then((res) => {
          console.log(res.data.payment)
          dispatch('setUser')
          // window.location(res.data.payment)
          window.open(res.data.payment, '_blank', 'toolbar=yes,top=300,left=300,width=1000,height=1000')
          return res
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => {
          dispatch('createOrder', payload)
          commit('END_LOADING')
        })
    },

    // Make Order
    //  makeOrder ({ dispatch }, payload) {
    //   request().post('pay/', payload)
    //     .then((res) => {
    //       console.log(res)
    //       dispatch('setUser')
    //       return res
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },

    async addBankDetails ({ dispatch, commit }, payload) {
      commit('SET_LOADING')
      try {
        const token = localStorage.getItem('token')
        console.log(token)
        const res = await request().post('add-bank-details/', payload)
        Toastify({
          text: 'Bank Details added Succesfully',
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
        commit('END_LOADING')
        dispatch('setUser')
      }
    },

    // Delete Payout Account
    async deleteBankDetails ({ dispatch, commit }, id) {
      commit('SET_LOADING')
      try {
        const token = localStorage.getItem('token')
        console.log(token)
        const res = await request().post(`delete-bank-details/${id}`)
        Toastify({
          text: 'Bank Details deleted Succesfully',
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
        commit('END_LOADING')
        dispatch('setUser')
      }
    },

    // Add to Wishlist With Login Check
    addToWishlist ({ dispatch }, payload) {
      // To check if User is logged in
      const
        token = localStorage.getItem('token')
      if (!token) {
        router.push({
          path: '/login',
          query: { return_url: '/wishlist' }
        })
      } else {
        // commit('SET_LOADING')
        request().post('add-to-wishlist', { product_id: payload.product_id })
          .then((res) => {
            Toastify({
              text: 'Item Added to Wishlist!',
              className: 'info',
              style: {
                background: 'green',
                fontSize: '13px',
                borderRadius: '5px'
              }
            }).showToast()
            console.log(res)
            dispatch('setUser')
          })
          .catch((err) => {
            console.log(err)
            // commit('SET_ERRORS', err.response.data.errors)
            Toastify({
              text: 'Error!',
              className: 'info',
              style: {
                background: 'red',
                fontSize: '13px',
                borderRadius: '5px'
              }
            }).showToast()
          })
          .finally(() => {
            // commit('END_LOADING')
          })
      }
    },

    // Remove from wishlist
    removeWishlistItem ({ dispatch }, id) {
      request().post('remove-from-wishlist/' + id)
        .then((res) => {
          Toastify({
            text: 'Item removed from Wishlist!',
            className: 'info',
            style: {
              background: 'green',
              fontSize: '13px',
              borderRadius: '5px'
            }
          }).showToast()
          console.log(res)
          dispatch('setUser')
        })
        .catch((err) => {
          console.log(err)
          // commit('SET_ERRORS', err.response.data.errors)
          Toastify({
            text: 'Error!',
            className: 'info',
            style: {
              background: 'red',
              fontSize: '13px',
              borderRadius: '5px'
            }
          }).showToast()
        })
        .finally(() => {
          // commit('END_LOADING')
        })
    },

    // Update Profile Photo
    async updateProfilePhoto ({ dispatch, commit }, payload) {
      commit('SET_LOADING')
      try {
        const res = await request().post('auth/update-profile-photo/', payload)
        Toastify({
          text: 'User Photo added Succesfully',
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
        commit('END_LOADING')
        dispatch('setUser')
      }
    }

  }
}
