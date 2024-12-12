<script setup lang="ts">
    import useClickOutside from '@/vue-helpers/useClickOutside';
    import { ref } from 'vue';
    import Translations from '@/vue-helpers/translations';
    import { useI18n } from 'vue-i18n';
    import { getConfigConst } from '@/vue-helpers/configValues';

    const props = defineProps<{
        onClickChangeLanguage?: (newLang: string) => void | Promise<void>;
    }>();

    const componentRef = ref();
    const excludeRef = ref();

    useClickOutside(
        componentRef,
        () => {
            isOpen.value = false;
        },
        excludeRef
    );

    const { locale, availableLocales, setLocaleMessage } = useI18n();

    const isOpen = ref(false);
    const displayedLocale = ref(locale.value);

    async function onClickChangeLanguage(newLang: string){
        const processLang = props.onClickChangeLanguage || handleChangeLanguageGlobal;

        if (processLang){
            await processLang(newLang);
        }
        
        displayedLocale.value = newLang;
        isOpen.value = false;
    }

    async function handleChangeLanguageGlobal(newLang: string): Promise<void> {
        if (!availableLocales.includes(newLang)){
            const localeMessage = await Translations.loadLocaleMessages(newLang);

            if (localeMessage){
                setLocaleMessage(newLang, localeMessage);
            }
        }

        Translations.switchHtmlLanguage(newLang);
        locale.value = newLang;
    };
</script>

<template>
    <div class="flex items-center justify-center">
        <div class="relative group leading-7">
            <button @click="isOpen = !isOpen" ref="componentRef" class="text-gray-700 font-jost-medium tracking-wider max-md:active:text-[red] md:text-gray-600 md:hover:text-gray-800 md:hover:bg-zinc-300/60 active:text-gray-800 active:bg-zinc-300/60 py-2 px-2 md:px-4 rounded-md inline-flex items-center duration-150">
                <span :class="`fi-${ getConfigConst(`locales.${displayedLocale}.code`) }`" class="fi !bg-cover rounded-full h-5 !w-5 md:h-[1.15rem] md:!w-[1.15rem] mr-3 ring-1 ring-zinc-800/10"></span>
                <span class="mr-1 max-md:hidden">{{ getConfigConst(`locales.${displayedLocale}.label`) }}</span>
                <svg class="w-2.5 h-2.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3" d="m1 1 4 4 4-4"/></svg>
            </button>

            <div v-if="isOpen" ref="excludeRef" class="absolute z-50 right-0 md:right-1/2 md:translate-x-1/2 mt-2 tracking-wide w-max rounded-md shadow-lg bg-white ring-1 ring-zinc-800/10 p-2 space-y-1 font-jost text-zinc-600">
                <a @click="onClickChangeLanguage(loc)" v-for="loc in Translations.supportedLocales" :aria-checked="displayedLocale == loc" class="flex items-center px-4 py-2 align-baseline max-md:focus:text-[red] md:hover:bg-zinc-300/60 md:hover:text-zinc-800 active:text-gray-800 active:bg-zinc-300/60 aria-checked:bg-zinc-300/60 aria-checked:text-zinc-800 cursor-pointer rounded-md duration-150">
                    <span :class="`fi-${ getConfigConst(`locales.${loc}.code`) }`" class="fi !bg-cover rounded-full h-5 !w-5 mr-3 ring-1 ring-zinc-800/10"></span>
                    <span>{{ getConfigConst(`locales.${loc}.name`) }}</span>
                </a>
            </div>
        </div>
    </div>
</template>
