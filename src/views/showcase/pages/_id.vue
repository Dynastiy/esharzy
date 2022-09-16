<template>
  <div>
    <div class="">
      <div class="container-fluid py-3">
        <el-breadcrumb separator="|">
          <el-breadcrumb-item class="" to="/">Homepage</el-breadcrumb-item>
          <el-breadcrumb-item class="text-secondary">  {{ product.name }} </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container-fluid py-4">
        <div
          class="d-lg-flex bg-white p-4 rounded-lg"
          style="gap: 50px"
        >
          <div class="w-100">
            <el-carousel :interval="4000" type="card" height="350px">
              <el-carousel-item v-for="item in images" :key="item.id">
                <img :src="config.imgUrl + item.image" alt="" />
              </el-carousel-item>
            </el-carousel>
            <!-- <div class="text-center">
              <button class="small">Watch Video Description of Product</button>
            </div> -->
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
              <div class="d-flex align-items-center" style="gap: 5px">
                <star-rating
                  v-model="rating"
                  inactive-color="#000"
                  active-color="#ffd700"
                  v-bind:star-size="13"
                  :show-rating="false"
                  :rounded-corners="true"
                ></star-rating>
                <small class="text-muted" style="font-size: 12px"
                  >(10 Reviews)</small
                >
              </div>
              <!-- description -->
              <div class="mt-3">
                <span
                  v-html="product.description"
                  class="text-muted"
                  style="font-size: 11px"
                ></span>
              </div>

              <!-- Increase Quantity  -->
              <div class="my-3">
                <h6 class="mb-1 small">Quantity</h6>
                <el-input-number
                  v-model="num"
                  :min="1"
                  :max="10"
                ></el-input-number>
              </div>

              <!-- Listing this product's Categories -->
              <div class="categories mt-3">
                <h6 class="mb-2 small">Categories</h6>
                <el-tag
                  v-for="item in product.categories"
                  :key="item.id"
                  size="medium"
                >
                  {{ item.category_name }}
                </el-tag>
              </div>

              <!-- Listing this product's Tags -->
              <div class="tags mt-3">
                <h6 class="mb-2 small">Tags</h6>
                <el-tag
                  v-for="item in product.tags"
                  :key="item.id"
                  size="medium"
                >
                  {{ item.name }}
                </el-tag>
              </div>
            </div>

            <!-- Bottom Area that contains Price and Add to Cart and Add to wishlist -->
            <div class="d-flex align-items-center mt-3" style="gap: 20px">
              <div>
                <h4>${{ product.price * num }}</h4>
              </div>
              <div class="d-flex align-items-center" style="gap: 20px">
                <button class="small" @click="addToCart">Add to Cart</button>
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

        <div class="other--details">
          <el-tabs v-model="activeName" >
            <el-tab-pane label="Description" name="first">
              <div class="d-lg-flex mt-3 " style="gap:30px">
                <div v-html="product.description" class="w-100 description--content">
                  </div>
                  <div class="product--video" :style="{ 'background-image': `url(${config.imgUrl}${product.photo_three})` }">
                    <div class="play--icon" @click="dialogVisible = true" role="button">
                      <i class="el-icon-video-play"></i>
                    </div>
                  </div>                  
              </div>
            </el-tab-pane>
            <el-tab-pane :label='"Customer Reviews" + "("+product.reviews.length+")"' name="second"> <VendorReviews/> </el-tab-pane>
            <el-tab-pane label="Vendor" name="third">Role</el-tab-pane>
          </el-tabs>
          <el-dialog
            :visible.sync="dialogVisible"
            width="60%">
          
            <video style="width:100%" :src=" config.imgUrl + product.video " controls></video>
          </el-dialog>
        </div> 
        
      </div>
     
    </div>
  </div>
</template>


<script>
import config from "@/config/api";
import StarRating from "vue-star-rating";
import VendorReviews from "../components/vendorReviews.vue";
export default {
  components: {
    StarRating,
    VendorReviews
},
  data() {
    return {
      config,
      rating: 5,
      num: 1,
      activeName: 'first',
      dialogVisible: false
    };
  },
  methods: {
    addToCart() {
      let payload = {
        product_id: this.$store.getters["showcase/getSingleProduct"].product.id,
        quantity: this.num,
      };
      console.log(payload);
      this.$store.dispatch("auth/addToCart", payload);
    },
  },
  beforeMount(){
    let slug = this.$route.params.slug
    this.$store.dispatch("showcase/getProductBySlug", slug);
  },
  computed: {
    product() {
      return this.$store.getters["showcase/getSingleProduct"].product;
    },
    slugName() {
      return this.$route.params.slug;
    },
    images() {
      let imagestoArray = [
        {
          id: 1,
          image:
            this.$store.getters["showcase/getSingleProduct"].product.app_icon,
        },
        {
          id: 2,
          image:
            this.$store.getters["showcase/getSingleProduct"].product.photo_one,
        },
        {
          id: 3,
          image:
            this.$store.getters["showcase/getSingleProduct"].product.photo_two,
        },
        {
          id: 4,
          image:
            this.$store.getters["showcase/getSingleProduct"].product
              .photo_three,
        },
        {
          id: 5,
          image:
            this.$store.getters["showcase/getSingleProduct"].product.photo_four,
        },
        {
          id: 6,
          image:
            this.$store.getters["showcase/getSingleProduct"].product.photo_five,
        },
      ];
      return imagestoArray;
    },
  },
};
</script>