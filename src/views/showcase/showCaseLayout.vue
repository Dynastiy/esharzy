<template>
  <div>
    <div>
      <AppHeader />
      <router-view :key="$route.fullPath" />
      <AppFooter />
    </div>
  </div>
</template>


<script>
import AppHeader from "../../components/static/appHeader.vue";
import AppFooter from "../../components/static/appFooter.vue";
export default {
  components: { AppHeader, AppFooter },
  data() {
    return {};
  },
  created() {
    
  },
};
</script>