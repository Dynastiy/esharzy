<template>
    <div>
      <div>
        <div
          id="main--content"
          v-loading="loading"
          element-loading-background="rgba(255, 255, 255, 0.7)"
          style="width: 100%"
        >
            <div class="mb-4">
                <span class="text-muted small">Submitted on: </span>
                <span class="small"> {{timeStamp2(application.created_at)}} </span>
            </div>
          <div class="bg-white p-4">
              <div>
                  <h5 class="mb-3" style="font-weight:600">Information</h5>
                  <table class="table table-striped table-borderless p-3">
                      <tbody>
                          <tr>
                              <th scope="row">Beneficiary</th>
                              <td class="text-capitalize"> {{ application.beneficiary }} </td>
                          </tr>
                          <tr>
                              <th scope="row">Business Address</th>
                              <td class="text-capitalize"> {{ application.business_address }} </td>
                          </tr>
                          <tr>
                              <th scope="row">RC/Registration Number </th>
                              <td> {{ application.rc_number || application.registration_number }}  </td>
                          </tr>
                          <tr>
                              <th scope="row"> Tax Identification Number </th>
                              <td class=""> {{ application.tax_number }} </td>
                          </tr>
                          <tr>
                              <th scope="row"> Business Description </th>
                              <td> {{ application.business_description }} </td>
                          </tr>
                          <tr v-if="application.status !== 'pending' ">
                              <th scope="row"> Comment </th>
                              <td> {{ application.admin_comment }} </td>
                          </tr>
                          <tr>
                            <th scope="row">Registration Document</th>
                            <td>
                                <div class="d-flex align-items-center" style="gap:10px">
                                    <div :class="file_extension" style="width:20px; height:20px"></div>
                                    <div class="d-flex" style="gap:30px">
                                        <a target="_blank" :href='config.imgUrl+application.registration_document ' class="small">View Document</a>
                                        <a :href='config.imgUrl+application.registration_document' class="small" download='Hello'>Download Document</a>
                                    </div>
                                </div>
                            </td>
                          </tr>
                          
                      </tbody>
                  </table>
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
                          <input type="text" required v-model="admin_comment">
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
    data() {
      return {
          id: this.$route.params.id,
          select: '',
          timeStamp2, config,
          dialogVisible: false, 
          status: "",
          visible: false, 
          admin_comment: "",
          status_update: null
      };
    },
    methods:{
      ...mapActions("vendor", ["getApplication" ]),
    
    },
    beforeMount(){
      this.getApplication(this.id)
    },
    computed:{
      ...mapState("vendor", ["loading", "application"]),
      user(){
          return this.application.user
      },
      file_extension(){
          return this.application.registration_document.split('.').pop();
      },
    
    }
  };
  </script>
  
  <style>
   
  </style>