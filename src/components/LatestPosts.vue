<script setup lang="ts">
    import PostCard from './cards/PostCard.vue';
</script>

<template>
    <div class="flex mt-28 mb-20 justify-center">
        <h1 class="text-5xl font-jost-bold text-zinc-800">{{ $t('home.postsTitle') }}</h1>
    </div>
    <div class="columns-3 gap-8">
        <PostCard />
        <PostCard />
        <PostCard />
    </div>
</template>