<template>
    <div>
        <div>
            <div class="shop">
                <div class="filters mb-4">
                    <div class="category">
                        <!-- {{ allCategories }} -->
                        <el-select v-model="category" placeholder="All Categories">
                            <el-option
                            class="text-capitalize"
                            v-for="item in allCategories.categories"
                            :key="item.id"
                            :label="item.label"
                            :value="item.category_name">
                            </el-option>
                        </el-select>
                    </div>

                    <div class="default">
                        <!-- {{ allCategories }} -->
                        <el-select v-model="category" placeholder="Default Sorting">
                            <el-option
                            class="text-capitalize"
                            v-for="item in sorting"
                            :key="item.id"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>

                </div>
                <div class="products--list mt-2">
              <div
                v-for="item in allProducts.data"
                :key="item.id"
                class=""
                data-aos="fade-down"
              >
                <div role="button">
                  <div class="img-services1">
                    <img :src="config.imgUrl + item.app_icon" alt="" />
                    <div class="middle text-center">
                      <div class="d-flex align-items-center justify-content-around px-1 py-2">
                        <i @click="addToCart(item)" class="el-icon-shopping-bag-2 text-dark" style=""></i>
                        <svg @click="addToWishlist(item)" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-heart" width="20" height="20" viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                        </svg>
                        <i @click="viewProduct(item)" class="el-icon-search text-dark" style=""></i>
                      </div>
                    </div>
                  </div>
                  <div class="text-center mt-2">
                    <h6 class="font-weight-bold text-dark text-capitalize" style="font-size:13px">
                      {{ item.name }}
                    </h6>
                    <div
                      class="d-flex align-items-center m-0 justify-content-center"
                      style="gap: 10px"
                    >
                      <star-rating
                        v-model="rating"
                        :rounded-corners="true"
                        inactive-color="#aaa"
                        active-color="#333"
                        v-bind:star-size="11"
                        :show-rating="false"
                      ></star-rating>
                      <small class="" style="font-size: 10px"
                        >(10 Reviews)</small
                      >
                    </div>
                    <div class="text-center">
                      <div
                        v-if="item.discount"
                        class="d-flex align-items-center justify-content-center"
                        style="gap: 15px"
                      >
                        <span class="text-dark small">
                          NGN {{ item.discount.price }}
                        </span>
                        <span
                          class="text-muted small"
                          style="text-decoration-line: line-through !important"
                        >
                          NGN{{ item.price.toLocaleString() }}
                        </span>
                      </div>
                      <small v-else class="text-muted small">
                        NGN{{ item.price.toLocaleString() }}
                      </small>
                    </div>
                  </div>
                </div>
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
      data() {
        return {
          config,
          rating: 3,
          num: 1,
          category: "",
          sorting: [
            {
                name: "Sort by Average rating"
            }
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
          localStorage.setItem("cart_details", JSON.stringify(payload))
          console.log(payload);
          this.$store.dispatch("user/addToWishlist", payload)
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
      components: { StarRating },
    };
    </script>