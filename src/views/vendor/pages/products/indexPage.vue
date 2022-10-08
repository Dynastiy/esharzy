<template>
  <div>
    <div>
      <div>
        <div class="d-flex justify-content-between flex-wrap" style="gap: 20px">
          <div>
            <h4 class="text-dark font-weight-bold">All Products</h4>
            <p class="small">
              All products you have uploaded. You can delete or edit them
            </p>
          </div>
          <div>
            <router-link to="/add-product" class="text-white">
            <button>
                Add product
            </button>
            </router-link>
          </div>
        </div>
        <!-- List Products-->
        <section class="mt-4">
          <div class="mt-4 other--tables bg-white rounded-lg p-3">
            <div class="table-responsive">
              <table class="table table-centered table-nowrap mb-0">
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date Created</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <div class="my-2" v-if="getProducts.length === 0 ">
                    <span class="text-danger small">You dont have any products yet</span>
                  </div>
                  <tr
                    v-for="data in getProducts"
                    :key="data.id">
                    <td>{{ data.name }}</td>
                    <td>&#8358; {{ data.price.toLocaleString() }}</td>
                    <td>
                      <span :class="data.status"> {{ data.status }} </span>
                    </td>
                    <td>{{ timeStamp2(data.created_at) }}</td>
                    <td class="d-lg-flex" style="gap:10px">
                        <button @click="viewProduct(data)" class="py-1 px-2 small bg-success">View More</button>
                        <button @click="deleteProduct(data)" class="py-1 px-2 small">Delete Product</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <ConfirmDelete v-show="delete_confirm" @close="close" @done=" deleteThisProduct"/>
      </div>
    </div>
  </div>
</template>


<script>
import { timeStamp2 } from "@/plugins/filter";
import ConfirmDelete from "../../modals/confirmDelete.vue";
export default {
    data() {
        return {
            timeStamp2,
            delete_confirm: false,
            product_id: ""
        };
    },
    methods: {
        viewProduct(data) {
            this.$router.push({ name: "vendor-product-detail", params: { slug: data.slug } });
        },
        close(){
      this.delete_confirm = !this.delete_confirm
      },
      deleteProduct(data){
        this.product_id = data.id
        this.delete_confirm = !this.delete_confirm
        console.log(this.product_id);
      },
      deleteThisProduct(){
        this.$store.dispatch("vendor/deleteProduct", this.product_id)
        this.close()
      }
    },
    beforeMount() {
        this.$store.dispatch("vendor/getProducts");
    },
    computed: {
        getProducts() {
            return this.$store.getters["vendor/getProducts"];
        }
    },
    components: { ConfirmDelete }
};
</script>