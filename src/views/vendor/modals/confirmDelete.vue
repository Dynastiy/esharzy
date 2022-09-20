<template>
    <div>
      <div class="modal--mask">
        <div class="modal--container">
          <div class="modal--content">
            <div class="logo mb-4 text-center">
              <img class="text-center" src="@/assets/img/icon.svg" width="80px" alt="" />
            </div>
            <div>
              <h4 class="font-weight-bold text-center">Continue?</h4>
              <p class="text-center small text-secondary">Are you sure you want to continue with this operation? 
                </p>
              <div class="mt-4">
                <button class=" w-100" @click="done">
                  Delete
                </button>
              </div>
              <div class="mt-2">
                <button class="cancel w-100" @click="close">
                  Cancel
                </button>
              </div>
            </div>
            <div v-show="loading"  class="logging--out">
              <i class="el-icon-loading" style="font-size:50px; color: #fff"></i>
            </div>
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
      };
    },
    methods: {
      done(){
        this.$emit("done")
      },
      close() {
        this.$emit("close");
      },
    },
    computed:{
      loading(){
        return this.$store.getters["auth/isLoading"]
      }
    }
  };
  </script>
  Footer
  © 2022 GitHub, Inc.
  Footer navigation
  