<template>
  <div>
    <div class="modal--mask">
      <div class="modal--container">
        <div class="text-right" role="button" @click="$emit('closeModal')">
          <i class="el-icon-circle-close" style="font-size: 25px"></i>
        </div>
        <h6>Update Profile Photo</h6>
        <div>
          <div class="media--preview text-center mt-3" v-if="previewImage">
            <div
              class="close-media-preview"
              role="button"
              @click="closePreview"
            >
              <i-icon
                icon="ic:baseline-delete"
                class="file--icons"
                style="font-size: 25px; color: var(--tertiary-color)"
              />
            </div>
            <img :src="imageUrl" alt="" />
            <div class="mt-3">
              <button @click="submit">Update Photo</button>
            </div>
          </div>

          <input class="mt-3" type="file" @change="pickFile" v-else />
        </div>

        <!-- <div class="text-center">
          <i class="el-icon-success text-success" style="font-size: 80px"></i>
          <h5>User Photo Updated!!!</h5>
          <p class="small">
            User Photo has been updated!!!
          </p>
          <button class="mt-2" @click="viewApplication">
            Close
          </button>
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
      previewImage: false,
      config,
      payload: {
        photo_one: null
      },
      imageUrl: ''
    }
  },
  methods: {
    ...mapActions('user', ['becomeAVendor', 'removeSubmitted']),
    ...mapActions('auth', ['updateProfilePhoto']),
    pickFile (e) {
      const input = event.target
      this.payload.photo_one = input.files[0]
      console.log(this.payload.photo_one)
      this.previewImage = true
      if (e.target.files.length > 0) {
        const src = URL.createObjectURL(e.target.files[0])
        this.imageUrl = src
        // document.getElementById('message').style.backgroundImage = null;
        // this.payload.color = "";
      }
    },

    closePreview () {
      this.imageUrl = ''
      this.previewImage = false
      this.payload.photo_one = null
    },

    submit () {
      const formData = new FormData()
      formData.append('photo', this.payload.photo_one)
      this.updateProfilePhoto(formData)
      this.imageUrl = ''
      this.previewImage = false
      this.payload.photo_one = null
      this.$emit('closeModal')
    }
  },
  computed: {
    ...mapState('auth', ['loading'])
  }
}
</script>
