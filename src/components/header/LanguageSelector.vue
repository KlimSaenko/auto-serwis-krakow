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
            <button @click="isOpen = !isOpen" ref="componentRef" id="dropdown-button" class="hover:bg-zinc-200/50 text-gray-500 hover:text-gray-800 font-bold w-[6.5rem] py-2 px-4 rounded-md inline-flex items-center">
                <span :class="`fi-${ getConfigConst(`localesMetadata.${locale}.code`) }`" class="fi flag-icon-rounded mr-3"></span>
                <span>{{ getConfigConst(`localesMetadata.${locale}.label`) }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 ml-auto -mr-1" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </button>

            <div v-if="isOpen" ref="excludeRef" id="dropdown-menu" class="absolute -right-4 -left-4 mt-2 rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 p-2 space-y-1 font-jost">
                <a @click="onClickChangeLanguage(loc)" v-for="loc in Translations.supportedLocales" href="#" class="block px-4 py-2 text-gray-700 hover:bg-zinc-200/50 cursor-pointer rounded-md">
                    <span :class="`fi-${ getConfigConst(`localesMetadata.${loc}.code`) }`" class="fi flag-icon-rounded mr-3"></span>
                    <span>{{ getConfigConst(`localesMetadata.${loc}.name`) }}</span>
                </a>
            </div>
        </div>
    </div>
</template>
