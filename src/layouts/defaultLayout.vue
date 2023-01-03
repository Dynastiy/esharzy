<template>
      <div>
        <slot/>
    </div>
  </template>

<script>
export default {
  name: 'defaultLayout',

  data () {
    return {}
  },
  created () {

  },
  computed: {
    // loading () {
    //   return this.$store.getters['user/isLoading']
    // }
  }
}
</script>
