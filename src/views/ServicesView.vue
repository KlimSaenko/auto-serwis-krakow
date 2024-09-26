<script setup lang="ts">
    import CustomerServiceLink from '../components/CustomerServiceLink.vue';
    import { getConfigConst } from '@/vue-helpers/configValues';
    
    const customerServices = getConfigConst('application.servicesTags') as { [key: string]: string };
</script>

<template>
    <div class="pt-10 md:pt-12 pb-16 md:pb-28">
        <div class="mb-11 md:mb-14 text-center px-4 sm:px-8 md:px-10 2xl:px-16">
            <h1 class="text-[2.5rem] md:text-5xl font-jost-bold text-zinc-800 leading-[1.2]">{{ $t('customerServices.ourServicesTitle') }}</h1>
        </div>

        <div class="mx-auto px-4 sm:px-8 md:px-10 2xl:px-16 max-w-lg sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
            <section class="flex flex-col space-y-16">
                <CustomerServiceLink v-for="(serviceTag, key) in customerServices" :serviceTag="serviceTag" :serviceUrlName="key.toString()" />
            </section>
        </div>
    </div>
</template>