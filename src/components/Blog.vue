<script setup lang="ts">
    import PostCard from './cards/PostCard.vue';
</script>

<template>
    <section class="relative">
        <div id="blog" class="absolute top-[calc(-4rem-10vh)] h-0"></div>

        <div class="flex mb-11 md:mb-14 justify-center text-center px-4 sm:px-8 md:px-10 2xl:px-16">
            <h2 class="text-[2.5rem] md:text-5xl font-jost-bold text-zinc-800 leading-[1.2]">{{ $t('media.ourBlogTitle') }}</h2>
        </div>

        <div class="mx-auto px-4 sm:px-8 md:px-10 2xl:px-16 max-w-lg sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-y-14 max-xl:gap-x-8">
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard class="max-lg:hidden" />
                <PostCard class="max-lg:hidden" />
            </div>

            <nav class="flex justify-center mt-14 font-jost-medium text-zinc-500">
                <ul class="flex -space-x-px text-md">
                    <li>
                        <a href="#" class="flex items-center justify-center px-3 h-11 aspect-square ms-0 leading-tight bg-white border border-e-0 border-zinc-300 rounded-s-lg md:hover:bg-zinc-100 md:hover:text-zinc-700 active:bg-zinc-100 active:text-zinc-700">
                            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                            </svg>
                        </a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center px-3 h-11 aspect-square leading-tight bg-white border border-zinc-300 md:hover:bg-zinc-100 md:hover:text-zinc-700">1</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center px-3 h-11 aspect-square leading-tight bg-white border border-zinc-300 md:hover:bg-zinc-100 md:hover:text-zinc-700">2</a>
                    </li>
                    <li>
                        <a href="#" class="z-20 flex items-center justify-center px-3 h-11 aspect-square leading-tight text-zinc-700 border border-zinc-300 bg-zinc-100 md:hover:bg-zinc-200 md:hover:text-black">3</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center px-3 h-11 aspect-square leading-tight bg-white border border-zinc-300 md:hover:bg-zinc-100 md:hover:text-zinc-700">4</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center px-3 h-11 aspect-square leading-tight bg-white border border-zinc-300 md:hover:bg-zinc-100 md:hover:text-zinc-700">5</a>
                    </li>
                    <li>
                        <a href="#" class="flex items-center justify-center px-3 h-11 aspect-square leading-tight bg-white border border-zinc-300 rounded-e-lg md:hover:bg-zinc-100 md:hover:text-zinc-700 active:bg-zinc-100 active:text-zinc-700">
                            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </section>
</template>