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
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Date Created</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                    <!-- {{ getProducts.vendor_products.data }} -->
                  <tr
                    v-for="data in getProducts.vendor_products.data"
                    :key="data.id"
                  >
                    <td>{{ data.name }}</td>
                    <td>${{ data.price }}</td>
                    <td v-html="data.description.slice(0, 20) + '...'"></td>
                    <td>
                      <el-tag type="success" v-show="data.status === 'approved' " style="font-size:10px">Approved</el-tag>
                      <el-tag type="warning" v-show="data.status === 'pending' " style="font-size:10px">Pending</el-tag>
                      <el-tag type="danger" v-show="data.status === 'declined' " style="font-size:10px">Declined</el-tag>
                    </td>
                    <td>{{ timeStamp2(data.created_at) }}</td>
                    <td>
                        <button @click="viewProduct(data)" class="py-1 px-2 small">View More</button>
                        <div>
                          
                        </div>
                    </td>
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
import { timeStamp2 } from "@/plugins/filter";
export default {
  data() {
    return {
      timeStamp2,
    };
  },
  methods:{
    viewProduct(data){
        this.$router.push({ name: "vendor-product-detail", params:{slug: data.slug } });
    }  
  },
  beforeMount() {
    this.$store.dispatch("vendor/getProducts");
  },
  computed: {
    getProducts() {
      return this.$store.getters["vendor/getProducts"];
    },
  },
};
</script>