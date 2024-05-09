<script setup lang="ts">
  import Card from '../components/cards/Card.vue';
  import LoopScroll from '../components/cards/LoopScroll.vue';

  const servicedCars = Object.values(import.meta.glob('@car-brands/*-logo.(webp|svg|png)', { eager: true, import: 'default', as: 'url' }));
</script>

<template>
    <div class="grid relative -top-28 gap-6 md:-top-24 lg:gap-8 xl:gap-10 md:grid-cols-3 max-md:block text-lg leading-7">
        <Card class="relative md:-top-24 max-md:mb-7 shadow-xl">
          <div class="mx-2 my-2 text-zinc-800">
            <h1 class="text-2xl mb-3 font-jost-bold pl-[0.65rem] border-l-[5px] border-[red]">{{ $t('home.centerCardTitle') }}</h1>
            <p>{{ $t('home.centerCardContent_1') }}</p>
          </div>

          <LoopScroll v-bind:imgSrcList="servicedCars.slice(0, Math.floor(servicedCars.length / 2))" class="my-6" />
          <div class="border-b border-zinc-400 mx-12 my-1"></div>
          <LoopScroll v-bind:imgSrcList="servicedCars.slice(Math.floor(servicedCars.length / 2))" :reversed="true" class="my-6" />
        </Card>

        <Card class="relative shadow-xl mb-auto !p-0 md:-order-1">
          <div class="mx-2 my-2 text-zinc-800 p-4 lg:p-5 2xl:p-6 !pb-2">
            <h1 class="text-2xl mb-3 font-jost-bold pl-[0.65rem] border-l-[5px] border-[red]">{{ $t('home.leftCardTitle') }}</h1>
            <p>{{ $t('home.leftCardContent_1') }}</p>
            <ul class="my-2">
                <li v-for="content in $tm('home.leftCardOptions')" class="flex items-start py-1">
                  <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="m-1 ml-0" width="20" height="20" viewBox="0 0 256 256" xml:space="preserve">
                    <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                      <path d="M 80.405 12.859 H 73.33 V 8.803 c 0 -1.657 -1.343 -3 -3 -3 s -3 1.343 -3 3 v 4.057 H 48 V 8.803 c 0 -1.657 -1.343 -3 -3 -3 c -1.657 0 -3 1.343 -3 3 v 4.057 H 22.67 V 8.803 c 0 -1.657 -1.343 -3 -3 -3 s -3 1.343 -3 3 v 4.057 H 9.595 C 4.304 12.859 0 17.163 0 22.454 v 7.733 v 41.291 c 0 5.291 4.304 9.596 9.595 9.596 h 15.712 c -1.792 -1.777 -3.341 -3.796 -4.603 -6 H 9.595 C 7.613 75.074 6 73.461 6 71.478 V 33.187 h 78 v 38.291 c 0 1.982 -1.612 3.596 -3.595 3.596 h -11.11 c -1.262 2.204 -2.811 4.223 -4.603 6 h 15.713 c 5.291 0 9.595 -4.305 9.595 -9.596 V 30.187 v -7.733 C 90 17.163 85.696 12.859 80.405 12.859 z M 6 27.187 v -4.733 c 0 -1.982 1.613 -3.595 3.595 -3.595 h 70.81 c 1.982 0 3.595 1.613 3.595 3.595 v 4.733 H 6 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                      <path d="M 45 38.227 c -12.694 0 -22.985 10.291 -22.985 22.985 c 0 12.695 10.291 22.985 22.985 22.985 s 22.985 -10.291 22.985 -22.985 C 67.985 48.518 57.694 38.227 45 38.227 z M 57.742 56.158 L 43.945 71.684 c -0.562 0.632 -1.364 0.997 -2.209 1.007 c -0.011 0 -0.022 0 -0.034 0 c -0.833 0 -1.629 -0.347 -2.197 -0.958 l -7.202 -7.749 c -1.128 -1.213 -1.059 -3.111 0.155 -4.239 c 1.214 -1.128 3.113 -1.06 4.24 0.155 l 4.955 5.331 l 11.605 -13.06 c 1.101 -1.238 2.995 -1.35 4.235 -0.249 C 58.731 53.023 58.843 54.919 57.742 56.158 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,0,0); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                    </g>
                  </svg>
                  <p class="ml-3">
                      {{ content }}
                  </p>
                </li>
            </ul>
          </div>
          <div>
            <a class="group relative flex text-white max-md:bg-[red] md:text-[red] md:hover:text-white md:hover:bg-[red] duration-[250ms] h-24 justify-center items-center cursor-pointer border-t-[1px] border-[red]">
              <p class="text-lg uppercase font-jost-medium">{{ $t('home.leftCardShowAll') }}</p>
              <svg xmlns="http://www.w3.org/2000/svg" class="ml-3" width="12" height="12" viewBox="0 0 10.605 15.555" fill="currentColor" aria-hidden="true"><path d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z"/></svg>

              <div class="tooltip absolute flex bottom-full opacity-0 left-0 right-0 z-10 invisible group-hover:visible group-hover:opacity-100 duration-200 group-hover:delay-700 font-jost pointer-events-none">
                <p class="flex rounded-md bg-zinc-700 text-gray-200 px-2 py-1 pl-3 max-w-72 mx-auto leading-6">
                  {{ $t('home.leftCardShowAllTooltip') }} 
                  <svg class="ml-1 p-[2px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </p>
              </div>
            </a>
          </div>
        </Card>

        <Card class="shadow-xl max-md:hidden">
          <div class="mx-2 my-2 text-zinc-800">
            <h1 class="text-2xl mb-3 font-jost-bold pl-[0.65rem] border-l-[5px] border-[red]">{{ $t('home.rightCardTitle') }}</h1>
            <p>{{ $t('home.rightCardContent_1') }}</p>
          </div>
          <button class="inline-flex hover:bg-zinc-200/50 text-gray-400 hover:text-[red] text-base font-jost-bold mx-6 my-2 py-2 px-4 rounded-md items-center justify-center leading-7 tracking-wide">
            <span class="mr-3 uppercase">{{ $t(`home.goToAbout`) }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10.605 15.555" fill="currentColor" aria-hidden="true"><path d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z"/></svg>
          </button>
        </Card>
      </div>
</template>