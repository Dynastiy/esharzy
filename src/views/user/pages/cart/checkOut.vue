<template>
    <div>
      <div>
        <div class="checkout my-4">
          <div class="">
            <div>
              <div class="d-lg-flex align-items-start" style="gap: 20px">
                <div class="bg-white w-100 p-3">
                    <h6 class="font-weight-bold">ADDRESS DETAILS</h6>
                </div>
                <div class="check--out_box p-3 w-50">
                  <h6 class="font-weight-bold">ORDER SUMMARY ({{ cart.length + " Item" }}<span>{{cart.length > 1 ? "s" : ""}}</span>) </h6>
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
                            NGN {{ item.product.discount ? formatAmount(
                                item.quantity * item.product.discount.price
                              ) : formatAmount(item.quantity * item.product.price) }}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <small class="font-weight-bold">Subtotal ({{ cart.length + " Item" }}<span>{{cart.length > 1 ? "s" : ""}}</span>) </small>
                    <h4 class="font-weight-bold">
                      &#8358;{{
                        formatAmount(total) || formatAmount(totalAmount)
                      }}
                    </h4>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <small class="font-weight-bold">Shipping</small>
                    <h4 class="font-weight-bold">
                      &#8358;{{
                        formatAmount(total) || formatAmount(totalAmount)
                      }}
                    </h4>
                  </div>
                  <hr>
                  <div>
                      <button class="w-100" >Checkout (&#8358;{{
                        formatAmount(total) || formatAmount(totalAmount)
                      }})</button>
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
  import { formatAmount } from "@/plugins/filter";
  import url from "@/config/api";
  export default {
    components: {},
    data() {
      return {
        url,
        formatAmount,
        item: {
          quantity: "",
        },
        total: "",
      };
    },
    methods: {
      
    },
    mounted() {},
    async created() {},
    computed: {
      cart() {
        return this.$store.getters["auth/getUser"].cart;
      },
      totalAmount() {
        let cartItem = this.$store.getters["auth/getUser"].cart;
        let totalPrice = cartItem.reduce((accumulator, item) => {
          if (item.product.discount) {
            return accumulator + item.quantity * item.product.discount.price;
          } else {
            return accumulator + item.quantity * item.product.price;
          }
        }, 0);
        // console.log(totalPrice);
        return totalPrice;
      },
    },
  };
  </script>