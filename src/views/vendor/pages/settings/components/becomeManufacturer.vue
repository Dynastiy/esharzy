<template>
    <div>
        <div class="modal--mask">
            <div class="modal--container">
                <div class="text-right" role="button" @click='$emit("closeModal")'>
                    <i class="el-icon-circle-close" style="font-size:25px"></i>
                </div>
                <form action="" @submit.prevent="submit()" v-if="!submitted">
                    <h5 class="mb-3">Become a Manufacturer</h5>
                    <div class="mb-2">
                        <input type="text" v-model="business_name" placeholder="Business Name" required>
                    </div>

                    <div class="mb-2">
                        <input type="text" v-model="tax_number" placeholder="Tax Number" required>
                    </div>
                    <div class="mb-2">
                        <input type="text" v-model="rc_number" placeholder="RC Number" required>
                    </div>
                    <div class="mb-2">
                        <input type="text" v-model="business_address" placeholder="Business Address" required>
                    </div>
                    <div class="mb-2">
                        <input type="text" v-model="registration_number" placeholder="Registration Number" required>
                    </div>
                    <div class="mb-2">
                        <textarea  rows="3" v-model="business_description" placeholder="Enter a brief description of your business/company" required></textarea>
                    </div>
                    <div class="mb-2">
                        <label for="">Document of Business/Company registration</label>
                        <input @change="registrationDocument()" type="file" name="" id="">
                    </div>

                    <div class="mt-1 text-center">
                        <i class="el-icon-loading" style="font-size:20px" v-if="loading"></i>
                        <button class="w-100" v-else>Submit Application</button>
                    </div>
                </form>

                <div class="text-center" v-else>
                    <i class="el-icon-success text-success" style="font-size:80px"></i>
                    <h5>Manufacturer Application Submitted!!!</h5>
                    <p class="small">Please wait while your manufacturer application is reviewed!!!</p>
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
        registration_document: null
      }
    }
  },
  methods: {
    ...mapActions('vendor', ['becomeAManufacturer', 'removeSubmitted']),
    registrationDocument () {
      const input = event.target
      this.payload.registration_document = input.files[0]
      console.log(this.payload.registration_document)
    },
    submit () {
      const formData = new FormData()
      formData.append('business_name', this.business_name)
      formData.append('business_address', this.business_address)
      formData.append('business_description', this.business_description)
      formData.append('registration_document', this.payload.registration_document)
      formData.append('tax_number', this.tax_number)
      formData.append('registration_number', this.registration_number)
      formData.append('rc_number', this.rc_number)
      // formData.append("photo_four", this.payload.photo_four)
      this.becomeAManufacturer(formData)
    },
    viewApplication () {
      this.$router.push(`/vendor/manufacturer-applications/${this.submittedApplication.id}`)
      this.removeSubmitted()
      this.$emit('closeModal')
    }
  },
  computed: {
    // ...mapState("user", ["loading", "submitted", "submittedApplication"])
    ...mapState('vendor', ['loading', 'submitted', 'submittedApplication'])
  }
}
</script>
