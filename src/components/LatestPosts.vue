<script setup lang="ts">
    import type IBlogPost from '@/types/blogPost';
    import PostCard from './cards/PostCard.vue';
    import ApiService from '@/vue-helpers/apiService';
    import { ref } from 'vue';
    import FileMissing from './FileMissing.vue';

    const postCards = ref<IBlogPost[]>();
    const loading = ref(true);

    ApiService.GetBlogPosts(1, 3).then(blogData => postCards.value = blogData?.posts).finally(() => loading.value = false);
</script>

<template>
    <section>
        <div class="flex mb-14 md:mb-20 justify-center text-center">
            <h1 class="text-[2.5rem] md:text-5xl font-jost-bold text-zinc-800 leading-[1.2]">{{ $t('home.postsTitle') }}</h1>
        </div>

        <div v-if="loading" class="flex w-full p-12 justify-center">
            <svg class="animate-spin" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" />
                <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
        <div v-else-if="postCards" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-xl:gap-x-8">
            <PostCard v-for="post in postCards" :init-content="post" />
        </div>
        <FileMissing v-else />
        
        <div class="mt-8 md:mt-12 flex justify-center">
            <router-link :to="{ name: 'media', hash: '#blog' }" class="px-7 py-3 flex items-center text-zinc-500 cursor-pointer rounded-full md:hover:bg-zinc-200 md:hover:text-zinc-700 active:bg-zinc-200 active:text-zinc-700 duration-150">
                <h4 class="flex font-jost-medium text-2xl">{{ $t('blog.goToBlog') }}</h4>
                <svg class="ms-4" width="32" height="32" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 8L19 12M19 12L15 16M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </router-link>
        </div>
    </section>
</template>