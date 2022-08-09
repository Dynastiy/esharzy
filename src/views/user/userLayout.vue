<template>
    <div>
        <div>
            <TopHeader/>
            <MainHeader/>
            <AppHeader/>
           
            <div class="main--dashboard d-lg-flex container-fluid my-5" style="gap:30px">
                 <div class="user--side_drawer" style="width:35%">
                    <SideDrawer/>
                 </div>
                <div class=" dashboard--area w-100">
                    <router-view/>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import TopHeader from './components/headers/topHeader.vue';
import MainHeader from './components/headers/mainHeader.vue';
import AppHeader from './components/headers/appHeader.vue';
import SideDrawer from './components/sideDrawer.vue';
export default {
    components: { TopHeader, MainHeader, AppHeader, SideDrawer }
}
</script>