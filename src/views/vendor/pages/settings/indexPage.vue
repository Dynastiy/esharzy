<template>
  <div>
    <div class="bg-white p-3 rounded-lg shadow-lg">
      <div class="update--user">
        <h4>User Profile</h4>
        <!-- {{ getUser }} -->
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
        <form action="" @submit.prevent="updateUserData">
          <div class="mb-3 d-flex" style="gap: 20px">
            <div class="w-100">
              <label for="">First Name</label>
              <input type="text" v-model="userData.first_name" />
            </div>

            <div class="w-100">
              <label for="">Last Name</label>
              <input type="text" v-model="userData.last_name" />
            </div>
          </div>

          <div class="mb-3 d-flex" style="gap: 20px">
            <div class="w-100">
              <label for="">Country</label>
              <input type="text" v-model="userData.country" />
            </div>
            <div class="w-100">
              <label for="">Date of Birth</label>
              <input type="date" v-model="userData.dob" />
            </div>
          </div>
           <div class=" mt-3" v-if="loading">
                <i class="el-icon-loading" style="font-size:30px"></i>
            </div>
          <div v-else>
            <button>Update</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        first_name: "",
        last_name: "",
        country: "",
        dob: "",
      },
    };
  },
  methods: {
    updateUserData() {
      let formData = new FormData();
      formData.append("first_name", this.userData.first_name);
      formData.append("last_name", this.userData.last_name);
      formData.append("country", this.userData.country);
      formData.append("dob", this.userData.dob);
      this.$store.dispatch("auth/updateUser", formData);
    },
  },
  mounted() {
    this.userData = this.$store.getters["auth/getUser"];
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