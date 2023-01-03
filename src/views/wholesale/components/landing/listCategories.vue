<template>
      <div class="my-4 container-fluid">
        <div class="wholesale--category">
            <div v-if="categories.length == 0">
              <el-alert type="error" :closable="false" class="w-100">
                No categories yet
              </el-alert>
            </div>
            <div
              @click="goToCategory(category)"
              role="button"
              class="text-capitalize text-center wholesale--category_item"
              v-for="category in categories.categories"
              :key="category.id"
            >
              <div>
                <div class="category">
                  <img :src="config.imgUrl + category.icon_image" alt="" />
                </div>
                <h6 class="text-white mt-3">
                  {{ category.category_name }}
                </h6>
              </div>
            </div>
      </div>
    </div>
  </template>

<script>
import config from '@/config/api'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      config
    }
  },
  methods: {
    ...mapActions('showcase', ['getCategories']),
    goToCategory (category) {
      this.$router.push('/wholesale/category/' + category.slug)
    }
  },
  beforeMount () {
    this.getCategories()
  },
  computed: {
    ...mapState('showcase', ['categories', 'loading'])
  }
}
</script>
