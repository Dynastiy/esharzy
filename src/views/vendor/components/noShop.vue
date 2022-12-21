<template>
  <div>
    <div class="no--shop">
      <div class="no--shop_content shadow-lg">
        <div v-if="createNewShop">
          <h4 class="text-danger mb-2">Welcome!</h4>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-building-store"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <line x1="3" y1="21" x2="21" y2="21"></line>
              <path
                d="M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4"
              ></path>
              <line x1="5" y1="21" x2="5" y2="10.85"></line>
              <line x1="19" y1="21" x2="19" y2="10.85"></line>
              <path d="M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4"></path>
            </svg>
          </div>
          <div>
            <h4 class="my-1 text-danger">No Shop Created Yet!</h4>
            <p class="small text-secondary mb-3">
              Create a shop to begin adding products and making sales
            </p>
            <button @click="createNewShop = !createNewShop">Create</button>
          </div>
        </div>

        <!-- Form to Create New shop -->
        <div class="create--shop" v-else>
          <input type="text" placeholder="Enter Shop Name" v-model="payload.name"/>
          <div class="text-center mt-3" v-if="loading">
            <i class="el-icon-loading" style="font-size: 30px"></i>
          </div>
         <div class="mt-3 text-center" v-else>
             <button class="" @click="createShop">Create New Shop</button>
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
      createNewShop: true,
      payload: {
        name: ''
      }
    }
  },
  methods: {
    createShop () {
      this.$store.dispatch('auth/createShop', this.payload)
    }
  },
  computed: {
    loading () {
      return this.$store.getters['auth/isLoading']
    }
  }
}
</script>
