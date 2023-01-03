<template>
        <div  v-loading="loading"
    element-loading-background="rgba(255, 255, 255, 0.7)"
    style="width: 100%">
            <div class="view--store container-fluid py-3">
                <div class="left--side mt-4">
                    <div>
                        <LeftSide/>
                    </div>
                </div>

                <div class="right--side mt-4">
                    <div class="user--data">
                        <VendorProfile/>
                        <div class="mt-3">
                            <ShopProducts/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import LeftSide from '../../components/leftSide.vue'
import VendorProfile from '../../components/vendorProfile.vue'
import ShopProducts from '../../components/shopProducts.vue'
export default {
  components: { LeftSide, VendorProfile, ShopProducts },
  beforeMount () {
    const slug = this.$route.params.slug
    this.$store.dispatch('showcase/getStoreBySlug', slug)
  },
  computed: {
    loading () {
      return this.$store.getters['showcase/isLoading']
    }
  }
}
</script>
