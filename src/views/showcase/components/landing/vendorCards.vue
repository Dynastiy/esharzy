<template>
    <div>
        <section class="mt-4 d-lg-flex " style="gap:20px;">

<div class="w-100 growing bg-white p-4 rounded-lg d-flex flex-column justify-content-between">
  <h4 class="font-weight-bold text-dark mb-1">Growing Vendors</h4>
  <p class="text-secondary" style="font-size:14px; font-weight:500" >
    More than 2000 vendors are joined with our market,
    having lots of buyers and customers.
  </p>
  <div class="growing--vendors d-flex" style="gap:20px; width: 100%; overflow-x: scroll;">
      <!-- <div v-for="vendor in vendors" :key="vendor.id" class="">
        <router-link :to=" `/store-listing/${vendor.slug}` ">
          <img height="70px" width="70px" style="object-position: top; object-fit:cover" :src='vendor.user.photo !== null ? config.imgUrl + vendor.user.photo : "/no-user.png"' alt="Vendor Image Here">
        </router-link>
      </div> -->
  </div>
</div>

<div class=" w-100 bg-white p-4 rounded-lg">
  <h4 class="font-weight-bold text-dark mb-1">Most Friendly Products</h4>
  <p class="text-secondary" style="font-size:14px; font-weight:500" >
    Source from 3 million products offered by vendors, and
    leave the facility within 15 days.
  </p>
  <div class="d-lg-flex mt-3" style="gap:20px">
    <div class="w-100 growing--vendors mt-3">
      <h6 class="my-3">Best Selling Products</h6>
      <div class="d-flex" style="gap:20px">
        <!-- <div v-for="item in discountedProducts.slice(0, 3)" :key="item.id" class="">
          <router-link :to=" `/store-listing/${item.slug}` ">
            <img height="70px" width="70px" style="object-position: top; object-fit:cover" :src='item.app_icon !== null ? config.imgUrl + item.app_icon : "/no-user.png"' alt="Product Image">
          </router-link>
        </div> -->
      </div>
    </div>

    <div class="w-100 growing--vendors mt-3">
      <h6 class="my-3">Weekly Deals</h6>
      <div class="d-flex" style="gap:20px">
        <!-- <div v-for="item in allProducts.slice(0,3)" :key="item.id" class="">
          <router-link :to=" `/store-listing/${item.slug}` ">
            <img height="70px" width="70px" style="object-position: top; object-fit:cover" :src='item.app_icon !== null ? config.imgUrl + item.app_icon : "/no-user.png"' alt="Product Image">
          </router-link>
        </div> -->
      </div>
    </div>
  </div>
</div>
</section>
    </div>
</template>

<script>
export default {
    
}
</script>