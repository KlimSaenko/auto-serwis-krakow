<script setup lang="ts">
    import { getConfigConst } from '@/vue-helpers/configValues';
    import { onBeforeRouteUpdate } from 'vue-router';

    onBeforeRouteUpdate(async (to, from, next) => {
        if (to.params.post && to.params.post === 'dodge-car'){
            next();
        } else {
            let query = to.fullPath.match(/^\/$/) ? {} : { redirect: to.fullPath }
            next({
                path: from.fullPath,
                query: query
            });
        };
    });

    const socialMediaConfig = getConfigConst('application.socialMedia') as Object;
    const iconsPath = Object.values(import.meta.glob<string>('@icons/social/all.svg', { eager: true, import: 'default', query: '?url' }));
    
    const socialMediaList = Object.entries(socialMediaConfig).map(([socialMediaName, socialMediaInfo]) => {
        return {
            name: socialMediaName,
            iconPath: iconsPath[0] + "#" + socialMediaName,
            info: socialMediaInfo
        };
    });
</script>

<template>
    <div class="px-8 mx-auto md:px-10 2xl:px-16 max-w-lg sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
        <article class="pt-8 pb-16 md:pb-20 md:px-16 xl:px-32">
            <div class="text-[2.5rem] mb-8 font-jost-bold flex justify-center text-center text-zinc-700">
                <h2 class="border-l-[7px] border-[red] ps-3 leading-none pr-2">{{ $t('blog.blogTitle') }}</h2>
            </div>

            <h1 class="text-[2.5rem] md:text-5xl mb-4 font-jost-bold flex justify-center text-center text-zinc-700 leading-[1.2]">Lorem ipsum dolor sit amet</h1>

            <div class="text-xl mb-10 font-jost flex justify-center text-center text-zinc-400">
                <h4>Updated on September 3, 2024</h4>
            </div>

            <div class="aspect-[7/5] md:aspect-[7/4] rounded-2xl overflow-hidden">
                <img src="https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" loading="lazy" alt="" class="h-full w-full object-cover object-center" />
            </div>

            <div class="text-xl mt-3 mb-10 font-jost flex justify-center text-center text-zinc-400">
                <h4>Photo by Front Auto</h4>
            </div>

            <div class="my-10 mb-11 text-2xl max-md:pl-1 font-jost text-zinc-700">
                <p class="my-10">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ratione vel. Odit quis possimus dolorem, dicta tempore corporis laboriosam eaque esse. Consectetur accusamus in soluta consequuntur officia, sint natus amet!
                </p>

                <p class="my-10">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ratione vel. Odit quis possimus dolorem, dicta tempore corporis laboriosam eaque esse. Consectetur accusamus in soluta consequuntur officia, sint natus amet!
                </p>
            </div>

            <div class="mt-12 font-jost">
                <div class="text-xl mb-4 font-jost flex justify-center text-center text-zinc-400">
                    <h3>{{ $t('blog.shareViaSocialLabel') }}</h3>
                </div>

                <div class="flex flex-row gap-6 justify-center">
                    <div v-for="socialMedia of socialMediaList" :key="socialMedia.name" class="relative group md:hover:bg-zinc-300 active:bg-zinc-300 rounded-full duration-200">
                        <div class="p-3 overflow-hidden cursor-pointer">
                            <svg width="28" height="28" class="text-zinc-600 md:text-zinc-500 md:group-hover:text-zinc-700 group-active:text-zinc-700">
                                <use :href="socialMedia.iconPath" />
                            </svg>
                        </div>
                        
                        <div class="max-md:hidden absolute flex bottom-[calc(100%+0.5rem)] opacity-0 left-1/2 -translate-x-1/2 w-max z-10 invisible md:group-hover:visible md:group-hover:opacity-100 md:group-hover:delay-500 duration-200 pointer-events-none">
                            <p class="flex rounded-md bg-zinc-700 text-gray-200 px-2 py-1 pl-3 max-w-64 mx-auto">
                                {{ $t('blog.shareViaSocial') }} <span class="first-letter:uppercase">&nbsp;{{ socialMedia.name }}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <h2 class="text-[2.5rem] md:text-5xl mt-24 mb-12 font-jost-bold flex justify-center text-center text-zinc-700 leading-[1.2]">{{ $t('blog.readAlsoTitle') }}</h2>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <PostCardSimpled />
                <PostCardSimpled />
                <PostCardSimpled class="max-md:hidden" />
            </div>

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
