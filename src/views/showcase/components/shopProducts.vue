<template>
  <div>
    <div class="shop--products">
      <div class="border--area">
        <h6 style="font-weight: 600">Shop Products</h6>
      </div>

      <div class="search my-4">
        <input type="text" placeholder="Enter product name" />
        <button>Seach</button>
      </div>

      <div
        class="border--area"
        style="border: 1px dashed var(--gray-400)"
        v-show="store_products.length == 0"
      >
        <h6 style="font-weight: 400">
          No products were found for this vendor!
        </h6>
      </div>

      <div>
        <div class="products--list mt-2">
          <div
            v-for="item in store_products"
            :key="item.id"
            class=""
            data-aos="fade-down"
          >
            <div>
              <div class="img-services1">
                <div class="ribbon" v-if="item.availability !== 'in-stock'">
                  <span class="ribbon__content">sold out</span>
                </div>
                <img
                  :src="config.imgUrl + item.app_icon"
                  alt=""
                  role="button"
                  @click="viewProduct(item)"
                />
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
                    <i
                      role="button"
                      @click="addToCart(item)"
                      class="el-icon-shopping-bag-2 text-dark"
                      style=""
                    ></i>
                    <svg
                      role="button"
                      @click="addToWishlist(item)"
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-heart"
                      width="20"
                      height="20"
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
                    <i
                      role="button"
                      @click="viewProduct(item)"
                      class="el-icon-search text-dark"
                      style=""
                    ></i>
                  </div>
                </div>
              </div>
              <div class="text-center mt-2">
                <h6
                  role="button"
                  class="font-weight-bold text-dark text-capitalize"
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
                    v-model="ratings"
                    inactive-color="#aaa"
                    active-color="#666"
                    v-bind:star-size="12"
                    :show-rating="false"
                    :rounded-corners="true"
                    :read-only="true"
                  ></star-rating>
                  <small class="" style="font-size: 10px">
                    {{ "(" + 0 + " reviews)" }}
                  </small>
                </div>
                <div class="text-center">
                  <div
                    v-if="item.discount"
                    class="d-flex align-items-center justify-content-center"
                    style="gap: 15px"
                  >
                    <span class="text-dark" style="font-weight: 600">
                      &#8358; {{ item.discount.price }}
                    </span>
                    <span
                      class="text-muted"
                      style="
                        text-decoration-line: line-through !important;
                        font-weight: 600;
                      "
                    >
                      &#8358;{{ item.price.toLocaleString() }}
                    </span>
                  </div>
                  <small v-else class="text-muted" style="font-weight: 600">
                    &#8358;{{ item.price.toLocaleString() }}
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
import StarRating from "vue-star-rating";
import config from "@/config/api";
export default {
  components: {
    StarRating,
  },
  data() {
    return {
      config,
      ratings: Number(""),
    };
  },
  computed: {
    store() {
      return this.$store.getters["showcase/getStore"];
    },
    store_products() {
      return this.store.activated_products;
    },
  },
};
</script>