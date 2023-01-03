<template>
  <div>
    <div class="container-fluid">
      <!-- Hero Section -->
      <HeroSection />

      <!-- Our Positives  -->
      <OurPositives/>

      <section>
        <div class="my-5">

          <!-- Deals of the Day -->
          <deals-of-the-day/>

          <!-- Vendor Cards  -->
          <vendor-cards/>

          <!-- All Products -->
          <all-products/>

        </div>
      </section>
    </div>
  </div>
</template>

<script>
// import config from "@/config/api";

import HeroSection from '../components/landing/heroSection.vue'
import DealsOfTheDay from '../components/landing/dealsOfTheDay.vue'
import AllProducts from '../components/landing/AllProducts.vue'
import OurPositives from '../components/landing/ourPositives.vue'
import VendorCards from '../components/landing/vendorCards.vue'
export default {
  data () {
    return {
    }
  },
  methods: {
  },
  beforeMount () {
  },
  computed: {
  },
  components: { HeroSection, DealsOfTheDay, AllProducts, OurPositives, VendorCards }
}
</script>
