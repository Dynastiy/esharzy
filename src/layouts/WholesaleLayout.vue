<template>
    <div>
      <div>
        <WholesaleHeader />
        <ListCategories/>
        <slot/>
        <AppFooter />
      </div>
    </div>
  </template>

<script>
import WholesaleHeader from '../components/static/wholesaleHeader.vue'
import AppFooter from '../components/static/appFooter.vue'
import ListCategories from '@/views/wholesale/components/landing/listCategories.vue'
export default {
  name: 'homeLayout',
  components: { WholesaleHeader, AppFooter, ListCategories },
  data () {
    return {}
  },
  created () {

  }
}
</script>
