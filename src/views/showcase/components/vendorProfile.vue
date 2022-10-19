<template>
    <div>
        <div class="vendor-profile" :style='{"background": ( user.cover_photo !== null ? `url(${config.imgUrl}${user.cover_photo})` : `url("/no-cover.png")` ) }' >
           <div class="left--details pt-5 pl-5">
             <img class="rounded-circle" height="80px" width="80px" style="object-position: top; object-fit:cover" :src='user.photo !== null ? config.imgUrl + user.photo : "/no-user.png"' alt="Vendor Image Here">
             <h4 class="text-white mt-4" style="font-weight:800">{{ store.name }}</h4>
             <h6 class="my-2" style="color:var(--gray-400)"> <i class="el-icon-phone-outline"></i> {{ user.phone_no }} </h6>
             <h6 style="color:var(--gray-400)"> <i class="el-icon-location-outline"></i> {{ user.country }} </h6>
           </div>
        </div>
    </div>
</template>

<script>
import config from "@/config/api";
export default {
    data(){
        return {
            config
        }
    },

    beforeMount(){
        let slug = this.$route.params.slug
        this.$store.dispatch('showcase/getStoreBySlug', slug)
    },
   computed:{
    store(){
        return this.$store.getters["showcase/getStore"]
    },
    user(){
        return this.store.user
    }
   }
}
</script>