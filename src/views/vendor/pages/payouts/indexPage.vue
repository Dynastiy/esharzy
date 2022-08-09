<template>
  <div>
    <div>
      <div>
        <div>
          <h4 class="text-dark font-weight-bold">Payouts</h4>
          <p class="small">
            View and keep track of your payouts
          </p>
        </div>
        <div class="analytics mt-4 d-flex" style="gap: 20px">
          <div
            class="earnings--card p-3 w-100"
            style="background-color: var(--tertiary-color)"
          >
            <div class="mb-1">
              <h6 class="text-white mb-3">Available for payout</h6>
            </div>
            <h2 class="text-white">NGN 300, 000</h2>
            <div>
                <p class="text-white w-75 small mt-1">This is the amount you currently have in earnings, available for your next payout.</p>
            </div>
          </div>

          <!-- Analtics  -->
          <div class="analytics--card bg-white p-3 w-100">
            <h5 class="font-weight-bold text-dark">Payout Account</h5>
            <div class="mt-3">
              <h6>Set Payout Account</h6>
              <div class="mt-3">
                <button>Configure</button>
              </div>
            </div>
          </div>
        </div>


          <!-- Recent Orders -->
          <section class="mt-4">
            <div class="mt-4 other--tables bg-white rounded-lg p-3">
                <h5 class="text-dark font-weight-bold mb-3">Recent Payouts</h5>
              <div class="table-responsive">
                <table class="table table-centered table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Amount</th>
                      <th scope="col">Date Applied</th>
                      <th scope="col">Date Processed</th>
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