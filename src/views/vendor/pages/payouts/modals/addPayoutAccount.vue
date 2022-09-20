<template>
  <div>
    <div>
      <div class="modal--mask">
        <div class="modal--container">
          <div class="text-right">
            <i
              class="el-icon-close"
              role="button"
              style="font-size: 18px"
              @click="close"
            ></i>
          </div>
          <div class="modal--content">
            <h5 class="text-dark mb-3 text-center">Add Payout Account</h5>
            <form action="" @submit.prevent="addBankDetails">
              <div class="mb-3">
                <select name="" @change="getAccountDetails" id="mySelect" v-model="bank_name" required>
                  <option value="" selected disabled>Select Bank</option>
                  <option
                    v-for="item in banks"
                    :key="item.id"
                    :value="item.name"
                    :id="item.code"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3">
                <input
                  required
                  type="number"
                  v-model="account_number"
                  @keyup="getAccountDetails"
                  placeholder="Enter Account Number"
                />
              </div>
              <div class="mb-3">
                <div class="text-right" v-if="loader">
                    <span>
                        <i class="el-icon-loading"></i>
                    </span>
                </div>
                <div class="text-right" v-show="err">
                    <span class="text-danger" style="font-size:10px">
                       * Account not found
                    </span>
                </div>
                <input
                required
                  type="text"
                  placeholder="Account Name"
                  v-model="account.account_name"
                  readonly
                />
              </div>
              <div class="text-center">
                <button class="w-100" >Done</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bank_name: "",
      account_number: "",
    };
  },
  methods: {
    getAccountDetails() {
        this.$store.dispatch("removeErrorMessage");
      var priceOptions = document.getElementById("mySelect");
      var bank_code = priceOptions.options[priceOptions.selectedIndex].id;
      var payload = {
        bank_code: bank_code,
        account_number: this.account_number,
      };
      if (Object.keys(this.account).length === 0 || this.account_number.length === 10 ) {
        this.$store.dispatch("getAccountName", payload);
      } else {
        this.$store.dispatch("removeAccountDetails");
      }
    },
    addBankDetails(){
      let payload = {
        bank_name: this.bank_name,
        account_no: this.$store.getters["getAccountDetails"].account_number,
        account_name: this.$store.getters["getAccountDetails"].account_name,
        id: this.user.id
      }
      console.log(payload)
      this.$store.dispatch("auth/addBankDetails", payload);
      this.close()
      // if (!loading) {
      //   this.close
      // }
    },
    close() {
      this.$emit("close");
    },
  },
  beforeMount() {
    this.$store.dispatch("getBanks");
  },
  computed: {
    user() {
      return this.$store.getters["auth/getUser"];
    },
    banks() {
      return this.$store.getters["getAllBanks"];
    },
    account() {
      return this.$store.getters["getAccountDetails"];
    },
    loader(){
        return this.$store.getters['isLoading']
    },
    err(){
        return this.$store.getters["isError"]
    }
  },
};
</script>