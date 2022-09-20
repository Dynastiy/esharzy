<template>
    <div>
        <div>
            <div>
                <div class="d-flex align-items-center" style="gap:30px">
                    <i role="button" @click="goBack" class="el-icon-back" style="font-weight:900; font-size:20px"></i>
                    <h4>Order Details</h4>
                </div>
                <hr>
                <div class="order--details mb-2">
                    <h6 class="text-muted"><span class="font-weight-bold">Order No:</span> Order <span class="text-uppercase">{{ createRef(order.id) }} </span></h6>
                    <h6 class="my-3"> {{ order.products.length }} items </h6>
                    <!-- <h6></h6> -->
                    <h6><span class="font-weight-bold">Total:</span> &#8358;{{ order.total_amount === null ? "0" : order.total_amount.toLocaleString() }} </h6>
                </div>
                <hr>
                <div>
                    <h6 style="font-weight:700">ITEMS IN YOUR ORDER</h6>
                    <div v-for="item in order.products" :key="item.id" class="single--order_list d-flex mt-3 justify-content-between">
                    <div class="d-flex align-items-center" style="gap:20px">
                        <img :src="config.imgUrl + item.app_icon" alt="">
                        <div>
                            <div class="mt-1 mb-1">
                            <span :class="item.status"> {{ item.status }} </span>
                        </div>
                        <h5 class="font-weight-bold text-dark">{{ item.name }}</h5>
                        <small class="text-muted">Order <span class="text-uppercase">{{ createRef(item.id) }} </span></small>
                        <h6 class="text-secondary mt-2 small" style="font-weight:500"> {{ timeStamp(item.created_at) }} </h6>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
    import config from '@/config/api'
    import { timeStamp, createRef } from '@/plugins/filter'
export default {
    data(){
        return {
            config, timeStamp, createRef
        }
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        }
    },
    beforeMount(){
        let id = this.$route.query.orderId
        this.$store.dispatch("user/getOrderByID", id)
    },
    computed:{
        order(){
            return this.$store.getters['user/singleOrder']
        }
    }
}
</script>