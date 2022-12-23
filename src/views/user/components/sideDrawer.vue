<template>
  <div>
      <div class="sidebar--container">
        <div class="side--bar">
          <div class="user--profile">
            <div class="top text-center p-4">
              <div class="avatar mx-auto mb-3">
                <div class="overlay--loading" v-if="loading">
                  <i class="el-icon-loading"></i>
                </div>
                <img
                  :src="
                    getUser.photo === null
                      ? '/no-user.png'
                      : config.imgUrl + getUser.photo
                  "
                  alt=""
                />

                <div class="edit--icon">
                  <i
                    class="el-icon-edit"
                    role="button"
                    @click="updateprofilePhoto"
                    style="font-size: 15px; font-weight: 800"
                  ></i>
                </div>
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
                      width="22"
                      height="22"
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
                <router-link to="/buyer/order-history">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-shopping-cart"
                      width="22"
                      height="22"
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
                <router-link to="/buyer/wishlist">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-shopping-cart-plus"
                      width="22"
                      height="22"
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
                <router-link to="/buyer/vendor-applications">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" preserveAspectRatio="xMidYMid meet" viewBox="0 0 36 36"><path fill="currentColor" d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1ZM8 10h12V7.94H8Z" class="clr-i-outline clr-i-outline-path-1"/><path fill="currentColor" d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1ZM20 18H8v-2h12Z" class="clr-i-outline clr-i-outline-path-2"/><path fill="currentColor" d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49Z" class="clr-i-outline clr-i-outline-path-3"/><path fill="currentColor" d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79Z" class="clr-i-outline clr-i-outline-path-4"/><path fill="currentColor" d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z" class="clr-i-outline clr-i-outline-path-5"/><path fill="currentColor" d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z" class="clr-i-outline clr-i-outline-path-6"/><path fill="none" d="M0 0h36v36H0z"/></svg>
                  </span>
                  <span>Vendor Applications</span>
                </router-link>
              </li>
              <li>
                <a href="javascript:void(0)" @click="logout">
                  <span
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-logout"
                      width="22"
                      height="22"
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

      <!-- Update Profile Photo  -->
      <update-profile-photo @closeModal="closeModal" v-if="update_profile_photo"/>

      <!-- Become a Vendor Modal  -->
      <BecomeAVendor @closeModal="closeModal" v-if="become_a_vendor" />
  </div>
</template>

<script>
import BecomeAVendor from './modals/becomeAVendor.vue'
import UpdateProfilePhoto from './modals/updateProfilePhoto.vue'
import config from '@/config/api'
export default {
  data () {
    return {
      config,
      become_a_vendor: false,
      update_profile_photo: false
    }
  },
  methods: {
    becomeAVendor () {
      this.become_a_vendor = true
    },
    closeModal () {
      this.become_a_vendor = false
      this.update_profile_photo = false
    },
    updateprofilePhoto () {
      this.update_profile_photo = true
    },
    logout () {
      this.$store.dispatch('auth/logout')
    }
  },
  computed: {
    getUser () {
      return this.$store.getters['auth/getUser']
    },
    loading () {
      return this.$store.getters['auth/isLoading']
    }
  },
  components: { BecomeAVendor, UpdateProfilePhoto }
}
</script>
