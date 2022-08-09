<template>
  <div>
    <div class="">
      <div class="container-fluid py-3">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item to="/">Homepage</el-breadcrumb-item>
          <el-breadcrumb-item> {{ product.name }} </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container-fluid py-4">
        <div class="d-lg-flex bg-white shadow-lg p-3 rounded-lg" style="gap: 30px">
          <div class="w-100">
            <el-carousel :interval="4000" type="card" height="350px">
              <el-carousel-item v-for="item in images" :key="item.id">
                <img :src="config.imgUrl + item.image" alt="" />
              </el-carousel-item>
            </el-carousel>
            <div class="text-center">
              <button>Watch Video Description of Product</button>
              <!-- <div class="video--description">
                <video width="720" height="240" :src="config.imgUrl + product.video" controls></video>
             </div> -->
            </div>
          </div>
          <div class="main--product_details w-100 d-flex flex-column justify-content-between">
            <div>
              <h2 class="font-weight-bold text-dark text-capitalize">
                {{ product.name }}
              </h2>
              <div class="d-flex align-items-center" style="gap: 3px">
                <star-rating
                  v-model="rating"
                  inactive-color="#000"
                  active-color="#ffd700"
                  v-bind:star-size="14"
                  :show-rating="false"
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
                  style="font-size: 14px"
                ></span>
              </div>

              <!-- Increase Quantity  -->
            <div class="my-3">
              <h6 class="mb-1">Quantity</h6>
              <el-input-number v-model="num" :min="1" :max="10"></el-input-number>
            </div>

              <!-- Listing this product's Categories -->
              <div class="categories mt-3">
                <h6 class="mb-2">Categories</h6>
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
                <h6 class="mb-2">Tags</h6>
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
            <div class="d-flex align-items-center" style="gap:20px">
                <div>
                    <h3>
                        ${{ product.price * num }}
                    </h3>
                </div>
                <div class="d-flex align-items-center" style="gap:20px">
                    <button @click="addToCart">Add to Cart</button>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="30" height="30" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                    </svg>
                </div>
            </div>
          </div>
        </div>

        <div class="mt-4 bg-white shadow-lg p-3 rounded-lg">
            <div>
                <h4>Reviews</h4>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import config from "@/config/api";
import StarRating from "vue-star-rating";
export default {
  components: {
    StarRating,
  },
  data() {
    return {
      config,
      rating: 5,
      num: 1
    };
  },
  methods:{
    addToCart(){
      let payload = {
        product_id: this.$store.getters["showcase/getSingleProduct"].product.id,
        quantity: this.num
      }
      console.log(payload);
      this.$store.dispatch("auth/addToCart", payload)
    }
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