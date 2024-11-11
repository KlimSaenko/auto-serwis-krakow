<script setup lang="ts">
    import { getConfigConst } from '@/vue-helpers/configValues';
    import { onBeforeRouteUpdate } from 'vue-router';
    import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3';
    import StarterKit from '@tiptap/starter-kit';
    import { onBeforeUnmount } from 'vue';
    import TextStyle from '@tiptap/extension-text-style'
    import Color from '@tiptap/extension-color';
    import TextAlign from '@tiptap/extension-text-align';

    const blogPosts = Object.values(import.meta.glob<string>('@icons/social/all.svg', { eager: true, import: 'default', query: '?v' }));

    const editor = useEditor({
        content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
        extensions: [StarterKit, TextStyle, Color, TextAlign],
        editorProps: {
            attributes: {
                class: 'm-5 focus:outline-none',
            }
        }
    });

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

    onBeforeUnmount(() => {
        editor.value?.destroy();
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
        const json = editor.value?.getJSON();
    }
</script>

<template>
    <div class="mx-auto px-4 sm:px-8 md:px-10 2xl:px-16 max-w-lg sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
        <article class="pt-8 pb-16 md:pb-20 md:px-16 xl:px-32">
            <!-- <div class="text-[2.5rem] mb-8 font-jost-bold flex justify-center text-center text-zinc-700">
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
            </div> -->

            <div class="w-full rounded-xl shadow-xl border bg-white">
                <bubble-menu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor">
                    <div class="flex flex-row gap-1 p-1 bg-white border rounded-xl shadow-md hover:[&_button]:bg-zinc-300 [&_button]:px-1.5 [&_button]:py-1 [&_button]:rounded-lg">
                        <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'bg-zinc-300': editor.isActive('bold') }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                                <path d="M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8"></path>
                            </svg>
                        </button>

                        <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'bg-zinc-300': editor.isActive('italic') }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                                <line x1="19" x2="10" y1="4" y2="4"></line>
                                <line x1="14" x2="5" y1="20" y2="20"></line>
                                <line x1="15" x2="9" y1="4" y2="20"></line>
                            </svg>
                        </button>

                        <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'bg-zinc-300': editor.isActive('strike') }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-underline w-4 h-4">
                                <path d="M6 4v6a6 6 0 0 0 12 0V4"></path>
                                <line x1="4" x2="20" y1="20" y2="20"></line>
                            </svg>
                        </button>

                        <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'bg-zinc-300': editor.isActive('strike') }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-strikethrough w-4 h-4">
                                <path d="M16 4H9a3 3 0 0 0-2.83 4"></path>
                                <path d="M14 12a4 4 0 0 1 0 8H6"></path>
                                <line x1="4" x2="20" y1="12" y2="12"></line>
                            </svg>
                        </button>

                        <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'bg-zinc-300': editor.isActive('strike') }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                            </svg>
                        </button>

                        <div class="bg-zinc-300 h-full min-h-[1.5rem] w-[1px] mx-1 first:ml-0 last:mr-0"></div>
                        
                        <button @click="editor.chain().focus().setColor('red').run()" :class="{ 'bg-zinc-300': editor.isActive('textStyle', { color: 'red' })}">
                            <div class="w-4 h-4 bg-[red] rounded-full border border-zinc-300"></div>
                        </button>

                        <button @click="editor.chain().focus().setColor('orange').run()" :class="{ 'bg-zinc-300': editor.isActive('textStyle', { color: 'orange' })}">
                            <div class="w-4 h-4 bg-[orange] rounded-full border border-zinc-300"></div>
                        </button>

                        <button @click="editor.chain().focus().setColor('green').run()" :class="{ 'bg-zinc-300': editor.isActive('textStyle', { color: 'green' })}">
                            <div class="w-4 h-4 bg-[green] rounded-full border border-zinc-300"></div>
                        </button>

                        <button @click="editor.chain().focus().setColor('blue').run()" :class="{ 'bg-zinc-300': editor.isActive('textStyle', { color: 'blue' })}">
                            <div class="w-4 h-4 bg-[blue] rounded-full border border-zinc-300"></div>
                        </button>

                        <button @click="editor.chain().focus().unsetColor().run()" :class="{ 'bg-zinc-300': editor.isActive('textStyle', { color: 'black' })}">
                            <div class="w-4 h-4 bg-black rounded-full border border-zinc-300"></div>
                        </button>

                        <div class="bg-zinc-300 h-full min-h-[1.5rem] w-[1px] mx-1 first:ml-0 last:mr-0"></div>

                        <button @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'bg-zinc-300': editor.isActive({ textAlign: 'left' }) }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                                <line x1="21" x2="3" y1="6" y2="6"></line>
                                <line x1="15" x2="3" y1="12" y2="12"></line>
                                <line x1="17" x2="3" y1="18" y2="18"></line>
                            </svg>
                        </button>

                        <button @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'bg-zinc-300': editor.isActive({ textAlign: 'center' }) }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                                <line x1="21" x2="3" y1="6" y2="6"></line>
                                <line x1="17" x2="7" y1="12" y2="12"></line>
                                <line x1="19" x2="5" y1="18" y2="18"></line>
                            </svg>
                        </button>

                        <button @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'bg-zinc-300': editor.isActive({ textAlign: 'right' }) }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                                <line x1="21" x2="3" y1="6" y2="6"></line>
                                <line x1="21" x2="9" y1="12" y2="12"></line>
                                <line x1="21" x2="7" y1="18" y2="18"></line>
                            </svg>
                        </button>

                        <button @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'bg-zinc-300': editor.isActive({ textAlign: 'justify' }) }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                                <line x1="3" x2="21" y1="6" y2="6"></line>
                                <line x1="3" x2="21" y1="12" y2="12"></line>
                                <line x1="3" x2="21" y1="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </bubble-menu>
                <editor-content :editor="editor" />
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
