<script setup lang="ts">
    // import GoogleServices from '@/vue-helpers/googleServices';
    import CustomerReview from './cards/CustomerReview.vue';
    import { useI18n } from 'vue-i18n';
    import { ref, onMounted, watch } from 'vue';
    import { getConfigConst } from '@/vue-helpers/configValues';
    import ApiService from '@/vue-helpers/apiService';

    // const props = defineProps({ 
    //     googleServices: {
    //         type: GoogleServices,
    //         required: false
    //     }
    // });

    const { locale } = useI18n();

    // const services = props.googleServices ?? new GoogleServices(locale.value);

    const listIndex = ref(0);
    const reviews = ref<google.maps.places.Review[]>([]);

    watch(locale, () => refresh());

    onMounted(() => {
        refresh();
    });

    function refresh() {
        loadReviews();
    }

    async function loadReviews(){
        const googleReviews = await ApiService.GetGoogleReviews(locale.value);
        if (googleReviews){
            reviews.value = googleReviews;
        }
    }

    // async function loadReviews(){
    //     const googlePlacesDetails = await fetch(services.GooglePlacesApiUrl(locale.value), { method: 'GET'});

    //     if (googlePlacesDetails.ok){
    //         const detailsJson = await googlePlacesDetails.json();
    //         const details = detailsJson as google.maps.places.PlaceResult;
            
    //         if (details.reviews){
    //             reviews.value = details.reviews;
    //         }
    //     }
    // }

    function nextReview(){
        if (listIndex.value < reviews.value.length - 1){
            listIndex.value++;
        }
    }

    function prevReview(){
        if (listIndex.value > 0){
            listIndex.value--;
        }
    }
</script>

<template>
    <section>
        <div class="flex mb-12 justify-center text-center">
            <h2 class="text-[2.5rem] md:text-5xl font-jost-bold text-zinc-800 leading-[1.2]">{{ $t('home.whatPeopleSayTitle') }}</h2>
        </div>

        <div class="flex justify-center relative">
            <button :aria-hidden="listIndex <= 0" @click="prevReview" class="z-50 p-2 aria-hidden:invisible ml-auto text-zinc-500 max-sm:absolute max-sm:top-1/2 max-sm:-translate-y-1/2 max-sm:-left-1 sm:p-4 max-sm:aspect-square max-sm:rounded-full max-sm:bg-zinc-700/70 max-sm:text-white lg:hover:text-zinc-600 lg:hover:bg-zinc-200 active:bg-zinc-300 active:text-zinc-600 rounded-xl duration-150">
                <svg class="w-6 sm:w-12 aspect-square rotate-180" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.04 1.96a1 1 0 0 0-1.497 1.32l.083.094L10.253 8l-4.627 4.626a1 1 0 0 0-.083 1.32l.083.094a1 1 0 0 0 1.32.084l.094-.084 5.334-5.333a1 1 0 0 0 .083-1.32l-.083-.094L7.04 1.96Z" />
                </svg>
            </button>

            <div class="overflow-hidden pt-3">
                <div :style="{ translate: `${ -listIndex * 100 }% 0` }" :aria-colindex="listIndex" class="w-full md:w-1/2 xl:w-1/3 duration-[600ms] ease-in-out relative flex">
                    <div v-for="review in reviews" class="min-w-full relative h-fit snap-start">
                        <CustomerReview :author-name="review.authorAttribution?.displayName ?? 'Hidden'"
                                        :author-photo-src="review.authorAttribution?.photoURI ?? undefined"
                                        :review-text="review.text ?? 'Hidden'"
                                        :relative-time-description="review.relativePublishTimeDescription ?? 'Hidden'"
                                        :rating="review.rating ?? undefined"
                                        :author-url="review.authorAttribution?.uri ?? undefined"
                                        class="max-sm:mx-10 m-5" />
                    </div>
                </div>
            </div>
            
            <button :aria-hidden="listIndex >= reviews.length - 1" @click="nextReview" :aria-colindex="reviews.length - listIndex" class="z-50 p-2 aria-hidden:invisible mr-auto text-zinc-500 max-sm:absolute max-sm:top-1/2 max-sm:-translate-y-1/2 max-sm:-right-1 sm:p-4 max-sm:aspect-square max-sm:rounded-full xl:aria-[colindex='3']:invisible md:aria-[colindex='2']:invisible max-sm:bg-zinc-700/70 max-sm:text-white lg:hover:text-zinc-600 lg:hover:bg-zinc-200 active:bg-zinc-300 active:text-zinc-600 rounded-xl duration-150">
                <svg class="w-6 sm:w-12 aspect-square" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M7.04 1.96a1 1 0 0 0-1.497 1.32l.083.094L10.253 8l-4.627 4.626a1 1 0 0 0-.083 1.32l.083.094a1 1 0 0 0 1.32.084l.094-.084 5.334-5.333a1 1 0 0 0 .083-1.32l-.083-.094L7.04 1.96Z" />
                </svg>
            </button>
        </div>

        <div class="flex justify-center mt-9">
            <a :href="(getConfigConst('corporateInfo.googleMapsReviewsLink') as string)" target="_blank" class="group px-4 py-2 flex rounded-2xl cursor-pointer md:hover:bg-zinc-200 active:bg-zinc-200 duration-150">
                <div class="mr-5">
                    <div class="text-6xl font-jost-medium tracking-tight">
                        <span>4.9</span>
                    </div>
                    <div class="h-4 mt-1 inline-flex">
                        <svg v-for="_ in 5" class="max-h-full fill-[orange]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
                    </div>
                </div>

                <div class="h-full flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 24 24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        <path d="M1 1h22v22H1z" fill="none"/>
                    </svg>
                </div>

                <div class="text-2xl font-jost-medium text-zinc-500 md:group-hover:text-zinc-700 group-active:bg-zinc-300 flex items-center ms-4">
                    <span class="w-min">Google Reviews</span>
                    <svg class="ms-6" width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </a>
        </div>
    </section>
</template>