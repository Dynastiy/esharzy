<template>
  <div>
    <div>
      <div class="">
        <div>
          <h5 class="font-weight-bold">Account Information & Password</h5>
          <hr />
        </div>
        <div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Account Information" name="first"
              >
              <UserDetails class="mt-3"/>
              </el-tab-pane
            >
            <el-tab-pane label="Password" name="second">
                <UpdatePassword class="mt-3"/>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import UserDetails from '../components/userDetails.vue';
import UpdatePassword from '../components/updatePassword.vue';
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
    components: { UserDetails, UpdatePassword }
};
</script>
