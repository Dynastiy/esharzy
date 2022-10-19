<template>
  <div>
    <div>
      <div>
        <div>
          <h4 class="text-dark font-weight-bold">Orders</h4>
          <p class="small">
            Here, you can view and manage all orders made to your store
          </p>
        </div>
          <!-- Recent Orders -->
          <section class="mt-4">
            <div class="mt-4 other--tables bg-white rounded-lg p-3">
              <div class="table-responsive">
                <table class="table table-centered table-nowrap mb-0">
                  <thead>
                    <tr>
                      <!-- <th scope="col">Order No.</th> -->
                      <th scope="col">Customer</th>
                      <th scope="col">Delivery Address</th>
                      <th scope="col">Date</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <div class="mt-3" v-if="orders.length == 0">
                      <el-alert
                        title="No items here"
                        type="error"
                        :closable="false">
                      </el-alert>
                    </div>
                    <tr v-for="item in orders" :key="item.id"> 
                      <td>{{ item.buyer.first_name + " " + item.buyer.last_name }}</td>
                      <td> {{ item.delivery_address }} </td>
                      <td> {{ timeStamp(item.created_at) }} </td>
                       <td> &#8358;{{ item.amount === null ? "0" : item.total_amount.toLocaleString() }} </td>
                      <td> <span :class="item.status"> {{ item.status }} </span> </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>
      </div>
    </div>
  </div>
</template>

<script>
  import { timeStamp } from '@/plugins/filter'
export default {
  data(){
    return {
      timeStamp
    }
  },
  beforeMount(){
    this.$store.dispatch("vendor/getOrders")
  },
  computed:{
    orders(){
      return this.$store.getters["vendor/getOrders"]
    }
  }
}
</script>