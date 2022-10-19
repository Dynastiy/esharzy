import Axios from "@/config/https";

import "toastify-js/src/toastify.css"
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
        orders: []
    },
    mutations: {
        SET_PRODUCTS(state, data) {
            state.products = data;
        },
        SET_ERRORS(state, data) {
            state.errors = data;
        },
        SET_BANK_DETAILS(state, data) {
            state.bank_details = data;
        },
        SHIPPING_CLASSES(state, data) {
            state.shipping_classes = data;
        },
        SET_PAYOUTS(state, data) {
            state.payouts = data
        },
        SET_TRANSACTIONS(state, data) {
            state.transactions = data
        },
        SET_ORDERS(state, data) {
            state.orders = data
        },
        SET_LOADING: (state, data) => {
            state.loading = data
        },

    },
    actions: {
        async getProducts({ commit }) {
            try {
                const res = await Axios().get(`vendor-products`);
                commit("SET_PRODUCTS", res.data.vendor_products.data);
                return res
            } catch (error) {
                console.log(error);
            }
        },

        async createProduct({ dispatch, commit }, payload) {
            commit('SET_LOADING', true)
            try {
                const res = await Axios().post(`create-product`, payload);
                Toastify({
                    text: `Product Created Succesfully`,
                    className: "info",
                    style: {
                        background: "green",
                        borderRadius: "3px",
                        fontSize: "13px"
                    }
                }).showToast();
                console.log(res);
                dispatch('getProducts')
            } catch (error) {
                console.log(error.response.data.errors);
                Toastify({
                    text: `Error!`,
                    className: "info",
                    style: {
                        background: "red",
                        borderRadius: "3px",
                        fontSize: "13px"
                    }
                }).showToast();
                commit("SET_ERRORS", error.response.data.errors)
            } finally {
                commit('SET_LOADING', false)
            }
        },

        async addDiscount({ commit }, { id, price, product_id }) {
            commit('SET_LOADING', true)
            try {
                const res = await Axios().post(`add-discount/${id}`, { price, product_id });
                Toastify({
                    text: `Discount Added Succesfully`,
                    className: "info",
                    style: {
                        background: "green",
                    }
                }).showToast();
                console.log(res);
            } catch (error) {
                console.log(error.response.data.errors);
                Toastify({
                    text: `Error!`,
                    className: "info",
                    style: {
                        background: "red",
                    }
                }).showToast();
                commit("SET_ERRORS", error.response.data.errors)
            } finally {
                commit('SET_LOADING', false)
            }
        },


        // Delete Payout Account 
        async deleteProduct({ dispatch, commit }, id) {
            commit('SET_LOADING', true)
            try {
                let token = localStorage.getItem("token")
                console.log(token);
                const res = await Axios().post(`delete-product/${id}`);
                Toastify({
                    text: `Product deleted Succesfully`,
                    className: "info",
                    style: {
                        background: "green",
                        fontSize: "12px",
                        borderRadius: "3px"
                    }
                }).showToast();
                console.log(res);
            } catch (error) {
                console.log(error.response.data.errors);
                Toastify({
                    text: `Error!`,
                    className: "info",
                    style: {
                        background: "red",
                        fontSize: "12px",
                        borderRadius: "3px"
                    }
                }).showToast();
                commit("SET_ERRORS", error.response.data.errors)
            } finally {
                commit('SET_LOADING', false);
                dispatch("getProducts")
            }
        },


        // User Payouts
        async getPayouts({ commit }) {
            try {
                const res = await Axios().get(`user-payouts`);
                console.log(res);
                commit("SET_PAYOUTS", res.data.payouts.data);
            } catch (error) {
                console.log(error);
            }
        },

        // Request Payout
        async requestPayout({ dispatch, commit }, payload) {
            commit('SET_LOADING', true)
            try {
                const res = await Axios().post(`request-payout/`, payload);
                Toastify({
                    text: `Payout Requested Succesfully`,
                    className: "info",
                    style: {
                        background: "green",
                        fontSize: "12px",
                        borderRadius: "3px"
                    }
                }).showToast();
                console.log(res);
            } catch (error) {
                console.log(error.response.data.errors);
                Toastify({
                    text: `Error!`,
                    className: "info",
                    style: {
                        background: "red",
                        fontSize: "12px",
                        borderRadius: "3px"
                    }
                }).showToast();
                commit("SET_ERRORS", error.response.data.errors)
            } finally {
                commit('SET_LOADING', false);
                dispatch("getPayouts")
            }
        },

        // Vendor Transactions
        async getTransactions({ commit }) {
            try {
                const res = await Axios().get(`user-transactions`);
                console.log(res);
                commit("SET_TRANSACTIONS", res.data.transactions.data);
            } catch (error) {
                console.log(error);
            }
        },


        // Vendor Orders
        async getOrders({ commit }) {
            try {
                const res = await Axios().get(`vendor-orders`);
                console.log(res);
                commit("SET_ORDERS", res.data.vendor_orders.data);
            } catch (error) {
                console.log(error);
            }
        },

        // Shipping Classes
        async getShippingClasses({ commit }) {
            try {
                const res = await Axios().get(`all-shipping-classes`);
                console.log(res);
                commit("SHIPPING_CLASSES", res.data.shipping_classes.data);
            } catch (error) {
                console.log(error);
            }
        },



    },
    getters: {
        getProducts: (state) => state.products,
        isErrors: (state) => state.errors,
        isLoading: (state) => state.loading,
        bankDetails: (state) => state.bank_details,
        shippingClasses: (state) => state.shipping_classes,
        getPayouts: (state) => state.payouts,
        getTransactions: (state) => state.transactions,
        getOrders: (state) => state.orders
    },
};