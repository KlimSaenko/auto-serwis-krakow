<script setup lang="ts">
    import { ref, watch } from 'vue';
    import PostCard from './cards/PostCard.vue';
    import AdminInputListener from '@/vue-helpers/adminInputListener';
    import ApiService from '@/vue-helpers/apiService';
    import type IBlogPost from '@/types/blogPost';

    const isAdminAuthorized = ref(false);
    const postCards = ref<IBlogPost[]>();
    const pageIndex = ref(1);
    const pageCount = ref(1);

    watch(AdminInputListener.IsAuthorized, async isAuthorized => {
        isAdminAuthorized.value = await isAuthorized;
    }, { immediate: true });

    watch(pageIndex, async index => {
        const blogData = await ApiService.GetBlogPosts(index);

        if (blogData){
            if (pageCount.value !== blogData.pageCount){
                pageCount.value = blogData.pageCount;
            }
            
            postCards.value = blogData.posts.map(post => post as IBlogPost);
        }
    }, { immediate: true });

    function onPrevPage(){
        if (pageIndex.value > 1){
            pageIndex.value--;
        }
    }

    function onNextPage(){
        if (pageIndex.value < pageCount.value){
            pageIndex.value++;
        }
    }
</script>

<template>
    <section class="relative mx-auto px-4 sm:px-8 md:px-10 2xl:px-16 max-w-lg sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
        <div id="blog" class="absolute top-[calc(-4rem-10vh)] h-0"></div>

        <div class="flex mb-12 md:mb-16 justify-center text-center px-4 sm:px-8 md:px-10 2xl:px-16">
            <h2 class="text-[2.5rem] md:text-5xl font-jost-bold text-zinc-800 leading-[1.2]">{{ $t('media.ourBlogTitle') }}</h2>
        </div>

        <div v-if="isAdminAuthorized">
            <div class="w-full my-20 overflow-hidden rounded-xl shadow-xl border bg-white">
                <div class="flex flex-row gap-2 px-6 py-2 bg-white rounded-t-xl shadow-md">
                    <p class="text-lg font-jost-medium text-zinc-600 select-none">{{ $t('admin.blog.adminModeLabel') }}:</p>
                </div>

                <div class="flex justify-around p-6 font-jost text-xl">
                    <router-link :to="{ name: 'admin-blog-create' }" class="flex px-4 py-3 items-center text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 rounded-md duration-150">
                        <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <rect height="18" rx="2" ry="2" width="18" x="3" y="3"/>
                            <line x1="12" x2="12" y1="8" y2="16"/>
                            <line x1="8" x2="16" y1="12" y2="12"/>
                        </svg>
                        <span class="ms-3">{{ $t('admin.blog.createPost') }}</span>
                    </router-link>
                </div>
            </div>
        </div>

        <div v-if="postCards">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-y-14 max-xl:gap-x-8">
                <PostCard v-for="card in postCards" :init-content="card" />
            </div>

            <nav class="flex justify-center mt-14 font-jost-medium text-zinc-500">
                <ul class="flex -space-x-px text-md">
                    <li>
                        <button @click="onPrevPage" :aria-disabled="pageIndex <= 1" class="flex aria-disabled:pointer-events-none aria-disabled:cursor-none items-center justify-center px-3 h-11 aspect-square ms-0 leading-tight bg-white border border-e-0 border-zinc-300 rounded-s-lg md:hover:bg-zinc-100 md:hover:text-zinc-700 active:bg-zinc-100 active:text-zinc-700">
                            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                            </svg>
                        </button>
                    </li>
                    <li v-for="n in pageCount">
                        <button @click="pageIndex = n" :aria-selected="n === pageIndex" class="flex items-center justify-center px-3 h-11 aspect-square leading-tight bg-white border border-zinc-300 md:hover:bg-zinc-100 md:hover:text-zinc-700 aria-selected:bg-zinc-100 aria-selected:text-zinc-700 aria-selected:md:hover:bg-zinc-200 aria-selected:md:hover:text-black">
                            <span>{{ n }}</span>
                        </button>
                    </li>
                    <li>
                        <button @click="onNextPage" :aria-disabled="pageIndex >= pageCount" class="flex aria-disabled:pointer-events-none aria-disabled:cursor-none items-center justify-center px-3 h-11 aspect-square leading-tight bg-white border border-zinc-300 rounded-e-lg md:hover:bg-zinc-100 md:hover:text-zinc-700 active:bg-zinc-100 active:text-zinc-700">
                            <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
                            </svg>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
        <div v-else class="flex w-full p-12 justify-center">
            <svg class="animate-spin" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" />
                <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    </section>
</template>