<script setup lang="ts">
  import { getConfigConst } from '@/vue-helpers/configValues';
</script>

<template>
    <footer class="border-box bg-zinc-800">
        <div class="pb-5 pt-10 mx-auto text-lg px-8 2xl:px-12 max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl font-jost">
            <div class="grid mt-3 text-gray-300 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <div class="col-span-1 px-3 mb-5">
                    <h2 class="font-jost-bold mb-4">
                        {{ $t("footer.contacts") }}
                    </h2>

                    <div class="flex items-center mb-2">
                        <svg class="mr-3" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.05 6C15.0268 6.19057 15.9244 6.66826 16.6281 7.37194C17.3318 8.07561 17.8095 8.97326 18 9.95M14.05 2C16.0793 2.22544 17.9716 3.13417 19.4163 4.57701C20.8609 6.01984 21.7721 7.91101 22 9.94M18.5 21C9.93959 21 3 14.0604 3 5.5C3 5.11378 3.01413 4.73086 3.04189 4.35173C3.07375 3.91662 3.08968 3.69907 3.2037 3.50103C3.29814 3.33701 3.4655 3.18146 3.63598 3.09925C3.84181 3 4.08188 3 4.56201 3H7.37932C7.78308 3 7.98496 3 8.15802 3.06645C8.31089 3.12515 8.44701 3.22049 8.55442 3.3441C8.67601 3.48403 8.745 3.67376 8.88299 4.05321L10.0491 7.26005C10.2096 7.70153 10.2899 7.92227 10.2763 8.1317C10.2643 8.31637 10.2012 8.49408 10.0942 8.64506C9.97286 8.81628 9.77145 8.93713 9.36863 9.17882L8 10C9.2019 12.6489 11.3501 14.7999 14 16L14.8212 14.6314C15.0629 14.2285 15.1837 14.0271 15.3549 13.9058C15.5059 13.7988 15.6836 13.7357 15.8683 13.7237C16.0777 13.7101 16.2985 13.7904 16.74 13.9509L19.9468 15.117C20.3262 15.255 20.516 15.324 20.6559 15.4456C20.7795 15.553 20.8749 15.6891 20.9335 15.842C21 16.015 21 16.2169 21 16.6207V19.438C21 19.9181 21 20.1582 20.9007 20.364C20.8185 20.5345 20.663 20.7019 20.499 20.7963C20.3009 20.9103 20.0834 20.9262 19.6483 20.9581C19.2691 20.9859 18.8862 21 18.5 21Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span class="font-normal">
                            {{ getConfigConst("corporateInfo.contactNumber") }}
                        </span>
                    </div>

                    <div class="flex items-center mb-2">
                        <svg class="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                            <path d="M19 4H5a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-.67 2L12 10.75 5.67 6zM19 18H5a1 1 0 0 1-1-1V7.25l7.4 5.55a1 1 0 0 0 .6.2 1 1 0 0 0 .6-.2L20 7.25V17a1 1 0 0 1-1 1z" fill="currentColor"></path>
                        </svg>
                        <span class="font-normal">
                            {{ getConfigConst("corporateInfo.email") }}
                        </span>
                    </div>

                    <div class="inline-flex mt-5 gap-7 text-gray-400">
                        <a :href="(getConfigConst('corporateInfo.instagramLink') as string)" target="_blank" class="h-7 w-7 group md:hover:text-gray-100 active:text-gray-100 cursor-pointer">
                            <svg height="28" width="28" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 448 512">
                                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                            </svg>
                        </a>
                        
                        <a :href="(getConfigConst('corporateInfo.googleMapsLink') as string)" target="_blank" class="h-7 w-7 md:hover:text-gray-100 active:text-gray-100 cursor-pointer">
                            <svg height="28" width="28" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 488 512">
                                <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                            </svg>
                        </a>

                        <a :href="(getConfigConst('corporateInfo.telegramLink') as string)" target="_blank" class="h-7 w-7 md:hover:text-gray-100 active:text-gray-100 cursor-pointer">
                            <svg height="28" width="28" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                <path fill="currentColor" d="m29.919 6.163-4.225 19.925c-.319 1.406-1.15 1.756-2.331 1.094l-6.438-4.744-3.106 2.988c-.344.344-.631.631-1.294.631l.463-6.556 11.931-10.781c.519-.462-.113-.719-.806-.256l-14.75 9.288-6.35-1.988c-1.381-.431-1.406-1.381.288-2.044l24.837-9.569c1.15-.431 2.156.256 1.781 2.013z" />
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="px-3 col-span-1 mb-5">
                    <div class="flex p-5 border-2 border-[red] rounded-lg justify-center">
                        <div class="leading-9 my-2">
                            <h2 class="mb-3 text-xl text-gray-100 font-jost-bold">
                                {{ $t("footer.openNow") }}
                            </h2>
                            <div class="flex items-center">
                                <span class="font-normal">
                                    {{ $t("header.workingTime") }}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-1 px-3 flex lg:justify-center">
                    <div>
                        <h2 class="mb-4 font-jost-bold">{{ $t('footer.quickLinks') }}</h2>
                        <ul>
                            <li class="flex mb-3">
                                <router-link :to="{ name: 'home' }" class="md:hover:text-gray-100 active:text-gray-100 leading-7">
                                    {{ $t("footer.home") }}
                                </router-link>
                            </li>

                            <li class="flex mb-3">
                                <router-link :to="{ name: 'services' }" class="md:hover:text-gray-100 active:text-gray-100 leading-7">
                                    {{ $t("footer.services") }}
                                </router-link>
                            </li>

                            <li class="flex mb-3">
                                <router-link :to="{ name: 'media' }" class="md:hover:text-gray-100 active:text-gray-100 leading-7">
                                    {{ $t("footer.media") }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="px-3">
                <hr class="my-6 border-zinc-500/75 sm:mx-auto" />
            </div>

            <div class="flex justify-center mt-10 mb-10">
                <div class="">
                    <a href="https://www.orlymotoryzacji.pl/profile-1614193-auto-serwis-krakow-sto-krakov" target="_blank">
                        <img class="w-72" src="https://www.orlymotoryzacji.pl/images/medals/1614193/laureat300_gold_2_pl.png" alt="Auto Serwis Kraków СТО Краков - Kraków" title="Auto Serwis Kraków СТО Краков - Kraków">
                    </a>
                </div>
            </div>

            <div class="px-3">
                <hr class="my-6 border-zinc-500/75 sm:mx-auto" />
            </div>

            <p class="my-2 text-sm text-gray-300 text-center">© 2024 <router-link :to="{ name: 'home' }" class="md:hover:underline">Front Auto</router-link>. {{ $t('footer.allRightsReserved') }}.</p>
        </div>
    </footer>
</template>