<template>
  <div>
    <div class="container-fluid">
      <HeroSection />

      <section
        class="
          our--positives
          mt-4
        "
        style="width:100%; overflow-x: auto;"
      >
        <div class="positive-item" >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-truck-delivery"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <circle cx="7" cy="17" r="2"></circle>
              <circle cx="17" cy="17" r="2"></circle>
              <path
                d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5"
              ></path>
              <line x1="3" y1="9" x2="7" y2="9"></line>
            </svg>
          </span>

          <div>
            <h6 class="font-weight-bold text-dark">Free Shipping & returns</h6>
            <p class="small" style="font-size:10px">For all orders over $99</p>
          </div>
        </div>

        <div class="positive-item">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-shield-check"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 12l2 2l4 -4"></path>
              <path
                d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"
              ></path>
            </svg>
          </span>
          <div>
            <h6 class="font-weight-bold text-dark">Secure Payment</h6>
            <p class="small" style="font-size: 10px;">We ensure secure payment</p>
          </div>
        </div>


        <div class="positive-item" >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-credit-card"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <rect x="3" y="5" width="18" height="14" rx="3"></rect>
              <line x1="3" y1="10" x2="21" y2="10"></line>
              <line x1="7" y1="15" x2="7.01" y2="15"></line>
              <line x1="11" y1="15" x2="13" y2="15"></line>
            </svg>
          </span>
          <div>
            <h6 class="font-weight-bold text-dark">Money back guarantee</h6>
            <p class="small" style="font-size:10px">Money back within 30 days</p>
          </div>
        </div>


        <div class="positive-item" >
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-device-mobile-message"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M11 3h10v8h-3l-4 2v-2h-3z"></path>
              <path
                d="M15 16v4a1 1 0 0 1 -1 1h-8a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1h2"
              ></path>
              <path d="M10 18v.01"></path>
            </svg>
          </span>
          <div>
            <h6 class="font-weight-bold text-dark">Customer Support</h6>
            <p class="small" style="font-size:10px">Call or email us 24/7</p>
          </div>
        </div>
      </section>

      <section>
        <!-- List All Products  -->
        <div class="my-5">
          <div class="mb-5">
            <!-- Select Cetegories  -->
            <div class="d-lg-flex  select--category" style="gap: 30px">
              <div
              @click="goToCategory(category)"
                role="button"
                class="text-capitalize text-center"
                v-for="category in allCategories.categories"
                :key="category.id"
              >
                <div class="category">
                  <img :src="config.imgUrl + category.icon_image" alt="" />
                </div>
                <h6 class="text-dark font-weight-bold mt-3">
                  {{ category.category_name }}
                </h6>
              </div>
            </div>
          </div>
          <section>
            <!-- Deals of the Day -->
            <h4 class="text-dark font-weight-bold mb-3">Deals of the day</h4>
            <div class="products--list mt-2">
              <div
                v-for="item in discountedProducts.data"
                :key="item.id"
                class=""
                data-aos="fade-down"
              >
                <div>
                  <div class="img-services1">
                    <div>
                      <!-- <span class="percentage"> {{ `${item.discount.percentage}% OFF` }} </span> -->
                      <img :src="config.imgUrl + item.app_icon" alt="" role="button" @click="viewProduct(item)"/>
                    </div>
                    <div class="middle text-center">
                      <div class="d-flex align-items-center justify-content-around px-1 py-2">
                        <i role="button" @click="addToCart(item)" class="el-icon-shopping-bag-2 text-dark" style=""></i>
                        <svg role="button" @click="addToWishlist(item)" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="20" height="20" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                        </svg>
                        <i role="button" @click="viewProduct(item)" class="el-icon-search text-dark" style=""></i>
                      </div>
                    </div>
                  </div>
                  <div class="text-center mt-2">
                    <h6 role="button" class="font-weight-bold text-dark text-capitalize" style="font-size:15px"  @click="viewProduct(item)">
                      {{ item.name }}
                    </h6>
                    <div
                      class="d-flex align-items-center m-0 justify-content-center"
                      style="gap: 10px"
                    >
                      <star-rating
                      :increment="0.1"
                      v-model="item.avg_ratings"
                      inactive-color="#000"
                      active-color="#ffb20f"
                      v-bind:star-size="12"
                      :show-rating="false"
                      :rounded-corners="true"
                      :read-only="true"
                      ></star-rating>
                      <small class="" style="font-size: 10px"
                        > {{ "("+item.reviews.length + " reviews)" }} </small
                      >
                    </div>
                    <div class="text-center">
                      <div
                        v-if="item.discount"
                        class="d-flex align-items-center justify-content-center"
                        style="gap: 15px"
                      >
                        <span class="text-dark" style="font-weight:600">
                          &#8358; {{ item.discount.price }}
                        </span>
                        <span
                          class="text-muted"
                          style="text-decoration-line: line-through !important; font-weight:600"
                        >
                          &#8358;{{ item.price.toLocaleString() }}
                        </span>
                      </div>
                      <small v-else class="text-muted" style="font-weight:600">
                        &#8358;{{ item.price.toLocaleString() }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          <section class="mt-4 d-lg-flex " style="gap:20px;">

            <div class="w-100 growing bg-white p-4 rounded-lg d-flex flex-column justify-content-between">
              <h4 class="font-weight-bold text-dark mb-1">Growing Vendors</h4>
              <p class="text-secondary" style="font-size:14px; font-weight:500" >
                More than 2000 vendors are joined with our market,
                having lots of buyers and customers.
              </p>
              <div class="growing--vendors d-flex" style="gap:20px; width: 100%; overflow-x: scroll;">
                  <div v-for="vendor in vendors" :key="vendor.id" class="">
                  <router-link :to=" `/store-listing/${vendor.slug}` ">
                    <img height="70px" width="70px" style="object-position: top; object-fit:cover" :src='vendor.user.photo !== null ? config.imgUrl + vendor.user.photo : "/no-user.png"' alt="Vendor Image Here">
                  </router-link>
              </div>
              </div>
             
            </div>

            <div class=" w-100 bg-white p-4 rounded-lg">
              <h4 class="font-weight-bold text-dark mb-1">Most Friendly Products</h4>
              <p class="text-secondary" style="font-size:14px; font-weight:500" >
                Source from 3 million products offered by vendors, and
                leave the facility within 15 days.
              </p>
              <div class="d-lg-flex mt-3" style="gap:20px">
                <div class="w-100 growing--vendors">
                  <h6 class="mb-2">Best Selling Products</h6>
                  <div class="d-flex" style="gap:20px">
                    <div class="" height="70px" width="70px"  :style="{ 'background-image': `url(${config.imgUrl}${topRated.app_icon})` }" v-for="topRated in topRatedProducts.data.slice(0.3)" :key="topRated.id">
                      <div class="best--selling_name">
                        {{ topRated.name }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="w-100 growing--vendors">
                  <h6 class="mt-2">Weekly Deals</h6>
                  <div class="d-flex" style="gap:20px">
                    <div class="" height="80px" width="80px"  :style="{ 'background-image': `url(${config.imgUrl}${item.app_icon})` }" v-for="item in discountedProducts.data.slice(0.3)" :key="item.id">
                      <div class="best--selling_name">
                        {{ item.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <!-- Deals of the Day -->
            <h4 class="text-dark font-weight-bold my-4">eSharzy Products</h4>
            <div class="products--list mt-2">
              <div
                v-for="item in allProducts.data"
                :key="item.id"
                class=""
                data-aos="fade-down"
              >
                <div>
                  <div class="img-services1">
                    <div>
                      <!-- <span class="percentage"> {{ `${item.discount.percentage}% OFF` }} </span> -->
                      <img :src="config.imgUrl + item.app_icon" alt="" role="button" @click="viewProduct(item)"/>
                    </div>
                    <div class="middle text-center">
                      <div class="d-flex align-items-center justify-content-around px-1 py-2">
                        <i role="button" @click="addToCart(item)" class="el-icon-shopping-bag-2 text-dark" style=""></i>
                        <svg role="button" @click="addToWishlist(item)" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="20" height="20" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                        </svg>
                        <i role="button" @click="viewProduct(item)" class="el-icon-search text-dark" style=""></i>
                      </div>
                    </div>
                  </div>
                  <div class="text-center mt-2">
                    <h6 role="button" class="font-weight-bold text-dark text-capitalize" style="font-size:15px"  @click="viewProduct(item)">
                      {{ item.name }}
                    </h6>
                    <div
                      class="d-flex align-items-center m-0 justify-content-center"
                      style="gap: 10px"
                    >
                      <star-rating
                      :increment="0.1"
                      v-model="item.avg_ratings"
                      inactive-color="#000"
                      active-color="#ffb20f"
                      v-bind:star-size="12"
                      :show-rating="false"
                      :rounded-corners="true"
                      :read-only="true"
                      ></star-rating>
                      <small class="" style="font-size: 10px"
                        > {{ "("+item.reviews.length + " reviews)" }} </small
                      >
                    </div>
                    <div class="text-center">
                      <div
                        v-if="item.discount"
                        class="d-flex align-items-center justify-content-center"
                        style="gap: 15px"
                      >
                        <span class="text-dark" style="font-weight:600">
                          &#8358; {{ item.discount.price }}
                        </span>
                        <span
                          class="text-muted"
                          style="text-decoration-line: line-through !important; font-weight:600"
                        >
                          &#8358;{{ item.price.toLocaleString() }}
                        </span>
                      </div>
                      <small v-else class="text-muted" style="font-weight:600">
                        &#8358;{{ item.price.toLocaleString() }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


        </div>
      </section>
    </div>
  </div>
</template>

<script>
import config from "@/config/api";
import HeroSection from "../components/heroSection.vue";
import StarRating from "vue-star-rating";
export default {
  data() {
    return {
      config,
      rating: 3,
      num: 1
    };
  },
  methods: {
    goToCategory(category){
      this.$router.push(`/category/${category.slug}`)
    },
    viewProduct(item) {
      this.$router.push({
        name: "product-detail",
        params: { slug: item.slug },
      });
      this.$store.dispatch("showcase/getProductBySlug", item.slug);
    },
    addToCart(item){
      let payload = {
        product_id: item.id,
        quantity: this.num
      }
      localStorage.setItem("cart_details", JSON.stringify(payload))
      console.log(payload);
      this.$store.dispatch("auth/addToCart", payload)
    },
    addToWishlist(item){
      let payload = {
        product_id: item.id
      }
      console.log(payload);
      this.$store.dispatch("auth/addToWishlist", payload)
      this.$store.dispatch("showcase/discountedProducts");
    }
  },
  beforeMount() {
    this.$store.dispatch("showcase/getProducts");
    this.$store.dispatch("showcase/getNewProducts");
    this.$store.dispatch("showcase/trendingProducts");
    this.$store.dispatch("showcase/topRatedProducts");
    this.$store.dispatch("showcase/discountedProducts");
    this.$store.dispatch("showcase/getStores");
  },
  computed: {
    allCategories() {
      return this.$store.getters["showcase/getCategories"];
    },
    allProducts() {
      return this.$store.getters["showcase/getProducts"].all_products;
    },
    newProducts() {
      return this.$store.getters["showcase/newProducts"].new_products;
    },
    trendingProducts() {
      return this.$store.getters["showcase/trendingProducts"].trending_products;
    },
    topRatedProducts() {
      return this.$store.getters["showcase/topRatedProducts"].trending_products;
    },
    discountedProducts() {
      return this.$store.getters["showcase/getDiscountedProducts"]
        .discounted_products;
    },
    vendors(){
      let data =  this.$store.getters["showcase/getStores"].data;
      return data.slice(0,5)
    }
  },
  components: { HeroSection, StarRating },
};
</script>