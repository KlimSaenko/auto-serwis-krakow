<script setup lang="ts">
    import CustomerServiceLink from '../components/CustomerServiceLink.vue';
    import CustomerService from '../types/customerService';
    import { useI18n } from 'vue-i18n';
    import { watch } from 'vue';

    const { t, locale } = useI18n();

    const diagnosisService = new CustomerService(t('customerServices.diagnosisTitle'), t('customerServices.diagnosisDescriptionShort'));
    const unitsReplacementService = new CustomerService(t('customerServices.unitsReplacementTitle'), t('customerServices.unitsReplacementDescriptionShort'));

    watch(locale, onLocaleUpdate);

    const customerServices = [
        diagnosisService,
        unitsReplacementService
    ];

    function onLocaleUpdate(){
        diagnosisService.Title = t('customerServices.diagnosisTitle');
        diagnosisService.DescriptionShort = t('customerServices.diagnosisDescriptionShort');

        unitsReplacementService.Title = t('customerServices.unitsReplacementTitle');
        unitsReplacementService.DescriptionShort = t('customerServices.unitsReplacementDescriptionShort');
    }
</script>

<template>
    <div class="pt-12 pb-16">
        <div class="text-5xl mb-14 font-jost-bold text-center text-zinc-800 leading-[1.2]">
            <h1>{{ t('customerServices.ourServicesTitle') }}</h1>
        </div>

        <div class="px-8 mx-auto md:px-10 2xl:px-16 max-w-lg sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
            <section class="flex flex-col space-y-16">
                <CustomerServiceLink v-for="customerService in customerServices" :key="locale" :сustomerService="customerService" />
            </section>
        </div>
    </div>
</template>