<template>
  <div>
    <div>
      <div>
        <div class="bg-white rounded-lg p-4 shadow-lg">
          <button
            class="btn btn-dark d-flex mb-2 align-items-center px-3 py-1 small"
            style="gap: 10px; font-size: 12px"
            @click="goBack()"
          >
            <i class="el-icon-d-arrow-left"></i>
            <span> Go Back </span>
          </button>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Overview" name="first">
              <OverviewPage />
            </el-tab-pane>
            <el-tab-pane label="Description" name="second">
              <DescriptionPage />
            </el-tab-pane>
            <el-tab-pane label="Media" name="third">
              <MediaPage />
            </el-tab-pane>
            <el-tab-pane label="Reviews and Ratings" name="fourth">
              <ReviewsAndRatings />
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import OverviewPage from "./components/overviewPage.vue";
import DescriptionPage from "./components/descriptionPage.vue";
import MediaPage from "./components/mediaPage.vue";
import ReviewsAndRatings from "./components/reviewsAndRatings.vue";
export default {
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    goBack() {
      this.$router.go(-1);
    },
    beforeMount() {
      this.$store.dispatch("showcase/getCategories");
      this.$store.dispatch("showcase/getTags");
      this.payload = this.$store.getters["showcase/getSingleProduct"];
    },
  },
  components: { OverviewPage, DescriptionPage, MediaPage, ReviewsAndRatings },
};
</script>