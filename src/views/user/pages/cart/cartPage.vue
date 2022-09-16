<template>
  <div>
    <div>
      <div class="checkout my-4">
        <div class="">
          <div>
            <div class="bg-white p-5 text-center" v-if="cart.length == 0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-shopping-cart-x"
                width="120"
                height="120"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="var(--tertiary-color)"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="6" cy="19" r="2"></circle>
                <circle cx="17" cy="19" r="2"></circle>
                <path d="M17 17h-11v-14h-2"></path>
                <path d="M6 5l7.999 .571m5.43 4.43l-.429 2.999h-13"></path>
                <path d="M17 3l4 4"></path>
                <path d="M21 3l-4 4"></path>
              </svg>
              <h3 class="font-weight-bold">Your cart is empty</h3>
              <small>You have not added any item to your cart.</small>
            </div>

            <div class="d-lg-flex align-items-start" style="gap: 20px" v-else>
              <div class="checkout--item py-3 px-4 w-100">
                <div class="row">
                  <div class="col-md-5">
                    <h5>Product</h5>
                  </div>
                  <div class="col-md-2">
                    <h5>Price</h5>
                  </div>
                  <div class="col-md-3">
                    <h5>Quantity</h5>
                  </div>
                  <div class="col-md-2">
                    <h5>Sub Total</h5>
                  </div>
                </div>

                <hr class="my-4" />

                <div v-for="item in cart" :key="item.id">
                  <div class="row mb-4 align-items-center py-4">
                    <div class="col-md-5">
                      <div class="d-flex align-items-center" style="gap: 20px">
                        <div class="product__image">
                          <img
                            style="position: relative"
                            :src="
                              item.product
                                ? url.imgUrl + item.product.app_icon
                                : '@/assets/img/logo.png'
                            "
                            alt=""
                          />
                          <i
                            @click="removeItemFromCart(item)"
                            role="button"
                            class="
                              el-icon-close
                              bg-white
                              shadow-sm
                              rounded-circle
                              font-weight-bold
                            "
                            style="
                              font-size: 12px;
                              padding: 5px;
                              position: absolute;
                              left: 80px;
                            "
                          ></i>
                        </div>
                        <div>
                          <h6 class="small mb-3">
                            <span class="text-muted">Seller:</span>
                            <span> {{ item.product.shop.name }} </span>
                          </h6>
                          <h6 class="text-capitalize" style="font-weight: 500">
                            {{ item.product.name }}
                          </h6>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <div v-if="item.product.discount">
                        <h6
                          style="font-weight: 400"
                          v-if="item.product.discount"
                        >
                          NGN{{
                            formatAmount(item.product.discount.price || "0")
                          }}
                        </h6>
                        <div
                          v-else
                          class="d-flex align-items-center"
                          style="gap: 5px"
                        >
                          <h6 style="font-weight: 400">
                            NGN{{ formatAmount(item.product.price) }}
                          </h6>
                        </div>
                      </div>
                      <h5 v-else>NGN{{ formatAmount(item.product.price) }}</h5>
                    </div>
                    <div class="col-md-3">
                      <div class="my-3">
                        <div class="toggle--amount">
                          <input
                            type="number"
                            v-model="item.quantity"
                            @keyup="handleChange(item)"
                            class="w-100"
                            min="1"
                            max="10"
                          />
                          <div class="d-flex" style="gap: 5px">
                            <span @click="handleChange(item)" role="button">
                              <i
                                class="el-icon-plus"
                                style="font-size: 12px"
                              ></i>
                            </span>
                            <span @click="updateTotal(item)" role="button">
                              <div
                                class="el-icon-minus"
                                style="font-size: 12px"
                              ></div>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-2">
                      <h5 style="font-weight: 600">
                        NGN
                        {{
                          item.product.discount
                            ? formatAmount(
                                item.quantity * item.product.discount.price
                              )
                            : formatAmount(item.quantity * item.product.price)
                        }}
                      </h5>
                    </div>
                  </div>
                  <hr />
                </div>
                <div class="text-right">
                  <router-link class="text-white" to="/">
                    <button>Continue Shopping</button>
                  </router-link>
                </div>
              </div>
              <div class="check--out_box p-3 w-50">
                <h5 class="font-weight-bold">CART TOTALS</h5>
                <hr />
                <div class="d-flex align-items-center justify-content-between">
                  <small class="font-weight-bold">Subtotal</small>
                  <h4 class="font-weight-bold">
                    &#8358;{{
                      formatAmount(total) || formatAmount(totalAmount)
                    }}
                  </h4>
                </div>
                <hr />
                <div>
                  <div class="mb-3">
                    <span class="small"
                      >Select a shipping zone to add shipping costs</span
                    >
                  </div>
                  <div>
                    <select v-model="price" name="" id="">
                      <option value="-" disabled selected>
                        Select Shipping Zone
                      </option>
                      <option
                        v-for="item in shippingZones"
                        :key="item.id"
                        :value="item.price"
                      >
                        {{ item.name }}
                      </option>
                    </select>
                  </div>
                </div>
                <hr />
                <div>
                  <div
                    class="
                      d-flex
                      align-items-center
                      justify-content-between
                      mb-2
                    "
                  >
                    <span class="font-weight-bold">Total</span>
                    <h4 class="font-weight-bold">
                      &#8358;{{ formatAmount(cartAmount) }}
                    </h4>
                  </div>
                  <button class="w-100" @click="goToCheckOut">
                    Proceed to Checkout
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
      // cart: [],
      price: "",
      // cartAmount: ""
    };
  },
  methods: {
    goToCheckOut() {
      this.$router.push("/check-out");
    },
    removeItemFromCart(item) {
      let payload = item.id;
      this.$store.dispatch("auth/deleteItemFromCart", payload);
    },
    updateTotal(item) {
    item.quantity--
      let formData = new FormData();
      formData.append("quantity", item.quantity);
      let payload = {
        id: item.id,
        payload: formData,
      };
      console.log(payload);
      this.$store.dispatch("auth/updateCart", payload);
    },
    handleChange(item) {
      item.quantity++
      let formData = new FormData();
      formData.append("quantity", item.quantity);
      let payload = {
        id: item.id,
        payload: formData,
      };
      console.log(payload);
      this.$store.dispatch("auth/updateCart", payload);
    },
    addAmount(){
      // this.cartAmount = +this.totalAmount + +this.price
    }
  },
  // mounted() {
  //   this.cart = this.$store.getters["auth/getUser"].cart;
  // },
  // updated() {
  //   this.cart = this.$store.getters["auth/getUser"].cart;
  // },
  beforeMount() {
    this.$store.dispatch("user/getShippingZones");
  },
  async created() {},
  computed: {
    cart(){
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

    shippingZones() {
      return this.$store.getters["user/allShippingZones"];
    },

    cartAmount(){
      return +this.totalAmount + +this.price 
    }

  },
};
</script>