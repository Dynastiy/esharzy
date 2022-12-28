<template>
  <div>
    <div class="container-fluid" style="margin-top: 2.5rem;">
      <div class="shop">
        <!-- Shop Banner  -->
        <div class="shop--banner mb-4">
          <div>
            <h5 style="font-weight: 600;">
              SAVE UP TO
              <span style="color: var(--tertiary-color); font-weight: 800;">
                75% OFF
              </span>
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
              DISCOVER NOW
              <i class="el-icon-right"></i>
            </button>
          </div>
        </div>

        <div class="filters mb-3 d-flex" style="gap: 20px;">
          <div class="category">
            <div class="dropdown">
              <div class="select--input" type="button"
                data-toggle="dropdown"
                aria-expanded="false">
                <input type="text" role="button" readonly class="text-capitalize" v-model="categoryData.category_name">
                <i class="el-icon-arrow-down"></i>
              </div>
              <div class="dropdown-menu">
               <div class="select--items">

                <a class="dropdown-item text-capitalize" :class="{active : categoryData.id === item.id}" href="javascript:void(0)" @click="categorySorting(item)" v-for="item in allCategories.categories" :key="item.id">
                {{ item.category_name }}</a>
               </div>
              </div>
            </div>
          </div>

          <div class="default">
            <select v-model="sort" class="w-100" @change="dataSorting" id="mySelect" placeholder="Default Sorting">
              <option value="Default Sorting" id="default" selected>Default Sorting</option>
              <option
                class="text-capitalize"
                v-for="item in sorting"
                :key="item.id"
                :value="item.value"
                :id="item.action"
              >
                {{ item.value }}
              </option>
            </select>
          </div>
        </div>

        <div class="mb-3">
          <!-- Selected Sorting  -->
          <span
            v-if="category !== null"
            class="selected--category selection d-flex align-items-center"
            style="width: max-content; gap: 20px;"
          >
            <span>{{ categoryData.category_name }}</span>
            <span role="button">
              <i class="el-icon-close" @click="removeCategory"></i>
            </span>
          </span>
        </div>

        <div
          class="border--area"
          style="border: 1px dashed var(--gray-400);"
          v-if="category_products.length === 0"
        >
          <h6 style="font-weight: 400;">
            No products were found for this category
          </h6>
        </div>

        <!-- List Products -->
        <product-list
          :products="category_products"
          @add_to_wishlist="addToWishlist('value')"
          @add_to_cart="addToCart('value')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config/api'
import productList from '../../components/productList.vue'
import { mapState } from 'vuex'
// import StarRating from "vue-star-rating";
export default {
  components: { productList },
  data () {
    return {
      config,
      rating: 3,
      num: 1,
      category: 'All Categories',
      sort: 'Default Sorting',
      sorting: [
        {
          id: 1,
          value: 'Sort by Average rating',
          action: 'average'
        },
        {
          id: 2,
          value: 'Sort by Latest',
          action: 'latest'
        },
        {
          id: 3,
          value: 'Sort by Price: low to high',
          action: 'cheapest'
        },

        {
          id: 4,
          value: 'Sort by Price: high to low',
          action: 'expensive'
        }
      ]
    }
  },
  methods: {
    dataSorting () {
      const priceOptions = document.getElementById('mySelect')
      const selOption = priceOptions.options[priceOptions.selectedIndex].id
      const sortData = {
        name: selOption,
        id: this.categoryData.id,
        slug: this.categoryData.slug
      }
      console.log(sortData)
      this.$store.dispatch('showcase/sortCategory', sortData)
    },

    categorySorting (item) {
      this.$router.replace('/category/' + item.slug)
      this.category = item.category_name
    },

    removeCategory () {
      this.$router.replace('/shop')
    },
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
    ...mapState('showcase', {
      category_products: (state) => state.category.activated_products,
      categoryData: (state) => state.category
    }),
    loading () {
      return this.$store.getters['showcase/isLoading']
    }
  }
}
</script>
