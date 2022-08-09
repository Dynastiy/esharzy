<template>
  <div>
    <div>
      <div>
        <div>
          <h4 class="text-dark font-weight-bold">Dashboard</h4>
          <p class="small">
            Welcome to your Vendor dashboard. <span class="text-capitalize" style="color:var(--tertiary-color); font-size: 15px;"> {{ getUser.first_name }} </span> ! Here's everything at a
            glance
          </p>
        </div>
        <div class="analytics mt-4 d-flex" style="gap: 20px">
          <div
            class="earnings--card p-3 w-100"
            style="background-color: var(--tertiary-color)"
          >
            <div class="d-flex align-items-center justify-content-between mb-1">
              <h6 class="text-white">Balance Available</h6>
              <small class="text-white">View Earnings</small>
            </div>
            <h2 class="text-white">NGN 300, 000</h2>
          </div>

          <!-- Analtics  -->
          <div class="analytics--card bg-white p-3 w-100">
            <h5>Order Statistics</h5>
            <div>
              <div class="d-flex justify-content-between">
                <div>
                  <small>Orders</small>
                  <h5>45</h5>
                </div>

                <div>
                  <small>Customers</small>
                  <h5>45</h5>
                </div>

                <div>
                  <small>Sold</small>
                  <h5>45</h5>
                </div>
              </div>
            </div>
          </div>
        </div>


          <!-- Recent Orders -->
          <section class="mt-4">
            <div class="mt-4 other--tables bg-white rounded-lg p-3">
                <h5 class="text-dark font-weight-bold mb-3">Recent Orders</h5>
              <div class="table-responsive">
                <table class="table table-centered table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Order No.</th>
                      <th scope="col">Customer</th>
                      <th scope="col">Date</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>John Doe</td>
                      <td>john@mail.com</td>
                      <td>080199229</td>
                       <td>john@mail.com</td>
                      <td>080199229</td>
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
export default {
    data(){
        return {

        }
    },
    computed:{
        getUser(){
            return this.$store.getters['auth/getUser']
        }
    }
}
</script>