<template>
  <div>
    <div class="web-menu">
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
                <li><router-link to="/">Contact Us</router-link></li>
                <li><router-link to="/buyer">My Account</router-link></li>
                <li v-if="!isLoggedIn">
                  <router-link to="/login">Sign In </router-link>
                  <span>/</span>
                  <router-link to="register"> Register</router-link>
                </li>
                <li v-else>
                  <a href="javascript:void(0)" @click="logout">Logout</a>
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
            class="d-lg-flex justify-content-between align-items-center"
            style="gap: 20px"
          >
            <div>
              <router-link to="/"
                ><img src="@/assets/img/logo.svg" width="120" alt=""
              /></router-link>
            </div>
            <div>
              <div class="search--field">
                <input type="text" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  style="width: 20px"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div class="d-flex align-items-center" style="gap: 20px">
              <div>
                <router-link to="/wishlist" class="text-center">
                  <div class="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-heart"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      stroke-width="1"
                      stroke="#fff"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"
                      ></path>
                    </svg>
                  </div>
                  <div style="margin-top: -5px">
                    <span style="color: var(--primary-accent); font-size: 10px"
                      >Wishlist</span
                    >
                  </div>
                </router-link>
              </div>
              <router-link to="/cart" class="text-center">
                <div class="text-white cart--icon" style="gap: 5px">
                  <el-badge
                    :value="getUser.cart ? getUser.cart.length : '0'"
                    class="item"
                  >
                    <i class="el-icon-goods" style="font-size: 22px"></i>
                  </el-badge>
                </div>
                <div style="margin-top: -5px">
                  <span style="color: var(--primary-accent); font-size: 10px"
                    >Cart</span
                  >
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Third Header -->
      <div
        style="background-color: var(--accent-color-dark)"
        class="position-sticky"
      >
        <div class="container-fluid">
          <div class="d-flex align-items-center" style="gap: 30px">
            <!-- All Categories Listing -->
            <div>
              <el-popover placement="bottom-start" width="300" trigger="hover">
                <div>
                  <ul class="m-0">
                    <li
                      class="text-capitalize"
                      v-for="category in allCategories.categories"
                      :key="category.id"
                    >
                      <router-link
                        to="/"
                        class="text-dark"
                        style="font-size: 12px"
                      >
                        {{ category.category_name }}
                      </router-link>
                      <hr class="m-0 my-1" />
                    </li>
                  </ul>
                </div>
                <!-- <el-button slot="reference">Click to activate</el-button> -->
                <div
                  slot="reference"
                  class="py-2 px-3"
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
                    style="width: 300px"
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
                      <small>Browse Categories</small>
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
              <ul
                class="m-0 d-flex app--header_menu align-items-center"
                style="gap: 30px"
              >
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/wholesale">Wholesale</router-link></li>
                <li><router-link to="/shop">Shops</router-link></li>
                <li><router-link to="/store-listing">Vendor</router-link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <MobileMenu />
    </div>
  </div>
</template>
<script>
import MobileMenu from "./mobileMenu.vue";
export default {
  data() {
    return {};
  },
  methods: {
    logout(){
      this.$store.dispatch('auth/logout');
    },
  },
  beforeMount() {
    this.$store.dispatch("showcase/getCategories");
  },
  computed: {
    isLoggedIn() {
      let token;
      token = localStorage.getItem("token");
      return token;
    },
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
  components: { MobileMenu },
};
</script>