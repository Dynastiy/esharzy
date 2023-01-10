<template>
  <div>
    <div class="container-fluid mt-4"  v-loading="loading"
    element-loading-background="rgba(255, 255, 255, 0.7)"
    style="width: 100%;">
        <div class="search--area bg-white my-4 p-3">
          <input type="text" @keyup="searchShops" v-model="search" placeholder="Search Vendors" />
          <button>APPLY</button>
        </div>

        <div class="border--area" style="border: 1px dashed var(--gray-400)" v-if="stores.length == 0">
          <h6 style="font-weight: 400">No Stores found</h6>
        </div>

        <div class="store--listing">
          <div class="store" v-for="store in stores" :key="store.id">
            <div class="cover--area p-3" style="height: 200px" :style=" {'background-image': store.user.cover_photo == null ? `@/assets/img/no-cover.png` : `url(${config.imgUrl}${store.user.cover_photo})`}">
                <!-- {{ store }} -->
              <h5 class="text-capitalize mb-3 text-white" style="font-weight:600" role="button" @click="goToStore(store)"> {{ store.name === null ? "Null" : store.name }} </h5>
              <!-- <h6 style="font-weight:400; color:var(--gray-400)" class=" my-2" >
                <i class="el-icon-phone-outline"></i> {{ store.user.phone_no }}
              </h6> -->
              <h6 class="text-white" style="font-weight:400">{{ store.user.country }}</h6>
              <div class="vendor--img">
                <img class="rounded-circle" height="70px" width="70px" style="object-position: top; object-fit:cover" :src='store.user.photo !== null ? config.imgUrl + store.user.photo : "/no-user.png"' alt="Vendor Image Here">
              </div>
            </div>
            <hr class="m-0" />

            <div class="p-3 ">
              <span @click="goToStore(store)" role="button">
                <span style="font-weight:600"
                  >VISIT STORE
                  <i class="el-icon-right"></i>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import config from '@/config/api'
export default {
  data () {
    return {
      config,
      search: null
    }
  },
  methods: {
    goToStore (store) {
      this.$router.push(`/store-listing/${store.slug}`)
      this.$store.dispatch('showcase/getStoreBySlug', store.slug)
    },
    searchShops () {
      this.$store.dispatch('showcase/getStores', this.search)
    }
  },

  beforeMount () {
    const search = ''
    this.$store.dispatch('showcase/getStores', search)
  },
  computed: {
    stores () {
      return this.$store.getters['showcase/getStores']
    },
    loading () {
      return this.$store.getters['showcase/isLoading']
    }
  }
}
</script>
