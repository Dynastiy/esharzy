<template>
    <div class="forgot--password">
      <div class="login--page-wrapper">
          <div class="login--page_content">
            <div class="login-page-header mb-3 text-center">
              <img src="@/assets/img/dark_logo.svg" width="80" alt="" />
              <div class="mb-2 mt-3 ">
                <h4 class="font-weight-bold">Create New Password</h4>
                <!-- <p class="small text-secondary" style="font-size:12px">
                  Enter email address to reset password
                </p> -->
              </div>
            </div>

            <div>
              <form action="" @submit.prevent="submit()">
                <div class="mb-3">
                  <input
                    type="text"
                    v-model="credentials.password"
                    class="input--text"
                    placeholder="New Password"
                  />
                </div>
                <div class="mb-3">
                  <input
                    type="text"
                    v-model="credentials.password_confirmation"
                    class="input--text"
                    placeholder="Confirm New Password"
                  />
                </div>

                <div class="text-center mt-3" v-if="loading">
                  <i class="el-icon-loading" style="font-size:30px"></i>
                </div>
                <div class=" mt-3" v-else>
                  <button>Create New Password</button>
                </div>
              </form>
            </div>

          </div>
      </div>

    </div>
  </template>

<script>

export default {
  data () {
    return {
      credentials: {
        email: this.$route.query.email,
        password: '',
        password_confirmation: '',
        token: this.$route.query.token
      }
    }
  },
  methods: {
    async submit () {
    //   console.log(this.credentials)
      this.$store.dispatch('auth/resetPassword', this.credentials)
    }

  },
  computed: {
    loading () {
      return this.$store.getters['auth/isLoading']
    }
  }

}
</script>

  <style>
  .animated-content {
    --animate-duration: 4s;
  }
  </style>
