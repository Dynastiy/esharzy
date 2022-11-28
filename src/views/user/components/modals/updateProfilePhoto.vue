<template>
    <div>
        <div class="modal--mask">
            <div class="modal--container">
                <div class="text-right" role="button" @click='$emit("closeModal")'>
                    <i class="el-icon-circle-close" style="font-size:25px"></i>
                </div>
                <h6>Update Profile Photo</h6>
                <div>
                    <el-upload
  class="avatar-uploader"
  :action="uploadPhoto()"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
                </div>

                <!-- <div class="text-center" v-else>
                    <i class="el-icon-success text-success" style="font-size:80px"></i>
                    <h5>Vendor Application Submitted!!!</h5>
                    <p class="small">Please wait while your vendor application is reviewed!!!</p>
                    <button class="mt-2" @click="viewApplication">View Application</button>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import config from '@/config/api'
import { mapState, mapActions } from 'vuex'
export default {
  data () {
    return {
      config,
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
      },
      imageUrl: ''
    }
  },
  methods: {
    ...mapActions('user', ['becomeAVendor', 'removeSubmitted']),
    photoOneUpload () {
      const input = event.target
      this.payload.photo_one = input.files[0]
      console.log(this.payload.photo_one)
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
    }
  },
  computed: {
    ...mapState('auth', ['loading'])
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
