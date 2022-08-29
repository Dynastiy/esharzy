import Vue from 'vue'
import Vuex from 'vuex'

// Modules 
import showcase from '@/views/showcase/store/index'
import auth from '@/views/auth/store/index'
import vendor from '@/views/vendor/store/index'
import user from '@/views/user/store/index'



import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
    trict: true,
    plugins: [createPersistedState()],
    state: {},
    getters: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        showcase,
        auth,
        vendor,
        user
    }
})