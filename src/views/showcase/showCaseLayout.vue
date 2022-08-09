<template>
    <div>
        <div>
            <TopHeader/>
            <MainHeader/>
            <AppHeader/>
            <router-view :key="$route.fullPath"/>
            <AppFooter/>
        </div>
    </div>
</template>


<script>
import TopHeader from './components/topHeader.vue';
import MainHeader from './components/mainHeader.vue';
import AppHeader from './components/appHeader.vue';
import AppFooter from './components/appFooter.vue';
export default {
    components: { TopHeader, MainHeader, AppHeader, AppFooter }
}
</script>