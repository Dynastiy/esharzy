<template>
  <div>
    <div>
      <div class="checkout my-4">
        <div class="container-fluid">
          <div>
            <div
              class="shadow-lg bg-white p-3 text-center"
              v-if="cart.length == 0"
            >
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
              <div class="checkout--item shadow-lg bg-white py-3 px-4 w-100">
                <div class="mb-4" v-for="item in cart" :key="item.id">
                  <div class="d-flex align-items-center" style="gap: 15px">
                    <div class="product__image">
                      <img :src="url.imgUrl + item.product.app_icon" alt="" />
                    </div>
                    <!-- {{ cart }} -->
                    <div>
                      <h6 class="font-weight-bold text-capitalize">
                        {{ item.product.name }}
                      </h6>
                      <h6 class="small">
                        <span class="text-muted">Seller:</span>
                        <span> {{ item.product.shop.name }} </span>
                      </h6>
                    </div>
                    <div class="ml-auto">
                      <div v-if="item.product.discount">
                        <h5>
                          NGN{{
                            formatAmount(
                              item.quantity * item.product.discount.price
                            )
                          }}
                        </h5>
                        <div class="d-flex align-items-center" style="gap: 5px">
                          <h5
                            style="
                              text-decoration-line: line-through !important;
                            "
                          >
                            NGN{{
                              formatAmount(item.quantity * item.product.price)
                            }}
                          </h5>
                          <span
                            class="
                              text-white
                              d-flex
                              align-items-center
                              justify-content-center
                              rounded-75
                              font-weight-bold
                              small
                              p-1
                            "
                            style="
                              border-radius: 3px;
                              background-color: var(--tertiary-color);
                            "
                          >
                            -{{ item.product.discount.percentage }}%
                          </span>
                        </div>
                      </div>
                      <h5 v-else>
                        NGN{{
                          formatAmount(item.quantity * item.product.price)
                        }}
                      </h5>

                      <div class="my-3">
                        <el-input-number
                          v-model="item.quantity"
                          :min="1"
                          :max="10"
                          @change="handleChange(item)"
                        ></el-input-number>
                      </div>
                    </div>
                  </div>
                  <div class="">
                    <button
                      class="
                        small
                        d-flex
                        align-items-center
                        remove--btn
                        ml-auto
                      "
                      style="gap: 10px"
                      @click="removeItemFromCart(item)"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="icon icon-tabler icon-tabler-trash"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <line x1="4" y1="7" x2="20" y2="7"></line>
                        <line x1="10" y1="11" x2="10" y2="17"></line>
                        <line x1="14" y1="11" x2="14" y2="17"></line>
                        <path
                          d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"
                        ></path>
                        <path
                          d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"
                        ></path>
                      </svg>
                      <span>Remove Item</span>
                    </button>
                  </div>
                  <hr />
                </div>
              </div>
              <div class="check--out_box shadow-lg bg-white p-3 w-25">
                <h6 class="font-weight-bold">CART SUMMARY</h6>
                <hr />
                <div class="d-flex align-items-center justify-content-between">
                  <small class="font-weight-bold">Subtotal</small>
                  <h4 class="font-weight-bold">
                    &#8358;{{
                      formatAmount(total) || formatAmount(totalAmount)
                    }}
                  </h4>
                </div>
                <small class="text-secondary">Shipping fees not included</small>
                <hr>
                <div>
                    <button>Checkout(&#8358;{{
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
    removeItemFromCart(item) {
      let payload = item.id;
      this.$store.dispatch("auth/deleteItemFromCart", payload);
    },
    handleChange(value) {
      console.log(value);
      let formData = new FormData();
      formData.append("quantity", value.quantity)
      let payload = {
        id: value.id,
        payload: formData,
      };
      console.log(payload);
      this.$store.dispatch("auth/updateCart", payload);
    },
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