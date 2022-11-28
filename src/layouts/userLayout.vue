<template>
    <div>
      <div>
        <AppHeader />
        <div class="main--dashboard d-lg-flex container-fluid my-5" style="gap:30px">
                 <div class="user--side_drawer" style="width:35%">
                    <side-drawer/>
                 </div>
                <div class=" dashboard--area w-100">
                    <slot/>
                </div>
            </div>
        <AppFooter />
      </div>
    </div>
  </template>

<script>
import AppHeader from '../components/static/appHeader.vue'
import AppFooter from '../components/static/appFooter.vue'
import SideDrawer from '@/views/user/components/sideDrawer.vue'
export default {
  name: 'homeLayout',
  components: { AppHeader, AppFooter, SideDrawer },
  data () {
    return {}
  },
  created () {

  }
}
</script>
