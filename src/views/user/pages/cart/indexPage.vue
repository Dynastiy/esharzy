<template>
    <div>
        <div>
            <div class="container-fluid">
                <CartHeader/>
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    import CartHeader from '../../components/headers/cartHeader.vue'
export default {
    components:{
        CartHeader
    }
}
</script>