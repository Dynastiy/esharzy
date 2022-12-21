<template>
    <div>
        <div>
            <SideBar/>
            <div class="main-content">
                <AppHeader/>
                <div class="main-dashboard">
                    <slot/>
                </div>
            </div>
        </div>

        <!-- No Shop  -->
        <NoShop v-if="getUser.shop === null" />
    </div>
</template>

<script>
import AppHeader from '../views/vendor/components/appHeader.vue'
import SideBar from '../views/vendor/components/sideBar.vue'
import NoShop from '../views/vendor/components/noShop.vue'
export default {
  computed: {
    getUser () {
      return this.$store.getters['auth/getUser']
    }
  },
  components: { AppHeader, SideBar, NoShop }
}
</script>
