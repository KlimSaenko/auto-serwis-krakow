<script setup lang="ts">
    import { ref, onMounted } from 'vue';

    defineProps({
        serviceUrlName: {
            type: String,
            required: true
        },
        serviceTag: {
            type: String,
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
        <router-link :to="{ name: 'customer-service', params: { serviceName: serviceUrlName } }" class="group w-full h-max rounded-xl relative overflow-hidden block cursor-pointer shadow-lg hover:shadow-xl duration-200">
            <div class="w-full text-white h-max">
                <div class="flex p-5 bg-no-repeat bg-center bg-opacity-0 bg-service-banner-1 bg-cover lg:bg-[length:106%] lg:group-hover:bg-[length:100%] duration-200">
                    <div class="min-w-48 md:w-4/5">
                        <h2 class="text-[1.75rem] leading-9 md:ms-4 md:text-4xl font-jost-medium drop-shadow-xl">
                            {{ $tm(`customerServices.${serviceTag}.title`) }}
                        </h2>
                        <p class="mt-3 text-base md:ms-4 md:text-lg font-jost text-zinc-100">
                            {{ $t(`customerServices.${serviceTag}.descriptionShort`) }}
                        </p>
                    </div>

                    <div class="max-md:hidden h-full ps-14 pe-5 ms-auto my-auto">
                        <svg fill="currentColor" height="64" width="64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve">
                            <path d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255
                                s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0
                                c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div :style="`width: ${ toPricelistPopupWidth };`" class="md:absolute max-md:!w-full py-4 right-0 duration-300 md:group-[:not(:hover)]:!w-0 top-0 z-10 h-full overflow-hidden bg-white flex justify-center items-center">
                <div ref="toPricelistPopup" class="md:absolute right-0 flex items-center px-10 font-jost text-zinc-700">
                    <h3 class="text-xl md:text-2xl w-min text-wrap uppercase">
                        {{ $t('customerServices.goToPricelist') }}
                    </h3>
                    <svg class="ms-8 max-md:h-12 max-md:w-12" fill="currentColor" height="64" width="64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 330 330" xml:space="preserve">
                        <path d="M15,180h263.787l-49.394,49.394c-5.858,5.857-5.858,15.355,0,21.213C232.322,253.535,236.161,255,240,255
                            s7.678-1.465,10.606-4.394l75-75c5.858-5.857,5.858-15.355,0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213,0
                            c-5.858,5.857-5.858,15.355,0,21.213L278.787,150H15c-8.284,0-15,6.716-15,15S6.716,180,15,180z"/>
                    </svg>
                </div>
            </div>
        </router-link>

        <div class="mt-8 ml-1 md:ml-8 text-zinc-600 text-xl font-jost leading-8">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur exercitationem minus deserunt pariatur doloremque, nam magni veritatis magnam! Doloremque magnam natus, facilis quia animi consequatur vitae voluptas alias eligendi delectus.
            </p>
            <ul class="my-4">
                <li v-for="content in $tm('home.aboutAdvantages')" class="flex items-start py-2">
                        <div class="m-1 ml-0">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="min-w-6" width="24" height="24" viewBox="0 0 256 256" xml:space="preserve">
                                <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                                    <path d="M 49.66 1.125 L 49.66 1.125 c 4.67 -2.393 10.394 -0.859 13.243 3.548 l 0 0 c 1.784 2.761 4.788 4.495 8.071 4.66 l 0 0 c 5.241 0.263 9.431 4.453 9.694 9.694 v 0 c 0.165 3.283 1.899 6.286 4.66 8.071 l 0 0 c 4.407 2.848 5.941 8.572 3.548 13.242 l 0 0 c -1.499 2.926 -1.499 6.394 0 9.319 l 0 0 c 2.393 4.67 0.859 10.394 -3.548 13.242 l 0 0 c -2.761 1.784 -4.495 4.788 -4.66 8.071 v 0 c -0.263 5.241 -4.453 9.431 -9.694 9.694 h 0 c -3.283 0.165 -6.286 1.899 -8.071 4.66 l 0 0 c -2.848 4.407 -8.572 5.941 -13.242 3.548 l 0 0 c -2.926 -1.499 -6.394 -1.499 -9.319 0 l 0 0 c -4.67 2.393 -10.394 0.859 -13.242 -3.548 l 0 0 c -1.784 -2.761 -4.788 -4.495 -8.071 -4.66 h 0 c -5.241 -0.263 -9.431 -4.453 -9.694 -9.694 l 0 0 c -0.165 -3.283 -1.899 -6.286 -4.66 -8.071 l 0 0 C 0.266 60.054 -1.267 54.33 1.125 49.66 l 0 0 c 1.499 -2.926 1.499 -6.394 0 -9.319 l 0 0 c -2.393 -4.67 -0.859 -10.394 3.548 -13.242 l 0 0 c 2.761 -1.784 4.495 -4.788 4.66 -8.071 l 0 0 c 0.263 -5.241 4.453 -9.431 9.694 -9.694 l 0 0 c 3.283 -0.165 6.286 -1.899 8.071 -4.66 l 0 0 c 2.848 -4.407 8.572 -5.941 13.242 -3.548 l 0 0 C 43.266 2.624 46.734 2.624 49.66 1.125 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: red; fill-rule: nonzero; opacity: 1;"/>
                                    <polygon points="36.94,66.3 17.5,46.87 27.2,37.16 36.94,46.9 60.11,23.7 69.81,33.39 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: white; fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>
                                </g>
                            </svg>
                        </div>
                    <p class="ms-2 sm:ms-4">
                        {{ content }}
                    </p>
                </li>
            </ul>
        </div>
    </section>
</template>