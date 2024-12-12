<script setup lang="ts">
    import { getConfigConst } from '@/vue-helpers/configValues';
    import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router';
    import { computed, ref, watch } from 'vue';
    import AdminInputListener from '@/vue-helpers/adminInputListener';
    import TextEditor from '@/components/TextEditor.vue';
    import { useI18n } from 'vue-i18n';
    import ApiService from '@/vue-helpers/apiService';
    import LanguageSelector from '@/components/LanguageSelector.vue';
    import { slugify } from 'transliteration';
    import type IBlogPost from '@/types/blogPost';

    const router = useRouter();

    AdminInputListener.IsAuthorized.value.then(isAuthorized => {
        if (!isAuthorized) {
            router.back();
        }
    })

    const { t, tm } = useI18n();
    const route = useRoute();
    const postTitlePlaceholder = ref('');
    const previewMode = ref(true);
    let handleChangeLanguage: (newLang: string) => void;

    const textEditorRef = ref<InstanceType<typeof TextEditor> | null>(null);
    
    const model = setupModel(route.meta.postData as IBlogPost);

    const postReady = ref(false);

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

    onBeforeRouteLeave((to, from, next) => {
        const answer = window.confirm(t('admin.blog.leaveMessage'));
        if (answer) {
            next();
        } else {
            next(false);
        }
    });

    const editorHasContent = computed(() => textEditorRef.value?.hasContent);

    watch(model.postTitle, value => {
        if (!model.postTitleUrl.value){
            model.postTitleUrlPlaceholder.value = slugify(value, { trim: true });
        }
    });

    watch([model.postTitle, editorHasContent], values => {
        postReady.value = !values.some(value => !value);
    });

    try {
        const postTitlePlaceholderOptions = tm('admin.blog.postTitlePlaceholderOptions') as string[];
        const random = Math.floor(Math.random() * postTitlePlaceholderOptions.length);

        postTitlePlaceholder.value = postTitlePlaceholderOptions[random];
    } catch {
        console.error('Failed to fetch post title placeholder options');
    }

    async function createBlogPost() {
        if (!postReady.value){
            return;
        }

        const getEditorHTML = textEditorRef.value?.getHTML;
        const getEditorText = textEditorRef.value?.getText;

        if (getEditorHTML && getEditorText){
            const htmlContent = getEditorHTML();
            const textContent = getEditorText();
            
            if (htmlContent){
                await ApiService.CreateBlogPost(model.postTitleUrl.value || model.postTitleUrlPlaceholder.value, model.postTitle.value, htmlContent, textContent.slice(0, 200));
            } else {
                console.error('Failed to get editor HTML content');
            }
        }
    }

    function setupModel(postData?: IBlogPost) {
        if (postData){
            return {
                postTitle: ref<string>(postData.title ?? ''),
                postTitleUrl: ref<string>(postData.url ?? ''),
                postTitleUrlPlaceholder: ref<string>('dodge-car'),
                timeUpdated: ref<Date>(new Date(postData.timeUpdated ?? 0)),
                postHtmlContent: ref<string>(postData.content ?? '')
            };
        } else {
            const model =  {
                postTitle: ref<string>(''),
                postTitleUrl: ref<string>(''),
                postTitleUrlPlaceholder: ref<string>('dodge-car'),
                timeUpdated: ref<Date>(new Date(0, 0, 0, 0, 0, 0)),
                postHtmlContent: ref<string>('')
            };

            ApiService.GetServerTime().then(date => {
                if (date) {
                    model.timeUpdated.value = date;
                }
            });
            
            return model;
        }
    }
</script>

<template>
    <div class="mx-auto px-4 sm:px-8 md:px-10 2xl:px-16 max-w-lg sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
        <article class="pt-8 pb-16 md:pb-20 md:px-16 xl:px-32 font-jost" :class="!previewMode ? 'md:px-10 xl:px-[6.5rem]' : 'md:px-16 xl:px-32'">
            <div class="text-[2.5rem] mb-8 font-jost-bold flex justify-center text-center text-zinc-700">
                <h2 class="border-l-[7px] border-[red] ps-3 leading-none pr-2">{{ $t('blog.blogTitle') }}</h2>
            </div>

            <div class="w-full my-10 overflow-hidden rounded-xl shadow-xl border bg-white">
                <div class="flex flex-row gap-2 px-6 py-2 bg-white rounded-t-xl shadow-md">
                    <p class="text-lg font-jost-medium text-zinc-600 select-none">{{ $t('admin.blog.adminModeLabel') }}:</p>
                </div>

                <div class="flex justify-around p-6 font-jost text-xl">
                    <router-link :to="{ name: 'admin-blog-create' }" v-if="$route.meta.mode === 'edit'" class="flex px-4 py-3 items-center text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 rounded-md duration-150">
                        <svg fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <rect height="18" rx="2" ry="2" width="18" x="3" y="3"/>
                            <line x1="12" x2="12" y1="8" y2="16"/>
                            <line x1="8" x2="16" y1="12" y2="12"/>
                        </svg>
                        <span class="ms-3">{{ $t('admin.blog.createPost') }}</span>
                    </router-link>

                    <button @click="previewMode = !previewMode" class="flex px-4 py-3 items-center text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 rounded-md duration-150">
                        <svg v-if="previewMode" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                        <svg v-else fill="currentColor" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m23.589 22.261-2.102-2.101c.51-.769.814-1.713.814-2.728 0-2.389-1.683-4.385-3.929-4.866l-.033-.006v-4.043c0-.009 0-.018 0-.026 0-.246-.088-.471-.233-.646l.001.002v-.005c-.019-.023-.039-.045-.06-.066l-.008-.009c-.009-.009-.018-.018-.027-.027l-7.44-7.44c-.021-.021-.042-.04-.065-.059l-.026-.018c-.016-.013-.033-.026-.05-.038l-.025-.018c-.018-.012-.036-.022-.054-.034l-.023-.012q-.034-.02-.075-.037l-.032-.013-.051-.018-.036-.011-.058-.015-.028-.006c-.028-.006-.057-.01-.086-.013h-8.948c-.559.002-1.011.454-1.015 1.012v20.377c0 .561.454 1.017 1.015 1.019h16.306.004c1.013 0 1.955-.304 2.74-.827l-.018.011 2.102 2.102c.181.166.423.268.689.268.563 0 1.019-.456 1.019-1.019 0-.266-.102-.508-.269-.689l.001.001zm-3.325-4.827c0 1.625-1.318 2.943-2.943 2.943s-2.943-1.318-2.943-2.943 1.318-2.943 2.943-2.943c1.624.002 2.941 1.318 2.943 2.942zm-9.396-13.956 3.993 3.994h-3.993zm-8.83-1.44h6.793v6.453c0 .563.456 1.019 1.019 1.019h6.453v3.05c-2.278.487-3.962 2.483-3.962 4.873 0 1.109.362 2.133.975 2.96l-.01-.013h-11.269z"/>
                        </svg>

                        <span v-if="previewMode" class="ms-3">{{ $t('admin.blog.editPostMode') }}</span>
                        <span v-else class="ms-3">{{ $t('admin.blog.previewPostMode') }}</span>
                    </button>
                </div>
            </div>

            <div class="my-10">
                <LanguageSelector v-on:click-change-language="handleChangeLanguage" />
            </div>

            <div v-if="!previewMode" class="font-jost-medium w-full my-10 overflow-hidden rounded-xl shadow-xl border bg-white">
                <div class="flex flex-row gap-2 px-6 py-2 bg-white rounded-t-xl shadow-md">
                    <p class="text-lg text-zinc-600 select-none">{{ $t('admin.blog.postTitleLabel') }}:</p>
                </div>
                <div class="p-6">
                    <input type="text" class="font-jost w-full text-2xl outline-none placeholder-[#adb5bd]" v-model="model.postTitle.value" :placeholder="postTitlePlaceholder" />
                </div>
                <div class="flex px-6 py-4 text-lg bg-zinc-400/15">
                    <span class="text-zinc-600/90 select-none">https://frontauto.pl/blog/</span>
                    <input type="text" class="bg-transparent ms-0.5 w-full outline-none placeholder-[#adb5bd]" v-model="model.postTitleUrl.value" :placeholder="model.postTitleUrlPlaceholder.value" />
                </div>
            </div>

            <h1 v-else class="text-[2.5rem] md:text-5xl mb-5 font-jost-bold flex justify-center text-center text-zinc-700 leading-[1.2]">{{ model.postTitle.value }}</h1>

            <div class="text-xl mb-10 font-jost flex justify-center text-center text-zinc-400">
                <h4>{{ $t('admin.blog.dateUpdatedLabel') }} {{ model.timeUpdated.value.toLocaleDateString() }}</h4>
            </div>

            <TextEditor v-if="!previewMode" ref="textEditorRef" :active-buttons="[
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
                'uploadImage',
                'alignLeft',
                'alignCenter',
                'alignRight',
                'alignJustify'
            ]" :init-content="model.postHtmlContent.value" class="overflow-hidden rounded-xl shadow-xl border bg-white" />
            <div v-else v-html="model.postHtmlContent.value"></div>

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

        <div v-if="!previewMode" class="fixed 2xl:right-7 2xl:bottom-7 right-5 bottom-5 max-sm:left-5 z-[901] p-5 sm:max-w-80 bg-white overflow-hidden rounded-xl shadow-lg shadow-black/15 border">
            <div class="flex mb-5 items-center">
                <svg v-if="postReady" class="w-9 h-9 me-4 text-green-500 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
                <svg v-else class="w-9 h-9 me-4 text-orange-600 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-5.009c0-.867.659-1.491 1.491-1.491.85 0 1.509.624 1.509 1.491 0 .867-.659 1.509-1.509 1.509-.832 0-1.491-.642-1.491-1.509zM11.172 6a.5.5 0 0 0-.499.522l.306 7a.5.5 0 0 0 .5.478h1.043a.5.5 0 0 0 .5-.478l.305-7a.5.5 0 0 0-.5-.522h-1.655z"/>
                </svg>

                <p class="font-jost text-zinc-800 h-min">{{ $t(postReady ? 'admin.blog.postReadySuccess' : 'admin.blog.postReadyFault') }}</p>
            </div>

            <div class="flex">
                <button @click="createBlogPost" :class="postReady ? 'text-white bg-[red] border border-[red] hover:bg-white hover:text-[red]' : 'text-zinc-500 bg-zinc-200 hover:bg-zinc-300'" class="px-5 py-3 font-jost-medium w-full rounded-lg transition-all duration-150">
                    {{ $t('admin.blog.applyChanges') }}
                </button>
            </div>
        </div>
    </div>
</template>
