<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import { inject, onMounted, ref } from 'vue';
    import BenefitsList from '../components/BenefitsList.vue';
    import { getConfigConst } from '@/vue-helpers/configValues';

    const route = useRoute();
    const optionExpanded = ref(-1);

    const openAppointmentModal = inject<(description?: string) => void>('openAppointmentModal');

    const services = getConfigConst('application.servicesTags') as { [key: string]: string };

    const name = Array.isArray(route.params.serviceName) ? route.params.serviceName[0] : route.params.serviceName;
    const serviceTag = ref(services[name]);

    const toPricelistPopup = ref<HTMLDivElement[] | undefined>();
    
    onMounted(() => {
        if (toPricelistPopup.value){
            toPricelistPopup.value.forEach(el => el.parentElement?.setAttribute("style", `height: ${el.clientHeight}px`));
        }
    });

    function openAppointmentModalWithDescription(description: string){
        if (openAppointmentModal){
            openAppointmentModal(description);
        }
    }
</script>

<template>
    <div class="pb-28">
        <div class="w-full h-64 md:h-44 lg:h-52 xl:h-56 2xl:h-60 bg-service-banner-1 bg-cover bg-center flex justify-center items-center">
            <div class="m-8">
                <hr class="border-gray-200 border-[1px]" />
                <h1 class="px-6 md:px-10 my-4 xl:my-6 text-4xl xl:text-5xl text-white font-jost-medium drop-shadow-xl text-center">{{ $t(`customerServices.${serviceTag}.title`) }}</h1>
                <hr class="border-gray-200 border-[1px]" />
            </div>
        </div>
        <div class="px-8 mx-auto md:px-10 2xl:px-16 max-w-lg sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
            <article class="pt-6 pb-20 px-32">

                <div class="my-8 text-xl font-jost text-zinc-700">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, ratione vel. Odit quis possimus dolorem, dicta tempore corporis laboriosam eaque esse. Consectetur accusamus in soluta consequuntur officia, sint natus amet!
                    </p>

                    <ul class="my-6">
                        <li v-for="content in $tm(`customerServices.${serviceTag}.checkReasons`)" class="flex items-start py-2">
                            <div class="m-1 ml-0 text-[red]">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M15.273 19.469c-.662-.662-1.582-1.002-2.514-.931-1.767.137-3.58-.47-4.931-1.821-1.223-1.224-1.83-2.824-1.83-4.426 0-.604.086-1.208.258-1.792l3.771 3.771c1.912.417 4.652-2.353 4.242-4.242l-3.769-3.771c.583-.171 1.187-.257 1.79-.257 1.603 0 3.202.606 4.428 1.83 1.35 1.351 1.957 3.164 1.82 4.93-.072.933.268 1.853.93 2.514l2.843 2.843c1.066-1.793 1.689-3.88 1.689-6.117 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.236 0 4.323-.623 6.115-1.688l-2.842-2.843z"/>
                                </svg>
                            </div>
                            <p class="ml-3 leading-8">
                                {{ content }}
                            </p>
                        </li>
                    </ul>
                </div>

                <div class="text-5xl mt-24 mb-14 font-jost-bold text-center text-zinc-800 leading-[1.2]">
                    <h2>{{ $t('customerServices.pricelistTitle') }}</h2>
                </div>

                <div class="flex flex-col">
                    <div class="min-w-full inline-block align-middle">
                        <div class="rounded-xl shadow-lg overflow-hidden">
                            <table class="min-w-full">
                                <thead class="font-jost-medium text-lg text-zinc-500">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-start uppercase tracking-wide">{{ $t('customerServices.tableNameLabel') }}</th>
                                        <th scope="col" class="px-6 py-3 text-start uppercase tracking-wide">{{ $t('customerServices.tablePriceLabel') }}</th>
                                    </tr>
                                </thead>
                                <tbody v-for="(option, id) in $tm(`customerServices.${serviceTag}.options`)" :aria-expanded="optionExpanded === id" class="group divide-gray-200 font-jost-medium text-lg bg-white">
                                    <tr @click="optionExpanded !== id ? optionExpanded = id : optionExpanded = -1" class="hover:bg-zinc-200 cursor-pointer border-t border-b-0 duration-150">
                                        <td class="px-6 py-4 whitespace-nowrap">{{ option['name'] }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap">
                                            <span class="flex justify-between items-center">
                                                {{ option['price'] }}
                                                <svg class="w-2.5 h-2.5 -rotate-90 group-aria-expanded:rotate-90 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
                                                </svg>
                                            </span>
                                        </td>
                                    </tr>
                                    <tr class="border-t-0">
                                        <td colspan="2" class="relative p-0 overflow-hidden group-aria-[expanded='false']:!h-0 duration-300">
                                            <div ref="toPricelistPopup" class="absolute top-0 px-6 py-4 w-full">
                                                <p>
                                                    {{ option['problem'] }}
                                                </p>
                                                
                                                <button @click="openAppointmentModalWithDescription(option['problemDescription'])" class="mt-4 mb-2 tracking-wider text-gray-100 hover:text-[red] bg-[red] border border-[red] hover:bg-white py-1.5 px-2 md:px-4 rounded-md inline-flex items-center duration-150">
                                                    <span>{{ $t('customerServices.currentOptionAppoinment') }}</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </article>

            <BenefitsList class="mt-16" />
        </div>
    </div>
</template>