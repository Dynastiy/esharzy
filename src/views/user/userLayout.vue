<template>
    <div>
        <div>
            <AppHeader/>
            <!-- <div>
                My Account
            </div> -->
           
            <div class="main--dashboard d-lg-flex container-fluid my-5" style="gap:30px">
                 <div class="user--side_drawer" style="width:35%">
                    <SideDrawer/>
                 </div>
                <div class=" dashboard--area w-100">
                    <router-view/>
                </div>
            </div>

            <AppFooter/>
        </div>
    </div>
</template>


<script>
import AppHeader from '../../components/static/appHeader.vue';
import AppFooter from '../../components/static/appFooter.vue';
import SideDrawer from './components/sideDrawer.vue';
export default {
    components: { AppHeader, AppFooter, SideDrawer },
    beforeMount(){
      this.$store.dispatch('auth/setUser')
    },
}
</script>


