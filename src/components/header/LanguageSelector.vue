<script setup lang="ts">
    import useClickOutside from '../../vue-helpers/useClickOutside';
    import { ref } from 'vue';
    import Translations from '../../vue-helpers/translations';
    import { useI18n } from 'vue-i18n';
    import { getConfigConst } from '../../vue-helpers/configValues';

    const { locale, availableLocales, setLocaleMessage } = useI18n();

    const componentRef = ref();
    const excludeRef = ref();
    const isOpen = ref(false);

    useClickOutside(
        componentRef,
        () => {
            isOpen.value = false;
        },
        excludeRef
    );
    
    async function onClickChangeLanguage(newLang: string){
        if (!availableLocales.includes(newLang)){
            setLocaleMessage(newLang, await Translations.loadLocaleMessages(newLang));
        }

        Translations.switchHtmlLanguage(newLang);
        locale.value = newLang;
        isOpen.value = false;
    };
</script>

<template>
    <div class="flex items-center justify-center">
        <div class="relative group leading-7">
            <button @click="isOpen = !isOpen" ref="componentRef" id="dropdown-button" class="text-gray-700 tracking-[0.06em] max-md:focus:text-[red] md:text-gray-500 md:hover:text-gray-800 md:hover:bg-zinc-200/60 font-bold py-2 px-2 md:px-4 rounded-md inline-flex items-center">
                <span :class="`fi-${ getConfigConst(`localesMetadata.${locale}.code`) }`" class="fi !bg-cover rounded-full h-5 !w-5 md:h-[1.15rem] md:!w-[1.15rem] mr-3 ring-1 ring-black ring-opacity-5"></span>
                <span class="mr-2 max-md:hidden">{{ getConfigConst(`localesMetadata.${locale}.label`) }}</span>
                <!-- <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" class="pb-1 -mr-1" viewBox="0 0 20 18" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg> -->
                <svg class="w-2.5 h-2.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.3" d="m1 1 4 4 4-4"/></svg>
            </button>

            <div v-if="isOpen" ref="excludeRef" id="dropdown-menu" class="absolute right-0 md:right-1/2 md:translate-x-1/2 mt-2 tracking-wide w-max rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 p-2 space-y-1 font-jost">
                <a @click="onClickChangeLanguage(loc)" v-for="loc in Translations.supportedLocales" href="#" class="flex items-center px-4 py-2 align-baseline text-gray-700 max-md:focus:text-[red] md:hover:bg-zinc-200/60 cursor-pointer rounded-md">
                    <span :class="`fi-${ getConfigConst(`localesMetadata.${loc}.code`) }`" class="fi !bg-cover rounded-full h-5 !w-5 mr-3 ring-1 ring-black ring-opacity-5"></span>
                    <span>{{ getConfigConst(`localesMetadata.${loc}.name`) }}</span>
                </a>
            </div>
        </div>
    </div>
</template>
