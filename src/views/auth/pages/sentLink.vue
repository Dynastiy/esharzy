<template>
  <div class="forgot--password">
    <div class="login--page-wrapper">
        <div class="login--page_content">
          <div class="login-page-header mb-3 text-center">
            <img src="@/assets/img/dark_logo.svg" width="80" alt="" />
            <div class="mb-3 mt-3 ">
              <h4 class="font-weight-bold">Reset Password</h4>

            </div>
          </div>
              <div>
                 <h5 class="text-center"> {{ resp }}</h5>
              </div>

        </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
    }
  },
  methods: {

  },

  computed: {
    ...mapState('auth', {
      resp: (state) => state.dataSet
    })
  }

}
</script>

<style>
.animated-content {
  --animate-duration: 4s;
}
</style>
