<template>
  <div>
    <div>
      <header>
        <div class="mt-4 header--content">
          <div class="carousel--container" >
            <el-carousel :interval="10000" arrow="none" indicator-position="none" style="border-radius:10px">
              <el-carousel-item v-for="item in productImages" :key="item.id" :style=" {'background-image': `url(${config.imgUrl}${item.photo_one})`}">
               <div class="d-flex align-items-center h-100 justify-content-end" style="padding-right:5rem">
               <div class="">
                <h2 class="text-white text-capitalize mb-3" style="font-family:cursive; font-size: 3rem" data-aos="fade-down" >{{ item.name }}</h2>
                <button class="text-white discover--btn" data-aos="fade-up" @click="viewProduct(item)" style="font-weight:500">DISCOVER NOW <i class="el-icon-right"></i> </button>
               </div>
               </div>
              </el-carousel-item>
            </el-carousel>
          </div>

          <div class="promo--images">
              <el-carousel :interval="10000" indicator-position="none">
                <el-carousel-item  v-for="item in topImages" :key="item.id" :style=" {'background-image': `url(${config.imgUrl}${item.photo_three})`}">
                  <div class="p-4">
                    <h6 class="text-white" style="font-family:cursive">Top Products</h6>
                    <h5 class="text-capitalize text-white mt-2 mb-3 " style="text-transform:uppercase !important; font-weight: 700; font-size: 15px;">{{ item.name }}</h5>
                    <span role="button" class="text-white small" @click="viewProduct(item)" style="font-weight:500">SHOP NOW <i class="el-icon-right"></i> </span>
                  </div>
                </el-carousel-item>
              </el-carousel>

              <el-carousel :interval="10000" indicator-position="none">
                <el-carousel-item  v-for="item in newImages" :key="item.id" :style=" {'background-image': `url(${config.imgUrl}${item.photo_three})`}">
                  <div class="p-4">
                    <h6 class="text-white" style="font-family:cursive">New Products</h6>
                    <h5 class="text-capitalize text-white mt-2 mb-3 " style="text-transform:uppercase !important; font-weight: 700; font-size: 15px;">{{ item.name }}</h5>
                    <span role="button" class="text-white small" @click="viewProduct(item)" style="font-weight:500">SHOP NOW <i class="el-icon-right"></i> </span>
                  </div>
                </el-carousel-item>
              </el-carousel>
          </div>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
  import config from '@/config/api'
export default {
  data(){
    return {
      config
    }
  },
  methods:{
    viewProduct(item) {
      this.$router.push({
        name: "product-detail",
        params: { slug: item.slug },
      });
      this.$store.dispatch("showcase/getProductBySlug", item.slug);
    },
  },
  beforeMount(){
    this.$store.dispatch("showcase/getProducts")
  },
  computed:{
    productImages(){
      return this.$store.getters['showcase/getProducts'].all_products.data;
    },

    newImages(){
      return this.$store.getters["showcase/newProducts"].new_products.data;
    },

    topImages(){
      return  this.$store.getters["showcase/topRatedProducts"].trending_products.data;
    }
  }
}
</script>