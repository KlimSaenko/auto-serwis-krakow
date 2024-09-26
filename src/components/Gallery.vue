<script setup lang="ts">
    import { ref } from 'vue';
    import GalleryImage from '../types/galleryImage';
	import { getConfigConst } from '@/vue-helpers/configValues';

    const paredImages = ref<GalleryImage[][]>();
	const imagesIndex = ref(1);
    const galleryImagesConfig = getConfigConst('application.galleryImages') as [[]];
    const imagePreview = ref<GalleryImage | undefined>(undefined);

	populateImages();

	function populateImages(){
        const imagesPage = galleryImagesConfig[imagesIndex.value];

        if (Array.isArray(imagesPage)){
            const allImages = imagesPage.map((width, index) =>
                new GalleryImage('https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&q=75&fit=crop&w=600', `Service ${index + 1}`, width)
            );
            paredImages.value = [allImages.slice(0, Math.floor(allImages.length / 2)), allImages.slice(Math.floor(allImages.length / 2))];
        }
	}

    function nextImagesIndex(){
        if (imagesIndex.value === 3)
            imagesIndex.value = 1;
        else imagesIndex.value++;
    }

    function prevImagesIndex(){
        if (imagesIndex.value === 1)
            imagesIndex.value = 3;
        else imagesIndex.value--;
    }

    function setImagesIndex(index: number){
        if (index < 1 || index > 3){
            return;
        }
        imagesIndex.value = index;
    }
</script>

<style lang="css">
    .fade-image-enter-active,
    .fade-image-leave-active {
        transition: opacity 0.2s ease-out;
    }

    .fade-image-enter-from,
    .fade-image-leave-to {
        opacity: 0;
    }
</style>

<template>
    <section>
        <div class="flex mb-11 md:mb-14 justify-center text-center">
            <h1 class="text-[2.5rem] md:text-5xl font-jost-bold text-zinc-800 leading-[1.2]">{{ $t('media.galleryTitle') }}</h1>
        </div>

        <div class="w-full">
            <div class="flex w-full relative">
                <button @click="prevImagesIndex" class="z-50 p-2.5 ml-auto text-zinc-500 max-sm:absolute max-sm:top-1/2 max-sm:-translate-y-1/2 max-sm:left-2 sm:p-4 max-sm:aspect-square max-sm:rounded-full max-sm:bg-zinc-700/80 max-sm:text-white lg:hover:text-zinc-600 lg:hover:bg-zinc-200 active:bg-zinc-300 active:text-zinc-600 rounded-xl duration-150">
                    <svg class="w-8 sm:w-12 aspect-square rotate-180" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M7.04 1.96a1 1 0 0 0-1.497 1.32l.083.094L10.253 8l-4.627 4.626a1 1 0 0 0-.083 1.32l.083.094a1 1 0 0 0 1.32.084l.094-.084 5.334-5.333a1 1 0 0 0 .083-1.32l-.083-.094L7.04 1.96Z" />
                    </svg>
                </button>
                
                <div class="max-sm:px-8 sm:px-2 w-full md:px-4 2xl:px-16 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
                    <div v-for="(images, rowIndex) in paredImages" :aria-colspan="imagesIndex"
                        :class="rowIndex === 0 ?
                                `md:aria-[colspan='1']:grid-cols-[20fr,30fr,25fr,25fr] md:aria-[colspan='2']:grid-cols-[25fr,25fr,30fr,20fr] md:aria-[colspan='3']:grid-cols-[30fr,25fr,20fr,25fr] max-md:mb-3` :
                                `md:aria-[colspan='1']:grid-cols-[25fr,25fr,30fr,20fr] md:aria-[colspan='2']:grid-cols-[30fr,25fr,20fr,25fr] md:aria-[colspan='3']:grid-cols-[20fr,30fr,25fr,25fr]`
                        "
                        class="group/aria w-full font-jost grid grid-cols-2 md:grid-rows-[auto,auto] md:grid-cols-4 md:aria-[colspan='1']:grid-cols-[20fr,30fr,25fr,25fr] md:aria-[colspan='2']:grid-cols-[25fr,25fr,30fr,20fr] md:aria-[colspan='3']:grid-cols-[30fr,25fr,20fr,25fr] duration-[400ms] gap-3 xl:gap-4">
                        <div v-for="image in images" @click="imagePreview = image" class="h-48 md:h-40 xl:h-48 2xl:h-52 align-text-bottom group cursor-pointer relative flex overflow-hidden rounded-xl bg-zinc-300 shadow-lg shadow-black/20">
                            <div class="absolute inset-0 h-full w-full -translate-x-full z-0 group-aria-[colspan='1']/aria:translate-x-0 group-aria-[colspan='1']/aria:z-20 group-aria-[colspan='3']/aria:translate-x-full duration-[400ms]">
                                <img :src="image.ImgUrl" loading="lazy" :alt="image.AltText" class="h-full w-full object-cover object-center transition duration-200 md:group-hover:scale-110" />
                                <span class="absolute ms-2 bottom-3 inline-block text-sm text-white md:ml-5 md:text-lg drop-shadow-xl">{{ image.Label }}</span>
                            </div>

                            <div class="absolute inset-0 h-full w-full translate-x-0 z-0 group-aria-[colspan='1']/aria:translate-x-full group-aria-[colspan='2']/aria:z-20 group-aria-[colspan='3']/aria:-translate-x-full duration-[400ms]">
                                <img :src="image.ImgUrl" loading="lazy" :alt="image.AltText" class="h-full w-full object-cover object-center transition duration-200 md:group-hover:scale-110" />
                                <span class="absolute ms-2 bottom-3 inline-block text-sm text-white md:ml-5 md:text-lg drop-shadow-xl">{{ image.Label }}</span>
                            </div>

                            <div class="absolute inset-0 h-full w-full translate-x-full z-0 group-aria-[colspan='3']/aria:translate-x-0 group-aria-[colspan='3']/aria:z-20 group-aria-[colspan='1']/aria:-translate-x-full duration-[400ms]">
                                <img :src="image.ImgUrl" loading="lazy" :alt="image.AltText" class="h-full w-full object-cover object-center transition duration-200 md:group-hover:scale-110" />
                                <span class="absolute ms-2 bottom-3 inline-block text-sm text-white md:ml-5 md:text-lg drop-shadow-xl">{{ image.Label }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button @click="nextImagesIndex" class="z-50 p-2.5 mr-auto text-zinc-500 max-sm:absolute max-sm:top-1/2 max-sm:-translate-y-1/2 max-sm:right-2 sm:p-4 max-sm:aspect-square max-sm:rounded-full max-sm:bg-zinc-700/80 max-sm:text-white lg:hover:text-zinc-600 lg:hover:bg-zinc-200 active:bg-zinc-300 active:text-zinc-600 rounded-xl duration-150">
                    <svg class="w-8 sm:w-12 aspect-square" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M7.04 1.96a1 1 0 0 0-1.497 1.32l.083.094L10.253 8l-4.627 4.626a1 1 0 0 0-.083 1.32l.083.094a1 1 0 0 0 1.32.084l.094-.084 5.334-5.333a1 1 0 0 0 .083-1.32l-.083-.094L7.04 1.96Z" />
                    </svg>
                </button>
            </div>
            
            <div class="flex justify-center mt-9 md:mt-7">
                <div :aria-index="imagesIndex" class="group relative w-[9rem] h-[0.8rem] rounded-full bg-neutral-200 border shadow-sm cursor-pointer">
                    <a @click="setImagesIndex(1)" class="absolute left-0 w-[3.4rem] h-full rounded-full md:hover:bg-zinc-300 active:bg-zinc-300">
                    </a>

                    <a @click="setImagesIndex(2)" class="absolute left-[2.8rem] w-[3.4rem] h-full rounded-full md:hover:bg-zinc-300 active:bg-zinc-300">
                    </a>

                    <a @click="setImagesIndex(3)" class="absolute right-0 w-[3.4rem] h-full rounded-full md:hover:bg-zinc-300 active:bg-zinc-300">
                    </a>

                    <div class="absolute group-aria-[index='1']:left-0 group-aria-[index='2']:left-[2.8rem] group-aria-[index='3']:left-[5.6rem] w-[3.4rem] h-full rounded-full bg-[red] duration-[400ms]">
                    </div>
                </div>
            </div>
        </div>

        <transition name="fade-image" mode="out-in">
			<div v-if="imagePreview" class="fixed inset-0 bg-zinc-950/65 z-[300] flex items-center justify-center">
                <div class="flex content-center pt-28 m-8 md:m-16 flex-wrap flex-col">
                    <img :src="imagePreview.ImgUrl" loading="lazy" :alt="imagePreview.AltText" class="max-h-full max-w-full object-cover object-center rounded-2xl" />
                    <label class="mt-5 font-jost-medium text-zinc-200 text-2xl text-center">{{ imagePreview.Label }}</label>
                </div>

                <button @click="imagePreview = undefined" class="absolute right-5 top-[5.5rem] md:top-[8.5rem] w-16 h-16 text-gray-200 md:hover:text-white active:text-white rounded-full p-2.5 md:hover:bg-white/20 active:bg-white/20 duration-150">
					<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 96 96">
						<path d="m53.657 48 25.171-25.172a4 4 0 1 0-5.656-5.656L48 42.343 22.829 17.172a4 4 0 0 0-5.657 5.656L42.344 48 17.172 73.172a4 4 0 1 0 5.657 5.656L48 53.657l25.172 25.171C73.953 79.609 74.977 80 76 80s2.048-.391 2.828-1.172a4 4 0 0 0 0-5.656L53.657 48z"></path>
					</svg>
				</button>
            </div>
        </transition>
    </section>
</template>