<script setup lang="ts">
    import GoogleServices from '../vue-helpers/googleServices';
    import CustomerReview from './cards/CustomerReview.vue';
    import { useI18n } from 'vue-i18n';
    import { ref, onMounted } from 'vue';

    const { locale } = useI18n();

    const services = new GoogleServices(locale.value);

    const serviceHtmlContainer = ref(null);
    const listIndex = ref(0);
    const reviewsRef = ref<google.maps.places.PlaceReview[]>([]);

    onMounted(() => {
        if (serviceHtmlContainer?.value){
            services.fetchCustomerReviews('ChIJBd77UWJbFkcRQJU221m8Hco', serviceHtmlContainer.value)
                    .then(reviews => {
                        reviewsRef.value = reviews;
                    });
        }
        else {
            console.error('serviceHtmlContainer is not specified');
        }
    });

    function nextReview(){
        listIndex.value++;
    }

    function prevReview(){
        if (listIndex.value > 0){
            listIndex.value--;
        }
    }
</script>

<template>
    <div class="flex mt-32 mb-16 justify-center">
        <h1 class="text-5xl font-jost-bold text-zinc-800">{{ $t('home.whatPeopleSayTitle') }}</h1>
    </div>

    <div ref="serviceHtmlContainer"></div>

    <div class="flex justify-center">
        <div class="flex pr-3 md:pr-7 my-auto min-w-12 md:min-w-[4.25rem] justify-end">
            <button v-show="listIndex > 0" v-on:click="prevReview()" class="rounded-full w-8 h-8 p-2 bg-zinc-600/70 shadow-md cursor-pointer shadow-gray-700/30 hover:bg-zinc-800/80 duration-200">
                <svg class="fill-[white]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.96 1.96a1 1 0 0 1 1.497 1.32l-.083.094L5.747 8l4.627 4.626a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.084l-.094-.084-5.334-5.333a1 1 0 0 1-.083-1.32l.083-.094L8.96 1.96Z"></path></svg>
            </button>
        </div>
        <!-- `-translate-x-[${listIndex * 100}%] md:-translate-x-[${listIndex * 50}%] lg:-translate-x-[${listIndex * 33.333333}%]` -->
        <div class="overflow-hidden">
            <div :style="{ translate: `${-listIndex * 100}% 0` }" class="w-full md:w-[50%] lg:w-[33.333333%] duration-[600ms] ease-in-out relative flex">
                <div v-for="review in reviewsRef" class=" min-w-full relative h-fit snap-start">
                    <CustomerReview :author-name="review.author_name"
                                    :author-photo-src="review.profile_photo_url"
                                    :review-text="review.text"
                                    :relative-time-description="review.relative_time_description"
                                    :rating="review.rating" />
                </div>
            </div>
        </div>
        
        <div class="flex pl-3 md:pl-7 my-auto min-w-12 md:min-w-[4.25rem]">
            <button v-show="listIndex < reviewsRef.length - 1" v-on:click="nextReview()" class="rounded-full w-8 h-8 p-2 bg-zinc-600/70 shadow-md cursor-pointer shadow-gray-700/30 hover:bg-zinc-800/80 duration-200">
                <svg class="fill-[white]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.04 1.96a1 1 0 0 0-1.497 1.32l.083.094L10.253 8l-4.627 4.626a1 1 0 0 0-.083 1.32l.083.094a1 1 0 0 0 1.32.084l.094-.084 5.334-5.333a1 1 0 0 0 .083-1.32l-.083-.094L7.04 1.96Z"></path></svg>
            </button>
        </div>
    </div>
</template>