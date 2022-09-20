<template>
  <div>
    <div>
      <div v-if="orders.length !== 0">
        <div v-for="item in orders" :key="item.id" class="single--order_list d-lg-flex justify-content-between mb-4">
          <div class="d-flex mt-2 align-items-center" style="gap:20px">
            <img :src=' item.products.length === 0 ? "/no-product.webp" : config.imgUrl + item.products[0].app_icon ' alt="">
            <div>
              <h5 class="font-weight-bold text-dark">{{ item.products.length === 0 ? "undefined" : item.products[0].name }}</h5>
              <small class="text-muted">Order <span class="text-uppercase">{{ createRef(item.id) }} </span></small>
              <div class="mt-1 mb-1">
                <span :class="item.status"> {{ item.status }} </span>
              </div>
              <h6 class="text-secondary mt-2 small" style="font-weight:500"> {{ timeStamp(item.created_at) }} </h6>
            </div>
          </div>
          <div class="mt-2">
            <router-link :to='"/order-history/single-order?orderId="+item.id' class="small"><button>See Details</button></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { createRef, timeStamp } from '@/plugins/filter'
    import config from "@/config/api"
    export default {
    data(){
        return {
            createRef, timeStamp, config
        }
    },
  computed: {
    orders() {
      return this.$store.getters["user/allOrders"];
    },
    
  },
};
</script>