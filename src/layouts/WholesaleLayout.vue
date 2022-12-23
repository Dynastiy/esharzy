<template>
    <div>
      <div>
        <AppHeader />
        <slot/>
        <AppFooter />
      </div>
    </div>
  </template>

<script>
import AppHeader from '../components/static/appHeader.vue'
import AppFooter from '../components/static/appFooter.vue'
export default {
  name: 'homeLayout',
  components: { AppHeader, AppFooter },
  data () {
    return {}
  },
  created () {

  }
}
</script>
