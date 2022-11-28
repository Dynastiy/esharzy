<template>
  <div>
    <div class="">
      <div class="my-5">
        <!-- Deals of the Day -->
        <h4 class="text-dark font-weight-bold mb-3">Deals of the day</h4>
        <div>
          <product-list :products="discounted_products"  @add_to_wishlist="addToWishlist" @add_to_cart="addToCart"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config/api'
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
    ...mapActions('showcase', ['discountedProducts']),

    goToCategory (category) {
      this.$router.push(`/category/${category.slug}`)
    },

    viewProduct (item) {
      this.$router.push({
        name: 'product-details',
        params: { slug: item.slug }
      })
      this.$store.dispatch('showcase/getProductBySlug', item.slug)
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
      console.log(payload)
      this.$store.dispatch('auth/addToWishlist', payload)
      this.discountedProducts()
    }
  },
  beforeMount () {
    this.discountedProducts()
  },
  computed: {
    ...mapState('showcase', ['discounted_products', 'loading'])
  },
  components: { ProductList }
}
</script>
