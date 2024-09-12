<script setup lang="ts">
    import LanguageSelector from './LanguageSelector.vue';
    import { getConfigConst } from '@/vue-helpers/configValues';
    import { inject, ref, watch } from 'vue';

    const menuExpanded = ref(false);
    const openAppointmentModal = inject<(description?: string) => void>('openAppointmentModal');

    watch(menuExpanded, value => {
        document.body?.setAttribute('aria-hidden', value.toString());
    });

    function openAppointmentModalWithDescription(description: string = ''){
        if (openAppointmentModal){
            openAppointmentModal(description);
        }
    }
</script>

<template>
    <header class='border-box z-50 align-middle min-h-[70px] sticky top-0 shadow-md font-jost-medium tracking-wide leading-5 bg-white'>
        <div class="max-md:hidden bg-zinc-800 text-zinc-300 font-jost text-[15px] tracking-[0.075em]">
        <div class="flex items-center relative py-1.5 mx-auto px-8 2xl:px-12 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
            <ul class='flex items-center mx-1 space-x-6 leading-6'>

            <li class='flex items-center'>
                <svg class="mr-3" height="20" width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="m17.4 22a15.42 15.42 0 0 1 -15.4-15.4 4.6 4.6 0 0 1 4.6-4.6 3.94 3.94 0 0 1 .77.07 3.79 3.79 0 0 1 .72.18 1 1 0 0 1 .65.75l1.37 6a1 1 0 0 1 -.26.92c-.13.14-.14.15-1.37.79a9.91 9.91 0 0 0 4.87 4.89c.65-1.24.66-1.25.8-1.38a1 1 0 0 1 .92-.26l6 1.37a1 1 0 0 1 .72.65 4.34 4.34 0 0 1 .19.73 4.77 4.77 0 0 1 .06.76 4.6 4.6 0 0 1 -4.64 4.53z"/>
                </svg>
                <span>
                    {{ getConfigConst("corporateInfo.contactNumber") }}
                </span>
            </li>

            <div class="border-l border-gray-100 h-4"></div>

            <li class='flex items-center'>
                <svg class="mr-3" height="20" width="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path fill="currentColor" d="m29.919 6.163-4.225 19.925c-.319 1.406-1.15 1.756-2.331 1.094l-6.438-4.744-3.106 2.988c-.344.344-.631.631-1.294.631l.463-6.556 11.931-10.781c.519-.462-.113-.719-.806-.256l-14.75 9.288-6.35-1.988c-1.381-.431-1.406-1.381.288-2.044l24.837-9.569c1.15-.431 2.156.256 1.781 2.013z"/>
                </svg>
                <span>
                    {{ getConfigConst("corporateInfo.telegramLink") }}
                </span>
            </li>

            </ul>

            <ul class='flex items-center mx-1 space-x-6 leading-6 ml-auto'>

            <li class='flex items-center'>
                <svg class="mr-3" width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12zm11-5a1 1 0 10-2 0v3.764a3 3 0 001.658 2.683l2.895 1.447a1 1 0 10.894-1.788l-2.894-1.448a1 1 0 01-.553-.894V7z" fill="currentColor"/>
                </svg>
                <span>
                    {{ $t("header.workingTime") }}
                </span>
            </li>

            </ul>
        </div>
        </div>

        <div class='flex items-center left-0 right-0 py-3 2xl:py-3.5 justify-between md:gap-x-2 lg:gap-x-4 mx-auto px-5 md:px-8 2xl:px-12 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl text-gray-500'>
        <button @click="menuExpanded = !menuExpanded" class="relative inline-flex items-center w-10 h-10 justify-center text-sm text-[red] rounded-lg md:hidden">
            <span class="sr-only">Open main menu</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" stroke="#eee" stroke-width=".7" fill="rgba(0,0,0,0)" stroke-linecap="round">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7">
                <animate dur="0.2s" attributeName="d" values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7" fill="freeze" begin="start.begin" />
                <animate dur="0.2s" attributeName="d" values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7" fill="freeze" begin="reverse.begin" />
            </path>
            <rect width="10" height="10" stroke="none">
                <animate dur="2s" id="reverse" attributeName="width" begin="click" />
            </rect>
            <rect width="10" height="10" stroke="none">
                <animate dur="0.001s" id="start" attributeName="width" values="10;0" fill="freeze" begin="click" />
                <animate dur="0.001s" attributeName="width" values="0;10" fill="freeze" begin="reverse.begin" />
            </rect>
            </svg>
        </button>

        <a href="javascript:void(0)" class="max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2">
            <img src="../../assets/service-logo-256.jpg" alt="logo" class="h-12" />
        </a>

        <nav :aria-expanded="menuExpanded" class='md:h-12 items-stretch md:!flex md:flex-auto bg-white max-md:fixed right-0 left-0 top-16 bottom-full aria-expanded:bottom-0 duration-500 md:ml-5 md:mr-2 text-[17px] max-md:text-xl max-md:overflow-hidden'>
            <div class="md:hidden border-b border-zinc-400 mx-20 mt-4 mb-2"></div>
            
            <ul class='max-md:py-4 max-md:px-3 md:flex mb-1 max-md:space-y-2 space-x-7 lg:space-x-9'>
            <li class='max-md:py-2 ml-7 content-center'>
                <router-link :to="{ name: 'home' }" active-class="active text-gray-800" class='nav-button relative block md:hover:text-gray-800 leading-6 md:leading-8'>
                {{ $t("header.home") }}
                </router-link>
            </li>

            <li class='max-md:py-2 content-center'>
                <router-link :to="{ name: 'services' }" active-class="active text-gray-800" class='nav-button relative block md:hover:text-gray-800 leading-6 md:leading-8'>
                {{ $t("header.services") }}
                </router-link>
            </li>

            <li class='max-md:py-2 content-center'>
                <router-link :to="{ name: 'media' }" active-class="active text-gray-800" class='nav-button relative block md:hover:text-gray-800 leading-6 md:leading-8'>
                {{ $t("header.media") }}
                </router-link>
            </li>

            </ul>

            <ul class='max-md:py-4 max-md:px-3 md:flex md:items-center ml-auto max-md:block md:space-x-8 max-md:ml-7'>
            <li class='max-md:py-2 max-md:mt-2 inline-flex h-full'>
                <button @click="openAppointmentModalWithDescription()" class="my-[2px] tracking-wider text-gray-100 hover:text-[red] bg-[red] border border-[red] hover:bg-white py-2 px-3 md:px-4 rounded-md inline-flex items-center duration-150">
                    <span>{{ $t("header.onlineAppointment") }}</span>
                </button>
            </li>
            </ul>
        </nav>

        <div class="border-l border-[#333] h-6 max-md:hidden"></div>

        <LanguageSelector />
        </div>
    </header>
</template>
