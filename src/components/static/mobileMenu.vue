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
              <span>
                <svg
                @click="drawer = true"
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
                  <el-badge :value="getUser.cart.length" class="item">
                    <i class="el-icon-goods" style="font-size: 22px"></i>
                  </el-badge>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <el-drawer title="" :direction="direction" :visible.sync="drawer" size="70%">
        <div>
          Hello World
        </div>
      </el-drawer>
    </div>
  </div>
</template>
  <script>
export default {
  data() {
    return {
        drawer: false,
        direction: 'ltr',
    };
  },
  methods: {},
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