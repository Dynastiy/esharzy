<template>
    <div>
        <div class="modal--mask">
            <div class="modal--container">
                <div class="text-right" role="button" @click='$emit("closeModal")'>
                    <i class="el-icon-circle-close" style="font-size:25px"></i>
                </div>
                <form action="" @submit.prevent="submit()" v-if="!submitted">
                    <h5 class="mb-3">Become a Vendor</h5>
                    <div class="mb-3">
                        <input type="text" v-model="company_type" placeholder="Company/Business type" required>
                    </div>
                    <div class="mb-3">
                        <textarea  rows="4" v-model="business_description" placeholder="Enter a brief description of your business/company" required></textarea>
                    </div>

                    <div class="mb-3 d-flex align-items-center" style="gap:5px">
                        <input type="checkbox" name="" @change="getVal" value="0" v-model="val" id="">
                        <label class="m-0" for="">Tick if business/company is registered</label>
                    </div>
                    <div class="mb-3" v-if="registered_business">
                        <label for="">Document of Business/Company registration</label>
                        <input @change="registrationDocument()" type="file" name="" id="">
                    </div>

                    <div class="mb-4">
                        <label for="">Photos of Business Place/Company</label>
                        <div class="business--images">
                            <input class="" @change="photoOneUpload()" type="file" name="" id="" required>
                            <input class="" @change="photoTwoUpload()"  type="file" name="" id="" required>
                            <input class="" @change="photoThreeUpload()"  type="file" name="" id="" required>
                            <input class="" @change="photoFourUpload()"  type="file" name="" id="" required>
                        </div>
                    </div>
                    <div class="mt-1 text-center">
                        <i class="el-icon-loading" style="font-size:20px" v-if="loading"></i>
                        <button class="w-100" v-else>Submit Application</button>
                    </div>
                </form>

                <div class="text-center" v-else>
                    <i class="el-icon-success text-success" style="font-size:80px"></i>
                    <h5>Vendor Application Submitted!!!</h5>
                    <p class="small">Please wait while your vendor application is reviewed!!!</p>
                    <button class="mt-2" @click="viewApplication">View Application</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      val: '',
      registration_document: null,
      business_description: null,
      company_type: null,
      registered_business: false,
      payload: {
        photo_one: null,
        photo_two: null,
        photo_three: null,
        photo_four: null,
        registration_document: null
      }
    }
  },
  methods: {
    ...mapActions('user', ['becomeAVendor', 'removeSubmitted']),
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
    registrationDocument () {
      const input = event.target
      this.payload.registration_document = input.files[0]
      console.log(this.payload.registration_document)
    },
    getVal () {
      if (Number(this.val) === 1) {
        this.registered_business = true
      } else {
        this.registered_business = false
      }

      console.log(Number(this.val))
    },
    submit () {
      const formData = new FormData()
      formData.append('is_registered', Number(this.val))
      formData.append('company_type', this.company_type)
      formData.append('business_description', this.business_description)
      formData.append('registration_document', this.payload.registration_document)
      formData.append('photo_one', this.payload.photo_one)
      formData.append('photo_two', this.payload.photo_two)
      formData.append('photo_three', this.payload.photo_three)
      formData.append('photo_four', this.payload.photo_four)
      this.becomeAVendor(formData)
    },
    viewApplication () {
      this.$router.push(`/vendor-application/${this.submittedApplication.id}`)
      this.removeSubmitted()
      this.$emit('closeModal')
    }
  },
  computed: {
    ...mapState('user', ['loading', 'submitted', 'submittedApplication'])
  }
}
</script>
