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
        bnak_details: {},
        shipping_classes: []
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
        SET_LOADING: (state) => {
            state.loading = true
        },
        END_LOADING: (state) => {
            state.loading = false
        },
    },
    actions: {
        async getProducts({ commit }) {
            try {
                const res = await Axios().get(`vendor-products`);
                console.log(res);
                commit("SET_PRODUCTS", res.data);
            } catch (error) {
                console.log(error);
            }
        },
        async createProduct({ dispatch, commit }, payload) {
            commit('SET_LOADING')
            try {
                const res = await Axios().post(`create-product`, payload);
                Toastify({
                    text: `Product Created Succesfully`,
                    className: "info",
                    style: {
                        background: "green",
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
                    }
                }).showToast();
                commit("SET_ERRORS", error.response.data.errors)
            } finally {
                commit('END_LOADING')
            }
        },

        async addDiscount({ commit }, { id, price, product_id }) {
            commit('SET_LOADING')
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
                commit('END_LOADING')
            }
        },

        async getBankDetails({ commit }, id) {
            try {
                const res = await Axios().get(`show-bank-details/${id}`);
                commit("SET_BANK_DETAILS", res)
            } catch (error) {
                return error
            }
        },

        async addBankDetails({ dispatch, commit }, payload) {
            commit('SET_LOADING')
            try {
                const res = await Axios().post(`add-bank-details/`, payload);
                Toastify({
                    text: `Bank Details added Succesfully`,
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
                commit('END_LOADING')
                dispatch("getBankDetails", payload.id)
            }
        },

        // Get Shipping Zones
        getShippingClasses({ commit }) {
            Axios().get('/all-shipping-classes')
                .then((res) => {
                    console.log(res.data.shipping_classes);
                    commit("SHIPPING_CLASSES", res.data.shipping_classes.data)
                })
                .catch((err) => {
                    console.log(err);
                })
        },




    },
    getters: {
        getProducts: (state) => state.products,
        isErrors: (state) => state.errors,
        isLoading: (state) => state.loading,
        bankDetails: (state) => state.bank_details,
        shippingClasses: (state) => state.shipping_classes
    },
};