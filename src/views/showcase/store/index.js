import Axios from "@/config/https";

import "toastify-js/src/toastify.css"
import Toastify from 'toastify-js'

// import router from '@/router'

export default {
    namespaced: true,
    state: {
        categories: [],
        sub_categories: [],
        category: {},
        tags: [],
        products: [],
        new_products: [],
        trending_products: [],
        top_rated_products: [],
        discounted_products: [],
        product: {},
        stores: [],
        store: {},
        vendors: [],
        vendor: {},
        loading: false
    },
    mutations: {
        SET_CATEGORIES(state, data) {
            state.categories = data;
        },
        SET_SUB_CATEGORIES(state, data) {
            state.sub_categories = data
        },
        SET_CATEGORY(state, data) {
            state.category = data
        },
        SET_TAGS(state, data) {
            state.tags = data;
        },
        SET_PRODUCTS(state, data) {
            state.products = data;
        },
        SET_NEW_PRODUCTS(state, data) {
            state.new_products = data
        },
        SET_TRENDING_PRODUCTS(state, data) {
            state.trending_products = data
        },
        SET_TOP_RATED_PRODUCTS(state, data) {
            state.top_rated_products = data
        },
        SET_DISCOUNTED_PRODUCTS(state, data) {
            state.discounted_products = data
        },
        SET_SINGLE_PRODUCT(state, data) {
            state.product = data
        },
        SET_STORES(state, data) {
            state.stores = data
        },
        SET_STORE(state, data) {
            state.store = data
        },
        SET_VENDORS(state, data) {
            state.vendors = data
        },
        SET_VENDOR(state, data) {
            state.vendor = data
        },
        SET_LOADING(state, data) {
            state.loading = data
        }
    },
    actions: {
        async getCategories({ commit }) {
            try {
                const res = await Axios().get(`all-categories`);
                commit("SET_CATEGORIES", res.data);
                return res
            } catch (error) {
                return error
            }
        },

        async getCategoryById({ commit }, slug) {
            try {
                const res = await Axios().get(`show-category/${slug}`);
                commit("SET_CATEGORY", res.data.category.activated_products);
                // console.log(res.data.category);
                return res
            } catch (error) {
                return error
            }
        },

        async getTags({ commit }) {
            try {
                const res = await Axios().get(`all-tags`);
                commit("SET_TAGS", res.data);
                return res
            } catch (error) {
                return error
            }
        },
        async getSubCategories({ commit }) {
            try {
                const res = await Axios().get(`all-subcategories`);
                commit("SET_SUB_CATEGORIES", res.data.sub_categories);
                return res
            } catch (error) {
                return error
            }
        },
        async getProducts({ commit }) {


            try {
                commit("SET_LOADING", true)
                const res = await Axios().get(`all-products`);
                commit("SET_PRODUCTS", res.data.all_products.data);
                console.log(res.data.all_products.data);
                return res
            } catch (error) {
                return error
            } finally {
                commit("SET_LOADING", false)
            }
        },
        async getNewProducts({ commit }) {

            try {
                commit("SET_LOADING", true)
                const res = await Axios().get(`new-products`);
                commit("SET_NEW_PRODUCTS", res.data.new_products.data);
                return res
            } catch (error) {
                return error
            } finally {
                commit("SET_LOADING", false)
            }
        },
        async trendingProducts({ commit }) {

            try {
                commit("SET_LOADING", true)
                const res = await Axios().get(`trending-products`);
                commit("SET_TRENDING_PRODUCTS", res.data.trending_products.data);
                return res
            } catch (error) {
                return error
            } finally {
                commit("SET_LOADING", false)
            }
        },
        async topRatedProducts({ commit }) {

            try {
                commit("SET_LOADING", true)
                const res = await Axios().get(`top-rated-products`);
                commit("SET_TOP_RATED_PRODUCTS", res.data.top_rated_products.data);

                return res
            } catch (error) {
                return error
            } finally {
                commit("SET_LOADING", false)
            }
        },
        async discountedProducts({ commit }) {
            commit("SET_LOADING", true)
            try {
                const res = await Axios().get(`discounted-products`);
                commit("SET_DISCOUNTED_PRODUCTS", res.data.discounted_products.data);
                return res
            } catch (error) {
                return error
            } finally {
                commit("SET_LOADING", false)
            }
        },
        async getProductBySlug({ commit }, slug) {
            commit("SET_LOADING", true)
            try {
                const res = await Axios().get(`show-product/${slug}`);
                commit("SET_SINGLE_PRODUCT", res.data.product);
                console.log(res.data.product);
                return res
            } catch (error) {
                return error
            } finally {
                commit("SET_LOADING", false)
            }
        },
        async getStores({ commit }) {
            commit("SET_LOADING", true)
            try {
                const res = await Axios().get(`all-shops`);
                commit("SET_STORES", res.data.shops.data);
                return res
            } catch (error) {
                return error
            } finally {
                commit("SET_LOADING", false)
            }
        },

        async getStoreBySlug({ commit }, slug) {
            try {
                const res = await Axios().get(`show-shop/${slug}`);
                commit("SET_STORE", res.data.shop);
                console.log(res.data.shop);
                return res
            } catch (error) {
                return error
            } finally {
                commit("SET_LOADING", false)
            }
        },

        async getStoreById({ commit }, id) {
            try {
                const res = await Axios().get(`find-shop/${id}`);
                commit("SET_STORE", res.data.shop);
                console.log(res.data.shop);
                return res
            } catch (error) {
                console.log(error);
                return error
            } finally {
                commit("SET_LOADING", false)
            }
        },

        async getVendors({ commit }) {
            try {
                const res = await Axios().get(`vendor-users`);
                commit("SET_VENDORS", res.data.vendors);
                return res
            } catch (error) {
                return error
            } finally {
                commit("SET_LOADING", false)
            }
        },


        async createReview({ dispatch, commit }, payload) {
            commit("SET_LOADING", true)
                // To check if User is logged in 
            try {
                const res = await Axios().post('create-review', payload)
                Toastify({
                    text: `Review Added!`,
                    className: "info",
                    style: {
                        background: "green",
                        fontSize: "12px",
                        borderRadius: "5px"
                    }
                }).showToast();
                dispatch("getProductBySlug", payload.slug)
                return res
            } catch (error) {
                return error
            } finally {
                commit("SET_LOADING", false)
            }
        },

        async createRating({ dispatch, commit }, payload) {
            commit("SET_LOADING", true)
            try {
                const res = await Axios().post('create-rating', payload)
                Toastify({
                    text: `Product Rated!`,
                    className: "info",
                    style: {
                        background: "green",
                        fontSize: "12px",
                        borderRadius: "5px"
                    }
                }).showToast();
                dispatch("getProductBySlug", payload.slug)
                return res
            } catch (error) {
                return error
            } finally {
                commit("SET_LOADING", false)
            }
        }


    },
    getters: {
        getCategories: (state) => state.categories,
        getCategory: (state) => state.category,
        getTags: (state) => state.tags,
        getProducts: (state) => state.products,
        newProducts: (state) => state.new_products,
        trendingProducts: (state) => state.trending_products,
        topRatedProducts: (state) => state.top_rated_products,
        getSingleProduct: (state) => state.product,
        getDiscountedProducts: (state) => state.discounted_products,
        getStores: (state) => state.stores,
        getStore: (state) => state.store,
        getVendors: (state) => state.vendors,
        isLoading: (state) => state.loading,
        getSubCategories: (state) => state.sub_categories
    },
};