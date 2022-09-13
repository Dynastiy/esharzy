<template>
  <div>
    <div class="mobile-menu">
      <div class="py-3" style="background-color: var(--accent-color-dark)">
        <div class="container-fluid">
          <div class="d-flex align-items-center justify-content-between">
            <div class="">
              <h6
                style="color: var(--primary-accent); font-size: 9px"
                class="text-uppercase"
              >
                Hello, Welcome to E-Shazy
              </h6>
            </div>
            <div>
              <ul
                class="m-0 top--header_menu d-flex align-items-center"
                style="gap: 20px"
              >
                <li>
                  <router-link to="/login">Sign In </router-link>
                  <span>/</span>
                  <router-link to="register"> Register</router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 2nd Header  -->
      <div class="main--header">
        <div class="container-fluid">
          <div
            class="d-flex justify-content-between align-items-center"
            style="gap: 20px"
          >
            <div>
              <span @click="drawer = true">
                <svg
                  
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="#fff"
                  stroke-width="2"
                  style="width: 30px"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </span>
            </div>
            <div>
              <router-link to="/"
                ><img src="@/assets/img/logo.svg" width="120" alt=""
              /></router-link>
            </div>

            <div class="d-flex align-items-center" style="gap: 20px">
              <router-link to="/cart" class="text-center">
                <div class="text-white cart--icon" style="gap: 5px">
                  <!-- <el-badge :value="getUser.cart.length" class="item">
                    <i class="el-icon-goods" style="font-size: 22px"></i>
                  </el-badge> -->
                  <el-badge
                    :value="getUser.cart ? getUser.cart.length : '0'"
                    class="item"
                  >
                    <i class="el-icon-goods" style="font-size: 22px"></i>
                  </el-badge>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <el-drawer
        title=""
        :direction="direction"
        :visible.sync="drawer"
        size="80%"
      >
        <div class="p-3 mobile--menu_tab">
          <div class="menu--content">
            <div class="top">
              <div class="search my-4">
                <input type="text" placeholder="Search products">
                <i class="el-icon-search"></i>
              </div>
              <nav>
                <div class="nav nav-tabs" id="nav-tab" role="tablist">
                  <button class="nav-link active" id="nav-home-tab" data-toggle="tab" data-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">MAIN MENU</button>
                  <button class="nav-link" id="nav-profile-tab" data-toggle="tab" data-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">CATEGORIES</button>
                </div>
              </nav>
              <div class="tab-content mt-4" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                  <ul
                      class="m-0 mobile--header_menu"
                      style="gap: 30px"
                    >
                      <li @click="closeDrawer"><router-link to="/" >Home</router-link></li>
                      <hr style="background:var(--gray-600)">
                      <li @click="closeDrawer"><router-link to="/wholesale" >Wholesale</router-link></li>
                      <hr style="background:var(--gray-600)">
                      <li @click="closeDrawer"><router-link to="/shop" >Shops</router-link></li>
                      <hr style="background:var(--gray-600)">
                      <li @click="closeDrawer"><router-link to="/store-listing" >Vendor</router-link></li>
                    </ul>
                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                  <ul class="d-flex flex-column">
                    <li v-for="category in allCategories.categories" :key="category.id" >
                    <span class="d-flex align-items-center justify-content-between">
                      <router-link to="/" class="text-white">
                          <span class="text-capitalize d-flex align-items-center" style="font-size:14px; gap:20px">
                            <span>
                              <img :src="config.imgUrl + category.icon_image" alt="" width="25px" height="25px" style="border-radius:50%"/>
                            </span>
                              <span>
                                {{ category.category_name }}
                              </span>
                          </span>
                        
                      </router-link>
                      <i class="text-white" :class= 'more ? "el-icon-arrow-up" : "el-icon-arrow-down" ' @click="doSomething(category)" role="button" v-if="category.sub_categories.length > 0" style="font-size:12px"></i>
                    </span>

                    <transition name="fade">
                      <ul v-if="more === category.id" class="mt-2 pl-4" style="border-left: 1px solid var(--gray-400)">
                          <li  v-for="item in category.sub_categories" :key="item.id"  class="sub-category text-capitalize text-white mb-2" style="font-size:14px"> {{ item.sub_category_name }} </li>
                      </ul>
                      </transition>
                      <hr class="" style="background:var(--gray-600)">
                    </li>
                   
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
  <script>
    import config from '@/config/api'
export default {
  data() {
    return {
      config,
      drawer: false,
      direction: "ltr",
      activeName: "first",
      more: false,
    };
  },
  methods: {
    doSomething(category){
      this.more = this.more === category.id ? null : category.id;
        },
    closeDrawer(){
      this.drawer = false
    }
  },
  beforeMount() {
    this.$store.dispatch("showcase/getCategories");
  },
  computed: {
    allCategories() {
      return this.$store.getters["showcase/getCategories"];
    },
    getUser() {
      return this.$store.getters["auth/getUser"];
    },
    loggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
  },
};
</script>