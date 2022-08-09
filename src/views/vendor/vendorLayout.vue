<template>
    <div>
        <div>
            <SideBar/>
            <div class="main-content">
                <AppHeader/>
                <div class="main-dashboard">
                    <router-view/>
                </div>
            </div>
        </div>

        <!-- No Shop  --> 
        
        <NoShop v-if="getUser.shop === null" />
    </div>
</template>

<script>
import AppHeader from './components/appHeader.vue';
import SideBar from './components/sideBar.vue';
import NoShop from './components/noShop.vue';
export default {
    computed:{
        getUser(){
            return this.$store.getters['auth/getUser']
        }
    },
    components: { AppHeader, SideBar, NoShop }
}
</script>