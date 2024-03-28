<script setup lang="ts">
    import Card from './Card.vue';
</script>

<template>
    <Card class="group transition ease-in-out hover:-translate-y-2 duration-[250ms] pt-0 hover:shadow-xl post-card">
          <div class="relative flex post-card-image">
            <img class="rounded-t-2xl aspect-4/3 object-cover object-center" src="https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            <div class="absolute text-white z-10 bottom-0 ml-6 mb-4">
              <h1 class="text-2xl font-jost-bold pb-1">Dodge Car</h1>
              <span class="text-md font-jost">MAY 11, 2024</span>
            </div>
          </div>
          
          <div class="mx-6 my-3 text-zinc-800">
            <div class="flex gap-3 mb-4 mt-2">
              <span class="bg-[red] px-[6px] py-[1px] text-[15px] font-jost tracking-wide text-white rounded-md uppercase">HISTORY</span>
              <span class="bg-[red] px-[6px] py-[1px] text-[15px] font-jost tracking-wide text-white rounded-md uppercase">HISTORY</span>
            </div>
            <p class="text-lg font-jost-light leading-6 line-clamp-3">Dodge is an American brand of automobiles and a division of Stellantis, based in Auburn Hills, Michigan..</p>
            <a class="group-hover:text-gray-500 duration-[250ms] hover:!text-[red] hover:!duration-0 inline-flex font-jost-bold text-gray-400 mt-4 items-center cursor-pointer">
              <p class="uppercase tracking-wider text-[14px] mr-3">Read More</p>
              <svg class="group-hover:animate-bounce-h" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7.94189L4.486 4.47089L1 0.999895" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                <path d="M7 7.94189L10.486 4.47089L7 0.999895" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </a>
          </div>
        </Card>
</template>