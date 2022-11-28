<template>
  <div>
    <div class="container-fluid" style="margin-top:2.5rem">
      <div class="shop">
        <!-- Shop Banner  -->
        <div class="shop--banner mb-4">
          <div>
            <h5 style="font-weight: 600">
              SAVE UP TO
              <span style="color: var(--tertiary-color); font-weight: 800"
                >75% OFF</span
              >
            </h5>
            <h1>Electronic Sale</h1>
            <button
              class="discover--btn mt-3"
              data-aos="fade-up"
              style="
                font-weight: 600;
                border: 2px solid #000 !important;
                color: var(--accent-color-dark);
              "
            >
              DISCOVER NOW <i class="el-icon-right"></i>
            </button>
          </div>
        </div>

        <div class="filters mb-4 d-flex" style="gap: 20px">
          <div class="category">
            <!-- {{ allCategories }} -->
            <el-select v-model="category" placeholder="All Categories">
              <el-option
                class="text-capitalize"
                v-for="item in allCategories.categories"
                :key="item.id"
                :label="item.label"
                :value="item.category_name"
              >
              </el-option>
            </el-select>
          </div>

          <div class="default">
            <!-- {{ allCategories }} -->
            <el-select v-model="sort" placeholder="Default Sorting">
              <el-option
                class="text-capitalize"
                v-for="item in sorting"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>

        <div
          class="border--area"
          style="border: 1px dashed var(--gray-400)"
          v-if="category_products.length === 0"
        >
          <h6 style="font-weight: 400">
            No products were found for this category
          </h6>
        </div>

          <!-- List Products -->
         <product-list :products="category_products"  @add_to_wishlist="addToWishlist('value')" @add_to_cart="addToCart('value')"/>

      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config/api'
import productList from '../../components/productList.vue'
// import StarRating from "vue-star-rating";
export default {
  components: { productList },
  data () {
    return {
      config,
      rating: 3,
      num: 1,
      category: '',
      sort: 'Default Sorting',
      sorting: [
        {
          id: 1,
          value: 'Sort by Average rating'
        },
        {
          id: 2,
          value: 'Sort by Latest'
        },
        {
          id: 3,
          value: 'Sort by Price: low to high'
        },

        {
          id: 4,
          value: 'Sort by Price: high to low'
        }
      ]
    }
  },
  methods: {
    addToCart (item) {
      const payload = {
        product_id: item.id,
        quantity: this.num
      }
      localStorage.setItem('cart_details', JSON.stringify(payload))
      console.log(payload)
      this.$store.dispatch('auth/addToCart', payload)
    },
    addToWishlist (item) {
      const payload = {
        product_id: item.id
      }
      const slug = this.$route.params.slug
      this.$store.dispatch('auth/addToWishlist', payload)
      this.$store.dispatch('showcase/getCategoryById', slug)
    }
  },
  beforeMount () {
    const slug = this.$route.params.slug
    this.$store.dispatch('showcase/getCategoryById', slug)
    this.$store.dispatch('showcase/getCategories', slug)
  },
  computed: {
    allCategories () {
      return this.$store.getters['showcase/getCategories']
    },
    category_products () {
      return this.$store.getters['showcase/getCategory']
    },
    loading () {
      return this.$store.getters['showcase/isLoading']
    }
  }
  // components: { StarRating },
}
</script>
