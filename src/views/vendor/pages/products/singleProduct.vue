<template>
  <div
    v-loading="loading"
    element-loading-background="rgba(255, 255, 255, 0.7)"
    style="width: 100%;"
  >
    <div>
      <span role="button"
      class="d-flex mb-2 align-items-center small"
      style="gap: 10px; font-size: 12px;"
      @click="$router.push('/vendor/all-products')"
    >
      <i class="el-icon-d-arrow-left"></i>
      <span>All Products</span>
    </span>

    <div class="my-4">
      <h4>{{ product.name }}</h4>
    </div>
    <div class="row">
      <div class="col-md-8">
        <MediaPage class="bg-white rounded-lg p-4 mb-3" />
        <div class="">
          <OverviewPage class="bg-white rounded-lg p-4 mb-3" />
          <DescriptionPage class="bg-white rounded-lg p-4 mb-3" />
        </div>
      </div>
      <div class="col-md-4">
        <ReviewsAndRatings class="bg-white rounded-lg p-4 mb-3" />
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import OverviewPage from './components/overviewPage.vue'
import DescriptionPage from './components/descriptionPage.vue'
import MediaPage from './components/mediaPage.vue'
import ReviewsAndRatings from './components/reviewsAndRatings.vue'
export default {
  data () {
    return {
      activeName: 'first',
      slug: this.$route.params.slug
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  beforeMount () {
    this.$store.dispatch('showcase/getCategories')
    this.$store.dispatch('showcase/getSubCategories')
    this.$store.dispatch('showcase/getTags')
    this.$store.dispatch('vendor/getShippingClasses')

    this.$store.dispatch('vendor/getProductBySlug', this.slug)
  },
  // beforeCreate () {

  // }
  computed: {
    product () {
      return this.$store.getters['vendor/getSingleProduct']
    },
    loading () {
      return this.$store.getters['vendor/isLoading']
    }
  },
  components: { OverviewPage, DescriptionPage, MediaPage, ReviewsAndRatings }
}
</script>
