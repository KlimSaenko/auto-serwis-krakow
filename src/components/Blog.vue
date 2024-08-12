<script setup lang="ts">
    import PostCard from './cards/PostCard.vue';
</script>

<template>
    <section>
        <div class="flex mb-16 justify-center text-center">
            <h1 class="text-5xl font-jost-bold text-zinc-800 leading-[1.2]">{{ $t('media.ourBlogTitle') }}</h1>
        </div>

        <div class="px-8 mx-auto md:px-10 2xl:px-16 max-w-lg sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 md:gap-y-16">
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard class="max-lg:hidden" />
                <PostCard class="max-lg:hidden" />
            </div>
        </div>
    </section>
</template>