<template>
    <div>
        <div>
            <div>
                <div class="d-lg-flex" style="gap:30px">
                   <div class="shop--details_left w-100 mt-4" :style="{'backgroundImage':  vendor.user.cover_photo == null ? `@/assets/img/no-cover.png` : `url(${config.imgUrl}${vendor.user.cover_photo})`}"></div>
                   <div class="shop--details_right w-100 mt-4">
                    <div class="d-flex align-items-center" style="gap:20px">
                        <img :src='vendor.user.photo == null ? "@/assets/img/no-user.png" : config.imgUrl + vendor.user.photo ' alt="">
                        <div>
                            <h5 style="font-weight:600"> {{ vendor.user.first_name + " " + vendor.user.last_name }} </h5>

                        </div>
                    </div>

                    <div class="mt-3">
                        <div class="row">
                            <span class="col-4 font-weight-bold" style="font-size:15px">Store Name:</span>
                            <span class="col-6" style="font-size:15px"> {{ vendor.name }} </span>
                        </div>

                        <div class="row mt-2">
                            <span class="col-4 font-weight-bold" style="font-size:15px">Address:</span>
                            <span class="col-6" style="font-size:15px"> {{ vendor.user.country }} </span>
                        </div>
                    </div>

                    <div class="mt-3">
                        <span @click="goToStore" role="button">
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
    </div>
</template>

<script>
    import config from '@/config/api'
export default {
    data(){
        return{
            config
        }
    },
    methods:{
        goToStore() {
            this.$router.push(`/store-listing/${this.vendor.slug}`)
            this.$store.dispatch('showcase/getStoreBySlug', this.vendor.slug)
        }
    },
    computed:{
        product() {
            return this.$store.getters["showcase/getSingleProduct"].product;
        },
        vendor(){
            return this.$store.getters["showcase/getStore"]
        }
    }
}
</script>