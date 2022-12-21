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
        <div class="analytics d-lg-flex" style="gap: 20px">
          <div
            class="earnings--card p-3 w-100 mt-4"
            style="background-color: var(--tertiary-color)"
          >
            <div class="mb-1">
              <!-- {{ user }} -->
              <h6 class="text-white mb-3 small" style="font-weight:300">Available for payout</h6>
            </div>
            <h1 class="text-white" style="font-weight:700"> &#8358; {{ user.account === null ? 0 : user.account.balance }} </h1>
            <div>
                <p class="text-white w-75 mt-1" style="font-size:11px">This is the amount you currently have in earnings, available for your next payout.</p>
            </div>
          </div>

          <!-- Analtics  -->
          <div class="analytics--card bg-white p-3 w-100 mt-4">
            <h5 class="font-weight-bold text-dark">Payout Account</h5>
            <div class="mt-3" v-if="user.bank_details !== null">
              <div>
                <div class="row">
                  <span class="col-5 font-weight-bold small">Bank Name:</span>
                  <span class="col-7 small">{{ user.bank_details.bank_name }}</span>
                </div>
                <hr class="my-2">
                <div class="row">
                  <span class="col-5 font-weight-bold small">Account Name:</span>
                  <span class="col-7 small">{{ user.bank_details.account_name }}</span>
                </div>
                <hr class="my-2">
                <div class="row">
                  <span class="col-5 font-weight-bold small">Account Number:</span>
                  <span class="col-7 small">{{ user.bank_details.account_no }}</span>
                </div>
              </div>
              <div class="mt-3">
                <button @click="deleteAccount">Delete Payout Account</button>
              </div>
            </div>
            <div class="mt-3" v-else>
              <p style="font-size:12px">Set Payout Account</p>
              <div class="mt-3">
                <button @click="add_account = !add_account">Configure</button>
              </div>

              <div>

              </div>
            </div>
          </div>
        </div>

          <!-- Recent Orders -->
          <section class="mt-4">
            <div class="mt-4 other--tables bg-white rounded-lg p-3">
                <h5 class="text-dark font-weight-bold mb-3">Recent Payouts</h5>
                <div class="mb-4 text-right">
                  <button @click="enterAmount" v-show="!request_payout">Request Payout</button>
                </div>
               <div v-show="request_payout">
                <div class="my-4 d-flex payout--amount" style="gap:10px">
                  <input type="number" v-model="amount" placeholder="Enter amount">
                  <button @click="requestPayout">Submit</button>
                </div>
               </div>
              <div class="table-responsive">
                <table class="table table-centered table-nowrap mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Amount</th>
                      <th scope="col">Date Applied</th>
                      <th scope="col">Date Processed</th>
                      <th scope="col">Charge</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <div class="py-2 w-100" v-if="payouts.length === 0">
                      <el-alert
                      class="w-100"
                        title="No Payouts yet"
                        type="error"
                        :closable="false">
                      </el-alert>
                    </div>
                    <tr v-for="item in payouts" :key="item.id">
                      <td> &#8358;{{ item.amount }} </td>
                      <td> {{ timeStamp(item.created_at) }} </td>
                      <td> {{ timeStamp(item.updated_at) }} </td>
                       <td> &#8358;{{ item.charge }} </td>
                      <td> <span :class="item.status"> {{ item.status }} </span> </td>
                    </tr>

                  </tbody>
                </table>
              </div>
            </div>
          </section>
      </div>
    </div>

    <!-- Add Payout Account -->
    <AddPayoutAccount @close="add_account = !add_account" v-show="add_account"/>

    <!-- Delete Confirmation -->
    <ConfirmDelete v-show="delete_confirm" @done="deletePayoutAccount" @close="close"/>
  </div>
</template>

<script>
import AddPayoutAccount from './modals/addPayoutAccount.vue'
import ConfirmDelete from '../../modals/confirmDelete.vue'
import { timeStamp } from '@/plugins/filter'
export default {
  data () {
    return {
      timeStamp,
      add_account: false,
      delete_confirm: false,
      request_payout: false,
      amount: ''
    }
  },
  methods: {
    deleteAccount () {
      this.delete_confirm = !this.delete_confirm
    },
    close () {
      this.delete_confirm = !this.delete_confirm
    },
    enterAmount () {
      this.request_payout = !this.request_payout
    },
    requestPayout () {
      this.$store.dispatch('vendor/requestPayout', this.amount)
      this.request_payout = !this.request_payout
    },
    deletePayoutAccount () {
      this.$store.dispatch('auth/deleteBankDetails', this.user.bank_details.id)
      this.close()
    }
  },
  beforeMount () {
    this.$store.dispatch('vendor/getPayouts')
  },
  components: { AddPayoutAccount, ConfirmDelete },
  computed: {
    user () {
      return this.$store.getters['auth/getUser']
    },
    payouts () {
      return this.$store.getters['vendor/getPayouts']
    }
  }
}
</script>
