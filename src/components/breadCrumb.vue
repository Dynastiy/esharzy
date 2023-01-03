<template>
    <div>
        <div>
            <div>
                <div class="container-fluid">
          <div
            class="
              d-flex
              align-items-center my-4
            "
          >
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                ><router-link to="/" style="font-weight:400"
                  > Home </router-link
                ></el-breadcrumb-item
              >
              <el-breadcrumb-item
                ><router-link :to="currentRoute.path" style="font-weight:400"
                  > {{currentRoute.name}} </router-link
                ></el-breadcrumb-item
              >
              <el-breadcrumb-item v-if="currentRoute.params !== {}"
                  > {{ currentRoute.params.slug }} </el-breadcrumb-item
              >
            </el-breadcrumb>

          </div>
        </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  computed: {
    currentRoute () {
      return this.$route
    }
  }
}
</script>
