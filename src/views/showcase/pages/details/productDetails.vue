<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(255, 255, 255, 0.7)"
    style="width: 100%"
  >
      <div class="container-fluid py-3">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            ><router-link to="/" style="font-weight: 400">
              Home
            </router-link></el-breadcrumb-item
          >
          <el-breadcrumb-item
            ><router-link :to="currentRoute.path" style="font-weight: 400">
              {{ currentRoute.name }}
            </router-link></el-breadcrumb-item
          >
          <el-breadcrumb-item v-if="currentRoute.params !== {}">
            {{ currentRoute.params.slug }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container-fluid py-4">
        <div class="d-lg-flex" style="gap: 50px">
          <div class="w-100">
            <!-- <GalleryView
              class="mb-2"
              :starting-image="1"
              :images="images"
              :auto-slide-interval="2000"
            /> -->
            <lingallery :iid.sync="currentId" :width="600" :height="400" :items="images"/>
          </div>

          <div
            class="
              main--product_details
              w-100
              d-flex
              flex-column
              justify-content-between
            "
          >
            <div>
              <h3 class="font-weight-bold text-dark text-capitalize">
                {{ product.name }}
              </h3>

              <!-- Listing this product's Categories -->
              <div
                class="categories my-3 d-flex align-items-center"
                style="gap: 5px"
              >
                <h6 class="small">Categories:</h6>
                <span class="no--item" v-if="categories.length === 0">
                  No Categories for this product
                </span>
                <span
                  v-for="item in categories"
                  :key="item.id"
                  :class="item.category_name.charAt(0)"
                  class="text-white small text-capitalize px-2 py-1"
                  style="border-radius: 4px"
                >
                  {{ item.category_name }}
                </span>
              </div>

              <!-- Listing this product's Tags -->
              <div class="tags my-3 d-flex align-items-center" style="gap: 5px">
                <h6 class="small">Tags:</h6>
                <span class="no--item" v-if="tags.length === 0">
                  No Categories for this product
                </span>
                <span
                  v-for="item in tags"
                  :key="item.id"
                  :class="item.name.charAt(0)"
                  class="text-white small text-capitalize px-2 py-1"
                  style="border-radius: 4px"
                >
                  {{ item.name }}
                </span>
              </div>

              <hr />

              <div class="mb-2">
                <h1 style="font-weight: 600">
                  &#8358; {{ (product.price * num).toLocaleString() }}
                </h1>
              </div>
              <div class="d-flex align-items-center" style="gap: 5px">
                <star-rating
                  :increment="0.1"
                  v-model="product.avg_ratings"
                  inactive-color="#aaa"
                  active-color="#ffb20f"
                  v-bind:star-size="14"
                  :show-rating="false"
                  :rounded-corners="true"
                ></star-rating>
                <small class="text-muted" style="font-size: 12px">{{
                  `(${product.reviews.length} reviews)`
                }}</small>
              </div>
              <!-- description -->
              <div class="mt-3">
                <span
                  v-html="product.description"
                  class="text-muted product_data"
                  style="font-size: 14px"
                ></span>
              </div>

              <hr />
            </div>

            <!-- Bottom Area that contains Quantity Increase and Add to Cart and Add to wishlist -->
            <div class="d-lg-flex align-items-center" style="gap: 20px">
              <!-- Increase Quantity  -->
              <div class="mt-3">
                <el-input-number
                  v-model="num"
                  :min="1"
                  :max="10"
                ></el-input-number>
              </div>

              <div
                class="d-flex align-items-center mt-3 w-100"
                style="gap: 20px"
              >
                <button
                  class="text-uppercase w-100"
                  style="
                    font-size: 15px !important;
                    font-weight: 600;
                    border-radius: 3px !important;
                  "
                  @click="addToCart"
                >
                  Add to Cart
                </button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-heart"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  stroke-width="1"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>

        <!-- Other Details  -->
        <div class="other--details">
          <el-tabs v-model="activeName">
            <el-tab-pane label="Description" name="first">
              <div class="d-lg-flex" style="gap: 30px">
                <div
                  v-html="product.description"
                  class="w-100 description--content mt-4"
                ></div>
                <div
                  class="product--video mt-4"
                  :style="{
                    'background-image': `url(${config.imgUrl}${product.photo_three})`,
                  }"
                >
                  <div
                    class="play--icon"
                    @click="dialogVisible = true"
                    role="button"
                  >
                    <i class="el-icon-video-play"></i>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane
              :label="'Customer Reviews' + '(' + product.reviews.length + ')'"
              name="second"
            >
              <VendorReviews />
            </el-tab-pane>
            <el-tab-pane label="Vendor" name="third">
              <ShopDetails />
            </el-tab-pane>
          </el-tabs>
          <el-dialog :visible.sync="dialogVisible" width="60%">
            <video
              style="width: 100%"
              :src="config.imgUrl + product.video"
              controls
            ></video>
          </el-dialog>
        </div>

        <!-- More Products from this Vendor -->
        <div class="mt-4">
          <VendorProducts />
        </div>

        <!-- related Products  -->
        <!-- <div>
          <RelatedProducts />
        </div> -->
      </div>
    </div>
</template>

<script>
import config from '@/config/api'
import StarRating from 'vue-star-rating'
import VendorReviews from '../../components/vendorReviews.vue'
import ShopDetails from '../../components/shopDetails.vue'
import VendorProducts from '../../components/vendorProducts.vue'
// import RelatedProducts from "../components/relatedProducts.vue";
// import GalleryView from '../../components/galleryView.vue'
export default {
  components: {
    StarRating,
    VendorReviews,
    ShopDetails,
    VendorProducts
    // GalleryView
  },
  data () {
    return {
      config,
      rating: 5,
      num: 1,
      activeName: 'first',
      dialogVisible: false,
      currentId: null
    }
  },
  methods: {
    addToCart () {
      const payload = {
        product_id: this.$store.getters['showcase/getSingleProduct'].id,
        quantity: this.num
      }
      console.log(payload)
      this.$store.dispatch('auth/addToCart', payload)
    }
  },
  beforeMount () {
    this.$store.dispatch('showcase/getStoreById', this.product.shop_id)
  },
  beforeCreate () {
    const slug = this.$route.params.slug
    this.$store.dispatch('showcase/getProductBySlug', slug)
  },
  computed: {
    product () {
      return this.$store.getters['showcase/getSingleProduct']
    },
    categories () {
      return this.product.categories
    },

    tags () {
      return this.product.tags
    },
    slugName () {
      return this.$route.params.slug
    },
    currentRoute () {
      return this.$route
    },
    images () {
      const imagestoArray = [
        {
          id: 1,
          src: config.imgUrl + this.product.app_icon,
          thumbnail: config.imgUrl + this.product.app_icon
        },
        {
          id: 2,
          src: config.imgUrl + this.product.photo_one,
          thumbnail: config.imgUrl + this.product.photo_one
        },
        {
          id: 3,
          src: config.imgUrl + this.product.photo_two,
          thumbnail: config.imgUrl + this.product.photo_two
        },
        {
          id: 4,
          src: config.imgUrl + this.product.photo_three,
          thumbnail: config.imgUrl + this.product.photo_three
        },
        {
          id: 5,
          src: config.imgUrl + this.product.photo_four,
          thumbnail: config.imgUrl + this.product.photo_four
        },
        {
          id: 6,
          src: config.imgUrl + this.product.photo_five,
          thumbnail: config.imgUrl + this.product.photo_five
        }
      ]
      return imagestoArray
    },
    loading () {
      return this.$store.getters['showcase/isLoading']
    }
  }
}
</script>
