<script setup lang="ts">
  import LanguageSelector from './LanguageSelector.vue';
  import { getConfigConst } from '../../vue-helpers/configValues';
  import { ref } from 'vue';

  const menuExpanded = ref(false);
</script>

<template>
  <header class='border-box z-50 align-middle min-h-[70px] sticky top-0 shadow-md font-jost-bold leading-5 bg-white'>
    <div class="max-md:hidden bg-zinc-800 text-gray-100 font-jost-thin font-extrabold text-[15px] tracking-widest">
      <div class="flex flex-wrap items-center relative py-2 mx-auto px-8 2xl:px-12 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
        <ul class='flex items-center mx-1 space-x-6 leading-6'>

          <li class='flex items-center'>
            <svg class="mr-3" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.05 6C15.0268 6.19057 15.9244 6.66826 16.6281 7.37194C17.3318 8.07561 17.8095 8.97326 18 9.95M14.05 2C16.0793 2.22544 17.9716 3.13417 19.4163 4.57701C20.8609 6.01984 21.7721 7.91101 22 9.94M18.5 21C9.93959 21 3 14.0604 3 5.5C3 5.11378 3.01413 4.73086 3.04189 4.35173C3.07375 3.91662 3.08968 3.69907 3.2037 3.50103C3.29814 3.33701 3.4655 3.18146 3.63598 3.09925C3.84181 3 4.08188 3 4.56201 3H7.37932C7.78308 3 7.98496 3 8.15802 3.06645C8.31089 3.12515 8.44701 3.22049 8.55442 3.3441C8.67601 3.48403 8.745 3.67376 8.88299 4.05321L10.0491 7.26005C10.2096 7.70153 10.2899 7.92227 10.2763 8.1317C10.2643 8.31637 10.2012 8.49408 10.0942 8.64506C9.97286 8.81628 9.77145 8.93713 9.36863 9.17882L8 10C9.2019 12.6489 11.3501 14.7999 14 16L14.8212 14.6314C15.0629 14.2285 15.1837 14.0271 15.3549 13.9058C15.5059 13.7988 15.6836 13.7357 15.8683 13.7237C16.0777 13.7101 16.2985 13.7904 16.74 13.9509L19.9468 15.117C20.3262 15.255 20.516 15.324 20.6559 15.4456C20.7795 15.553 20.8749 15.6891 20.9335 15.842C21 16.015 21 16.2169 21 16.6207V19.438C21 19.9181 21 20.1582 20.9007 20.364C20.8185 20.5345 20.663 20.7019 20.499 20.7963C20.3009 20.9103 20.0834 20.9262 19.6483 20.9581C19.2691 20.9859 18.8862 21 18.5 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>
              {{ getConfigConst("contactNumber") }}
            </span>
          </li>

          <div class="border-l border-gray-100 h-4"></div>

          <li class='flex items-center'>
            <svg class="mr-3" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 7V12L14.5 13.5M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>
              {{ $t("header.workingTime") }}
            </span>
          </li>

        </ul>
      </div>
    </div>
    <div class='flex flex-wrap items-center left-0 right-0 py-4 justify-between md:gap-x-2 lg:gap-x-4 mx-auto px-5 md:px-8 2xl:px-12 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl text-gray-500'>
      <button v-on:click="menuExpanded = !menuExpanded" class="relative inline-flex items-center w-10 h-10 justify-center text-sm text-[red] rounded-lg md:hidden">
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
        <img src="../../assets/service-logo-256.jpg" alt="logo" class='h-12' />
      </a>

      <nav :aria-expanded="menuExpanded" class='items-stretch md:!flex md:flex-auto bg-white max-md:fixed right-0 left-0 top-16 bottom-full aria-expanded:bottom-0 duration-500 md:ml-6 md:mr-3 font-bold text-[17px] max-md:text-xl max-md:overflow-hidden'>
        <div class="md:hidden border-b border-zinc-400 mx-20 mt-4 mb-2"></div>
        
        <ul class='max-md:py-4 max-md:px-3 md:flex max-md:space-y-2 space-x-7 lg:space-x-9'>
          <li class='max-md:py-2 ml-7'>
            <a href='javascript:void(0)' class='nav-button block md:hover:text-gray-800 text-gray-800 active leading-6 md:leading-8'>
              {{ $t("header.home") }}
            </a>
          </li>

          <li class='max-md:py-2'>
            <a href='javascript:void(0)' class='nav-button block md:hover:text-gray-800 leading-6 md:leading-8'>
              {{ $t("header.services") }}
            </a>
          </li>

          <li class='max-md:py-2'>
            <a href='javascript:void(0)' class='nav-button block md:hover:text-gray-800 leading-6 md:leading-8'>
              {{ $t("header.media") }}
            </a>
          </li>

        </ul>
        <ul class='max-md:py-4 max-md:px-3 md:flex md:items-center ml-auto max-md:block md:space-x-8 max-md:ml-7'>
          <li class='max-md:py-2 max-md:mt-2'>
            <RouterLink to="#map" v-scroll-to="'map'" class='flex items-center nav-button fill-gray-500 md:hover:text-gray-800 md:hover:fill-gray-800 leading-6 md:leading-8'>
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
                <g transform="scale(2.81 2.81)" >
                    <path d="M 45 0 C 27.677 0 13.584 14.093 13.584 31.416 c 0 4.818 1.063 9.442 3.175 13.773 c 2.905 5.831 11.409 20.208 20.412 35.428 l 4.385 7.417 C 42.275 89.252 43.585 90 45 90 s 2.725 -0.748 3.444 -1.966 l 4.382 -7.413 c 8.942 -15.116 17.392 -29.4 20.353 -35.309 c 0.027 -0.051 0.055 -0.103 0.08 -0.155 c 2.095 -4.303 3.157 -8.926 3.157 -13.741 C 76.416 14.093 62.323 0 45 0 z M 45 42.81 c -6.892 0 -12.5 -5.607 -12.5 -12.5 c 0 -6.893 5.608 -12.5 12.5 -12.5 c 6.892 0 12.5 5.608 12.5 12.5 C 57.5 37.202 51.892 42.81 45 42.81 z" />
                </g>
              </svg>
              <p class="hidden max-md:block lg:block ml-3">{{ getConfigConst("addressShort") }}</p>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="border-l border-[#333] h-6 max-md:hidden"></div>

      <LanguageSelector />
    </div>
  </header>
</template>
