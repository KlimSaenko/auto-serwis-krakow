<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue';
    import { getConfigConst } from '../vue-helpers/configValues';
    import { CountryProperty, type CountryData, findOne as findCountry, all as getAllCountries } from 'country-codes-list';
    import Translations from '../vue-helpers/translations';
    import useClickOutside from '../vue-helpers/useClickOutside';

    defineProps({ 
        appointmentFormOpened: {
            type: Boolean,
            required: false
        }
    });

    const isLocationSelectorOpen = ref(false);
    const currentLocation = ref<CountryData | null>(findCountry('countryCode' as CountryProperty, Translations.defaultLocale.region));

    const phoneCodeInput = ref<string>(currentLocation.value?.countryCallingCode ?? '');
    watch(phoneCodeInput, code => phoneCodeInput.value = code.replace(/\D/g, '').substring(0, 4));

    const phoneInput = ref<string>('');
    watch(phoneInput, phone => phoneInput.value = phone.replace(/\D/g, ''));

    const allCountries = getAllCountries().filter(value => value.region == 'Europe');

    const componentRef = ref();
    const excludeRef = ref();

    watch(currentLocation, () => {
      if (currentLocation.value?.countryCallingCode){
        phoneCodeInput.value = currentLocation.value.countryCallingCode;
      }
    });

    onMounted(async () => {
      const localeInfo = await Translations.getUserLocaleInfo();
      currentLocation.value = findCountry('countryCode' as CountryProperty, localeInfo.region);

      phoneCodeInput.value = currentLocation.value.countryCallingCode;
    });

    useClickOutside(
      componentRef,
      closeCountrySelector,
      excludeRef
    );

    function closeCountrySelector(){
      isLocationSelectorOpen.value = false;

      if (currentLocation.value?.countryCallingCode == phoneCodeInput.value)
        return;

      currentLocation.value = findCountry('countryCallingCode' as CountryProperty, phoneCodeInput.value!);
    }

    function validateForm(){

    }
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .25s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>

<template>
  <Transition name="fade" appear>
    <div v-if="appointmentFormOpened" class="fixed inset-0 w-full h-full p-0 m-0 bg-zinc-900/60 z-[999] flex">
      <div class="m-auto md:w-[56rem] tracking-wide bg-white rounded-3xl shadow-xl shadow-black/40 font-jost text-zinc-500 relative overflow-hidden md:grid md:grid-cols-5">
        <div class="col-span-3 p-8 xl:p-10">
          <form v-on:submit.prevent="validateForm">
            <h1 class="text-4xl text-zinc-800">{{ $t("modal.appointmentTitle") }}</h1>

            <i18n-t class="my-6" keypath="modal.appointmentDescription" scope="global" tag="p">
              <template #privacyPolicyLabel>
                <a href="" target="_blank" class="hover:underline cursor-pointer text-blue-600/80 lowercase">{{ $t('modal.privacyPolicyLabel') }}</a>  
              </template>
            </i18n-t>

            <div class="my-6">
              <label class="block mb-2">{{ $t("modal.customerNameLabel") }} <span class="text-[red] font-jost-medium">*</span></label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                  </svg>
                </div>
                <input type="text" class="bg-gray-50 border tracking-wide border-gray-300 text-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2 pr-3" placeholder="Your Name">
              </div>
            </div>

            <div class="my-6">
              <label class="block mb-2">{{ $t("modal.customerNumberLabel") }}</label>
              <div class="flex relative">
                <div ref="componentRef" v-on:focusin="isLocationSelectorOpen = true" class="relative flex font-jost items-center cursor-pointer pl-10 pr-6 font-medium text-center bg-gray-100 text-gray-700 border border-gray-300 rounded-s-lg hover:bg-gray-200">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                    <span :class="currentLocation ? `fi-${ currentLocation.countryCode.toLowerCase() }` : ''" class="fi bg-white h-4 !w-4 !bg-cover rounded-full ring-1 ring-black ring-opacity-5"></span>
                  </div>
                  
                  <span>+</span>
                  <input type="tel" :size="phoneCodeInput.length" v-model="phoneCodeInput" maxlength="4" class="tracking-wide cursor-text shadow-none ring-0 border-0 outline-none bg-transparent" />
                  
                  <div class="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
                    <svg class="w-2.5 h-2.5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/></svg>
                  </div>
                </div>

                <div v-if="isLocationSelectorOpen" ref="excludeRef" class="absolute font-jost max-h-52 left-0 top-full overflow-y-auto z-10 mt-1 text-[0.9rem] w-max rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                  <ul class="grid grid-flow-row gap-1">
                    <li v-for="loc of allCountries.filter(value => value.countryCallingCode.startsWith(phoneCodeInput ?? ''))" @click="currentLocation = loc" :aria-checked="currentLocation?.countryCode == loc.countryCode" class="flex items-center tracking-wide px-3 py-2 align-baseline text-gray-700 aria-checked:bg-zinc-200/60 aria-checked:text-zinc-800 md:hover:bg-zinc-200/60 md:hover:text-zinc-800 cursor-pointer rounded-md">
                      <span :class="`fi-${ loc.countryCode.toLowerCase() }`" class="fi !bg-cover bg-white rounded-full h-4 !w-4 mr-3 ring-1 ring-black ring-opacity-5"></span>
                      <span>{{ `${loc.countryNameLocal} (+${loc.countryCallingCode})` }}</span>
                    </li>
                  </ul>
                </div>

                <div class="relative w-full">
                  <input type="tel" v-model="phoneInput" maxlength="11" class="block tracking-wide p-2 pr-3 w-full text-black bg-gray-50 rounded-e-lg border-s-0 border border-gray-300" placeholder="123-456-7890" />
                </div>
              </div>
            </div>

            <div class="my-6">
              <label class="block mb-2">{{ $t("modal.customerTelegramLabel") }}</label>
              <div class="flex relative">
                  <div class="relative flex text-gray-700 text-lg font-jost items-center pl-4 pr-4 font-medium text-center bg-gray-100 border border-gray-300 rounded-s-lg">
                    <span>@</span>
                  </div>

                  <div class="relative w-full">
                    <input type="text" class="block tracking-wide p-2 pr-3 w-full text-black bg-gray-50 rounded-e-lg border-s-0 border border-gray-300" placeholder="YourTelegram" />
                  </div>
              </div>
            </div>
            
            <div class="my-6">
              <label class="block mb-2">{{ $t("modal.customerEmailLabel") }}</label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                  </svg>
                </div>
                <input type="email" class="bg-gray-50 tracking-wide border border-gray-300 text-black rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2 pr-3" placeholder="your@email.com">
              </div>
            </div>

            <div class="my-6">
              <label class="block mb-2">{{ $t("modal.customerMessageLabel") }}</label>
              <textarea rows="4" class="block tracking-wide px-3 py-2 w-full text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
            </div>

            <button type="submit" class="mt-2 tracking-wider text-gray-100 hover:text-[red] bg-[red] border border-[red] hover:bg-white font-jost-medium py-2 px-3 md:px-4 rounded-md inline-flex items-center">
                <span>{{ $t("header.onlineAppointment") }}</span>
            </button>
          </form>
        </div>

        <div class="relative max-md:hidden col-span-2 px-4 lg:px-7 py-10 bg-gray-200">
          <h1 class="text-4xl text-zinc-800">{{ $t("modal.contactsTitle") }}</h1>

          <p class="my-6">
            {{ $t('modal.contactsDescription') }}
          </p>

          <ul class="my-6">
            <li class="my-6 flex items-center">
              <svg class="mr-3 min-w-5 text-zinc-700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
                  <g transform="scale(2.6 2.6)" >
                      <path fill="currentColor" d="M 45 0 C 27.677 0 13.584 14.093 13.584 31.416 c 0 4.818 1.063 9.442 3.175 13.773 c 2.905 5.831 11.409 20.208 20.412 35.428 l 4.385 7.417 C 42.275 89.252 43.585 90 45 90 s 2.725 -0.748 3.444 -1.966 l 4.382 -7.413 c 8.942 -15.116 17.392 -29.4 20.353 -35.309 c 0.027 -0.051 0.055 -0.103 0.08 -0.155 c 2.095 -4.303 3.157 -8.926 3.157 -13.741 C 76.416 14.093 62.323 0 45 0 z M 45 42.81 c -6.892 0 -12.5 -5.607 -12.5 -12.5 c 0 -6.893 5.608 -12.5 12.5 -12.5 c 6.892 0 12.5 5.608 12.5 12.5 C 57.5 37.202 51.892 42.81 45 42.81 z" />
                  </g>
              </svg>
              <span>{{ getConfigConst('corporateInfo.addressFull') }}</span>
            </li>

            <li class="my-6 flex items-center">
              <svg class="mr-3 min-w-5 text-zinc-700" height="20" width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="m17.4 22a15.42 15.42 0 0 1 -15.4-15.4 4.6 4.6 0 0 1 4.6-4.6 3.94 3.94 0 0 1 .77.07 3.79 3.79 0 0 1 .72.18 1 1 0 0 1 .65.75l1.37 6a1 1 0 0 1 -.26.92c-.13.14-.14.15-1.37.79a9.91 9.91 0 0 0 4.87 4.89c.65-1.24.66-1.25.8-1.38a1 1 0 0 1 .92-.26l6 1.37a1 1 0 0 1 .72.65 4.34 4.34 0 0 1 .19.73 4.77 4.77 0 0 1 .06.76 4.6 4.6 0 0 1 -4.64 4.53z"/>
              </svg>
              <span>{{ getConfigConst('corporateInfo.contactNumber') }}</span>
            </li>

            <li class="my-6 flex items-center">
              <svg class="mr-3 min-w-5 text-zinc-700" height="20" width="20" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="m29.919 6.163-4.225 19.925c-.319 1.406-1.15 1.756-2.331 1.094l-6.438-4.744-3.106 2.988c-.344.344-.631.631-1.294.631l.463-6.556 11.931-10.781c.519-.462-.113-.719-.806-.256l-14.75 9.288-6.35-1.988c-1.381-.431-1.406-1.381.288-2.044l24.837-9.569c1.15-.431 2.156.256 1.781 2.013z"/>
              </svg>
              <span>{{ getConfigConst("corporateInfo.telegramLink") }}</span>
            </li>

            <li class="my-6 flex items-center">
              <svg class="mr-3 min-w-5 text-zinc-700" width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
              </svg>
              <span>{{ getConfigConst('corporateInfo.email') }}</span>
            </li>
          </ul>

          <div class="absolute bottom-0 right-0 w-full md:px-4">
            <img src="../assets/car-top.png" alt="">
          </div>
        </div>

        <button @click="$emit('close')" class="absolute right-5 top-5 w-8 h-8 text-gray-500 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 96 96">
            <path d="m53.657 48 25.171-25.172a4 4 0 1 0-5.656-5.656L48 42.343 22.829 17.172a4 4 0 0 0-5.657 5.656L42.344 48 17.172 73.172a4 4 0 1 0 5.657 5.656L48 53.657l25.172 25.171C73.953 79.609 74.977 80 76 80s2.048-.391 2.828-1.172a4 4 0 0 0 0-5.656L53.657 48z"></path>
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>