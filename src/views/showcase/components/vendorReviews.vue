<template>
    <div>
        <div>
            <div class="row">
                <div class="col-md-4 mt-3">
                    <div>
                        <div class="d-flex align-items-center" style="gap:5px">
                            <h1 style="font-size:3.5rem; color: var(--tertiary-color); font-weight: 700;"> 
                                {{ numberFilter(product.avg_ratings) }}
                            </h1>
                            <div>
                                <h6 class="" style="font-weight:400">Average Rating</h6>

                                <div class="d-flex" style="gap:10px">
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
                    <div class="d-flex align-items-center" v-for="item in ratingValues" :key="item.id" style="gap:15px">
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

                    <div class="progress" style="height:8px; width: 100%; background-color: var(--gray-400);">
                        <div
                        class="progress-bar rounded-lg"
                        role="progressbar"
                        style="background-color: var(--gray-600);"
                        :style="{'width': `${item.percentage}%`}"
                        aria-valuenow="20"
                        aria-valuemin="0"
                        aria-valuemax="100"
                        ></div>
                    </div>

                    <div class="text-left">
                        <small > {{ item.percentage + "%" }} </small>
                    </div>
                    </div>
                </div>

                <div class="col-md-8 mt-3">
                   <h4 class="mb-1">Submit Your Review</h4>
                   <p class="small">Your email address will not be published. <span style="color:var(--tertiary-color)">Only Logged in users can add a review</span></p>
                   <div class="d-flex my-2" style="gap:5px">
                    <small>Your rating of this product:</small>
                    <star-rating
                            :increment="0.1"
                            v-model="rating"
                            inactive-color="#000"
                            active-color="#ffb20f"
                            v-bind:star-size="13"
                            :show-rating="false"
                            :rounded-corners="true"
                        ></star-rating>
                   </div>
                   <div class="review--textarea">
                    <textarea name="" class="" placeholder="Write your review here" id="" cols="30" rows="5"></textarea>
                   </div>
                   <div class="mt-3">
                    <button style="font-weight:600; font-size:13px !important">
                        SUBMIT REVIEW
                    </button>
                   </div>
                </div>
            </div>
            <hr>
            <div>
                {{ reviews }}
            </div>
        </div>
    </div>
</template>


<script>
import { numberFilter } from "@/plugins/filter"
import StarRating from "vue-star-rating";
export default {
    components:{
        StarRating
    },
    data(){
        return {
            numberFilter,
            rating: ""
        }
    },
    computed: {
    product() {
      return this.$store.getters["showcase/getSingleProduct"].product;
    },
    reviews() {
        return this.$store.getters["showcase/getSingleProduct"].product.reviews;
    },
    ratings() {
        return this.$store.getters["showcase/getSingleProduct"].product.ratings;
    },
    ratingValues(){
        let ratings = this.$store.getters["showcase/getSingleProduct"].product.ratings;
        let one = ratings.filter(rating => (rating.scale == 1)).length;
        one = (one / ratings.length) * 100
        let two = ratings.filter(rating => (rating.scale == 2)).length;
        two = (two / ratings.length) * 100
        let three = ratings.filter(rating => (rating.scale == 3)).length;
        three = (three / ratings.length) * 100
        let four = ratings.filter(rating => (rating.scale == 4)).length;
        four = (four / ratings.length) * 100
        let five = ratings.filter(rating => (rating.scale == 5)).length;
        five = (five / ratings.length) * 100
        let values = [
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
    slugName() {
      return this.$route.params.slug;
    },
  },
}
</script>