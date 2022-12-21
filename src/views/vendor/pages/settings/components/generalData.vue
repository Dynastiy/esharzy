<template>
  <div>
    <div>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="Vendor Applications" name="1">
          <div>
            <VendorApplications/>
          </div>
        </el-collapse-item>
        <el-collapse-item title="Manufacturer Applications" name="2">
          <div>
            <ManufacturerApplications/>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import VendorApplications from './vendorApplications.vue'
import ManufacturerApplications from './manufacturerApplications.vue'
export default {
  data () {
    return {
      activeName: ''
    }
  },
  components: { VendorApplications, ManufacturerApplications }
}
</script>
