<template>
  <div>
    <div>
      <div class="d-lg-flex" style="gap: 30px">
        <div class="mt-3 w-50 ratings--card">
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
                    inactive-color="#aaa"
                    active-color="#666"
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
                inactive-color="#aaa"
                active-color="#666"
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

        <div class="mt-3 w-100">
          <h4 class="mb-1" style="font-weight: 700">Submit Your Review</h4>
          <div>
            <p class="" style="font-size: 14px">
              Your email address will not be published.
              <span style="color: var(--tertiary-color)"
                >Only Logged in users can add a review</span
              >
            </p>
            <div class="my-4" v-if="!isLoggedIn">
                <span > Please <span style="color:var(--tertiary-color)" role="button" @click="login">login</span> </span>
            </div>
            <div v-else>
              <div>
                <div class="d-flex my-2" style="gap: 5px">
                <p class="" style="font-size: 14px">
                  {{ !my_rating.rating ? "Rate this product:" : "Your rating of this product" }}
                </p>
                <div  v-if="my_rating.rating">
                    <star-rating
                    :increment="0.1"
                    v-model="my_rating.val.scale"
                    inactive-color="#aaa"
                    active-color="#666"
                    v-bind:star-size="13"
                    :show-rating="false"
                    :rounded-corners="true"
                    :read-only="true"
                    ></star-rating>
                </div>

                <div v-else>
                  <star-rating
                  @rating-selected ="setRating"
                  :increment="0.1"
                  v-model="rating"
                  inactive-color="#aaa"
                  active-color="#666"
                  v-bind:star-size="13"
                  :show-rating="false"
                  :rounded-corners="true"
                ></star-rating>
                </div>

                </div>
              <div class="review--textarea">
                <textarea
                  v-if="!my_review.review"
                  placeholder="Write your review here"
                  id=""
                  cols="30"
                  rows="5"
                  v-model="comment"
                ></textarea>
                <textarea
                    v-else
                  id=""
                  cols="30"
                  rows="5"
                  readonly
                  v-model="my_review.val.comment"
                ></textarea>
              </div>
              <div class="mt-3" v-if="!my_review.review">
                <button
                  style="font-weight: 600; font-size: 13px !important"
                  @click.once="submitReview"
                  :disabled="loading"
                >
                  {{ loading ? "Creating Review..." : "SUBMIT REVIEW" }}
                </button>
              </div>
              </div>
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
              height: 60px;
              width: 60px;
              border-radius: 50%;
              object-fit: cover;
              object-position: top;
            "
          />
          <div>
            <div class="d-flex align-items-center" style="gap: 5px">
              <h5 style="font-weight: 600">{{ item.reviewer_name }}</h5>
              <span class="small"> {{ timeStamp(item.created_at) }} </span>
            </div>

            <div>
              <star-rating
                :increment="0.1"
                v-model="user_rating(item.user.id).scale"
                inactive-color="#aaa"
                active-color="#666"
                v-bind:star-size="13"
                :show-rating="false"
                :rounded-corners="true"
                :read-only="true"
              ></star-rating>
            </div>

            <div v-html="item.comment"></div>
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
        this.$store.getters['showcase/getSingleProduct'].ratings
      const users = ratings.find((user) => user.user.id === item)
      return users
    },
    login () {
      this.$router.push(`/login?return_url=product/${this.product.slug}`)
    },
    submitReview () {
      const payload = {
        product_id: this.product.id,
        comment: this.comment,
        slug: this.product.slug
      }
      this.$store.dispatch('showcase/createReview', payload)
      this.comment = ''
    },
    setRating () {
      console.log(this.rating)
      const payload = {
        product_id: this.product.id,
        scale: this.rating,
        slug: this.product.slug
      }
      this.$store.dispatch('showcase/createRating', payload)
    }

  },
  mounted () {
    // this.user_rating()
  },
  computed: {
    my_review () {
      const items = this.$store.getters['showcase/getSingleProduct'].reviews
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
      const items = this.$store.getters['showcase/getSingleProduct'].ratings

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
      return this.$store.getters['showcase/isLoading']
    },
    isLoggedIn () {
      const token = localStorage.getItem('token')
      return token
    },
    getUser () {
      return this.$store.getters['auth/getUser']
    },
    product () {
      return this.$store.getters['showcase/getSingleProduct']
    },
    reviews () {
      return this.$store.getters['showcase/getSingleProduct'].reviews
    },
    ratings () {
      return this.$store.getters['showcase/getSingleProduct'].ratings
    },

    ratingValues () {
      const ratings =
        this.$store.getters['showcase/getSingleProduct'].ratings
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
