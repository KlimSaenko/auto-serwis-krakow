<script setup lang="ts">
    import { getConfigConst } from '@/vue-helpers/configValues';
    import { onBeforeRouteUpdate } from 'vue-router';
    import AdminInputListener from '@/vue-helpers/adminInputListener';
    import TextEditor from '@/components/TextEditor.vue';

    const blogPosts = Object.values(import.meta.glob<string>('@icons/social/all.svg', { eager: true, import: 'default', query: '?v' }));

    onBeforeRouteUpdate(async (to, from, next) => {
        if (to.params.post && to.params.post === 'dodge-car'){
            next();
        } else {
            const query = to.fullPath.match(/^\/$/) ? {} : { redirect: to.fullPath };
            next({
                path: from.fullPath,
                query: query
            });
        };
    });

    const socialMediaConfig = getConfigConst('application.socialMedia') as Object;
    const iconsPath = Object.values(import.meta.glob<string>('@icons/social/all.svg', { eager: true, import: 'default', query: '?url' }));
    
    const socialMediaList = Object.entries(socialMediaConfig)
    .filter(([_, socialMediaInfo]) => socialMediaInfo?.shareLink)
    .map(([socialMediaName, socialMediaInfo]) => {
        return {
            name: socialMediaName,
            iconPath: iconsPath[0] + "#" + socialMediaName,
            info: socialMediaInfo
        };
    });

    function createBlogPost() {
        // const json = editor.value?.getJSON();
    }
</script>

<template>
    <div class="mx-auto px-4 sm:px-8 md:px-10 2xl:px-16 max-w-lg sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
        <article class="pt-8 pb-16 md:pb-20 md:px-16 xl:px-32" :class="AdminInputListener.IsAuthorized.value ? 'md:px-14 xl:px-28' : 'md:px-16 xl:px-32'">
            <div class="text-[2.5rem] mb-8 font-jost-bold flex justify-center text-center text-zinc-700">
                <h2 class="border-l-[7px] border-[red] ps-3 leading-none pr-2">{{ $t('blog.blogTitle') }}</h2>
            </div>

            <div v-if="AdminInputListener.IsAuthorized.value" class="w-full mb-10 p-5 rounded-xl shadow-xl border bg-white">
                <h3 class="font-jost-medium text-xl mb-4">{{ $t('blog.adminMode') }}</h3>

                <div class="font-jost text-xl">
                    <button class="flex px-4 py-3 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 rounded-md duration-150">
                        <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        <span class="ms-3">{{ $t('blog.editPost') }}</span>
                    </button>

                    <button class="flex px-4 py-3 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 rounded-md duration-150">
                        <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <rect height="18" rx="2" ry="2" width="18" x="3" y="3"/>
                            <line x1="12" x2="12" y1="8" y2="16"/>
                            <line x1="8" x2="16" y1="12" y2="12"/>
                        </svg>
                        <span class="ms-3">{{ $t('blog.createPost') }}</span>
                    </button>

                    <button class="flex px-4 py-3 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 rounded-md duration-150">
                        <svg height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m23.589 22.261-2.102-2.101c.51-.769.814-1.713.814-2.728 0-2.389-1.683-4.385-3.929-4.866l-.033-.006v-4.043c0-.009 0-.018 0-.026 0-.246-.088-.471-.233-.646l.001.002v-.005c-.019-.023-.039-.045-.06-.066l-.008-.009c-.009-.009-.018-.018-.027-.027l-7.44-7.44c-.021-.021-.042-.04-.065-.059l-.026-.018c-.016-.013-.033-.026-.05-.038l-.025-.018c-.018-.012-.036-.022-.054-.034l-.023-.012q-.034-.02-.075-.037l-.032-.013-.051-.018-.036-.011-.058-.015-.028-.006c-.028-.006-.057-.01-.086-.013h-8.948c-.559.002-1.011.454-1.015 1.012v20.377c0 .561.454 1.017 1.015 1.019h16.306.004c1.013 0 1.955-.304 2.74-.827l-.018.011 2.102 2.102c.181.166.423.268.689.268.563 0 1.019-.456 1.019-1.019 0-.266-.102-.508-.269-.689l.001.001zm-3.325-4.827c0 1.625-1.318 2.943-2.943 2.943s-2.943-1.318-2.943-2.943 1.318-2.943 2.943-2.943c1.624.002 2.941 1.318 2.943 2.942zm-9.396-13.956 3.993 3.994h-3.993zm-8.83-1.44h6.793v6.453c0 .563.456 1.019 1.019 1.019h6.453v3.05c-2.278.487-3.962 2.483-3.962 4.873 0 1.109.362 2.133.975 2.96l-.01-.013h-11.269z"/>
                        </svg>
                        <span class="ms-3">{{ $t('blog.previewPost') }}</span>
                    </button>
                </div>
            </div>

            <div class="w-full mb-10 p-5 rounded-xl shadow-xl border bg-white">

            </div>

            <!-- <h1 class="text-[2.5rem] md:text-5xl mb-4 font-jost-bold flex justify-center text-center text-zinc-700 leading-[1.2]">Lorem ipsum dolor sit amet</h1> -->

            <div class="text-xl mb-10 font-jost flex justify-center text-center text-zinc-400">
                <h4>Updated on September 3, 2024</h4>
            </div>

            <!-- <div class="aspect-[7/5] md:aspect-[7/4] rounded-2xl overflow-hidden">
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
            </div> -->

            <div class="w-full rounded-xl shadow-xl border bg-white">
                <TextEditor :active-buttons="[
                    'bold',
                    'italic',
                    'strike',
                    'underline',
                    'code',
                    'h1',
                    'h2',
                    'h3',
                    'bulletList',
                    'orderedList',
                    'blockquote',
                    'codeBlock',
                    'horizontalRule',
                    'undo',
                    'redo',
                    'uploadImage'
                ]" />
            </div>

            <div class="mt-12 font-jost">
                <div class="text-xl mb-4 font-jost flex justify-center text-center text-zinc-400">
                    <h3>{{ $t('blog.shareViaSocialLabel') }}</h3>
                </div>

                <div class="flex flex-row gap-4 md:gap-6 justify-center">
                    <div v-for="socialMedia of socialMediaList" :key="socialMedia.name" class="relative group md:hover:bg-zinc-300 active:bg-zinc-300 rounded-full duration-200">
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
