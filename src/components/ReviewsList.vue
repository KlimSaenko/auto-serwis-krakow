<script setup lang="ts">
    import GoogleServices from '@/vue-helpers/googleServices';
    import CustomerReview from './cards/CustomerReview.vue';
    import { useI18n } from 'vue-i18n';
    import { ref, onMounted, watch } from 'vue';

    const props = defineProps({ 
        googleServices: {
            type: GoogleServices,
            required: false
        }
    });

    const { locale } = useI18n();

    const services = props.googleServices ?? new GoogleServices(locale.value);

    const listIndex = ref(0);
    const reviews = ref<google.maps.places.PlaceReview[]>([]);

    watch(locale, () => refresh());

    onMounted(() => {
        refresh();
    });

    function refresh() {
        loadReviews();
    }

    async function loadReviews(){
        const googlePlacesApiUrl = await fetch(services.GooglePlacesApiUrl(locale.value));
        const detailsJson = await googlePlacesApiUrl.json();
        const details = detailsJson as google.maps.places.PlaceResult;

        reviews.value = details.reviews ?? [];
    }

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
    <section>
        <div class="flex mb-12 justify-center text-center">
            <h1 class="text-5xl font-jost-bold text-zinc-800 leading-[1.2]">{{ $t('home.whatPeopleSayTitle') }}</h1>
        </div>

        <div class="flex justify-center">
            <div class="flex pr-2 md:pr-6 my-auto min-w-10 md:min-w-[4.25rem] justify-end">
                <button v-show="listIndex > 0" @click="prevReview" class="rounded-full w-8 h-8 p-2 bg-zinc-600/70 shadow-md cursor-pointer shadow-gray-700/30 hover:bg-zinc-800/80 duration-150">
                    <svg class="fill-[white]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.96 1.96a1 1 0 0 1 1.497 1.32l-.083.094L5.747 8l4.627 4.626a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.084l-.094-.084-5.334-5.333a1 1 0 0 1-.083-1.32l.083-.094L8.96 1.96Z"></path></svg>
                </button>
            </div>

            <div class="overflow-hidden">
                <div :style="{ translate: `${ -listIndex * 100 }% 0` }" :aria-colindex="listIndex" class="w-full md:w-1/2 lg:w-1/3 duration-[600ms] ease-in-out relative flex">
                    <div v-for="review in reviews" class="min-w-full relative h-fit snap-start">
                        <CustomerReview :author-name="(review as any).authorAttribution.displayName"
                                        :author-photo-src="(review as any).authorAttribution.photoUri"
                                        :review-text="(review as any).text.text"
                                        :relative-time-description="(review as any).relativePublishTimeDescription"
                                        :rating="review.rating"
                                        :author-url="(review as any).authorAttribution.uri" />
                    </div>
                </div>
            </div>
            
            <div class="flex pl-2 sm:pl-6 my-auto min-w-10 sm:min-w-[4.25rem]">
                <button v-show="listIndex < reviews.length - 1" @click="nextReview" :aria-colindex="reviews.length - listIndex" class="rounded-full w-8 h-8 p-2 bg-zinc-600/70 lg:aria-[colindex='3']:hidden md:aria-[colindex='2']:hidden shadow-md cursor-pointer shadow-gray-700/30 hover:bg-zinc-800/80 duration-150">
                    <svg class="fill-[white]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.04 1.96a1 1 0 0 0-1.497 1.32l.083.094L10.253 8l-4.627 4.626a1 1 0 0 0-.083 1.32l.083.094a1 1 0 0 0 1.32.084l.094-.084 5.334-5.333a1 1 0 0 0 .083-1.32l-.083-.094L7.04 1.96Z"></path></svg>
                </button>
            </div>
        </div>
    </section>
</template>