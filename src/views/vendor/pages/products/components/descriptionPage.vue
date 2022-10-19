<template>
  <div>
    <div class="">
      
      <div class="">
        <h4 class="text-dark my-3">Product Description</h4>
        <div class="add-item-content">
          <form action="" @submit.prevent="addProduct">
           
            <div class="mb-2">
              <vue-editor
                v-model="payload.description"
                :editor-toolbar="customToolbar"
              ></vue-editor>
            </div>
            <small class="text-danger" v-show="errMessages.description" v-for="err in errMessages.description" :key="err"> *{{ err }} </small>
           
            <div>
              <div class="text-right mt-3">
                <button class="btn-dark btn">Update Product Description</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
  data() {
    return {
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
        [{ script: "sub" }, { script: "super" }],
      ],
      payload: {
        description: "",
      },
    };
  },
  methods: {
    
    async addProduct() {
      let formData = new FormData();
      formData.append("description", this.payload.description);
      this.loading = true;
     this.$store.dispatch('vendor/createProduct', formData);
     this.payload = null
    },
    goBack(){
      this.$router.go(-1)
    }
  },
 
  computed: {
    allCategories() {
      return this.$store.getters["showcase/getCategories"].categories;
    },
    allTags() {
      return this.$store.getters["showcase/getTags"].tags;
    },
    errMessages(){
        return this.$store.getters['vendor/isErrors']
    }
  },
};
</script>