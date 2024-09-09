<script setup lang="ts">
    import CustomerService from '../types/customerService';
    import { onBeforeRouteUpdate } from 'vue-router';
    import { useI18n } from 'vue-i18n';

    const { t } = useI18n();

    const service = new CustomerService(t('customerServices.diagnosisTitle'), t('customerServices.diagnosisDescriptionShort'));
    
    onBeforeRouteUpdate(async (to, from, next) => {
        if (to.params.serviceName && to.params.serviceName === 'diagnosis'){
            next();
        } else {
            let query = to.fullPath.match(/^\/$/) ? {} : { redirect: to.fullPath }
            next({
                path: from.fullPath,
                query: query
            });
        };
    });
</script>

<template>
    <div class="pb-16">
        <div class="w-full h-64 md:h-44 lg:h-52 xl:h-56 2xl:h-60 bg-service-banner-1 bg-cover bg-center flex justify-center items-center">
            <div class="m-8">
                <hr class="border-gray-200 border-[1px]" />
                <h1 class="px-6 md:px-10 my-4 xl:my-6 text-4xl xl:text-5xl text-white font-jost-medium drop-shadow-xl text-center">{{ service.Title }}</h1>
                <hr class="border-gray-200 border-[1px]" />
            </div>
        </div>
        
        <article class="pt-8 pb-20 px-32">
            <div class="text-5xl mb-14 font-jost-bold text-center text-zinc-800 leading-[1.2]">
                <h1>{{ t('customerServices.ourServicesTitle') }}</h1>
            </div>

            <div class="px-8 mx-auto md:px-10 2xl:px-16 max-w-lg sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
                <div class="flex flex-col space-y-16">
                    
                </div>
            </div>
        </article>
    </div>
</template>