<template>
    <div>
      <div>
        <div class="checkout mt-4 mb-5">
          <div class="">
            <div>
              <div class="d-lg-flex align-items-start" style="gap: 20px">
                <div class="w-100">
                    <h4 class="font-weight-bold mb-3">BILLING DETAILS</h4>
                    <!-- <div>
                      {{ getUser }}

                    </div>
                    <hr> -->
                    <!-- <div>
                      {{ shipping }}
                    </div> -->

                    <!-- <hr>
                    <div>
                      {{ nonExistent }}
                    </div> -->

                    <!-- Address  -->
                   <div>
                      <div v-if="getUser.address !== null">
                        <div class="check--out_box"  style="border: none">
                          <el-descriptions title="Delivery Address">
                            <el-descriptions-item label="City">{{ getUser.address.city }}</el-descriptions-item>
                            <el-descriptions-item label="State"> {{ getUser.address.state }} </el-descriptions-item>
                            <el-descriptions-item label="Country"> {{ getUser.address.country }} </el-descriptions-item>
                            <el-descriptions-item label="Address"> {{ getUser.address.delivery_address }} </el-descriptions-item>
                          </el-descriptions>
                        </div>
                        <div class="my-3 d-flex justify-content-end" style="gap:30px">
                            <button @click="addAddressCard" style="font-size:15px; background:transparent; border: 1px solid var(--tertiary-color); color: var(--tertiary-color);">Add New Address</button>
                            <button @click="removeAddress"> Remove Address </button>
                        </div>
                      </div >
                      <div v-show="add || getUser.address === null">
                        <div class="check--out_box" style="border: none">
                          <h4>Enter Address</h4>
                          <form action="" @submit.prevent="addAddress">
                            <div class="d-lg-flex align-items-center" style="gap:30px">
                              <country-select class="mt-2 w-100" :countryName="true" v-model="payload.country" :country="payload.country" topCountry="NG" />
                              <region-select class="mt-2 w-100" v-model="payload.state" :country="payload.country" :region="payload.state" :countryName="true" :regionName="true" />
                              <div class="mt-2 w-100">
                              <!-- <label for="">Enter City</label> -->
                              <input type="text" placeholder="Enter City" v-model="payload.city" required>
                            </div>
                            </div>
                            <div class="mt-2">
                              <label for="">Delivery Address</label>
                              <input type="text" v-model="payload.delivery_address" required>
                            </div>
                            <div class="mt-3 d-flex justify-content-end" style="gap:30px">
                                <button> Add Address </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>

                    <!-- User Details  -->
                    <div v-if="getUser.address !== null">
                        <div class="check--out_box mt-4" style="border: none !important">
                          <h4>Bill Details</h4>
                            <div class="d-lg-flex" style="gap:30px">
                              <div class="mt-2 w-100">
                              <label for="">Full Name</label>
                              <input type="text" v-model="dataObj.name" required>
                            </div>
                            <div class="mt-2 w-100">
                              <label for="">Phone Number</label>
                              <input type="phone" v-model="dataObj.phone" required>
                            </div>
                            </div>
                            <div class="mt-2">
                              <label for="">Email Adddress</label>
                              <input type="email" v-model="dataObj.email" required>
                            </div>
                        </div>
                      </div>
                </div>

                <div class="check--out_box p-4 w-50">
                  <h4 class="font-weight-bold">ORDER SUMMARY ({{ cart.length + " Item" }}<span>{{cart.length > 1 ? "s" : ""}}</span>) </h4>
                  <hr />
                  <div class="checkout--item w-100">
                  <div class="mb-4" v-for="item in cart" :key="item.id">
                    <div class="d-flex align-items-center" style="gap: 15px">
                      <div class="product__image">
                        <img :src="url.imgUrl + item.product.app_icon" width="30px" alt="" />
                      </div>
                      <!-- {{ cart }} -->
                      <div>
                        <h6 class="text-capitalize" style="font-weight:500">
                          {{ item.product.name }}
                        </h6>
                        <h6 class="small">
                          <span class="text-muted">Qty:</span>
                          <span> {{ item.quantity }} </span>
                        </h6>
                      </div>
                      <div class="ml-auto">
                        <div>
                          <h6 style="font-weight:400">
                            &#8358; {{ item.product.discount ? formatAmount(
                                item.quantity * item.product.discount.price
                              ) : formatAmount(item.quantity * item.product.price) }}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
                  <div class="d-flex align-items-center justify-content-between mb-2">
                    <h6 class="font-weight-bold">Subtotal ({{ cart.length + " Item" }}<span>{{cart.length > 1 ? "s" : ""}}</span>) </h6>
                    <h4 class="font-weight-bold">
                      &#8358;{{
                        formatAmount(total) || formatAmount(totalAmount)
                      }}
                    </h4>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <h6 class="font-weight-bold">Shipping</h6>
                    <div>

                    </div>
                    <small class="text-danger" v-if="shipping_amount.length === 0">*Shipping fees not included, Add address or region not available </small>
                    <h4 class="font-weight-bold" v-else>
                      &#8358;{{
                        formatAmount(shipping)
                      }}
                    </h4>
                    <!-- <small class="text-danger" v-if="nonExistent === null">*Product cannot be shipped to your region </small> -->
                  </div>
                  <hr>
                  <div class="d-flex align-items-center justify-content-between">
                    <h5 class="font-weight-bold">Total</h5>
                    <h4 class="font-weight-bold">
                      &#8358;{{
                        formatAmount(overallAmount)
                      }}
                    </h4>
                  </div>
                  <hr>
                  <div>
                      <button @click.once="makePayment" class="w-100" style="font-weight:700; font-size: 16px !important;"
                      :class='getUser.address === null || loading ? "bg-secondary" : "" ' :disabled="getUser.address === null || loading">
                      <span v-if="loading"> <i class="el-icon-loading font-weight-bold" style="font-size:20px"></i> </span>
                      <span v-else>PLACE ORDER</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
import { formatAmount } from '@/plugins/filter'
import url from '@/config/api'
export default {
  components: {},
  data () {
    return {
      url,
      formatAmount,
      item: {
        quantity: ''
      },
      total: '',
      add: false,
      payload: {
        city: '',
        state: '',
        country: '',
        delivery_address: ''
      },
      dataObj: {
        phone: '',
        email: '',
        name: ''
      }
      // shipping_amount: ''
    }
  },
  methods: {
    removeAddress () {
      const id = this.getUser.address.id
      console.log(id)
      this.$store.dispatch('auth/removeAddress', id)
    },
    addAddress () {
      this.$store.dispatch('auth/addNewAddress', this.payload)
    },
    addAddressCard () {
      this.add = !this.add
    },
    makePayment () {
      const payload = {
        name: this.dataObj.name,
        email: this.dataObj.email,
        phone: this.dataObj.phone,
        description: 'Purchase from eSharzy',
        title: 'eSharzy Purchase',
        amount: this.overallAmount
      }
      console.log(payload)
      this.$store.dispatch('auth/makePayment', payload)
    }

  },
  mounted () {
    this.dataObj.name = this.getUser.first_name + ' ' + this.getUser.last_name
    this.dataObj.phone = this.getUser.phone_no
    this.dataObj.email = this.getUser.email
  },
  async created () {},
  computed: {
    getUser () {
      return this.$store.getters['auth/getUser']
    },

    cart () {
      const cart = this.$store.getters['auth/getUser'].cart
      const val = cart.filter(elem => elem.product !== null)
      return val
    },

    totalAmount () {
      const cartItem = this.cart
      const totalPrice = cartItem.reduce((accumulator, item) => {
        if (item.product.discount) {
          return accumulator + item.quantity * item.product.discount.price
        } else {
          return accumulator + item.quantity * item.product.price
        }
      }, 0)
      return totalPrice
    },

    shipping_amount () {
      let region
      if (this.getUser.address === null) {
        region = this.payload.state
      } else {
        region = this.getUser.address.state
      }
      const classes = this.cart.filter(elem => elem.product.shipping_class !== null)
      let obj
      const zones = []
      for (obj of classes) {
        zones.push(obj.product.shipping_class.shipping_zones)
      }
      const checkRegion = []
      let item
      for (item of zones) {
        let obj
        for (obj of item) {
          checkRegion.push(obj)
        }
      }
      const myRegions = checkRegion.filter(elem => (elem.name === region))
      // console.log(checkRegion)
      return myRegions
    },

    shipping () {
      const totalPrice = this.shipping_amount.reduce((accumulator, item) => {
        return accumulator + item.price
      }, 0)
      return totalPrice
    },

    overallAmount () {
      const value = Number(this.totalAmount) + Number(this.shipping)
      return value
    },

    loading () {
      return this.$store.getters['auth/isLoading']
    }
  }
}
</script>
