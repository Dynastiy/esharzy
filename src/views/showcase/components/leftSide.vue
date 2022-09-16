<template>
  <div>
    <div>
      <div class="left--side_categories">
        <ul>
          <!-- {{
            allCategories
          }} -->
          <li v-for="category in allCategories.categories" :key="category.id" >
           <span class="d-flex align-items-center justify-content-between">
            <router-link to="/" >
                <span class="text-capitalize" style="font-size:14px">
                    {{ category.category_name }}
                </span>
               
            </router-link>
            <i :class= 'more ? "el-icon-arrow-up" : "el-icon-arrow-down" ' @click="doSomething(category)" role="button" v-if="category.sub_categories.length > 0" style="font-size:12px"></i>
           </span>

           <transition name="fade">
            <ul v-if="more === category.id" class="mt-2 pl-4" style="border-left: 1px solid var(--gray-400)">
                <li v-for="item in category.sub_categories" :key="item.id"  class="sub-category small text-capitalize"> {{ item.sub_category_name }} </li>
            </ul>
            </transition>
            
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            more: false
        }
    },
    methods:{
        doSomething(category){
      this.more = this.more === category.id ? null : category.id;
        },
    },
  computed: {
    allCategories() {
      return this.$store.getters["showcase/getCategories"];
    },
    getUser() {
      return this.$store.getters["auth/getUser"];
    },
    loggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
  },
};
</script>

<style>
    .fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transition: opacity .5s;
}
</style>