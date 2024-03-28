<script setup lang="ts">
  import Card from '../components/cards/Card.vue';
  import LoopScroll from '../components/cards/LoopScroll.vue';

  const servicedCars = Object.values(import.meta.glob('@logos/*.svg', { eager: true, import: 'default', as: 'url' }));
</script>

<template>
    <div class="relative -top-24 gap-8 columns-3">
        <Card class="shadow-xl">
          <div class="mx-6 my-3 text-zinc-800">
            <h1 class="text-2xl pb-2 font-jost-bold">Dodge Car</h1>
            <p class="text-lg font-jost-light leading-6">Dodge is an American brand of automobiles and a division of Stellantis, based in Auburn Hills, Michigan..</p>
          </div>
        </Card>

        <Card class="relative -top-24 shadow-xl">
          <div class="mx-6 my-3 text-zinc-800">
            <h1 class="text-2xl pb-2 font-jost-bold">Dodge Car</h1>
            <p class="text-lg font-jost-light leading-6">Dodge is an American brand of automobiles and a division of Stellantis, based in Auburn Hills, Michigan..</p>
          </div>
          <LoopScroll v-bind:imgSrcList="servicedCars.slice(0, Math.floor(servicedCars.length / 2))" />
        </Card>

        <Card class="shadow-xl">
          <div class="mx-6 my-3 text-zinc-800">
            <h1 class="text-2xl pb-2 font-jost-bold">Dodge Car</h1>
            <p class="text-lg font-jost-light leading-6">Dodge is an American brand of automobiles and a division of Stellantis, based in Auburn Hills, Michigan..</p>
          </div>
          <button class="inline-flex hover:bg-zinc-200/50 text-gray-400 hover:text-[red] text-base font-jost-bold mx-6 my-2 py-2 px-4 rounded-md items-center justify-center leading-7 tracking-wide">
            <span class="mr-3 uppercase">{{ $t(`home.goToAbout`) }}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10.605 15.555" fill="currentColor" aria-hidden="true"><path d="m2.828 15.555 7.777-7.779L2.828 0 0 2.828l4.949 4.948L0 12.727l2.828 2.828z"/></svg>
          </button>
        </Card>
      </div>
</template>