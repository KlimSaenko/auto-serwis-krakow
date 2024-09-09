<script setup lang="ts">
    const props = defineProps({ 
        reviewText: {
            type: String,
            required: true
        },
        authorName: {
            type: String,
            required: true
        },
        authorPhotoSrc: {
            type: String,
            required: false
        },
        relativeTimeDescription: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: false
        },
        authorUrl: {
            type: String,
            required: false
        }
    });
</script>

<template>
    <div class="m-2 md:m-5 !mt-8 max-h-96 font-jost text-zinc-500">
        <a :href="authorUrl" target="_blank" class="flex group hover:bg-zinc-200 py-3 px-2 cursor-pointer rounded-xl relative duration-150">
            <div class="flex relative">
                <div class="flex rounded-full ring-1 ring-black ring-opacity-10 bg-zinc-300 w-11">
                    <img :src="authorPhotoSrc" :srcset="authorPhotoSrc" :alt="authorName" loading="lazy" class="h-11 w-11" >
                </div>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 25" class="absolute -bottom-[0.35rem] -right-[0.35rem] h-6 w-6" data-src="https://static.elfsight.com/icons/app-all-in-one-reviews-icons-google-multicolor-stroke.svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g clip-path="url(#a-1)"><path fill="#fff" stroke="#fff" stroke-linejoin="round" stroke-width="2" d="M11.8 1.5C5.835 1.5 1 6.335 1 12.3v.4c0 5.965 4.835 10.8 10.8 10.8 5.965 0 10.8-4.835 10.8-10.8v-.4c0-5.965-4.835-10.8-10.8-10.8Z"></path><path fill="#2A84FC" d="M21.579 12.734c0-.677-.055-1.358-.172-2.025h-9.403v3.839h5.384a4.614 4.614 0 0 1-1.992 3.029v2.49h3.212c1.886-1.736 2.97-4.3 2.97-7.333Z"></path><path fill="#00AC47" d="M12.004 22.474c2.688 0 4.956-.882 6.608-2.406l-3.213-2.491c-.893.608-2.047.952-3.392.952-2.6 0-4.806-1.754-5.597-4.113H3.095v2.567a9.97 9.97 0 0 0 8.909 5.491Z"></path><path fill="#FFBA00" d="M6.407 14.416a5.971 5.971 0 0 1 0-3.817V8.03H3.095a9.977 9.977 0 0 0 0 8.952l3.312-2.567Z"></path><path fill="#FC2C25" d="M12.004 6.482a5.417 5.417 0 0 1 3.824 1.494l2.846-2.846a9.581 9.581 0 0 0-6.67-2.593A9.967 9.967 0 0 0 3.095 8.03l3.312 2.57c.787-2.363 2.996-4.117 5.597-4.117Z"></path></g><defs><clipPath id="a-1"><path fill="#fff" d="M0 0h24v24H0z" transform="translate(0 .5)"></path></clipPath></defs></svg>
            </div>
            <div class="ml-4">
                <p class="flex font-jost-bold text-zinc-800 items-center group-hover:underline underline-offset-2 leading-5 line-clamp-1">
                    {{ authorName }}
                    <svg class="md:hidden ml-3 min-w-5" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </p>
                <span class="text-[0.8rem] leading-5">{{ relativeTimeDescription }}</span>
            </div>

            <div :class="authorUrl ? 'max-md:hidden' : 'hidden'" class="tooltip absolute flex bottom-full opacity-0 left-0 right-0 z-10 invisible group-hover:visible group-hover:opacity-100 group-hover:delay-500 duration-200 font-jost pointer-events-none">
                <p class="flex rounded-md bg-zinc-700 text-gray-200 px-2 py-1 pl-3 max-w-64 mx-auto">
                    {{ $t('customerReview.goToComment') }} 
                    <svg class="ml-1 p-[2px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </p>
            </div>
        </a>
        <div class="px-2">
            <div v-if="rating" class="h-4 mt-1 inline-flex">
                <svg v-for="index in 5" :class="index <= rating ? 'fill-[orange]' : 'fill-zinc-400'" class="max-h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"/></svg>
            </div>
            <p class="text-[1.075rem] mt-1 leading-6 line-clamp-[8]">{{ reviewText }}</p>
        </div>
    </div>
</template>