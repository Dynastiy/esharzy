<template>
  <div>
    <div>
      <div
        class="vendor--header d-flex justify-content-between align-items-center"
      >
        <div class="d-lg-none menu-icon">
          <svg
            @click="drawer = true"
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-menu-2"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            stroke-width="1"
            stroke="#fff"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
          </svg>

          <el-drawer :visible.sync="drawer" direction="ltr" size="80%">
            <div class="vendor-mobile">
              <div class="logo--header text-center my-4">
                <img src="@/assets/img/logo.png" class="" width="60%" alt="" />
              </div>
              <ul>
                <li>
                  <router-link to="/vendor">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-layout-dashboard"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="1"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M4 4h6v8h-6z"></path>
                        <path d="M4 16h6v4h-6z"></path>
                        <path d="M14 12h6v8h-6z"></path>
                        <path d="M14 4h6v4h-6z"></path>
                      </svg>
                    </span>
                    <span>Dashboard</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/vendor/all-products">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-building-store"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="1"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <line x1="3" y1="21" x2="21" y2="21"></line>
                        <path
                          d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4"
                        ></path>
                        <line x1="5" y1="21" x2="5" y2="10.85"></line>
                        <line x1="19" y1="21" x2="19" y2="10.85"></line>
                        <path
                          d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4"
                        ></path>
                      </svg>
                    </span>
                    <span>Products</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/orders">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-shopping-cart"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="1"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <circle cx="6" cy="19" r="2"></circle>
                        <circle cx="17" cy="19" r="2"></circle>
                        <path d="M17 17h-11v-14h-2"></path>
                        <path d="M6 5l14 1l-1 7h-13"></path>
                      </svg>
                    </span>
                    <span>Orders</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/earnings">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-receipt"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="1"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path
                          d="M5 21v-16a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v16l-3 -2l-2 2l-2 -2l-2 2l-2 -2l-3 2m4 -14h6m-6 4h6m-2 4h2"
                        ></path>
                      </svg>
                    </span>
                    <span>Earnings</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/payouts">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-credit-card"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="1"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <rect x="3" y="5" width="18" height="14" rx="3"></rect>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                        <line x1="7" y1="15" x2="7.01" y2="15"></line>
                        <line x1="11" y1="15" x2="13" y2="15"></line>
                      </svg>
                    </span>
                    <span>Payouts</span>
                  </router-link>
                </li>
                <li>
                  <router-link to="/vendor/settings">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-settings"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        stroke-width="1"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path
                          d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"
                        ></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </span>
                    <span>Settings</span>
                  </router-link>
                </li>
              </ul>
            </div>
          </el-drawer>
        </div>
        <div class="d-flex justify-content-end ml-auto">
          <div class="logo--holder d-flex align-items-center" style="gap: 10px">
            <img src="@/assets/img/icon.svg" alt="" />
            <div>
              <small class="text-warning">Vendor</small>
              <el-popover placement="bottom-end" width="100px" trigger="click">
                <div>
                  <ul class="m-0">
                    <li>
                      <a href="javascript:void(0)" @click="logout">
                        <span>Logout</span>
                      </a>
                    </li>
                    <hr />
                    <li>
                      <router-link to="/vendor/profile">
                        <span>My Profile</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
                <div slot="reference" role="button">
                  <div
                    class="d-flex align-items-center text-white"
                    style="gap: 10px"
                  >
                    <div class="d-flex align-items-center" style="gap: 8px">
                      <small>{{ getUser.first_name }} {{ getUser.last_name }}</small>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
    }
  },
  computed: {
    getUser () {
      return this.$store.getters['auth/getUser']
    }
  }
}
</script>
