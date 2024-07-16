<script setup lang="ts">
    import PostCard from './cards/PostCard.vue';
</script>

<template>
    <div class="flex mt-32 mb-20 justify-center text-center">
        <h1 class="text-5xl font-jost-bold text-zinc-800 leading-[1.2]">{{ $t('home.postsTitle') }}</h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-8 gap-10">
        <PostCard />
        <PostCard />
        <PostCard class="max-lg:hidden" />
    </div>
</template>