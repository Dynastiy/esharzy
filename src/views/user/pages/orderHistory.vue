<template>
  <div>
    <div>
      <div class="">
        <div>
          <h5 class="font-weight-bold">Order History</h5>
          <hr />
        </div>
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="All Orders" name="first"
              >
             <AllOrders class="mt-3"/>
              </el-tab-pane
            >
            <el-tab-pane label="Delivered Orders" name="second">
                
            </el-tab-pane>
            <el-tab-pane label="Pending Orders" name="third">
                
            </el-tab-pane>
            <el-tab-pane label="Cancelled Orders" name="four">
                
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import AllOrders from '../components/orders/allOrders.vue';
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
    components: { AllOrders }
};
</script>
