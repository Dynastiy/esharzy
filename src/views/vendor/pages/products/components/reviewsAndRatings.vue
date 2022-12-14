<template>
    <div>
      <div>
        <div class="" style="gap: 30px">
          <div class="mt-3 ratings--card">
            <div>
              <div class="d-flex align-items-center" style="gap: 5px">
                <!-- {{ ratings }} -->
                <h1
                  style="
                    font-size: 3.5rem;
                    color: var(--tertiary-color);
                    font-weight: 700;
                  "
                >
                  {{ numberFilter(product.avg_ratings) }}
                </h1>
                <div>
                  <h6 class="" style="font-weight: 400">Average Rating</h6>

                  <div class="d-flex" style="gap: 10px">
                    <star-rating
                      :increment="0.1"
                      v-model="product.avg_ratings"
                      inactive-color="#000"
                      active-color="#ffb20f"
                      v-bind:star-size="13"
                      :show-rating="false"
                      :rounded-corners="true"
                      :current-rating="product.avg_ratings"
                      :read-only="true"
                    ></star-rating>
                    <small class="text-secondary">
                      {{ "(" + reviews.length + " Reviews)" }}
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="d-flex align-items-center mb-2"
              v-for="item in ratingValues"
              :key="item.id"
              style="gap: 25px"
            >
              <div>
                <star-rating
                  :increment="0.1"
                  v-model="item.rating"
                  inactive-color="#000"
                  active-color="#ffb20f"
                  v-bind:star-size="13"
                  :show-rating="false"
                  :rounded-corners="true"
                  :read-only="true"
                ></star-rating>
              </div>

              <div class="row w-100 align-items-center">
                <div
                  class="progress col-9 p-0"
                  style="
                    height: 8px;
                    width: 100%;
                    background-color: var(--gray-400);
                  "
                >
                  <div
                    class="progress-bar rounded-lg"
                    role="progressbar"
                    style="background-color: var(--gray-600)"
                    :style="{ width: `${numberFilter(item.percentage)}%` }"
                    aria-valuenow="20"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
                <span class="col-3 small">
                  {{ numberFilter(item.percentage) + "%" }}
                </span>
              </div>
            </div>
          </div>

        </div>
        <hr class="my-5" />
        <div v-if="reviews.length === 0">
          <h5 style="font-weight:700">No reviews for this product yet</h5>
        </div>
        <div v-for="item in reviews" :key="item.id" class="mb-4">
          <div class="d-flex" style="gap: 20px">
            <img
              :src="item.user.photo == null ? '/no-user.png' : item.user.photo"
              alt=""
              style="
                height: 40px;
                width: 40px;
                border-radius: 50%;
                object-fit: cover;
                object-position: top;
              "
            />
            <div>
              <div class="d-flex align-items-center" style="gap: 5px">
                <h5 class="small" style="font-weight: 600">{{ item.reviewer_name }}</h5>
                <span class="small"> {{ timeStamp(item.created_at) }} </span>
              </div>

              <div>
                <star-rating
                  :increment="0.1"
                  v-model="user_rating(item.user.id).scale"
                  inactive-color="#000"
                  active-color="#ffb20f"
                  v-bind:star-size="13"
                  :show-rating="false"
                  :rounded-corners="true"
                  :read-only="true"
                ></star-rating>
              </div>

              <div v-html="item.comment" style="font-size:13px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
import { numberFilter, timeStamp } from '@/plugins/filter'
import StarRating from 'vue-star-rating'
export default {
  components: {
    StarRating
  },
  data () {
    return {
      numberFilter,
      timeStamp,
      rating: Number(''),
      user_rate: [],
      comment: ''
    }
  },
  methods: {
    user_rating (item) {
      const ratings =
          this.$store.getters['products/singleProduct'].ratings
      const users = ratings.find((user) => user.user.id === item)
      return users
    }

  },
  computed: {
    my_review () {
      const items = this.$store.getters['products/singleProduct'].product.reviews
      if (items.length > 0) {
        const val = items.find(item => item.user.id === this.getUser.id)
        console.log(val)
        let payload
        if (val !== undefined) {
          payload = {
            val,
            review: true
          }
        } else {
          payload = {
            comment: '',
            review: false
          }
        }
        return payload
      } else {
        return {
          review: false
        }
      }
    },
    my_rating () {
      const items = this.product.ratings

      if (items.length > 0) {
        const val = items.find(item => item.user.id === this.getUser.id)
        console.log(val)
        let payload
        if (val !== undefined) {
          payload = {
            val,
            rating: true
          }
        } else {
          payload = {
            scale: 0,
            rating: false
          }
        }
        return payload
      } else {
        return {
          rating: false
        }
      }
    },
    loading () {
      return this.$store.getters['products/loading']
    },
    isLoggedIn () {
      const token = localStorage.getItem('token')
      return token
    },
    getUser () {
      return this.$store.getters['auth/getUser']
    },
    product () {
      return this.$store.getters['vendor/getSingleProduct']
    },
    reviews () {
      return this.product.reviews
    },
    ratings () {
      return this.product.ratings
    },

    ratingValues () {
      const ratings =
          this.product.ratings
      let one = ratings.filter((rating) => (rating.scale > 0 && rating.scale <= 1.5)).length
      one = (one / ratings.length) * 100
      let two = ratings.filter((rating) => (rating.scale > 1.5 && rating.scale <= 2.5)).length
      two = (two / ratings.length) * 100
      let three = ratings.filter((rating) => (rating.scale > 2.5 && rating.scale <= 3.5)).length
      three = (three / ratings.length) * 100
      let four = ratings.filter((rating) => (rating.scale > 3.5 && rating.scale <= 4.5)).length
      four = (four / ratings.length) * 100
      let five = ratings.filter((rating) => (rating.scale > 4.5 && rating.scale <= 5)).length
      five = (five / ratings.length) * 100
      const values = [
        {
          rating: 5,
          percentage: five
        },
        {
          rating: 4,
          percentage: four
        },
        {
          rating: 3,
          percentage: three
        },
        {
          rating: 2,
          percentage: two
        },
        {
          rating: 1,
          percentage: one
        }
      ]
      return values
    },
    slugName () {
      return this.$route.params.slug
    }
  }
}
</script>
