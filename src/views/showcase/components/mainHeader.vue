<template>
  <div>
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
            <div v-if="loggedIn">
              <el-dropdown>
                <span class="el-dropdown-link text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="icon icon-tabler icon-tabler-user-circle"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <circle cx="12" cy="12" r="9"></circle>
                    <circle cx="12" cy="10" r="3"></circle>
                    <path
                      d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"
                    ></path>
                  </svg>

                  Hi, {{ getUser.first_name }}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="width: 200px">
                  <el-dropdown-item>
                    <router-link to="/buyer" class="text-dark"
                      >My Account</router-link
                    >
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/order-history" class="text-dark">
                      Order History
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/order-history" class="text-dark"
                      >Wishlist
                    </router-link>
                  </el-dropdown-item>
                  <hr />
                  <el-dropdown-item>
                    <a class="text-dark" href="javascript:void(0)" @click="logout">
                      Logout
                    </a>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div v-else>
              <el-dropdown>
                <span class="el-dropdown-link text-white">
                  My Account<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="width: 200px">
                  <el-dropdown-item>
                    <router-link to="/login" class="text-dark"
                      >Login</router-link
                    >
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link to="/register" class="text-dark">
                      Sign Up
                    </router-link>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
             <router-link to="/cart">
              <div class="text-white d-flex" style="gap:5px">
               <span class="bg-white text-dark d-flex align-items-center justify-content-center rounded-75 font-weight-bold small" 
              style="width:20px; height:20px; border-radius: 3px;" v-if="getUser.cart"> {{ getUser.cart.length }} </span>
              <span class="bg-white text-dark d-flex align-items-center justify-content-center rounded-75 font-weight-bold small" 
              style="width:20px; height:20px; border-radius: 3px;" v-else> 0</span>
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            </router-link>
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
  methods:{
     logout(){
      this.$store.dispatch('auth/logout');
    },
  },
  computed: {
    getUser() {
      return this.$store.getters["auth/getUser"];
    },
    loggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
  },
};
</script>