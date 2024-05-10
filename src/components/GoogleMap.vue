<script setup lang="ts">
    import { GoogleMap, Marker, InfoWindow } from 'vue3-google-map';
    import GoogleServices from '../vue-helpers/googleServices';
    import { useI18n } from 'vue-i18n';
    import { getConfigConst } from '../vue-helpers/configValues';

    const { locale, t } = useI18n();
    const services = new GoogleServices(locale.value);
    
    const businessLocation = getConfigConst('businessLocation');
    const center: google.maps.LatLngLiteral = typeof businessLocation === 'object'
        ? businessLocation as google.maps.LatLngLiteral
        : { lat: 0, lng: 0 };
    const markerOptions = { position: center, title: t('googleMap.markerTitle') };
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
</script>

<template>
    <div class="w-full h-96 lg:h-[30rem] xl:h-[38rem] mt-40">
        <GoogleMap
            :center="center"
            :zoom="14"
            map-type-id="roadmap"
            class="w-full h-full"
        >
            <Marker :options="markerOptions">
                <InfoWindow>
                    <article class="poi-info-window">
                        <img src="https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                        <h1 class="title full-width">{{ $t('googleMap.markerTitle') }}</h1>
                        <div class="address">
                            <h2 class="address-line full-width">{{ `${ $t('googleMap.addressLabel') }:` }}</h2>
                            <p v-for="row in (getConfigConst('addressFull') as string)?.split(', ')" class="address-line full-width">
                                {{ row }}
                            </p>
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