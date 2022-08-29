// import Vue from 'vue';
import request from '@/config/https'
import createPersistedState from 'vuex-persistedstate';

import router from '@/router'

import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

// Vue.prototype.$http = http

const getDefaultState = () => {
    return {
        wishlist: []
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
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        ADD_WISHLIST_ITEM: (state, data) => {
            state.wishlist = data
        }
    },
    actions: {
        // Add to cart With Login Check
        addToWishlist(payload) {
            // To check if User is logged in 
            let token;
            token = localStorage.getItem('token')
            if (!token) {
                router.push({
                    path: "/login",
                    query: { return_url: "/wishlist" }
                })
            } else {
                // commit('SET_LOADING')
                request().post('/add-to-wishlist', payload)
                    .then((res) => {
                        Toastify({
                            text: `Item Added to Wishlist!`,
                            className: "info",
                            style: {
                                background: "green",
                                fontSize: "13px",
                                borderRadius: "5px"
                            }
                        }).showToast();
                        console.log(res.data)
                            // commit("ADD_WISHLIST_ITEM")
                    })
                    .catch((err) => {
                        console.log(err);
                        // commit('SET_ERRORS', err.response.data.errors)
                        Toastify({
                            text: `Error!`,
                            className: "info",
                            style: {
                                background: "red",
                                fontSize: "13px",
                                borderRadius: "5px"
                            }
                        }).showToast();
                    })
                    .finally(() => {
                        // commit('END_LOADING')
                    })
            }
        },
    }
};