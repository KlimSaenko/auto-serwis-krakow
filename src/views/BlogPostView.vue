<script setup lang="ts">
    import { getConfigConst } from '@/vue-helpers/configValues';
    import { onBeforeRouteUpdate } from 'vue-router';

    onBeforeRouteUpdate(async (to, from, next) => {
        if (to.params.post === 'dodge-car'){
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
    const iconPaths = import.meta.glob<string>(`@icons/social/*.svg`, { eager: true, import: 'default', query: '?url' });

    const socialMediaList = Object.entries(socialMediaConfig).map(([socialMediaName, socialMediaInfo]) => {
        const iconPath = Object.values(iconPaths).find(path => path.endsWith(`${socialMediaName}.svg`));
        return {
            name: socialMediaName,
            iconPath: iconPath,
            info: socialMediaInfo
        };
    });
</script>

<template>
    <div class="px-8 mx-auto md:px-10 2xl:px-16 max-w-lg sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
        <article class="pt-8 pb-20 px-32">
            <div class="text-[2.5rem] mb-8 font-jost-bold flex justify-center text-center text-zinc-700">
                <h2 class="border-l-[7px] border-[red] ps-3 leading-none">{{ $t('blog.blogTitle') }}</h2>
            </div>

            <div class="text-5xl mb-4 font-jost-bold flex justify-center text-center text-zinc-700">
                <h1>Lorem ipsum dolor sit amet</h1>
            </div>

            <div class="text-xl mb-10 font-jost flex justify-center text-center text-zinc-400">
                <h4>Updated on September 3, 2024</h4>
            </div>

            <div class="aspect-[7/5] md:aspect-[7/4] rounded-2xl overflow-hidden">
                <img src="https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" loading="lazy" alt="" class="h-full w-full object-cover object-center" />
            </div>

            <div class="text-xl mt-3 mb-10 font-jost flex justify-center text-center text-zinc-400">
                <h4>Photo by Front Auto</h4>
            </div>

            <div class="my-10 mb-11 text-2xl font-jost text-zinc-700">
                <p class="my-10">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ratione vel. Odit quis possimus dolorem, dicta tempore corporis laboriosam eaque esse. Consectetur accusamus in soluta consequuntur officia, sint natus amet!
                </p>

                <p class="my-10">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ratione vel. Odit quis possimus dolorem, dicta tempore corporis laboriosam eaque esse. Consectetur accusamus in soluta consequuntur officia, sint natus amet!
                </p>
            </div>

            <div class="flex flex-row gap-6 justify-center">
                <div v-for="socialMedia of socialMediaList" class="group p-3 hover:bg-zinc-300 rounded-full overflow-hidden duration-200 cursor-pointer">
                    <div :style="{ 'mask-image': `url(${socialMedia.iconPath})`, '-webkit-mask-image': `url(${socialMedia.iconPath})` }" class="svg-icon w-8 h-8 bg-contain bg-center bg-no-repeat bg-zinc-600 group-hover:bg-zinc-700"></div>
                </div>
            </div>

            <div class="text-5xl mt-20 mb-10 font-jost-bold flex justify-center text-center text-zinc-700">
                <h1>Lorem ipsum</h1>
            </div>

            <div class="grid grid-cols-3 gap-4">
                <PostCardSimpled />
                <PostCardSimpled />
                <PostCardSimpled />
            </div>
        </article>
    </div>
</template>
