<template>
  <div>
    <div class="container-fluid mt-5">
      <div class="d-flex" style="gap:20px">
        <div class="w-25">
        <left-side/>
      </div>
      <div class="shop w-100">
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
              style="font-weight: 600; border: 2px solid #000 !important;
                color: var(--accent-color-dark);
              "
            >
              DISCOVER NOW <i class="el-icon-right"></i>
            </button>
          </div>
        </div>

        <div class="filters d-lg-flex align-items-center" style="gap: 20px">
          <div class="category mb-3">
            <div class="dropdown">
              <div class="select--input" type="button"
                data-toggle="dropdown"
                aria-expanded="false">
                <input type="text" class="text-capitalize" v-model="category">
                <i class="el-icon-arrow-down"></i>
              </div>
              <div class="dropdown-menu">
               <div class="select--items">

                <a class="dropdown-item text-capitalize"  href="javascript:void(0)" @click="categorySorting(item)" v-for="item in allCategories.categories" :key="item.id">
                {{ item.category_name }}</a>
               </div>
              </div>
            </div>
          </div>

          <div class="default mb-3">
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
  </div>
</template>

<script>
import config from '@/config/api'
// import StarRating from "vue-star-rating";
import ProductList from '../components/productList.vue'
import LeftSide from '../components/leftSide.vue'
export default {
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
      console.log(selOption)
      this.$store.dispatch('showcase/sortData', selOption)
    },

    categorySorting (item) {
      this.$router.replace('/category/' + item.slug)
      this.category = item.category_name
    },

    removeCategory () {
      this.$router.replace('/shop')
    },
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
  components: { ProductList, LeftSide }
}
</script>
