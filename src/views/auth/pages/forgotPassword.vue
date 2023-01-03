<template>
    <div class="forgot--password">
      <div class="login--page-wrapper">
          <div class="login--page_content">
            <div class="login-page-header mb-3 text-center">
              <img src="@/assets/img/dark_logo.svg" width="80" alt="" />
              <div class="mb-2 mt-3 ">
                <h4 class="font-weight-bold">Forgot Password?</h4>
                <p class="small text-secondary" style="font-size:12px">
                  Enter email address to reset password
                </p>
              </div>
            </div>

            <div>
              <form action="" @submit.prevent="submit()">
                <div class="mb-3">
                  <!-- <label for="" class="d-block small"
                    >Email<sup class="text-danger">*</sup>
                  </label> -->
                  <input
                    type="email"
                    v-model="credentials.email"
                    class="input--text"
                    placeholder="Email"
                  />
                  <!-- <small class="text-danger" v-for="err in errMessages.email" :key="err"> *{{ err }} </small> -->
                </div>

                <div class="text-center mt-3" v-if="loading">
                  <i class="el-icon-loading" style="font-size:30px"></i>
                </div>
                <div class=" mt-3" v-else>
                  <button>Send Request Link</button>
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
        password: ''
      }
    }
  },
  methods: {
    async submit () {
      this.$store.dispatch('auth/forgotPassword', this.credentials)
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
