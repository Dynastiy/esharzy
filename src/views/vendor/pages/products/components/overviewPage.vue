<template>
  <div>
    <div class="mt-2">
      <div class="">
        <h4 class="mb-3 text-dark font-weight-bold">Product Overview</h4>
        <div class="add-item-content">
          <form action="" @submit.prevent="updateProduct">
            <div class="d-lg-flex mb-2" style="gap: 20px;">
              <div class="w-100">
                <label for="">Product Name</label>
                <input type="text" v-model="payload.name" />
                <small
                  class="text-danger"
                  v-show="errMessages.name"
                  v-for="err in errMessages.name"
                  :key="err"
                >
                  *{{ err }}
                </small>
              </div>
              <div class="w-100">
                <label for="">Price</label>
                <input type="number" v-model="payload.price" />
                <small
                  class="text-danger"
                  v-show="errMessages.price"
                  v-for="err in errMessages.price"
                  :key="err"
                >
                  *{{ err }}
                </small>
              </div>
            </div>
            <div class="d-lg-flex mb-3" style="gap: 20px;">
              <div class="w-100">
                <label for="">Choose Category</label>
                <br />
                <el-select
                  v-model="payload.category_ids"
                  multiple
                  placeholder="Select"
                >
                  <el-option
                    v-for="item in allCategories"
                    :key="item.id"
                    :label="item.category_name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <div>
                  <ul class="m-0">
                    <li v-for="item in product.categories" :key="item.id"> {{ item.category_name }}</li>
                  </ul>
                </div>
              </div>
              <div class="w-100">
                <label for="">Choose Tags</label>
                <br />
                <el-select
                  v-model="payload.tag_ids"
                  multiple
                  placeholder="Select"
                >
                  <el-option
                    v-for="item in allTags"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <div>
                  <ul>
                    <li v-for="item in product.tags" :key="item.id"> {{ item.name }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="d-lg-flex mb-3" style="gap: 20px;">
              <div class="w-100 mb-3">
                <label for="">Select Shipping Class</label><br />
                <el-select
                  v-model="payload.shipping_class_id"
                  placeholder="Select"
                >
                  <el-option
                    v-for="item in shippingClasses"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="w-100 mb-3">
                <label for="">Select Sub Category</label><br />
                <el-select
                  v-model="payload.subcategory_ids"
                  multiple
                  placeholder="Select"
                >
                  <el-option
                    v-for="item in subCategories"
                    :key="item.id"
                    :label="item.sub_category_name"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>

            <div>
              <div class="text-right">
                <i v-if="loading" class="el-icon-loading"></i>
                <button class="btn-dark btn" v-else>Update Product</button>
              </div>
            </div>
          </form>
        </div>

        <hr />

        <div class="add-item-content">
          <h5 class="mb-3">Discount</h5>
          <div v-if="discount !== null">
            <small class="text-secondary">Current Discount</small>
            <div class="d-flex align-items-start" style="gap: 8px;">
              <h4>
                {{
                  Number(discount.price).toLocaleString() +
                  '(' +
                  discount.percentage +
                  '%)'
                }}
              </h4>
              <span @click="removeDiscount" role="button">
                <i v-if="loading" class="el-icon-loading"></i>
                <i v-else class="el-icon-delete text-danger"></i>
              </span>
            </div>
          </div>
          <div v-else>
            <div class="w-100">
              <label for="">Add Discount Price</label>
              <input type="number" v-model="dataObj.price" :disabled="limit" />
              <small
                class="text-danger"
                v-show="errMessages.price"
                v-for="err in errMessages.price"
                :key="err"
              >
                *{{ err }}
              </small>
              <small class="text-danger" v-if="limit">
                *{{
                  limit ? 'Discount cannot be above the original price' : ''
                }}
              </small>
              <small v-if="limit" role="button" @click="dataObj.price = ''">
                Clear
              </small>
            </div>
            <div class="text-right mt-3">
              <i v-if="loading" class="el-icon-loading"></i>
              <button v-else class="btn-dark btn" @click="addDiscount">
                Add Discount Price
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      payload: {
        name: '',
        price: '',
        category_ids: [],
        tag_ids: [],
        subcategory_ids: [],
        shipping_class_id: ''
      },
      dataObj: {
        price: ''
      }
    }
  },
  methods: {
    addDiscount () {
      const payload = {
        slug: this.product.slug,
        id: this.product.id,
        price: this.dataObj.price,
        product_id: this.product.id
      }
      console.log(payload)
      this.$store.dispatch('vendor/addDiscount', payload)
    },

    removeDiscount () {
      const payload = {
        id: this.product.discount.id,
        slug: this.product.slug
      }
      this.$store.dispatch('vendor/removeDiscount', payload)
    },

    async updateProduct () {
      const formData = new FormData()
      formData.append('name', this.payload.name)
      formData.append('price', this.payload.price)
      // formData.append('category_ids', this.payload.category_ids);
      this.payload.category_ids.forEach(function (value) {
        formData.append('category_ids[]', value)
      })

      // formData.append('subcategory_ids[]', this.payload.subcategory_ids);
      this.payload.subcategory_ids.forEach(function (value) {
        formData.append('subcategory_ids[]', value)
      })

      formData.append('shipping_class_id', this.payload.shipping_class_id)

      // formData.append('tag_ids[]', this.payload.tag_ids);
      this.payload.tag_ids.forEach(function (value) {
        formData.append('tag_ids[]', value)
      })
      const payload = {
        id: this.product.id,
        slug: this.product.slug,
        formData
      }
      this.$store.dispatch('vendor/editProduct', payload)
    }
  },
  mounted () {
    // this.payload = this.product
  },
  beforeMount () {
    this.payload = this.product
  },
  computed: {
    allCategories () {
      return this.$store.getters['showcase/getCategories'].categories
    },
    allTags () {
      return this.$store.getters['showcase/getTags'].tags
    },
    subCategories () {
      return this.$store.getters['showcase/getSubCategories']
    },
    shippingClasses () {
      return this.$store.getters['vendor/shippingClasses']
    },
    errMessages () {
      return this.$store.getters['vendor/isErrors']
    },
    product () {
      return this.$store.getters['vendor/getSingleProduct']
    },
    loading () {
      return this.$store.getters['vendor/isLoading']
    },
    discount () {
      return this.product.discount
    },
    limit () {
      return this.product.price < this.dataObj.price
    }
  }
}
</script>
