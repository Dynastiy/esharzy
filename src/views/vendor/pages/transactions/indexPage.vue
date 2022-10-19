<template>
    <div>
      <div>
        <div>
          <div>
            <h4 class="text-dark font-weight-bold">Transactions</h4>
            <p class="small">
              Here, you can view and manage all your trasactions
            </p>
          </div>
            <!-- Recent Orders -->
            <section class="mt-4">
              <div class="mt-4 other--tables bg-white rounded-lg p-3">
                <div class="table-responsive">
                  <table class="table table-centered table-nowrap mb-0">
                    <thead>
                      <tr>
                        <th scope="col">Ref. No.</th>
                        <th scope="col">Transaction type</th>
                        <th scope="col">Date</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                        <div class="py-2 w-100" v-if="transactions.length === 0">
                            <el-alert
                            class="w-100"
                                title="No Transactions yet"
                                type="error"
                                :closable="false">
                            </el-alert>
                        </div>
                      <tr v-for="item in transactions" :key="item.id">
                        <td>{{ item.ref_no }}</td>
                        <td> {{ item.transaction_type }} </td>
                        <td> {{ timeStamp(item.created_at) }} </td>
                        <td>{{ item.amount === null ? "0" : item.amount }} </td>
                        <td> {{ item.details }} </td>
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
        this.$store.dispatch("vendor/getTransactions")
    },
    computed:{
        transactions(){
            return this.$store.getters['vendor/getTransactions']
        }
    }
  }
  </script>