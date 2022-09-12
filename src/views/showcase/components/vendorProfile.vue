<template>
    <div>
        <div class="vendor-profile" :style="{'background':  store.user.cover_photo == null ? `@/assets/img/no-cover.png` : `url(${config.imgUrl}${store.user.cover_photo})`  }" >
           <div class="left--details pt-5 pl-5">
             <img class="rounded-circle" height="80px" width="80px" style="object-position: top; object-fit:cover" :src='store.user.photo !== null ? config.imgUrl + store.user.photo : "/no-user.png"' alt="Vendor Image Here">
             <h4 class="text-white mt-4" style="font-weight:800">{{ store.name }}</h4>
             <h6 class="my-2" style="color:var(--gray-400)"> <i class="el-icon-phone-outline"></i> {{ store.user.phone_no }} </h6>
             <h6 style="color:var(--gray-400)"> <i class="el-icon-location-outline"></i> {{ store.user.country }} </h6>
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
   computed:{
    store(){
        return this.$store.getters["showcase/getStore"]
    }
   }
}
</script>