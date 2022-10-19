<template>
  <div>
    <div>
      <div>
        <div class="search--field">
          <div>
            <select name="" id="" v-model="searchValue" @change="getValue">
              <option value="All Categories" selected>All Categories</option>
              <option
                v-for="category in allCategories.categories"
                :value="category.slug"
                :key="category.id"
              >
                {{ category.category_name }}
              </option>
            </select>
          </div>
          <input type="text" v-model="search" @keyup="searchProduct" placeholder="Search in ..." />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
            style="width: 30px"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <div v-if="viewItem" class="search--results bg-white p-3 mt-1 rounded-lg">
          <div class="text-center" v-if="loader"> 
            <i
            class="el-icon-loading"
            style="
              font-size: 40px;
              font-weight: 100;
              color: var(--tertiary-color);
            "
          ></i>
          </div>
          <div v-else>
            <div v-for="item in products" :key="item.id">
            <div class="d-flex align-items-center search--item" style="gap:15px"  role="button" @click="viewProduct(item)">
              <img style="width: 60px; height: 60px; object-position: center; object-fit: cover;" :src="config.imgUrl+item.app_icon" alt="">
              <div>
                <h6 style="font-weight:400"> {{ item.name }} </h6>
                <div class="">
                  <div
                    v-if="item.discount"
                    class="d-flex"
                    style="gap: 10px"
                  >
                    <span class="" style="font-weight:500; font-size:15px">
                      &#8358; {{ item.discount.price }}
                    </span>
                    <span
                      class=""
                      style="text-decoration-line: line-through !important; font-weight:500; font-size:15px; color: #666"
                    >
                      &#8358; {{ item.price.toLocaleString() }}
                    </span>
                  </div>
                  <small v-else class="" style="font-weight:500; font-size:15px">
                    &#8358; {{ item.price.toLocaleString() }}
                  </small>
                </div>
              </div>
            </div>
            <hr>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import config from '@/config/api'
export default {
  data() {
    return {
      config,
      searchValue: "All Categories",
      search: null,
      products: [],
      search_results: false,
      loader: false
    };
  },
  methods: {
    getValue() {
      console.log(this.searchValue);
    },
    viewProduct(item){
      this.$router.push(`/product/${item.slug}`)
      this.search = null
    },
    searchProduct(){
      console.log(this.searchValue);
      if(this.searchValue === "All Categories"){
        this.products = this.allProducts.filter((item) => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.name.toLowerCase().includes(v)
            );
        });
      }
      else{
        this.$store.dispatch("showcase/getCategoryById", this.searchValue)
        this.products = this.category_products.filter((item) => {
          return this.search
            .toLowerCase()
            .split(" ")
            .every(
              (v) =>
                item.name.toLowerCase().includes(v)
            );
        });
      }
        
    }
  },
  beforeMount() {
    this.$store.dispatch("showcase/getCategories");
    this.$store.dispatch("showcase/getProducts");
  },
  computed: {
    allProducts() {
      return this.$store.getters["showcase/getProducts"];
    },
    allCategories() {
      return this.$store.getters["showcase/getCategories"];
    },
    category_products(){
          return this.$store.getters['showcase/getCategory']
        },
    viewItem(){
      if(this.search === null || this.search === "") {
        return false
      }
      else{
        return true
      }
    },
    // loader(){
    //   if
    // }
  },
};
</script>