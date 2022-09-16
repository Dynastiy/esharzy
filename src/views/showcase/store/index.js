import Axios from "@/config/https";

export default {
    namespaced: true,
    state: {
        categories: [],
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
        vendor: {}
    },
    mutations: {
        SET_CATEGORIES(state, data) {
            state.categories = data;
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
        }
    },
    actions: {
        async getCategories({ commit }) {
            try {
                const res = await Axios().get(`all-categories`);
                commit("SET_CATEGORIES", res.data);
                console.log(res.data);
                return res
            } catch (error) {
                console.log(error);
            }
        },
        async getTags({ commit }) {
            try {
                const res = await Axios().get(`all-tags`);
                commit("SET_TAGS", res.data);
                return res
            } catch (error) {
                console.log(error);
            }
        },
        async getProducts({ commit }) {
            try {
                const res = await Axios().get(`all-products`);
                commit("SET_PRODUCTS", res.data);
                return res
            } catch (error) {
                console.log(error);
            }
        },
        async getNewProducts({ commit }) {
            try {
                const res = await Axios().get(`new-products`);
                commit("SET_NEW_PRODUCTS", res.data);
                return res
            } catch (error) {
                console.log(error);
            }
        },
        async trendingProducts({ commit }) {
            try {
                const res = await Axios().get(`trending-products`);
                commit("SET_TRENDING_PRODUCTS", res.data);
                return res
            } catch (error) {
                console.log(error);
            }
        },
        async topRatedProducts({ commit }) {
            try {
                const res = await Axios().get(`trending-products`);
                commit("SET_TOP_RATED_PRODUCTS", res.data);
                return res
            } catch (error) {
                console.log(error);
            }
        },
        async discountedProducts({ commit }) {
            try {
                const res = await Axios().get(`discounted-products`);
                commit("SET_DISCOUNTED_PRODUCTS", res.data);
                console.log(res.data);
                return res
            } catch (error) {
                console.log(error);
            }
        },
        async getProductBySlug({ commit }, slug) {
            try {
                const res = await Axios().get(`show-product/${slug}`);
                console.log(res.data);
                commit("SET_SINGLE_PRODUCT", res.data);
                return res
            } catch (error) {
                console.log(error);
            }
        },
        async getStores({ commit }) {
            try {
                const res = await Axios().get(`all-shops`);
                commit("SET_STORES", res.data.shops);
                return res
            } catch (error) {
                console.log(error);
            }
        },

        async getStoreBySlug({ commit }, slug) {
            try {
                const res = await Axios().get(`show-shop/${slug}`);
                commit("SET_STORE", res.data.shop);
                return res
            } catch (error) {
                console.log(error);
            }
        },

        async getVendors({ commit }) {
            try {
                const res = await Axios().get(`vendor-users`);
                commit("SET_VENDORS", res.data.vendors);
                return res
            } catch (error) {
                console.log(error);
            }
        },


    },
    getters: {
        getCategories: (state) => state.categories,
        getTags: (state) => state.tags,
        getProducts: (state) => state.products,
        newProducts: (state) => state.new_products,
        trendingProducts: (state) => state.trending_products,
        topRatedProducts: (state) => state.top_rated_products,
        getSingleProduct: (state) => state.product,
        getDiscountedProducts: (state) => state.discounted_products,
        getStores: (state) => state.stores,
        getStore: (state) => state.store,
        getVendors: (state) => state.vendors
    },
};