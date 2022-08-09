// import Vue from 'vue';
import request from '@/config/https'
import createPersistedState from 'vuex-persistedstate';

import router from '@/router'

import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        token: '',
        user: {},
        loggedIn: false,
        loading: false,
        errors: []
    };
};

export default {
    namespaced: true,
    strict: true,
    plugins: [createPersistedState()],
    state: getDefaultState(),
    getters: {
        isAuthenticated: state => {
            return state.token;
        },
        isLoggedIn: state => {
            return state.loggedIn
        },
        getUser: state => {
            return state.user;
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
            state.token = token;
        },
        SET_LOGGED_IN: state => {
            state.loggedIn = true;
        },
        SET_USER: (state, user) => {
            state.user = user;
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
        RESET: state => {
            Object.assign(state, getDefaultState());
        }
    },
    actions: {
        logout: ({ commit }) => {
            localStorage.clear();
            commit('RESET', '');
            window.location.href = '/'
        },
        // User Login
        userLogin({ commit }, payload) {
            commit('SET_LOADING')
            request().post('/auth/signin', payload)
                .then((res) => {
                    commit('SET_TOKEN', res.data.token);
                    commit('SET_USER', res.data.user);
                    let token = res.data.token
                    localStorage.setItem('token', token)
                    let loggedIn = true
                    commit('SET_LOGGED_IN', loggedIn)
                    console.log(res);
                    Toastify({
                        text: `Logged In!`,
                        className: "info",
                        style: {
                            background: "green",
                        }
                    }).showToast();
                    // console.log(res);
                    let user_role = res.data.user.role
                    if (user_role == "buyer") {
                        router.push('/buyer')
                    } else if (user_role == "vendor") {
                        router.push('/vendor')
                    }
                })
                .catch((err) => {
                    // console.log(err);
                    commit('SET_ERRORS', err.response.data.error);
                    Toastify({
                        text: `Email or Password Incorrect!`,
                        className: "info",
                        style: {
                            background: "red",
                        }
                    }).showToast();
                })
                .finally(() => {
                    commit('END_LOADING')
                })
        },
        userRegister({ commit }, payload) {
            commit('SET_LOADING')
            request().post('/auth/signup', payload)
                .then((res) => {
                    router.push('/login')
                    Toastify({
                        text: `Registration Successful`,
                        className: "info",
                        style: {
                            background: "green",
                        }
                    }).showToast();
                    return res
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data.errors)
                    Toastify({
                        text: `Error!`,
                        className: "info",
                        style: {
                            background: "red",
                        }
                    }).showToast();
                })
                .finally(() => {
                    commit('END_LOADING')
                })
        },

        updateUser({ dispatch, commit }, payload) {
            commit('SET_LOADING')
            request().post('/auth/update-profile-details', payload)
                .then((res) => {
                    Toastify({
                        text: `User Data Update Successful`,
                        className: "info",
                        style: {
                            background: "green",
                        }
                    }).showToast();
                    return res
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data.errors)
                    Toastify({
                        text: `Error!`,
                        className: "info",
                        style: {
                            background: "red",
                        }
                    }).showToast();
                })
                .finally(() => {
                    commit('END_LOADING')
                    dispatch('setUser')
                })

        },

        setUser({ commit }) {
            request().get('/auth/user-profile')
                .then((res) => {
                    commit('SET_USER', res.data.user)
                    console.log(res.data.user)
                    return res
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data.errors)
                })
        },

        becomeAVendor({ dispatch, commit }, payload) {
            commit('SET_LOADING')
            request().post('/user-role-upgrade', payload)
                .then((res) => {
                    Toastify({
                        text: `Congratulations!`,
                        className: "info",
                        style: {
                            background: "green",
                        }
                    }).showToast();
                    router.push('/vendor')
                    return res
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data.errors)
                    Toastify({
                        text: `Error!`,
                        className: "info",
                        style: {
                            background: "red",
                        }
                    }).showToast();
                })
                .finally(() => {
                    commit('END_LOADING')
                    dispatch('setUser')
                })
        },
        createShop({ commit, dispatch }, payload) {
            commit('SET_LOADING')
            request().post('/create-shop', payload)
                .then((res) => {
                    Toastify({
                        text: `Shop Created Successfully!`,
                        className: "info",
                        style: {
                            background: "green",
                        }
                    }).showToast();
                    return res
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data.errors)
                    Toastify({
                        text: `Error!`,
                        className: "info",
                        style: {
                            background: "red",
                        }
                    }).showToast();
                })
                .finally(() => {
                    commit('END_LOADING')
                    dispatch('setUser')
                })

        },

        // Add Item to Cart
        addToCart({ dispatch, commit }, payload) {
            commit('SET_LOADING')
            request().post('/add-to-cart', payload)
                .then((res) => {
                    Toastify({
                        text: `Item Added to Cart!`,
                        className: "info",
                        style: {
                            background: "green",
                        }
                    }).showToast();
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data.errors)
                    Toastify({
                        text: `Error!`,
                        className: "info",
                        style: {
                            background: "red",
                        }
                    }).showToast();
                })
                .finally(() => {
                    commit('END_LOADING')
                    dispatch('setUser')
                })
        },

        // Remove Item from Cart
        deleteItemFromCart({ dispatch, commit }, id) {
            commit('SET_LOADING')
            request().post(`/remove-cart-item/${id}`)
                .then((res) => {
                    Toastify({
                        text: `Item Removed from Cart!`,
                        className: "info",
                        style: {
                            background: "green",
                        }
                    }).showToast();
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data.errors)
                    Toastify({
                        text: `Error!`,
                        className: "info",
                        style: {
                            background: "red",
                        }
                    }).showToast();
                })
                .finally(() => {
                    commit('END_LOADING')
                    dispatch('setUser')
                })
        },

        // Update Cart Item
        updateCart({ dispatch, commit }, { id, payload }) {
            commit('SET_LOADING')
            request().post(`/update-cart-item/${id}`, payload)
                .then((res) => {
                    Toastify({
                        text: `Cart Item Updated!`,
                        className: "info",
                        style: {
                            background: "green",
                        }
                    }).showToast();
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                    commit('SET_ERRORS', err.response.data.errors)
                    Toastify({
                        text: `Error!`,
                        className: "info",
                        style: {
                            background: "red",
                        }
                    }).showToast();
                })
                .finally(() => {
                    commit('END_LOADING')
                    dispatch('setUser')
                })
        },


    }
};