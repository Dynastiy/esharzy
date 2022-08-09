<template>
  <div>
    <div class="container-fluid">
      <HeroSection />

      <section class="our--positives mt-5">
        <div class="positive-item-1 positive-item" data-aos="fade-down">
          <div>
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
            <p>Superfast and Free Delivery</p>
          </div>
        </div>
        <div class="positive-item" data-aos="fade-left">
          <div>
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
            <p>Non-Contact Shipping</p>
          </div>
        </div>
        <div class="positive-item" data-aos="fade-right">
          <div>
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
            <p>Money-Back Guaranteed</p>
          </div>
        </div>
        <div class="positive-item-2 positive-item" data-aos="fade-down">
          <div>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-shield-lock"
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
                <path
                  d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3"
                ></path>
                <circle cx="12" cy="11" r="1"></circle>
                <line x1="12" y1="12" x2="12" y2="14.5"></line>
              </svg>
            </span>
            <p>Super Secure payment system</p>
          </div>
        </div>
      </section>

      <section>
        <!-- List All Products  -->
        <div class="my-5">
          <div class="mb-5">
            <!-- Select Cetegories  -->
            <ul
              class="m-0 d-lg-flex justify-content-center select--category"
              style="gap: 20px"
            >
              <li role="button">All Categories</li>
              <li
                role="button"
                class="text-capitalize"
                v-for="category in allCategories.categories"
                :key="category.id"
              >
                {{ category.category_name }}
              </li>
            </ul>
          </div>
          <section>
            <!-- All Products -->
            <div class="products--list">
              <div
                v-for="item in allProducts.data"
                :key="item.id"
                class="bg-white shadow-lg"
                data-aos="fade-down"
                @click="viewProduct(item)"
                role="button"
              >
                <img
                  class="product--image"
                  :src="config.imgUrl + item.app_icon"
                  alt=""
                />
                <div class="mt-2 p-3">
                  <div>
                    <div>
                      <h6 class="font-weight-bold text-dark text-capitalize">
                        {{ item.name }}
                      </h6>
                      <div>
                        <div
                          v-if="item.discount"
                          class="d-flex align-items-center"
                          style="gap: 10px"
                        >
                          <small
                            class="text-muted"
                            style="
                              text-decoration-line: line-through !important;
                            "
                          >
                            NGN{{ item.price.toLocaleString() }}
                          </small>
                          <small class="text-muted">
                            NGN {{ item.discount.price }}
                          </small>
                          <span
                            class="
                              text-white
                              d-flex
                              align-items-center
                              justify-content-center
                              rounded-75
                              font-weight-bold
                              small
                              p-1
                            "
                            style="
                              border-radius: 3px;
                              background-color: var(--tertiary-color);
                            "
                          >
                            -{{ item.discount.percentage }}%
                          </span>
                        </div>
                        <small v-else class="text-muted">
                          NGN{{ item.price.toLocaleString() }}
                        </small>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div class="d-flex align-items-center" style="gap: 5px">
                    <star-rating
                      v-model="rating"
                      inactive-color="#000"
                      active-color="#ffd700"
                      v-bind:star-size="12"
                      :show-rating="false"
                    ></star-rating>
                    <small class="text-muted" style="font-size: 11px"
                      >(10 Reviews)</small
                    >
                  </div>
                </div>
              </div>
            </div>

            <!-- Newest Products  -->
            <div class="mt-5">
              <h4 class="font-weight-bold text-dark">NEWEST PRODUCTS</h4>
              <hr />
              <div class="products--list mt-2">
                <div
                  v-for="item in newProducts.data"
                  :key="item.id"
                  class="shadow-lg"
                  data-aos="fade-down"
                >
                  <div
                    class="img-services1"
                    @click="viewProduct(item)"
                    role="button"
                    :style="{
                      'background-image': `url(${config.imgUrl}${item.app_icon})`,
                    }"
                  >
                    <div class="middle px-3 py-3">
                      <div>
                        <h6 class="font-weight-bold text-white text-capitalize">
                          {{ item.name }}
                        </h6>
                        <div>
                        <div
                          v-if="item.discount"
                          class="d-flex align-items-center"
                          style="gap: 10px"
                        >
                          <small
                            class="text-muted"
                            style="
                              text-decoration-line: line-through !important;
                            "
                          >
                            NGN{{ item.price.toLocaleString() }}
                          </small>
                          <small class="text-muted">
                            NGN {{ item.discount.price }}
                          </small>
                          <span
                            class="
                              text-white
                              d-flex
                              align-items-center
                              justify-content-center
                              rounded-75
                              font-weight-bold
                              small
                              p-1
                            "
                            style="
                              border-radius: 3px;
                              background-color: var(--tertiary-color);
                            "
                          >
                            -{{ item.discount.percentage }}%
                          </span>
                        </div>
                        <small v-else class="text-muted">
                          NGN{{ item.price.toLocaleString() }}
                        </small>
                      </div>
                        <div
                          class="d-flex align-items-center"
                          style="gap: 10px"
                        >
                          <star-rating
                            v-model="rating"
                            inactive-color="#000"
                            active-color="#ffd700"
                            v-bind:star-size="10"
                            :show-rating="false"
                          ></star-rating>
                          <small class="text-white" style="font-size: 10px"
                            >(10 Reviews)</small
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Trending Products -->
            <div class="mt-5">
              <h4 class="font-weight-bold text-dark">TRENDING PRODUCTS</h4>
              <hr />
              <div class="products--list mt-2">
                <div
                  v-for="item in trendingProducts.data"
                  :key="item.id"
                  class="bg-white shadow-lg"
                  data-aos="fade-down"
                  @click="viewProduct(item)"
                  role="button"
                >
                  <img
                    class="product--image"
                    :src="config.imgUrl + item.app_icon"
                    alt=""
                  />
                  <div class="mt-2 p-3">
                    <div>
                      <div>
                        <h6 class="font-weight-bold text-dark text-capitalize">
                          {{ item.name }}
                        </h6>
                        <div>
                        <div
                          v-if="item.discount"
                          class="d-flex align-items-center"
                          style="gap: 10px"
                        >
                          <small
                            class="text-muted"
                            style="
                              text-decoration-line: line-through !important;
                            "
                          >
                            NGN{{ item.price.toLocaleString() }}
                          </small>
                          <small class="text-muted">
                            NGN {{ item.discount.price }}
                          </small>
                          <span
                            class="
                              text-white
                              d-flex
                              align-items-center
                              justify-content-center
                              rounded-75
                              font-weight-bold
                              small
                              p-1
                            "
                            style="
                              border-radius: 3px;
                              background-color: var(--tertiary-color);
                            "
                          >
                            -{{ item.discount.percentage }}%
                          </span>
                        </div>
                        <small v-else class="text-muted">
                          NGN{{ item.price.toLocaleString() }}
                        </small>
                      </div>
                      </div>
                      <div></div>
                    </div>
                    <div class="d-flex align-items-center" style="gap: 5px">
                      <star-rating
                        v-model="rating"
                        inactive-color="#000"
                        active-color="#ffd700"
                        v-bind:star-size="12"
                        :show-rating="false"
                      ></star-rating>
                      <small class="text-muted" style="font-size: 11px"
                        >(10 Reviews)</small
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Top rated Products  -->
            <div class="mt-5">
              <h4 class="font-weight-bold text-dark">TOP RATED PRODUCTS</h4>
              <hr />

              <div class="products--list mt-2">
                <div
                  v-for="item in topRatedProducts.data"
                  :key="item.id"
                  class="shadow-lg"
                  data-aos="fade-down"
                >
                  <div
                    class="img-services1"
                    @click="viewProduct(item)"
                    role="button"
                    :style="{
                      'background-image': `url(${config.imgUrl}${item.app_icon})`,
                    }"
                  >
                    <div class="middle px-3 py-3">
                      <div>
                        <h6 class="font-weight-bold text-white text-capitalize">
                          {{ item.name }}
                        </h6>
                        <div>
                        <div
                          v-if="item.discount"
                          class="d-flex align-items-center"
                          style="gap: 10px"
                        >
                          <small
                            class="text-muted"
                            style="
                              text-decoration-line: line-through !important;
                            "
                          >
                            NGN{{ item.price.toLocaleString() }}
                          </small>
                          <small class="text-muted">
                            NGN {{ item.discount.price }}
                          </small>
                          <span
                            class="
                              text-white
                              d-flex
                              align-items-center
                              justify-content-center
                              rounded-75
                              font-weight-bold
                              small
                              p-1
                            "
                            style="
                              border-radius: 3px;
                              background-color: var(--tertiary-color);
                            "
                          >
                            -{{ item.discount.percentage }}%
                          </span>
                        </div>
                        <small v-else class="text-muted">
                          NGN{{ item.price.toLocaleString() }}
                        </small>
                      </div>
                        <div
                          class="d-flex align-items-center"
                          style="gap: 10px"
                        >
                          <star-rating
                            v-model="rating"
                            inactive-color="#000"
                            active-color="#ffd700"
                            v-bind:star-size="10"
                            :show-rating="false"
                          ></star-rating>
                          <small class="text-white" style="font-size: 10px"
                            >(10 Reviews)</small
                          >
                        </div>
                      </div>
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
      rating: 5,
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
  },
  beforeMount() {
    this.$store.dispatch("showcase/getProducts");
    this.$store.dispatch("showcase/getNewProducts");
    this.$store.dispatch("showcase/trendingProducts");
    this.$store.dispatch("showcase/topRatedProducts");
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
  },
  components: { HeroSection, StarRating },
};
</script>