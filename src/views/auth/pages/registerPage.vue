<template>
  <div>
    <div class="login--page-wrapper">
      <div class="login--page_content">
        <div class="login-page-header mb-3 text-center">
          <!-- <img src="@/assets/img/icon.svg" width="5%" alt="" /> -->
          <div class="my-2">
            <h4 class="font-weight-bold">Create New Account</h4>
          </div>
        </div>

        <div>
          <form action="" @submit.prevent="register()">
            <div class="mb-3">
              <div class="d-flex align-items-center" style="gap:20px">
                <div class="w-100">
                <!-- <label for="" class="d-block small"
                  >First Name<sup class="text-danger">*</sup>
                </label> -->
                <input
                  type="text"
                  v-model="credentials.first_name"
                  class="input--text"
                  placeholder="First Name"
                />
                <small class="text-danger" v-show="errMessages.first_name" v-for="err in errMessages.first_name" :key="err"> *{{ err }} </small>
              </div>
              <div class="w-100">
                <!-- <label for="" class="d-block small"
                  >Last Name<sup class="text-danger">*</sup>
                </label> -->
                <input
                  type="text"
                  v-model="credentials.last_name"
                  class="input--text"
                  placeholder="Last Name"
                />
                <small class="text-danger" v-show="errMessages.last_name" v-for="err in errMessages.last_name" :key="err"> *{{ err }} </small>
              </div>
              </div>
            </div>
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
              <small
                class="text-danger"
                v-show="errMessages.email"
                v-for="err in errMessages.email"
                :key="err"
              >
                *{{ err }}
              </small>
            </div>
            <div class="mb-3">
              <!-- <label for="" class="d-block small"
                >Phone Number<sup class="text-danger">*</sup>
              </label> -->
              <input
                type="tel"
                v-model="credentials.phone_no"
                class="input--text"
                placeholder="Phone Number"
              />
              <small
                class="text-danger"
                v-show="errMessages.email"
                v-for="err in errMessages.phone_no"
                :key="err"
              >
                *{{ err }}
              </small>
            </div>
            <div class="mb-3">
              <div class="d-flex" style="gap:20px"> 
                <country-select
                  class="form-control w-100"
                  v-model="credentials.country"
                  :country="credentials.country"
                  topCountry="NG"
                  :countryName="true"
                />
                <region-select class="w-100" v-model="credentials.city" :countryName="true" :country="credentials.country" :region="credentials.city" :regionName="true" />
              </div>
            </div>
            <div class="mb-3">
              <!-- <label for="" class="d-block small"
                >Address<sup class="text-danger">*</sup>
              </label> -->
              <input
                type="text"
                v-model="credentials.address"
                class="input--text"
                placeholder="Address"
              />
            </div>
            <div class="mb-3">
              <!-- <label class="d-block small" for=""
                >Password<sup class="text-danger">*</sup>
              </label> -->
              <div class="input--field d-flex align-items-center">
                <input
                  :type="type"
                  class="input-area"
                  v-model="credentials.password"
                  placeholder="Password"
                />
                <div @click="showPassword" role="button">
                  <span
                    class="text-danger"
                    style="font-size: 10px; margin-right: 5px"
                  >
                    {{ actions }}
                  </span>
                </div>
              </div>
              <span class="text-secondary small">Min. 8 Characters</span>
              <small
                class="text-danger"
                v-show="errMessages.password"
                v-for="err in errMessages.password"
                :key="err"
                style="font-size:10px"
              >
                *{{ err }}
              </small>
            </div>
            
            <div class="text-center mt-3" v-if="loading">
                <i class="el-icon-loading" style="font-size:30px"></i>
              </div>
            <div class="mt-3" v-else>
              <button>Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      type: "password",
      icon: "bi:eye-slash",
      actions: "show",
      credentials: {
        email: "",
        password: "",
        phone_no: "",
        first_name: "",
        last_name:"",
        country: "",
        address: "",
        city: ""
      },
      
    };
  },
  methods: {
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.icon = "clarity:eye-line";
        this.actions = "hide";
      } else {
        this.type = "password";
        this.icon = "bi:eye-slash";
        this.actions = "show";
      }
    },
    async register() {
      console.log(this.credentials);
      this.$store.dispatch("auth/userRegister", this.credentials);
      // this.credentials = {}
    },
    goToLogin() {
      this.$router.push("/sign-up");
    },
  },
  computed:{
        errMessages(){
            return this.$store.getters['auth/isError']
        },
        loading(){
            return this.$store.getters['auth/isLoading']
        }
    },
  
};
</script>

<style>
.animated-content {
  --animate-duration: 4s;
}
</style>
