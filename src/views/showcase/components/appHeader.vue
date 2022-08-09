<template>
  <div>
    <div>
      <div class="py-1" style="background-color: var(--accent-color-dark)">
        <div class="container-fluid">
          <div class="d-flex">
            <!-- All Categories Listing -->
            <div>
              <el-popover placement="bottom-start" width="300" trigger="click">
                <div>
                    
                      <p class="text-uppercase mt-2 " v-for="category in allCategories.categories" :key="category.id"> <router-link to="/" class="text-dark"> {{ category.category_name }} </router-link> </p>
                    
                </div>
                <!-- <el-button slot="reference">Click to activate</el-button> -->
                <div
                  slot="reference"
                  class="p-3"
                  role="button"
                  style="background-color: var(--tertiary-color)"
                >
                  <div
                    class="
                      d-flex
                      align-items-center
                      justify-content-between
                      text-white
                    "
                    style="width:300px"
                  >
                    <div class="d-flex align-items-center" style="gap: 8px">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          style="width: 18px"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </span>
                      <span>All Categories</span>
                    </div>
                    <div>
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                          style="width: 18px"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </el-popover>
            </div>

            <!-- Menu items -->
            <div>
              <ul class="m-0">
                <li>
                    Home
                </li>
                <li>
                    Retail
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  beforeMount(){
    this.$store.dispatch("showcase/getCategories");
  },
  computed:{
    allCategories(){
      return this.$store.getters["showcase/getCategories"]
    }
  }
};
</script>