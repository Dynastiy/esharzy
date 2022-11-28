<template>
  <div>
    <AppLayout>
      <router-view/>
    </AppLayout>
  </div>
</template>

<script>
import AppLayout from './layouts/AppLayout.vue';
export default {
    components: { AppLayout }
}
</script>

<style>

</style>
