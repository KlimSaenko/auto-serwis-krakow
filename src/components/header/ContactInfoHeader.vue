<script setup lang="ts">
    import LanguageSelector from './LanguageSelector.vue';
    import { getConfigConst } from '@/vue-helpers/configValues';
    import { inject, ref, type Ref } from 'vue';

    const openAppointmentModal = inject<(description?: string) => void>('openAppointmentModal');
	const isMenuExpanded = inject<Ref<boolean>>('isMenuExpanded') ?? ref(false);
    
    function openAppointmentModalWithDescription(description: string = ''){
        if (openAppointmentModal){
            openAppointmentModal(description);
        }
    }
</script>

<style lang="css">
	.menu-burger {
		width: 32px;
		height: 25.5px;
		position: relative;
		-webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-o-transform: rotate(0deg);
		transform: rotate(0deg);
		-webkit-transition: .5s ease-in-out;
		-moz-transition: .5s ease-in-out;
		-o-transition: .5s ease-in-out;
		transition: .5s ease-in-out;
	}

	.menu-burger span {
		display: block;
		position: absolute;
		height: 3.5px;
		width: 100%;
		background: red;
		border-radius: 9999px;
		opacity: 1;
		left: 0;
		-webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-o-transform: rotate(0deg);
		transform: rotate(0deg);
		-webkit-transition: .25s ease-in-out;
		-moz-transition: .25s ease-in-out;
		-o-transition: .25s ease-in-out;
		transition: .25s ease-in-out;
	}

	.menu-burger span:nth-child(1) {
		top: 0px;
	}

	.menu-burger span:nth-child(2),.menu-burger span:nth-child(3) {
		top: 11px;
	}

	.menu-burger span:nth-child(4) {
		top: 22px;
	}

	.menu-burger[aria-expanded="true"] span:nth-child(1) {
		top: 11px;
		width: 0%;
		left: 50%;
	}

	.menu-burger[aria-expanded="true"] span:nth-child(2) {
		-webkit-transform: rotate(45deg);
		-moz-transform: rotate(45deg);
		-o-transform: rotate(45deg);
		transform: rotate(45deg);
	}

	.menu-burger[aria-expanded="true"] span:nth-child(3) {
		-webkit-transform: rotate(-45deg);
		-moz-transform: rotate(-45deg);
		-o-transform: rotate(-45deg);
		transform: rotate(-45deg);
	}

	.menu-burger[aria-expanded="true"] span:nth-child(4) {
		top: 11px;
		width: 0%;
		left: 50%;
	}
</style>

<template>
    <header class="border-box max-md:pb-1 z-[500] align-middle sticky top-0 shadow-md font-jost-medium tracking-wide leading-5 bg-white">
        <div class="max-md:hidden bg-zinc-800 text-zinc-300 font-jost text-[15px] tracking-[0.075em]">
            <div class="flex items-center relative py-1.5 mx-auto px-8 2xl:px-12 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
                <ul class="flex items-center mx-1 space-x-6 leading-6">
                    <li>
                        <a :href="'tel:' + (getConfigConst('corporateInfo.contactNumber') as string)" target="_blank" draggable="false" class="flex items-center select-text hover:text-zinc-100">
                            <svg class="mr-3" height="20" width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor" d="m17.4 22a15.42 15.42 0 0 1 -15.4-15.4 4.6 4.6 0 0 1 4.6-4.6 3.94 3.94 0 0 1 .77.07 3.79 3.79 0 0 1 .72.18 1 1 0 0 1 .65.75l1.37 6a1 1 0 0 1 -.26.92c-.13.14-.14.15-1.37.79a9.91 9.91 0 0 0 4.87 4.89c.65-1.24.66-1.25.8-1.38a1 1 0 0 1 .92-.26l6 1.37a1 1 0 0 1 .72.65 4.34 4.34 0 0 1 .19.73 4.77 4.77 0 0 1 .06.76 4.6 4.6 0 0 1 -4.64 4.53z"/>
                            </svg>
                            <span>
                                {{ getConfigConst("corporateInfo.contactNumber") }}
                            </span>
                        </a>
                    </li>

                    <div class="border-l border-gray-100 h-4"></div>

                    <li>
                        <a :href="(getConfigConst('corporateInfo.telegramLink') as string)" target="_blank" draggable="false" class="flex items-center select-text hover:text-gray-100">
                            <svg class="mr-3" height="20" width="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor" d="m29.919 6.163-4.225 19.925c-.319 1.406-1.15 1.756-2.331 1.094l-6.438-4.744-3.106 2.988c-.344.344-.631.631-1.294.631l.463-6.556 11.931-10.781c.519-.462-.113-.719-.806-.256l-14.75 9.288-6.35-1.988c-1.381-.431-1.406-1.381.288-2.044l24.837-9.569c1.15-.431 2.156.256 1.781 2.013z"/>
                            </svg>
                            <span>
                                {{ getConfigConst("corporateInfo.telegramTag") }}
                            </span>
                        </a>
                    </li>
                </ul>

                <ul class="flex items-center mx-1 space-x-6 leading-6 ml-auto">
                    <li class="flex items-center">
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

		<div class="flex items-center left-0 right-0 py-3 2xl:py-3.5 justify-between md:gap-x-2 lg:gap-x-4 mx-auto px-5 md:px-8 2xl:px-12 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl text-gray-500">
            <button @click="isMenuExpanded = !isMenuExpanded" class="relative inline-flex items-center w-10 h-10 justify-center text-sm text-[red] rounded-lg md:hidden">
                <div :aria-expanded="isMenuExpanded" class="menu-burger">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>

            <router-link :to="{ name: 'home' }" class="max-md:absolute max-md:left-1/2 max-md:-translate-x-1/2">
                <img src="../../assets/service-logo-256.jpg" alt="logo" class="h-12" />
            </router-link>

            <nav :aria-expanded="isMenuExpanded" class="md:h-12 items-stretch md:!flex md:flex-auto bg-white max-md:fixed max-md:px-12 right-0 left-0 top-16 bottom-full aria-expanded:bottom-0 duration-500 md:ml-5 md:mr-2 text-[17px] max-md:text-xl max-md:overflow-hidden">
                <div class="md:hidden border-b border-zinc-400 mx-8 mt-3 mb-2"></div>
                
                <ul class="max-md:py-5 md:flex mb-1 max-md:space-y-1 space-x-7 lg:space-x-9">
                    <label class="md:hidden block mt-2 mb-4 ms-4 uppercase text-lg text-zinc-400">{{ $t('header.menu') }}</label>

                    <li class="max-md:py-2 content-center">
                        <router-link :to="{ name: 'home' }" @click.native="isMenuExpanded = false" active-class="active text-gray-800" class="nav-button relative block md:hover:text-gray-800 leading-6 md:leading-8">
                            {{ $t("header.home") }}
                        </router-link>
                    </li>

                    <li class="max-md:py-2 content-center">
                        <router-link :to="{ name: 'services' }" @click.native="isMenuExpanded = false" active-class="active text-gray-800" class="nav-button relative block md:hover:text-gray-800 leading-6 md:leading-8">
                            {{ $t("header.services") }}
                        </router-link>
                    </li>

                    <li class="max-md:py-2 content-center">
                        <router-link :to="{ name: 'media' }" @click.native="isMenuExpanded = false" active-class="active text-gray-800" class="nav-button relative block md:hover:text-gray-800 leading-6 md:leading-8">
                            {{ $t("header.media") }}
                        </router-link>
                    </li>
                </ul>

                <div class="md:hidden border-b border-zinc-400 mx-8 mt-3 mb-2"></div>

                <ul class="md:hidden py-5 space-y-1">
                    <label class="md:hidden block mt-2 mb-4 ms-4 uppercase text-lg text-zinc-400">{{ $t('header.corporateInfo') }}</label>

                    <li class="py-2 flex items-center font-jost font-medium">
                        <svg class="mr-3 min-w-5 text-zinc-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
                            <g transform="scale(2.6 2.6)" >
                                <path fill="currentColor" d="M 45 0 C 27.677 0 13.584 14.093 13.584 31.416 c 0 4.818 1.063 9.442 3.175 13.773 c 2.905 5.831 11.409 20.208 20.412 35.428 l 4.385 7.417 C 42.275 89.252 43.585 90 45 90 s 2.725 -0.748 3.444 -1.966 l 4.382 -7.413 c 8.942 -15.116 17.392 -29.4 20.353 -35.309 c 0.027 -0.051 0.055 -0.103 0.08 -0.155 c 2.095 -4.303 3.157 -8.926 3.157 -13.741 C 76.416 14.093 62.323 0 45 0 z M 45 42.81 c -6.892 0 -12.5 -5.607 -12.5 -12.5 c 0 -6.893 5.608 -12.5 12.5 -12.5 c 6.892 0 12.5 5.608 12.5 12.5 C 57.5 37.202 51.892 42.81 45 42.81 z" />
                            </g>
                        </svg>
                        <span>{{ getConfigConst('corporateInfo.addressFull') }}</span>
                    </li>

                    <li class="py-2">
                        <a :href="'tel:' + (getConfigConst('corporateInfo.contactNumber') as string)" target="_blank" draggable="false" class="flex items-center font-jost font-medium">
                            <svg class="mr-3 min-w-5 text-zinc-500" height="20" width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor" d="m17.4 22a15.42 15.42 0 0 1 -15.4-15.4 4.6 4.6 0 0 1 4.6-4.6 3.94 3.94 0 0 1 .77.07 3.79 3.79 0 0 1 .72.18 1 1 0 0 1 .65.75l1.37 6a1 1 0 0 1 -.26.92c-.13.14-.14.15-1.37.79a9.91 9.91 0 0 0 4.87 4.89c.65-1.24.66-1.25.8-1.38a1 1 0 0 1 .92-.26l6 1.37a1 1 0 0 1 .72.65 4.34 4.34 0 0 1 .19.73 4.77 4.77 0 0 1 .06.76 4.6 4.6 0 0 1 -4.64 4.53z"/>
                            </svg>
                            <span>{{ getConfigConst('corporateInfo.contactNumber') }}</span>
                        </a>
                    </li>

                    <li class="py-2">
                        <a :href="'tel:' + (getConfigConst('corporateInfo.telegramLink') as string)" target="_blank" draggable="false" class="flex items-center font-jost font-medium">
                            <svg class="mr-3 min-w-5 text-zinc-500" height="20" width="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor" d="m29.919 6.163-4.225 19.925c-.319 1.406-1.15 1.756-2.331 1.094l-6.438-4.744-3.106 2.988c-.344.344-.631.631-1.294.631l.463-6.556 11.931-10.781c.519-.462-.113-.719-.806-.256l-14.75 9.288-6.35-1.988c-1.381-.431-1.406-1.381.288-2.044l24.837-9.569c1.15-.431 2.156.256 1.781 2.013z"/>
                            </svg>
                            <span>{{ getConfigConst("corporateInfo.telegramTag") }}</span>
                        </a>
                    </li>

                    <li class="py-2 flex items-center font-jost font-medium">
                        <svg class="mr-3 min-w-5 text-zinc-500" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                        </svg>
                        <span>{{ getConfigConst('corporateInfo.email') }}</span>
                    </li>
                </ul>

                <ul class="max-md:p-4 md:flex md:items-center ml-auto max-md:block md:space-x-8">
                    <li class="inline-flex h-full">
                        <button @click="openAppointmentModalWithDescription()" class="my-[2px] tracking-wider text-gray-100 md:hover:text-[red] bg-[red] md:hover:bg-white active:text-[red] active:bg-white border border-[red] py-2 px-3 md:px-4 rounded-md inline-flex items-center duration-150">
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
