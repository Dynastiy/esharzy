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

                <div class="border--area" style="border: 1px dashed var(--gray-400)" v-if="category_products.length === 0">
                  <h6 style="font-weight: 400">No products were found for category</h6>
                </div>

                <div class="products--list mt-2">
              <div
                v-for="item in category_products"
                :key="item.id"
                class=""
                data-aos="fade-down"
              >
              <div>
                  <div class="img-services1">
                    <div>
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
        let slug = this.$route.params.slug
        this.$store.dispatch("showcase/getCategoryById", slug)
        this.$store.dispatch("showcase/getCategories", slug)
      },
      computed: {
        allCategories(){
          return this.$store.getters["showcase/getCategories"]
        },
        category_products(){
          return this.$store.getters['showcase/getCategory']
        }
      },
      components: { StarRating },
    };
    </script>