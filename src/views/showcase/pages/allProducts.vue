<template>
  <div>
    <div class="container-fluid mt-5">
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
              style="font-weight: 600;
                border: 2px solid #000 !important;
                color: var(--accent-color-dark);
              "
            >
              DISCOVER NOW <i class="el-icon-right"></i>
            </button>
          </div>
        </div>

        <div class="filters d-lg-flex align-items-center" style="gap: 20px">
          <div class="category mb-4">
            <el-select
              v-model="category"
              class="w-100"
              placeholder="All Categories"
            >
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

          <div class="default mb-4">
            <select v-model="sort" class="w-100" placeholder="Default Sorting">
              <option value="Default Sorting" selected>Default Sorting</option>
              <option
                class="text-capitalize"
                v-for="item in sorting"
                :key="item.id"
                :value="item.value"
              >
                {{ item.value }}
              </option>
            </select>
          </div>
        </div>

        <div
          class="border--area"
          style="border: 1px dashed var(--gray-400)"
          v-show="allProducts.length == 0"
        >
          <h6 style="font-weight: 400">No Stores found</h6>
        </div>

        <!-- List Products  -->
        <product-list :products="allProducts" @add_to_wishlist="addToWishlist" @add_to_cart="addToCart"/>

        <hr />
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config/api'
// import StarRating from "vue-star-rating";
import ProductList from '../components/productList.vue'
export default {
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
    addToCart (value) {
      const payload = {
        product_id: value,
        quantity: this.num
      }
      localStorage.setItem('cart_details', JSON.stringify(payload))
      console.log(payload)
      this.$store.dispatch('auth/addToCart', payload)
    },
    addToWishlist (value) {
      const payload = {
        product_id: value
      }
      this.$store.dispatch('auth/addToWishlist', payload)
      this.$store.dispatch('showcase/getProducts')
    }
  },
  beforeMount () {
    this.$store.dispatch('showcase/getProducts')
  },
  computed: {
    allCategories () {
      return this.$store.getters['showcase/getCategories']
    },
    allProducts () {
      return this.$store.getters['showcase/getProducts']
    }
  },
  components: { ProductList }
}
</script>
