<template>
    <div>
        <div>
            <div class="view--store">
                <div class="left--side mt-4">
                    <h5 class="mb-3">All Categories</h5>
                    <div>
                        <LeftSide/>
                    </div>
                </div>


                <div class="right--side mt-4">
                    <div class="user--data">
                        <VendorProfile/>
                        <div class="mt-3">
                            <ShopProducts/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import LeftSide from '../components/leftSide.vue';
import VendorProfile from '../components/vendorProfile.vue';
import ShopProducts from '../components/shopProducts.vue';
export default {
    components: { LeftSide, VendorProfile, ShopProducts },
    beforeMount(){
        let slug = this.$route.params.slug
        this.$store.dispatch('showcase/getStoreBySlug', slug)
    }
}
</script>