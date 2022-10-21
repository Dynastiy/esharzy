<template>
  <div>
    <div class="mb-3">
      <h4>Settings</h4>
    </div>
   <div class="bg-white p-4">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="General" name="first"> 
        <GeneralData/> 
      </el-tab-pane>
      <el-tab-pane label="User Profile" name="second">
        
      </el-tab-pane>
    </el-tabs>
   </div>
  </div>
</template>
<script>
import GeneralData from './components/generalData.vue';
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
    },
    components: { GeneralData }
};
</script>