<template>
    <div>
      <div class="">
        <div class="my-5">
          <!-- Deals of the Day -->
          <h4 class="text-dark font-weight-bold mb-3">New Products</h4>
          <div>
            <div class="my-3">
              <product-list :products="new_products"  @add_to_wishlist="addToWishlist" @add_to_cart="addToCart"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
import config from '@/config/api'
// import StarRating from "vue-star-rating";
import { mapActions, mapState } from 'vuex'
import ProductList from '../productList.vue'
export default {
  data () {
    return {
      config,
      rating: 3,
      num: 1
    }
  },
  methods: {
    ...mapActions('showcase', ['getNewProducts']),

    goToCategory (category) {
      this.$router.push(`/category/${category.slug}`)
    },

    addToCart (value) {
      const payload = {
        product_id: value,
        quantity: 1
      }
      localStorage.setItem('cart_details', JSON.stringify(payload))
      console.log(payload)
      this.$store.dispatch('auth/addToCart', payload)
    },

    addToWishlist (value) {
      const payload = {
        product_id: value
      }
      console.log(payload)
      this.$store.dispatch('auth/addToWishlist', payload)
      this.getProducts()
    }
  },
  beforeMount () {
    this.getProducts()
  },
  computed: {
    ...mapState('showcase', ['new_products', 'loading'])
  },
  components: { ProductList }
}
</script>
