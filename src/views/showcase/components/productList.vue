<template>
  <div>
    <div
      v-loading="loading"
      element-loading-background="rgba(255, 255, 255, 0.7)"
      style="width: 100%"
    >
      <el-skeleton
        style=""
        class="products--list"
        :loading="loading"
        animated
        :throttle="300"
      >
        <template slot="template">
          <el-skeleton-item
            variant="image"
            style="width: 100%; height: 300px"
          />
          <div style="margin-top: 10px">
            <el-skeleton-item variant="h3" style="width: 50%" />
            <div style="margin-top: 8px; height: 16px">
              <el-skeleton-item variant="text" />
            </div>
          </div>
        </template>
        <template>
          <div v-if="products.length == 0">
            <el-alert type="error" :closable="false" class="w-100">
              No available products yet
            </el-alert>
          </div>
          <div
            v-for="item in products"
            :key="item.id"
            class=""
            data-aos="fade-down"
          >
            <div>
              <div class="img-services1">
                <div class="ribbon" v-if="item.availability !== 'in-stock'">
                  <span class="ribbon__content">sold out</span>
                </div>
                <div>
                  <!-- <span class="percentage"> {{ `${item.discount.percentage}% OFF` }} </span> -->
                  <img
                    :src="config.imgUrl + item.app_icon"
                    alt=""
                    role="button"
                    @click="viewProduct(item)"
                  />
                </div>
                <div class="middle text-center">
                  <div
                    class="
                      d-flex
                      align-items-center
                      justify-content-around
                      px-1
                      py-2
                    "
                  >
                    <span role="button"
                      @click=" cart_item(item) ? '' : addToCart(item)">
                       <i-icon
                       :icon='!cart_item(item) ? "material-symbols:shopping-cart-outline"
                       : "material-symbols:shopping-cart" ' style="font-size:22px"
                       :style="cart_item(item) ? style='color: var(--tertiary-color)' : '' "/>
                    </span>

                     <span  role="button"
                      @click="wishlist_item(item) ? '' : addToWishlist(item)">
                      <i-icon
                       :icon='!wishlist_item(item) ? "icon-park-outline:like"
                       : "wpf:like" ' style="font-size:22px"
                       :style="wishlist_item(item) ? style='color: var(--tertiary-color)' : '' "/>
                     </span>

                      <span role="button"
                      @click="viewProduct(item)">
                        <i-icon  icon="ri:search-line" style="font-size:20px" />
                      </span>
                  </div>
                </div>
              </div>
              <div class="text-center mt-2">
                <h6
                  role="button"
                  class="text-dark text-capitalize"
                  style="font-size: 15px"
                  @click="viewProduct(item)"
                >
                  {{ item.name }}
                </h6>
                <div
                  class="d-flex align-items-center m-0 justify-content-center"
                  style="gap: 10px"
                >
                  <star-rating
                    :increment="0.1"
                    v-model="item.avg_ratings"
                    inactive-color="#aaa"
                    active-color="#666"
                    v-bind:star-size="13"
                    :show-rating="false"
                    :rounded-corners="true"
                    :read-only="true"
                  ></star-rating>
                  <small class="" style="font-size: 13px">
                    {{ "(" + item.reviews.length + " reviews)" }}
                  </small>
                </div>
                <div class="text-center">
                  <div
                    v-if="item.discount"
                    class="d-flex align-items-center justify-content-center"
                    style="gap: 10px"
                  >
                    <span
                      class="text-dark"
                      style="font-weight: 500; font-size: 15px"
                    >
                      &#8358; {{ item.discount.price }}
                    </span>
                    <span
                      class="" style="text-decoration-line: line-through !important;
                        font-weight: 500;
                        font-size: 15px;
                        color: #666;
                      "
                    >
                      &#8358; {{ item.price.toLocaleString() }}
                    </span>
                  </div>
                  <small
                    v-else
                    class="text-dark"
                    style="font-weight: 500; font-size: 15px"
                  >
                    &#8358; {{ item.price.toLocaleString() }}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script>
import config from '@/config/api'
import StarRating from 'vue-star-rating'
import { mapState } from 'vuex'
export default {
  props: ['products'],
  components: {
    StarRating
  },
  data () {
    return {
      config,
      rating: 3,
      num: 1,
      category: '',
      sort: 'Default Sorting'
    }
  },
  methods: {
    viewProduct (item) {
      this.$router.push({
        name: 'product-details',
        params: { slug: item.slug }
      })
      this.$store.dispatch('showcase/getProductBySlug', item.slug)
    },
    addToCart (item) {
      this.$emit('add_to_cart', item.id)
    },
    addToWishlist (item) {
      this.$emit('add_to_wishlist', item.id)
    },
    cart_item (item) {
      const token = localStorage.getItem('token')
      if (token) {
        const cartItems = this.user.cart
        const val = cartItems.filter(elem => (item.id === elem.product_id))
        const result = val.length !== 0
        return result
      } else {
        return false
      }
    },
    wishlist_item (item) {
      const token = localStorage.getItem('token')
      if (token) {
        const wishlistItems = this.user.wish_lists
        const val = wishlistItems.filter(elem => (item.id === elem.product_id))
        const result = val.length !== 0
        return result
      } else {
        return false
      }
    }

  },
  computed: {
    loading () {
      return this.$store.getters['showcase/isLoading']
    },
    ...mapState('auth', ['user'])

  }
}
</script>
