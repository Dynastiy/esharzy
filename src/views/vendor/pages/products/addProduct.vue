<template>
  <div>
    <div>
      <span role="button"
      class="d-flex mb-2 align-items-center small"
      style="gap: 10px; font-size: 12px;"
      @click="$router.push('/vendor/all-products')"
    >
      <i class="el-icon-d-arrow-left"></i>
      <span>All Products</span>
    </span>
    </div>
    <div class="bg-white create-product p-4 rounded-lg">
      <div class="">
        <h4 class="mb-4 text-dark">Add New Product</h4>
        <hr />
        <div class="add-item-content">
          <form action="" @submit.prevent="addProduct">
            <div class="d-lg-flex mb-2" style="gap: 20px">
              <div class="w-100">
                <label for="">Product Name</label>
                <input type="text" v-model="payload.name" required/>
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
                <input type="number" v-model="payload.price" required/>
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
            <div class="d-lg-flex" style="gap: 20px">
              <div class="w-100 mb-3">
                <label for="">Select Category</label><br />
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

              <div class="w-100 mb-3">
                <label for="">Select Tags</label><br />
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
            </div>
            <div class="mb-2">
              <label for="">Product Description</label>
              <vue-editor
                v-model="payload.description"
                :editor-toolbar="customToolbar"
              ></vue-editor>
            </div>
            <small
              class="text-danger"
              v-show="errMessages.description"
              v-for="err in errMessages.description"
              :key="err"
            >
              *{{ err }}
            </small>
            <div class="my-1">
              <label for="mb-2">Upload Preview Photos</label>
              <div class="row mt-1">
                <input
                  class="col-md-4 mb-2"
                  type="file"
                  accept="image/*"
                  @change="photoOneUpload($event)"
                />
                <small
                  class="text-danger"
                  v-show="errMessages.photo_one"
                  v-for="err in errMessages.photo_one"
                  :key="err"
                >
                  *{{ err }}
                </small>
                <input
                  class="col-md-4 mb-2"
                  type="file"
                  accept="image/*"
                  @change="photoTwoUpload($event)"
                />
                <small
                  class="text-danger"
                  v-show="errMessages.photo_two"
                  v-for="err in errMessages.photo_two"
                  :key="err"
                >
                  *{{ err }}
                </small>
                <input
                  class="col-md-4 mb-2"
                  type="file"
                  accept="image/*"
                  @change="photoThreeUpload($event)"
                />
                <small
                  class="text-danger"
                  v-show="errMessages.photo_three"
                  v-for="err in errMessages.photo_three"
                  :key="err"
                >
                  *{{ err }}
                </small>
                <input
                  class="col-md-4"
                  type="file"
                  accept="image/*"
                  @change="photoFourUpload($event)"
                />
                <small
                  class="text-danger"
                  v-show="errMessages.photo_four"
                  v-for="err in errMessages.photo_four"
                  :key="err"
                >
                  *{{ err }}
                </small>
                <input
                  class="col-md-4"
                  type="file"
                  accept="image/*"
                  @change="photoFiveUpload($event)"
                />
                <small
                  class="text-danger"
                  v-show="errMessages.photo_five"
                  v-for="err in errMessages.photo_five"
                  :key="err"
                >
                  *{{ err }}
                </small>
              </div>
            </div>
            <div class="mb-2">
              <div class="center">
                <div class="form-input">
                  <label class="" for="file-ip-1">Add Thumbnail Photo</label>
                  <input
                    type="file"
                    id="file-ip-1"
                    accept="image/*"
                    @change="appIcon($event)"
                  />
                  <small
                    class="text-danger"
                    v-show="errMessages.app_icon"
                    v-for="err in errMessages.app_icon"
                    :key="err"
                  >
                    *{{ err }}
                  </small>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <label class="" for="file-ip-1"
                >Add Preview Video
                <span class="text-danger"
                  >*Not more than 60seconds preview video</span
                >
              </label>
              <input type="file" id="file-ip-1" @change="addVideo()" />
              <small
                class="text-danger"
                v-show="errMessages.video"
                v-for="err in errMessages.video"
                :key="err"
              >
                *{{ err }}
              </small>
            </div>
            <div>
              <div class="text-right mt-3" v-if="loading">
                <i class="el-icon-loading" style="font-size: 30px"></i>
              </div>
              <div class="text-right" v-else>
                <button class="btn-dark btn">Create Product</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  components: {
    VueEditor
  },
  data () {
    return {
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [
          { align: '' },
          { align: 'center' },
          { align: 'right' },
          { align: 'justify' }
        ],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ script: 'sub' }, { script: 'super' }]
      ],
      payload: {
        name: '',
        price: '',
        app_icon: null,
        photo_one: null,
        photo_two: null,
        photo_three: null,
        photo_four: null,
        photo_five: null,
        description: '',
        category_ids: [],
        subcategory_ids: [],
        shipping_class_id: '',
        tag_ids: [],
        video: null
      },
      dataObj: {
        name: '',
        description: ''
      }
    }
  },
  methods: {
    photoOneUpload () {
      const input = event.target
      this.payload.photo_one = input.files[0]
      console.log(this.payload.photo_one)
    },
    photoTwoUpload () {
      const input = event.target
      this.payload.photo_two = input.files[0]
      console.log(this.payload.photo_two)
    },
    photoThreeUpload () {
      const input = event.target
      this.payload.photo_three = input.files[0]
      console.log(this.payload.photo_three)
    },
    photoFourUpload () {
      const input = event.target
      this.payload.photo_four = input.files[0]
      console.log(this.payload.photo_four)
    },
    photoFiveUpload () {
      const input = event.target
      this.payload.photo_five = input.files[0]
      console.log(this.payload.photo_five)
    },
    addVideo () {
      const input = event.target
      this.payload.video = input.files[0]
      console.log(this.payload.video)
    },
    appIcon () {
      const input = event.target
      this.payload.app_icon = input.files[0]
      console.log(this.payload.app_icon)
    },
    async addProduct () {
      const formData = new FormData()
      formData.append('name', this.payload.name)
      formData.append('app_icon', this.payload.app_icon)
      formData.append('photo_one', this.payload.photo_one)
      formData.append('photo_two', this.payload.photo_two)
      formData.append('photo_three', this.payload.photo_three)
      formData.append('photo_four', this.payload.photo_four)
      formData.append('photo_five', this.payload.photo_five)
      formData.append('description', this.payload.description)
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

      formData.append('video', this.payload.video)
      formData.append('shop_id', this.$store.getters['auth/getUser'].shop.id)
      formData.append('user_id', this.$store.getters['auth/getUser'].id)
      this.$store.dispatch('vendor/createProduct', formData)
    },
    goBack () {
      this.$router.go(-1)
    }
  },
  beforeMount () {
    this.$store.dispatch('showcase/getCategories')
    this.$store.dispatch('showcase/getSubCategories')
    this.$store.dispatch('showcase/getTags')
    this.$store.dispatch('vendor/getShippingClasses')
  },
  computed: {
    allCategories () {
      return this.$store.getters['showcase/getCategories'].categories
    },
    subCategories () {
      return this.$store.getters['showcase/getSubCategories']
    },
    shippingClasses () {
      return this.$store.getters['vendor/shippingClasses']
    },
    allTags () {
      return this.$store.getters['showcase/getTags'].tags
    },
    errMessages () {
      return this.$store.getters['vendor/isErrors']
    },
    loading () {
      return this.$store.getters['vendor/isLoading']
    }
  }
}
</script>
