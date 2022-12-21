<template>
  <div>
      <div>
          <div>
              <div class="mt-3">
                  <div class="d-flex align-items-center" style="gap:15px">
                      <div class="video w-100">
                          <video controls :src='config.imgUrl + product.video' style="width:100%; height: 175px; border-radius: 5px;"></video>
                      </div>

                      <div class="images w-100">
                         <img :src='config.imgUrl + product.app_icon' alt="" class="">
                         <img :src='config.imgUrl + product.photo_one' alt="" class="">
                         <img :src='config.imgUrl + product.photo_two' alt="" class="">
                         <img :src='config.imgUrl + product.photo_three' alt="" class="">
                         <img :src='config.imgUrl + product.photo_four' alt="" class="">
                         <img :src='config.imgUrl + product.photo_five' alt="" class="">
                      </div>
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
      config
    }
  },
  computed: {
    product () {
      return this.$store.getters['showcase/getSingleProduct']
    }
  }
}
</script>
