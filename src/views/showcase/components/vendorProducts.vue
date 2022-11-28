<template>
    <div>
      <div class="shop--products">
        <!-- {{ store_products }} -->
        <div class="d-flex justify-content-between align-items-center">
            <h4 style="font-weight: 600">More products from this vendor</h4>
            <span @click="goToStore" role="button">
                <span style="font-weight:600"
                >More Products
                <i class="el-icon-right"></i>
                </span>
            </span>
        </div>

        <hr>

        <div class="border--area" style="border: 1px dashed var(--gray-400)" v-show="store_products.length == 0">
          <h6 style="font-weight: 400">No products were found for this vendor!</h6>
        </div>

        <div>
          <!-- List Products  -->
          <product-list :products="store_products" @add_to_wishlist="addToWishlist" @add_to_cart="addToCart"/>

        </div>
      </div>
    </div>
  </template>

<script>
import ProductList from './productList.vue'

// import StarRating from "vue-star-rating";
// import config from "@/config/api";
export default {
  components: {
    ProductList
    // StarRating
  },
  data () {
    return {
      // config,
      ratings: Number('')
    }
  },
  methods: {
    goToStore () {
      this.$router.push(`/store-listing/${this.store.slug}`)
      this.$store.dispatch('showcase/getStoreBySlug', this.store.slug)
    },
    addToCart (item) {
      const payload = {
        product_id: item.id,
        quantity: this.num
      }
      localStorage.setItem('cart_details', JSON.stringify(payload))
      console.log(payload)
      this.$store.dispatch('auth/addToCart', payload)
    },
    addToWishlist (item) {
      const payload = {
        product_id: item.id
      }
      this.$store.dispatch('auth/addToWishlist', payload)
      this.$store.dispatch('showcase/getStoreBySlug', this.store.slug)
    }
  },
  computed: {
    store () {
      return this.$store.getters['showcase/getStore']
    },
    store_products () {
      return this.store.activated_products
    }
  }
}
</script>
