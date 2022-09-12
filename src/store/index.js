import Vue from 'vue'
import Vuex from 'vuex'

// Modules 
import showcase from '@/views/showcase/store/index'
import auth from '@/views/auth/store/index'
import vendor from '@/views/vendor/store/index'
import user from '@/views/user/store/index'

// paystack api

import createPersistedState from 'vuex-persistedstate';
import request from '@/config/paystack'

Vue.use(Vuex)

export default new Vuex.Store({
    strict: true,
    plugins: [createPersistedState()],
    state: {
        banks: [],
        account_details: {},
        accountLoader: false,
        err: false
    },
    getters: {
        getAllBanks: (state) => {
            return state.banks
        },
        getAccountDetails: (state) => {
            return state.account_details
        },
        isLoading: (state) => {
            return state.accountLoader
        },
        isError: (state) => {
            return state.err
        }
    },
    mutations: {
        SET_BANKS: (state, data) => {
            state.banks = data
        },
        ACCOUNT_NAME: (state, data) => {
            state.account_details = data
        },
        REMOVE_ACCOUNT_DETAILS: (state) => {
            state.account_details = {}
            state.err = false
        },
        REMOVE_ERROR_MESSAGE: (state) => {
            state.err = false
        },
        SET_LOADING_STATUS: (state, data) => {
            state.accountLoader = data
        },
        SET_ERROR: (state, data) => {
            state.err = data
        }
    },
    actions: {
        // List Banks from paystack 
        getBanks({ commit }) {
            request().get('/bank')
                .then((res) => {
                    // console.log(res);
                    commit("SET_BANKS", res.data.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        },

        // Resolve Bank Account 
        getAccountName({ commit }, payload) {
            commit("SET_LOADING_STATUS", true)
            request().get(`bank/resolve?account_number=${payload.account_number}&bank_code=${payload.bank_code}`)
                .then((res) => {
                    console.log(res);
                    commit("ACCOUNT_NAME", res.data.data)
                })
                .catch((err) => {
                    console.log(err.response.status);
                    if (err.response.status === 422) {
                        commit("SET_ERROR", true)
                    }
                })
                .finally(() => {
                    if (payload.account_number.length === 10) {
                        commit("SET_LOADING_STATUS", false)
                    }
                    // console.log(payload.account_number);
                })
        },
        removeAccountDetails({ commit }) {
            commit("REMOVE_ACCOUNT_DETAILS")
        },
        removeErrorMessage({ commit }) {
            commit("REMOVE_ERROR_MESSAGE")
        }
    },
    modules: {
        showcase,
        auth,
        vendor,
        user
    }
})