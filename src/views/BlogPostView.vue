<script setup lang="ts">
    import { getConfigConst } from '@config/configValues';
    import { onBeforeRouteUpdate, useRoute } from 'vue-router';
    import { ref } from 'vue';
    import ApiService from '@/vue-helpers/apiService';
    import type IBlogPost from '@/types/blogPost';
    import PostCardSimpled from '../components/cards/PostCardSimpled.vue';
    import FileMissing from '../components/FileMissing.vue';

    const postCards = ref<IBlogPost[]>();
    const loading = ref(true);

    ApiService.GetBlogPosts(1, 3).then(blogData => postCards.value = blogData?.posts).finally(() => loading.value = false);

    const route = useRoute();
    const currentUrl = window.location.href;
    
    const model = ref(route.meta.postData as IBlogPost);

    const socialMediaConfig = getConfigConst('application.socialMedia') as Object;
    const iconsPath = Object.values(import.meta.glob<string>('@icons/social/all.svg', { eager: true, import: 'default', query: '?url' }));
    
    const socialMediaList = Object.entries(socialMediaConfig)
        .filter(([_, socialMediaInfo]) => socialMediaInfo?.shareLink as string)
        .map(([socialMediaName, socialMediaInfo]) => {
            return {
                name: socialMediaName,
                iconPath: iconsPath[0] + "#" + socialMediaName,
                shareLink: (socialMediaInfo.shareLink as string).replace('{SHARING_URL}', currentUrl)
            };
        });

    onBeforeRouteUpdate(async (to, from, next) => {
        const postData = await ApiService.GetBlogPost(Array.isArray(to.params.post) ? to.params.post[0] : to.params.post);
        model.value = postData as IBlogPost;
    });
</script>

<template>
    <div class="mx-auto px-4 sm:px-8 md:px-10 2xl:px-16 max-w-lg sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
        <article class="pt-8 pb-16 md:pb-20 md:px-16 xl:px-32 font-jost">
            <div class="text-[2.5rem] mb-8 font-jost-bold flex justify-center text-center text-zinc-700">
                <h2 class="border-l-[7px] border-[red] ps-3 leading-none pr-2">{{ $t('blog.blogTitle') }}</h2>
            </div>

            <h1 class="text-[2.5rem] md:text-5xl mb-5 font-jost-bold flex justify-center text-center text-zinc-700 leading-[1.2]">{{ model.title }}</h1>

            <div class="text-xl mb-10 font-jost flex justify-center text-center text-zinc-400">
                <h4>{{ $t('admin.blog.dateUpdatedLabel') }} {{ new Date(model.timeUpdated ?? Date.now()).toLocaleDateString() }}</h4>
            </div>

            <div v-html="model.content" class="blog-post"></div>

            <div class="mt-12 font-jost">
                <div class="text-xl mb-4 font-jost flex justify-center text-center text-zinc-400">
                    <h3>{{ $t('blog.shareViaSocialLabel') }}</h3>
                </div>

                <div class="flex flex-row gap-4 md:gap-6 justify-center">
                    <a v-for="socialMedia of socialMediaList" :key="socialMedia.name" :href="socialMedia.shareLink" target="_blank" class="relative group md:hover:bg-zinc-300 active:bg-zinc-300 rounded-full duration-200">
                        <div class="p-3 overflow-hidden cursor-pointer">
                            <svg width="28" height="28" class="text-zinc-600 md:text-zinc-500 md:group-hover:text-zinc-700 group-active:text-zinc-700">
                                <use :href="socialMedia.iconPath" />
                            </svg>
                        </div>
                        
                        <div class="max-md:hidden absolute flex bottom-[calc(100%+0.5rem)] opacity-0 left-1/2 -translate-x-1/2 w-max z-10 invisible md:group-hover:visible md:group-hover:opacity-100 md:group-hover:delay-500 duration-200">
                            <p class="flex rounded-md bg-zinc-700 text-gray-200 px-3 py-1 max-w-64 mx-auto">
                                {{ $t('blog.shareViaSocial') }} <span class="first-letter:uppercase">&nbsp;{{ socialMedia.name }}</span>
                            </p>
                        </div>
                    </a>
                </div>
            </div>

            <h2 class="text-[2.5rem] md:text-5xl mt-24 mb-12 font-jost-bold flex justify-center text-center text-zinc-700 leading-[1.2]">{{ $t('blog.readAlsoTitle') }}</h2>

            <div v-if="loading" class="flex w-full p-12 justify-center">
                <svg class="animate-spin" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z" />
                    <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" />
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
            <div v-else-if="postCards" class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <PostCardSimpled v-for="post in postCards" :init-content="post" />
            </div>
            <FileMissing v-else />

            <div class="mt-6 md:mt-8 flex justify-center">
                <router-link :to="{ name: 'media', hash: '#blog' }" class="px-7 py-3 flex items-center text-zinc-500 cursor-pointer rounded-full md:hover:bg-zinc-200 md:hover:text-zinc-700 active:bg-zinc-200 active:text-zinc-700 duration-150">
                    <svg class="mr-4 rotate-180" width="32" height="32" viewBox="0 0 22 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 8L19 12M19 12L15 16M19 12H5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <h4 class="flex font-jost-medium text-2xl">{{ $t('blog.goBackToBlog') }}</h4>
                </router-link>
            </div>
        </article>
    </div>
</template>
