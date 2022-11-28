<template>
  <div>
    <div class="mb-5">
      <div class="select--category" >
        <el-skeleton class="d-lg-flex" style="width:  100%; gap: 30px" animated :loading="loading" >
          <template slot="template">
            <el-skeleton-item
              variant="image"
              style="
                width: 120px;
                height: 120px;
                border-radius: 50%;
                margin-bottom: 12px;
              "
            />
            <el-skeleton-item style="width: 120px" />
          </template>
          <div v-if="categories.length == 0">
            <el-alert type="error" :closable="false" class="w-100">
              No categories yet
            </el-alert>
          </div>
          <div
            @click="goToCategory(category)"
            role="button"
            class="text-capitalize text-center"
            v-for="category in categories.categories"
            :key="category.id"
          >
            <div>
              <div class="category">
                <img :src="config.imgUrl + category.icon_image" alt="" />
              </div>
              <h6 class="text-dark font-weight-bold mt-3">
                {{ category.category_name }}
              </h6>
            </div>
          </div>
        </el-skeleton>
      </div>
    </div>
  </div>
</template>


<script>
import config from "@/config/api";

import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      config
    };
  },
  methods: {
    ...mapActions("showcase", ["getCategories"]),
  },
  beforeMount() {
    this.getCategories();
  },
  computed: {
    ...mapState("showcase", ["categories", "loading"]),
  },
};
</script>

