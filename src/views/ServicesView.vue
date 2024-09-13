<script setup lang="ts">
    import CustomerServiceLink from '../components/CustomerServiceLink.vue';
    import { getConfigConst } from '@/vue-helpers/configValues';
    
    const customerServices = getConfigConst('application.servicesTags') as { [key: string]: string };
</script>

<template>
    <div class="pt-12 pb-28">
        <div class="text-5xl mb-14 font-jost-bold text-center text-zinc-800 leading-[1.2]">
            <h1>{{ $t('customerServices.ourServicesTitle') }}</h1>
        </div>

        <div class="px-8 mx-auto md:px-10 2xl:px-16 max-w-lg sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
            <section class="flex flex-col space-y-16">
                <CustomerServiceLink v-for="(serviceTag, key) in customerServices" :serviceTag="serviceTag" :serviceUrlName="key.toString()" />
            </section>
        </div>
    </div>
</template>