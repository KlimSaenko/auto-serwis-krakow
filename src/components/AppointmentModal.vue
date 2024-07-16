<script setup lang="ts">
    import { ref } from 'vue';
    import { getConfigConst } from '../vue-helpers/configValues';

    const props = defineProps({ 
        appointmentFormOpened: {
            type: Boolean,
            required: false
        }
    });

    const isLocationSelectorOpen = ref(false);
    const currentLocation = ref('us');
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
    <div v-if="appointmentFormOpened" class="fixed overflow-hidden left-0 right-0 top-0 bottom-0 p-0 m-0 bg-zinc-900/60 z-[100] flex">
      <div class="m-auto w-[52rem] tracking-wide bg-white rounded-3xl shadow-xl shadow-black/40 font-jost-light relative overflow-hidden grid grid-cols-5">
        <div class="col-span-3 p-10">
          <form class="ml-2">
            <h1 class="text-4xl mb-4">{{ $t("modal.appointmentTitle") }}</h1>

            <p class="my-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio <a class="hover:underline cursor-pointer text-blue-600 lowercase">repudiandae distinctio</a>.
            </p>

            <div class="my-6">
              <label class="block mb-2 font-medium text-gray-900">{{ $t("modal.customerNameLabel") }} <span class="text-[red] font-jost-medium">*</span></label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                  </svg>
                </div>
                <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 " placeholder="Your Name">
              </div>
            </div>

            <div class="my-6">
              <label class="block mb-2 text-gray-900">{{ $t("modal.customerNumberLabel") }} <span class="text-[red] font-jost-medium">*</span></label>
              <div class="flex relative">
                  <button @click="isLocationSelectorOpen = !isLocationSelectorOpen" class="flex-shrink-0 inline-flex items-center py-2.5 px-3.5 text-sm font-jost font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-3 focus:outline-none focus:ring-gray-100 " type="button">
                      <span :class="`fi-${ currentLocation }`" class="fi !bg-cover rounded-full h-4 !w-4 mr-3 ring-1 ring-black ring-opacity-5"></span>
                          +1
                      <svg class="w-2.5 h-2.5 ms-2.5 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/></svg>
                  </button>

                  <div v-if="isLocationSelectorOpen" class="absolute h-44 left-0 top-full overflow-y-auto z-10 mt-1 text-sm text-[0.9rem] w-max rounded-md shadow-md bg-white ring-1 ring-black ring-opacity-5 p-1 space-y-1">
                    <ul class="font-jost">
                      <li v-for="loc in ['pl', 'ru', 'pl', 'ru', 'pl', 'ru', 'pl', 'ru']" href="#" aria-current="false" class="flex items-center px-3 py-2 align-baseline text-gray-700 aria-[current]:bg-zinc-200/60 max-md:focus:text-[red] md:hover:bg-zinc-200/60 cursor-pointer rounded-md">
                        <span :class="`fi-${ loc }`" class="fi !bg-cover rounded-full h-4 !w-4 mr-3 ring-1 ring-black ring-opacity-5"></span>
                        <!-- <span>{{ getConfigConst(`localesMetadata.${loc}.name`) }}</span> -->
                        <span>Польский (+48)</span>
                      </li>
                    </ul>
                  </div>

                  <label for="phone-input" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Phone number:</label>

                  <div class="relative w-full">
                      <input type="text" id="phone-input" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-0 border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="123-456-7890" />
                  </div>
              </div>
            </div>
            
            <div class="my-6">
              <label class="block mb-2 text-gray-900">{{ $t("modal.customerEmailLabel") }}</label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                  </svg>
                </div>
                <input type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 " placeholder="your@email.com">
              </div>
            </div>

            <div class="my-6">
              <label class="block mb-2 text-gray-900">{{ $t("modal.customerMessageLabel") }}</label>
              <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
            </div>

            <button class="my-[2px] mt-2 tracking-wide text-gray-100 hover:text-[red] bg-[red] border border-[red] hover:bg-white font-bold py-2 px-3 md:px-4 rounded-md inline-flex items-center">
                <span>{{ $t("header.onlineAppointment") }}</span>
            </button>
          </form>
        </div>

        <div class="relative col-span-2 px-7 py-10 bg-gray-200">
          <h1 class="text-4xl mb-4">{{ $t("modal.appointmentTitle") }}</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, optio repudiandae distinctio mollitia vero quam iusto quia, alias qui sequi quis, repellendus rem aut.
          </p>

          <ul class="">
            <li class="mt-6 inline-flex items-center">
              <svg class="mr-3 min-w-5 text-zinc-700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
                  <g transform="scale(2.6 2.6)" >
                      <path fill="currentColor" d="M 45 0 C 27.677 0 13.584 14.093 13.584 31.416 c 0 4.818 1.063 9.442 3.175 13.773 c 2.905 5.831 11.409 20.208 20.412 35.428 l 4.385 7.417 C 42.275 89.252 43.585 90 45 90 s 2.725 -0.748 3.444 -1.966 l 4.382 -7.413 c 8.942 -15.116 17.392 -29.4 20.353 -35.309 c 0.027 -0.051 0.055 -0.103 0.08 -0.155 c 2.095 -4.303 3.157 -8.926 3.157 -13.741 C 76.416 14.093 62.323 0 45 0 z M 45 42.81 c -6.892 0 -12.5 -5.607 -12.5 -12.5 c 0 -6.893 5.608 -12.5 12.5 -12.5 c 6.892 0 12.5 5.608 12.5 12.5 C 57.5 37.202 51.892 42.81 45 42.81 z" />
                  </g>
              </svg>
              <span>{{ getConfigConst('corporateInfo.addressFull') }}</span>
            </li>
            <li class="mt-6 inline-flex items-center">
              <svg class="mr-3 min-w-5 text-zinc-700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
                  <g transform="scale(2.6 2.6)" >
                      <path fill="currentColor" d="M 45 0 C 27.677 0 13.584 14.093 13.584 31.416 c 0 4.818 1.063 9.442 3.175 13.773 c 2.905 5.831 11.409 20.208 20.412 35.428 l 4.385 7.417 C 42.275 89.252 43.585 90 45 90 s 2.725 -0.748 3.444 -1.966 l 4.382 -7.413 c 8.942 -15.116 17.392 -29.4 20.353 -35.309 c 0.027 -0.051 0.055 -0.103 0.08 -0.155 c 2.095 -4.303 3.157 -8.926 3.157 -13.741 C 76.416 14.093 62.323 0 45 0 z M 45 42.81 c -6.892 0 -12.5 -5.607 -12.5 -12.5 c 0 -6.893 5.608 -12.5 12.5 -12.5 c 6.892 0 12.5 5.608 12.5 12.5 C 57.5 37.202 51.892 42.81 45 42.81 z" />
                  </g>
              </svg>
              <span>{{ getConfigConst('corporateInfo.contactNumber') }}</span>
            </li>
            <li class="mt-6 inline-flex items-center">
              <svg class="mr-3 min-w-5 text-zinc-700" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
                  <g transform="scale(2.6 2.6)" >
                      <path fill="currentColor" d="M 45 0 C 27.677 0 13.584 14.093 13.584 31.416 c 0 4.818 1.063 9.442 3.175 13.773 c 2.905 5.831 11.409 20.208 20.412 35.428 l 4.385 7.417 C 42.275 89.252 43.585 90 45 90 s 2.725 -0.748 3.444 -1.966 l 4.382 -7.413 c 8.942 -15.116 17.392 -29.4 20.353 -35.309 c 0.027 -0.051 0.055 -0.103 0.08 -0.155 c 2.095 -4.303 3.157 -8.926 3.157 -13.741 C 76.416 14.093 62.323 0 45 0 z M 45 42.81 c -6.892 0 -12.5 -5.607 -12.5 -12.5 c 0 -6.893 5.608 -12.5 12.5 -12.5 c 6.892 0 12.5 5.608 12.5 12.5 C 57.5 37.202 51.892 42.81 45 42.81 z" />
                  </g>
              </svg>
              <span>{{ getConfigConst('corporateInfo.email') }}</span>
            </li>
          </ul>

          <div class="absolute bottom-[-20rem] right-0 w-full p-4">
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