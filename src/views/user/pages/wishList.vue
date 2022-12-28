<template>
    <div>
        <div>
            <div>
                <div>
                    <div class="mb-3">
                        <h4 style="font-weight: 700">Wishlist</h4>
                        <hr>
                    </div>
                </div>
                <div class="py-2 w-100" v-if="wishlist.length === 0">
                      <el-alert
                      class="w-100"
                        title="Oops!!! No Wishlist Item yet"
                        type="error"
                        :closable="false">
                      </el-alert>
                      <div class="text-center mt-3">
                        <button class="" @click="goToShop">
                        Start Shopping
                        </button>
                      </div>
                    </div>
                <div class="single--order_list d-flex justify-content-between mb-4" v-for="item in wishlist" :key="item.id">
                    <div class="d-flex align-items-center" style="gap:10px">
                        <img :src='item.product === null ? "/no-product.webp" : config.imgUrl + item.product.app_icon ' alt="product Image">
                        <div>
                            <h5 class="font-weight-bold text-dark"> {{ item.product === null ? "No Name" : item.product.name }} </h5>
                        </div>

                    </div>
                    <div class="d-flex align-items-center" style="gap:20px">
                        <router-link class="text-dark" :to=' item.product === null ? "/no-url" : "/product/"+item.product.slug '>
                        <button>See Details</button>
                        </router-link>
                        <span role="button" style="width:max-content" @click="removeFromWishlist(item)">
                        <i-icon icon="ic:baseline-delete" style="font-size:22; color: var(--tertiary-color);" /></span>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import config from '@/config/api'
export default {
  data () {
    return {
      config
    }
  },
  methods: {
    ...mapActions('auth', ['removeWishlistItem']),
    goToShop () {
      this.$router.push('/shop')
    },
    removeFromWishlist (item) {
      this.removeWishlistItem(item.id)
    }
  },
  computed: {
    wishlist () {
      return this.$store.getters['auth/getUser'].wish_lists
    }
  }
}
</script>
