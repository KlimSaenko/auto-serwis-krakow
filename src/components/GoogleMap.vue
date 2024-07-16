<script setup lang="ts">
    import GoogleServices from '../vue-helpers/googleServices';
    import { useI18n } from 'vue-i18n';
    import { ref, watchEffect } from 'vue';

    const { locale } = useI18n();

    const googleMapsApiUrl = ref(GoogleServices.GoogleMapsApiUrl(locale.value));

    watchEffect(_ => refresh(locale.value));

    function refresh(locale: string) {
        googleMapsApiUrl.value = GoogleServices.GoogleMapsApiUrl(locale);
    }
</script>

<template>
    <div class="w-full h-[26rem] lg:h-[30rem] xl:h-[38rem] mt-40">
        <iframe width="100%"
                height="100%"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                :src="googleMapsApiUrl"></iframe>
    </div>
</template>