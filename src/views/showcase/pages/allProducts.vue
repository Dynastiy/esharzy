<template>
    <div>
        <div>
            <div class="shop">
              <!-- Shop Banner  -->
              <div class="shop--banner mb-4">
                <div>
                  <h5 style="font-weight:600">SAVE UP TO <span style="color:var(--tertiary-color); font-weight:800 ">75% OFF</span></h5>
                  <h1>Electronic Sale</h1>
                  <button class="discover--btn mt-3" data-aos="fade-up" style="font-weight:600; border:2px solid #000 !important; color:var(--accent-color-dark)">DISCOVER NOW <i class="el-icon-right"></i> </button>
                </div>
              </div>

                <div class="filters  d-lg-flex align-items-center" style="gap:20px">
                    <div class="category mb-4">
                        <el-select v-model="category" class="w-100" placeholder="All Categories">
                            <el-option
                            class="text-capitalize"
                            v-for="item in allCategories.categories"
                            :key="item.id"
                            :label="item.label"
                            :value="item.category_name">
                            </el-option>
                        </el-select>
                    </div>

                    <div class="default mb-4">
                        <!-- {{ allCategories }} -->
                        <select v-model="sort" class="w-100" placeholder="Default Sorting">
                          <option value="Default Sorting" selected> Default Sorting </option>
                            <option
                            class="text-capitalize"
                            v-for="item in sorting"
                            :key="item.id"
                            :value="item.value"> 
                            {{ item.value }}
                            </option>
                        </select>
                    </div>

                </div>
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
                        <svg role="button"  @click="addToWishlist(item)" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="20" height="20" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
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

                <hr>


            </div>
        </div>
    </div>
</template>

<script>
    import config from "@/config/api";
    import StarRating from "vue-star-rating";
    export default {
      data() {
        return {
          config,
          rating: 3,
          num: 1,
          category: "",
          sort: "",
          sorting: [
            {
                id: 1,
                value: "Sort by Average rating"
            },
            {
                id: 2,
                value: "Sort by Latest"
            },
            {
                id: 3,
                value: "Sort by Price: low to high"
            },

            {
                id: 4,
                value: "Sort by Price: high to low"
            },
          ]

        };
      },
      methods: {
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
          this.$store.dispatch("auth/addToWishlist", payload)
          this.$store.dispatch("showcase/discountedProducts");
        },
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
      components: { StarRating },
    };
    </script>