<script setup lang="ts">
    import CustomerService from '../types/customerService';
    import { ref, onMounted } from 'vue';

    defineProps({ 
        сustomerService: {
            type: CustomerService,
            required: true
        }
    });

    const toPricelistPopup = ref<HTMLDivElement | undefined>();
    const toPricelistPopupWidth = ref('');

    onMounted(() => {
        if (toPricelistPopup.value){
            toPricelistPopupWidth.value = toPricelistPopup.value.clientWidth + "px";
        }
    });
</script>

<template>
    <section>
        <div class="group w-full h-max rounded-xl relative overflow-hidden cursor-pointer shadow-lg hover:shadow-xl duration-200">
            <div class="w-full text-white h-max">
                <div class="p-5 bg-no-repeat bg-center bg-service-banner-1 h-max bg-[length:106%] group-hover:bg-[length:100%] duration-200">
                    <div class="min-w-48 w-3/5">
                        <h2 class="text-2xl ms-4 md:text-4xl font-jost-medium drop-shadow-xl">{{ сustomerService.Title }}</h2>
                        <p class="mt-3 ms-4 text-lg font-jost text-zinc-100">
                            {{ сustomerService.DescriptionShort }}
                        </p>
                    </div>
                </div>
                <div class="absolute h-full top-0 right-0 flex items-center px-10">
                    <svg fill="currentColor" height="64" width="64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve">
                        <path d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255
                            s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0
                            c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z"/>
                    </svg>
                </div>
            </div>
            <div :style="`width: ${ toPricelistPopupWidth };`" class="absolute right-0 duration-300 group-[:not(:hover)]:!w-0 top-0 z-10 h-full overflow-hidden bg-white flex justify-center items-center">
                <div ref="toPricelistPopup" class="absolute right-0 flex items-center px-10 font-jost text-zinc-700">
                    <h3 class="text-2xl w-min text-wrap uppercase">
                        Перейти к прайслисту
                    </h3>
                    <svg class="ms-8" fill="currentColor" height="64" width="64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve">
                        <path d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255
                            s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0
                            c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z"/>
                    </svg>
                </div>
            </div>
        </div>

        <div class="mt-8 ms-8 text-zinc-600 text-lg font-jost">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur exercitationem minus deserunt pariatur doloremque, nam magni veritatis magnam! Doloremque magnam natus, facilis quia animi consequatur vitae voluptas alias eligendi delectus.
            </p>
            <ul class="my-4">
                <li v-for="content in $tm('home.aboutAdvantages')" class="flex items-center py-2">
                    <img src="/public/icons/verified-badge.svg" width="22" height="22" class="m-1 !ml-0" />
                    <p class="ml-3">
                        {{ content }}
                    </p>
                </li>
            </ul>
        </div>
    </section>
</template>