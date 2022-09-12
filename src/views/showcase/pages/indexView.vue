<template>
    <div>
        <div>
            <div>
                <BreadCrumb/>
               <div class="container-fluid">
                <router-view :key="$route.fullPath"/>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
import BreadCrumb from '../components/breadCrumb.vue';
export default {
    components: { BreadCrumb }
}
</script>