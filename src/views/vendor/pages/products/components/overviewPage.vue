<template>
  <div>
    <div class="mt-2">
      <div class="">
        <h4 class="mb-3 text-dark font-weight-bold">Product Overview</h4>
        <div class="add-item-content">
          <form action="" @submit.prevent="addProduct">
            <div class="d-lg-flex mb-2" style="gap: 20px">
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
            <div class="d-lg-flex mb-3" style="gap: 20px">
              <div class="w-100">
                <label for="">Choose Category</label><br />
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
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="w-100">
                <label for="">Choose Tags</label><br />
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
                  >
                  </el-option>
                </el-select>
              </div>
            </div>

            <div>
              <div class="text-right">
                <button class="btn-dark btn">Update Product</button>
              </div>
            </div>
          </form>
        </div>

        <hr>

        <div class="add-item-content">
            <h5 class="mb-3">Discount</h5>
            <div>
              <div class="w-100">
                <label for="">Add Discount Price</label>
                <input type="number" v-model="dataObj.price" />
                <small
                  class="text-danger"
                  v-show="errMessages.price"
                  v-for="err in errMessages.price"
                  :key="err"
                >
                  *{{ err }}
                </small>
              </div>
              <div class="text-right mt-3">
                <button class="btn-dark btn" @click="addDiscount">Add Discount Price</button>
              </div>
            </div>

            <div>
              <div class="">
                <small class="text-secondary">Current Discount</small>

                <div class="d-flex align-items-start" style="gap:8px">
                  <h4>{{ product.discount.price + "(" + product.discount.percentage + "%)" }}</h4>
                <span @click="removeDiscount" role="button"><i class="el-icon-delete text-danger"></i></span>
              </div>
              </div>

            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      payload: {
        name: '',
        price: '',
        category_ids: [],
        tag_ids: []
      },
      dataObj: {
        price: '',
        percentage: ''
      }
    }
  },
  methods: {
    addDiscount () {
      const payload = {
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
        productId: this.product.id
      }
      this.$store.dispatch('vendor/removeDiscount', payload)
    },

    async addProduct () {
      const formData = new FormData()
      formData.append('name', this.payload.name)
      formData.append('price', this.payload.price)
      formData.append('category_ids', this.payload.category_ids)
      formData.append('tag_ids', this.payload.tag_ids)
      this.loading = true
      this.$store.dispatch('vendor/createProduct', formData)
    }
  },
  mounted () {
    this.payload = this.product
  },
  beforeMount () {
    const slug = this.$route.params.slug
    this.$store.dispatch('showcase/getProductBySlug', slug)
    this.$store.dispatch('showcase/getCategories')
    this.$store.dispatch('showcase/getTags')
  },
  computed: {
    allCategories () {
      return this.$store.getters['showcase/getCategories'].categories
    },
    allTags () {
      return this.$store.getters['showcase/getTags'].tags
    },
    errMessages () {
      return this.$store.getters['vendor/isErrors']
    },
    product () {
      return this.$store.getters['showcase/getSingleProduct']
    }
  }
}
</script>
