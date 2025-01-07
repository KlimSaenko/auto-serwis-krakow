<script setup lang="ts">
    import GoogleServices from '@/vue-helpers/googleServices';
    import { useI18n } from 'vue-i18n';
    import { ref, watchEffect } from 'vue';
	import { getConfigConst } from '@config/configValues';

    const { locale } = useI18n();

    const googleMapsApiUrl = ref(GoogleServices.GoogleMapsApiUrl(locale.value));

    watchEffect(_ => refresh(locale.value));

    function refresh(locale: string) {
        googleMapsApiUrl.value = GoogleServices.GoogleMapsApiUrl(locale);
    }
</script>

<template>
    <section class="w-full relative">
        <!-- <div id="map" class="absolute top-[calc(-3rem-10vh)] h-0"></div> -->

        <div class="flex mb-14 md:mb-20 justify-center text-center px-4 sm:px-8 md:px-10 2xl:px-16">
            <h1 class="text-[2.5rem] md:text-5xl font-jost-bold text-zinc-800 leading-[1.2]">{{ $t('home.weAreHereTitle') }}</h1>
        </div>

        <div class="h-[40rem] md:h-[26rem] lg:h-[30rem] xl:h-[38rem] max-h-[70vh]">
            <iframe width="100%"
                    height="100%"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    referrerpolicy="no-referrer-when-downgrade"
                    :src="(getConfigConst('businessLocationMap') as string)"></iframe>
        </div>
    </section>
</template>