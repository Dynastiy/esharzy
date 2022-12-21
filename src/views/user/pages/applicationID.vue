<template>
    <div>
      <div>
        <div
          id="main--content"
          v-loading="loading"
          element-loading-background="rgba(255, 255, 255, 0.7)"
          style="width: 100%"
        >
          <div class="mb-3">
              <!-- <h4 style="font-weight:600"> {{ user.bene }} </h4> -->
              <div class="mt-3 d-flex align-items-center justify-content-between">
                  <div>
                      <span class="text-muted small">Submitted on: </span>
                      <span class="small"> {{timeStamp2(kyc.created_at)}} </span>
                  </div>
              </div>
          </div>
          <div class="">
              <div class="table-reponsive">
                  <h5 class="" style="font-weight:600">Information</h5>
                   <div class="my-3">
                        <h6> Description </h6>
                        <small style="width:500px;white-space: pre-wrap; line-break:normal"> {{ kyc.business_description }} </small>
                  </div>
                  <table class="table table-striped table-borderless">
                      <tbody>
                        <tr>
                              <th scope="row">Status</th>
                              <td class="text-capitalize"> <span :class="kyc.status"> {{ kyc.status }} </span> </td>
                          </tr>
                          <tr>
                              <th scope="row">Beneficiary</th>
                              <td class="text-capitalize"> {{ kyc.beneficiary }} </td>
                          </tr>
                          <tr>
                              <th scope="row">Business Registration</th>
                              <td class="text-capitalize"> {{ kyc.is_registered === 0 ? 'Business not registered' : 'Business Registered' }} </td>
                          </tr>
                          <tr>
                              <th scope="row"> Company/Business Type </th>
                              <td> {{ kyc.company_type }} </td>
                          </tr>
                          <!-- <tr>
                              <th scope="row"> Email </th>
                              <td class=""> {{ user.email }} </td>
                          </tr> -->
                          <!-- <tr>
                              <th scope="row"> Phone Number </th>
                              <td> {{ user.phone_no }} </td>
                          </tr> -->

                          <tr v-if="kyc.status !== 'pending' ">
                              <th scope="row"> Comment </th>
                              <td> {{ kyc.admin_comment }} </td>
                          </tr>

                      </tbody>
                  </table>

              </div>

          </div>

          <div class="bg-white p-4 mt-3">
              <h5 class="mb-2" style="font-weight:600">Documents/Photos</h5>
              <div>
                  <div>
                      <label class="text-muted small" for="">Registration Document</label>
                      <div>
                          <div :class="file_extension"></div>
                          <div class="d-flex" style="gap:30px">
                              <a target="_blank" :href='config.imgUrl+kyc.registration_document ' class="small">View Document</a>
                              <a :href='config.imgUrl+kyc.registration_document' class="small" download='Hello'>Download Document</a>
                          </div>
                      </div>
                  </div>

                  <div class="mt-3">
                      <label class="text-muted small" for="">Business/Company Photos</label>
                      <div class="d-flex flex--photos" style="gap:30px">
                          <div  v-for="item in photos" :key="item.id" class="business--photo">
                              <a :href='config.imgUrl+item.photo'>
                                  <img :src="config.imgUrl+item.photo" alt="">
                              </a>
                              <div class="text-center">
                                  <a target="_blank" :href='config.imgUrl+item.photo ' class="small">View Photo</a>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>

      <!-- Add Comment  -->
      <div v-if="dialogVisible">
          <div class="modal--mask add-comment">
              <div class="modal--content">
                  <div class="text-right">
                      <i class="el-icon-circle-close" style="font-size:25px" role="button" @click="dialogVisible =  !dialogVisible"></i>
                  </div>
                  <div>

                  </div>
                  <form action="" @submit.prevent="updateStatus">
                      <div class="mb-3">
                          <label for="" class="small text-muted">Enter Comment</label>
                          <input type="text" v-model="admin_comment">
                      </div>
                      <div>
                          <button class="py-1 px-3"  :class='status === "Approve" ? "bg-success" : "" '> {{ status }} KYC  </button>
                      </div>
                  </form>
              </div>
          </div>
      </div>
      <!-- End of Add Comment  -->
    </div>
  </template>

<script>
import config from '@/config/api'
import { mapState, mapActions } from 'vuex'
import { timeStamp2 } from '@/plugins/filter'
export default {
  data () {
    return {
      id: this.$route.params.id,
      select: '',
      timeStamp2,
      config,
      dialogVisible: false,
      status: '',
      visible: false,
      admin_comment: '',
      status_update: null
    }
  },
  methods: {
    ...mapActions('user', ['getApplication'])
  },
  beforeMount () {
    this.getApplication(this.id)
  },
  computed: {
    ...mapState('user', ['loading', 'kyc']),
    user () {
      return this.kyc.user
    },
    file_extension () {
      return this.kyc.registration_document.split('.').pop()
    },
    photos () {
      const photos = [
        {
          id: 1,
          photo: this.kyc.photo_one
        },
        {
          id: 2,
          photo: this.kyc.photo_two
        },
        {
          id: 3,
          photo: this.kyc.photo_three
        },
        {
          id: 4,
          photo: this.kyc.photo_four
        }
      ]
      return photos
    }
  }
}
</script>

  <style>
    .el-dropdown {
      vertical-align: top;
    }
    .el-dropdown + .el-dropdown {
      margin-left: 15px;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  </style>
