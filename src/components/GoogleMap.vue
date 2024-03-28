<script setup lang="ts">
    // import { watch } from 'vue';
    import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map';
    import { useI18n } from 'vue-i18n';
    import { getConfigConst } from '../vue-helpers/configValues';
    // import { Loader } from '@googlemaps/js-api-loader';

    const { locale, t } = useI18n();
    const center = getConfigConst('businessLocation');
    const markerOptions = { position: center, title: t('googleMap.markerTitle') };
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    // let loader = new Loader({
    //     apiKey: apiKey,
    //     version: 'weekly',
    //     libraries: ['places'],
    //     language: locale.value,
    //     nonce: 'nonce-0b01870c-4609-4544-9460-e1ead365f63e'
    // });
    // loader.importLibrary('places');

    // watch(locale, (newLocale, oldLocale) => {
    //     var scripts = document.querySelectorAll("script[src*='maps.googleapis.com/maps-api-v3']");
    //     for(var i = 0; i < scripts.length; i++) {
    //         scripts[i].parentNode?.removeChild(scripts[i]);
    //     }
        
    //     if (window.google)
    //         delete window.google.maps;

    //     loader.deleteScript();

    //     loader = new Loader({
    //         apiKey: apiKey,
    //         version: 'weekly',
    //         libraries: ['places'],
    //         language: newLocale,
    //         nonce: 'nonce-0b01870c-4609-4544-9460-e1ead365f63e'
    //     });
    //     loader.importLibrary('places');
    // });
</script>

<template>
    <div class="w-full h-96 lg:h-[30rem] xl:h-[38rem]">
        <GoogleMap
            :api-key="apiKey"
            :center="center"
            :zoom="14"
            :language="locale"
            map-type-id="roadmap"
            class="w-full h-full mt-36"
        >
            <Marker :options="markerOptions">
                <InfoWindow>
                    <article class="poi-info-window">
                        <h1 class="title full-width">{{ $t('googleMap.markerTitle') }}</h1>
                        <div class="address">
                            <h2 class="address-line full-width">{{ `${ $t('googleMap.addressLabel') }:` }}</h2>
                            <p v-for="row in (getConfigConst('addressFull') as string)?.split(', ')" class="address-line full-width">
                                {{ row }}
                            </p>
                        </div>
                        <div class="address">
                            <h2>{{ `${ $t('googleMap.contactsLabel') }:` }}</h2>
                            <p>{{ `${ $t('googleMap.telLabel') }: +48 ${ getConfigConst('contactNumber') }` }}</p>
                        </div>
                        <div class="view-link mt-[2px]">
                            <a target="_blank" :href="getConfigConst('businessLocationUrl') as string">
                                {{ $t('googleMap.viewOnGoogleMaps') }}
                            </a>
                        </div>
                    </article>
                </InfoWindow>
            </Marker>
        </GoogleMap>
    </div>
</template>