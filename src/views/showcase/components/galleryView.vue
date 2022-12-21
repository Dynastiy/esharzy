<template>
    <div>
        <div class="">
            <div class="card-carousel" @mouseover="stopTimer" @mouseleave="restartTimer">
        <div class="progressbar" v-if="autoSlideInterval && showProgressBar">
            <div :style="{width: progressBar + '%' }"></div>
        </div>
        <div class="card-img">
            <img :src="config.imgUrl + currentImage" alt="">
            <div class="actions">
                <span @click="prevImage" class="prev">
                    &#8249;
                </span>
                <span @click="nextImage" class="next">
                    &#8250;
                </span>
            </div>
        </div>
        <div class="thumbnails">
            <!-- {{ images }} -->
            <div
                v-for="(image, index) in  images"
                :key="image.id"
                :class="['thumbnail-image', (activeImage === index) ? 'active' : '']"
                @click="activateImage(index)"
            >
                <img :src="config.imgUrl + image.thumb">
            </div>
        </div>
    </div>

        </div>
    </div>
</template>

<script>
/* eslint-disable */ 
import config from "@/config/api"
export default {
   props:['startingImage', 'images', 'autoSlideInterval', 'showProgressBar'] ,
   data(){
       return {
        config,
        //    currentImage: null,
           //Index of the active image
            activeImage: 0,
            //Hold the timeout, so we can clear it when it is needed
            autoSlideTimeout: null,
            //If the timer is stopped e.g. when hovering over the carousel
            stopSlider: false,
            //Hold the time left until changing to the next image
            timeLeft: 0,
            //Hold the interval so we can clear it when needed
            timerInterval: null,
            //Every 10ms decrease the timeLeft
            countdownInterval: 10,
       }
   },
   computed: {
        // currentImage gets called whenever activeImage changes
        // and is the reason why we don't have to worry about the 
        // big image getting updated
        currentImage() {
            // this.timeLeft = this.autoSlideInterval;
            return this.images[this.activeImage].big;
        },
        progressBar() {
            //Calculate the width of the progressbar
            return 100 - (this.timeLeft/this.autoSlideInterval) * 100;
        }
    },
    methods: {
        // Go forward on the images array 
        // or go at the first image if you can't go forward
        nextImage() {
            var active = this.activeImage + 1;
            if(active >= this.images.length) {
                active = 0;
            }
            this.activateImage(active);
        },
        // Go backwards on the images array 
        // or go at the last image
        prevImage() {
            var active = this.activeImage - 1;
            if(active < 0) {
                active = this.other_images.length - 1;
            }
            this.activateImage(active);            
        },
        activateImage(imageIndex) {
            this.activeImage = imageIndex;
            this.currentImage = this.images[this.activeImage].big;
        },
        //Wait until 'interval' and go to the next image;
        startTimer(interval) {
            if(interval && interval > 0 && !this.stopSlider) {
                var self = this;
                clearTimeout(this.autoSlideTimeout);
                this.autoSlideTimeout = setTimeout(function() {
                    self.nextImage();
                    self.startTimer(self.autoSlideInterval);
                }, interval);
            }
        },
        //Stop the timer when hovering over the carousel
        stopTimer() {
            clearTimeout(this.autoSlideTimeout);
            this.stopSlider = true;
            clearInterval(this.timerInterval);
        },
        //Restart the timer(with 'timeLeft') when leaving from the carousel
        restartTimer() {
            this.stopSlider = false;
            clearInterval(this.timerInterval);
            this.startCountdown();
            this.startTimer(this.timeLeft);
        },
        //Start countdown from 'autoSlideInterval' to 0
        startCountdown() {
            if(!this.showProgressBar) return;
            var self = this;
            this.timerInterval = setInterval(function() {
                self.timeLeft -= self.countdownInterval;
                if(self.timeLeft <= 0) {
                    self.timeLeft = self.autoSlideInterval;
                }
            }, this.countdownInterval);
        }
    },
    // mounted(){
    //     this.currentImage = this.images[this.activeImage].big;
    // },
    created() {
        //Check if startingImage prop was given and if the index is inside the images array bounds
        if(this.startingImage 
            && this.startingImage >= 0
            && this.startingImage < this.images.length) {
            this.activeImage = this.startingImage;
        }
        //Check if autoSlideInterval prop was given and if it is a positive number
        if(this.autoSlideInterval
            && this.autoSlideInterval > this.countdownInterval) {
            //Start the timer to go to the next image
            this.startTimer(this.autoSlideInterval);
            this.timeLeft = this.autoSlideInterval;
            //Start countdown to show the progressbar
            this.startCountdown();
        }
        this.currentImage = this.images[this.activeImage].big;
        
    },
}
</script>

<style scoped>
.card-carousel {
    user-select: none;
    position: relative;
}
.progressbar {
    display: block;
    width: 100%;
    height: 5px;
    position: absolute;
    background-color: rgba(221, 221, 221, 0.25);
    z-index: 1;
}
.progressbar > div {
    background-color: rgba(255, 255, 255, 0.52);
    height: 100%;
}
.thumbnails {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    justify-content: space-evenly;
    flex-direction: row;
}
.thumbnail-image {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 2px;
}
.thumbnail-image > img {
    width: 100%;
    height: 70px;
    object-fit: contain;
    object-position: center;
    transition: all 250ms;
    padding:0.4rem;
}
.thumbnail-image:hover > img, 
.thumbnail-image.active > img {
    opacity: 0.6;
    box-shadow: 2px 2px 6px 1px rgba(0,0,0, 0.5);
    border: 1px solid var(--tertiary-color)
}
.card-img {
    position: relative;
    margin-bottom: 15px;
}
.card-img > img {
    display: block;
    margin: 0 auto;
    width: 100%;
    height: 400px;
    object-fit: contain;
    object-position: center;
}
.actions {
    font-size: 1.5em;
    height: 40px;
    position: absolute;
    top: 50%;
    margin-top: -20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #585858;
   
}
.actions > span {
    cursor: pointer;
    transition: all 250ms;
    font-size: 35px;
     background-color: #fff;
     width: 30px;
     height: 30px;
     display: flex;
     align-items: center;
     justify-content: center;
     border-radius: 50%;
     box-shadow: 0px 3px 5px rgba(0,0,0, 0.5);
}
.actions > span.prev {
    margin-left: -20px;
}
.actions > span.next {
    margin-right: -20px;
}
.actions > span:hover {
    color: #eee;
}
</style>