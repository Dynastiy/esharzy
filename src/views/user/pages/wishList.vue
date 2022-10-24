<template>
    <div>
        <div>
            <div>
                <div>
                    <div class="mb-3">
                        <h4 style="font-weight: 700">Wishlist</h4>
                        <hr>
                    </div>
                </div>
                <div class="py-2 w-100" v-if="wishlist.length === 0 || wishlist.product === null ">
                      <el-alert
                      class="w-100"
                        title="Oops!!! No Wishlist Item yet"
                        type="error"
                        :closable="false">
                      </el-alert>
                      <div class="text-center mt-3">
                        <button class="" @click="goToShop">
                        Start Shopping
                        </button>
                      </div>
                    </div>
                <div class="single--order_list d-flex justify-content-between mb-4" v-for="item in wishlist" :key="item.id">
                    <div class="d-flex align-items-center" style="gap:10px">
                        <img :src='item.product.app_icon === null ? "/no-product.webp" : config.imgUrl + item.product.app_icon ' alt="product Image">
                        <div>
                            <h5 class="font-weight-bold text-dark"> {{ item.product.name }} </h5>
                        </div>
                    </div>  
                    <div>
                        <router-link class="text-dark" :to=' "/product/"+item.product.slug '>
                        <button>See Details</button>
                        </router-link>
                    </div>

                </div>
            </div>
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
        goToShop(){
            this.$router.push("/shop")
        }
    },
    computed:{
        wishlist(){
            return this.$store.getters["auth/getUser"].wish_lists
        }
    }
}
</script>