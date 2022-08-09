<template>
  <div>
    <div class="">
      <div class="sidebar--container">
        <div class="side--bar">
          <div class="user--profile">
            <div class="top text-center p-4">
              <div
                class="avatar mx-auto mb-3"
                v-if="getUser.first_name"
                :class="getUser.first_name.charAt(0)"
              >
                {{ getUser.first_name.charAt(0)
                }}{{ getUser.last_name.charAt(0) }}
              </div>
              <p class="small">Welcome back,</p>
              <h5 class="font-weight-bold text-dark mt-1">
                {{ getUser.first_name }} {{ getUser.last_name }}
              </h5>
            </div>
          </div>
          <div>
            <ul>
              <li>
                <router-link to="/buyer">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-user"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="1"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                      <path
                        d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"
                      ></path>
                    </svg>
                  </span>
                  <span>Profile</span>
                </router-link>
              </li>
              <li>
                <router-link to="/order-history">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-shopping-cart"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="1"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <circle cx="6" cy="19" r="2"></circle>
                      <circle cx="17" cy="19" r="2"></circle>
                      <path d="M17 17h-11v-14h-2"></path>
                      <path d="M6 5l14 1l-1 7h-13"></path>
                    </svg>
                  </span>
                  <span>Order History</span>
                </router-link>
              </li>
              <li>
                <router-link to="/wishlist">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-shopping-cart-plus"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="1"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <circle cx="6" cy="19" r="2"></circle>
                      <circle cx="17" cy="19" r="2"></circle>
                      <path d="M17 17h-11v-14h-2"></path>
                      <path
                        d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13"
                      ></path>
                      <path d="M15 6h6m-3 -3v6"></path>
                    </svg>
                  </span>
                  <span>Wishlist</span>
                </router-link>
              </li>
              <li>
                <a href="javascript:void(0)" @click="logout">
                  <span
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-logout"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="1"
                      stroke="currentColor"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <path
                        d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
                      ></path>
                      <path d="M7 12h14l-3 -3m0 6l3 -3"></path></svg
                  ></span>
                  <span>Logout</span>
                </a>
              </li>
            </ul>
            <div class="text-center" v-show="getUser.role === 'buyer'">
              <div class="text-center mt-3" v-if="loading">
                <i class="el-icon-loading" style="font-size: 30px"></i>
              </div>
              <button v-else @click="becomeAVendor">Become a Vendor</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  methods: {
    becomeAVendor() {
      this.$store.dispatch("auth/becomeAVendor");
    },
    logout(){
      this.$store.dispatch('auth/logout');
    },
  },
  computed: {
    getUser() {
      return this.$store.getters["auth/getUser"];
    },
    loading() {
      return this.$store.getters["auth/isLoading"];
    },
  },
};
</script>