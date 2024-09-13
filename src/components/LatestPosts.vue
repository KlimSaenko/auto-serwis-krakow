<script setup lang="ts">
    import PostCard from './cards/PostCard.vue';
</script>

<template>
    <section>
        <div class="flex mt-32 mb-20 justify-center text-center">
            <h1 class="text-5xl font-jost-bold text-zinc-800 leading-[1.2]">{{ $t('home.postsTitle') }}</h1>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <PostCard />
            <PostCard />
            <PostCard class="max-lg:hidden" />
        </div>

        <div class="mt-12 flex justify-center">
            <router-link :to="{ name: 'media', hash: '#blog' }" class="px-7 py-3 flex items-center text-zinc-500 cursor-pointer rounded-full hover:bg-zinc-200 hover:text-zinc-700 duration-150">
                <h4 class="flex font-jost-medium text-2xl">{{ $t('blog.goToBlog') }}</h4>
                <svg class="ms-4" width="32" height="32" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 8L19 12M19 12L15 16M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </router-link>
        </div>
    </section>
</template>