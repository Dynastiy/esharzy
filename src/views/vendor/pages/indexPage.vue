<template>
  <div>
    <div>
      <div>
        <div>
          <h4 class="text-dark font-weight-bold">Dashboard</h4>
          <p class="" style="font-size: 12px">
            Welcome to your Vendor dashboard.
            <span
              class="text-capitalize"
              style="color: var(--tertiary-color); font-size: 12px"
            >
              {{ getUser.first_name }}
            </span>
            ! Here's everything at a glance
          </p>
        </div>
        <div class="analytics d-lg-flex" style="gap: 20px">
          <div
            class="earnings--card p-3 w-100 mt-4"
            style="background-color: var(--tertiary-color)"
          >
            <div class="d-flex align-items-center justify-content-between mb-1">
              <h6 class="text-white">Balance Available</h6>
              <!-- <small class="text-white">View Earnings</small> -->
            </div>
            <h1 class="text-white" style="font-weight: 700">
              &#8358; {{ getUser.account.balance }}
            </h1>
          </div>

          <!-- Analtics  -->
          <div class="analytics--card bg-white p-3 w-100 mt-4">
            <h5>Vendor Statistics</h5>
            <div>
              <div class="d-flex justify-content-between">
                <div>
                  <small>Orders</small>
                  <h2> {{ orders.length }} </h2>
                </div>

                <div>
                  <small>Transations</small>
                  <h2> {{ transactions.length }} </h2>
                </div>

                <div>
                  <small>Payouts</small>
                  <h2> {{ payouts.length }} </h2>
                </div>
              </div>
            </div>
          </div>
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
  import { timeStamp } from '@/plugins/filter';
export default {
  data() {
    return {
      timeStamp
    };
  },
  beforeMount() {
    this.$store.dispatch("vendor/getPayouts");
    this.$store.dispatch("vendor/getOrders");
    this.$store.dispatch("vendor/getTransactions");
  },
  computed: {
    getUser() {
      return this.$store.getters["auth/getUser"];
    },
    transactions() {
      return this.$store.getters["vendor/getTransactions"];
    },
    payouts() {
      return this.$store.getters["vendor/getPayouts"];
    },
    orders() {
      return this.$store.getters["vendor/getOrders"];
    },
  },
};
</script>