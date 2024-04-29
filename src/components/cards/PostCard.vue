<script setup lang="ts">
    import Card from './Card.vue';
</script>

<template>
    <Card class="group transition ease-in-out hover:-translate-y-2 duration-[250ms] !p-0 hover:shadow-xl post-card">
      <div class="relative left-0 right-0 top-0">
        <div class="overflow-hidden">
          <img class="group-hover:scale-[1.08] aspect-4/3 object-cover duration-[250ms]" src="https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        </div>
        <div class="absolute text-white z-10 bottom-0 px-6 xl:px-7 pb-4">
          <h1 class="text-2xl font-jost-bold mb-1 pl-2 border-l-[5px] border-[red] line-clamp-2">Dodge Car</h1>
          <span class="text-md font-jost">MAY 11, 2024</span>
        </div>
      </div>
      
      <div class="m-6 xl:m-7 !mt-3 text-zinc-800">
        <!-- <div class="flex gap-3 mb-4 mt-3">
          <span class="bg-[red] px-[6px] py-[1px] text-[15px] font-jost tracking-wide text-white rounded-md uppercase">HISTORY</span>
          <span class="bg-[red] px-[6px] py-[1px] text-[15px] font-jost tracking-wide text-white rounded-md uppercase">HISTORY</span>
        </div> -->
        <p class="text-lg font-jost-light line-clamp-3 leading-8 xl:line-clamp-4 mt-2">Revolutionizing the Road: Introducing the Next Generation of Electric Vehicles! Discover the latest advancements in eco-friendly transportation, promising sleek designs, extended battery life, and cutting-edge technology. Stay tuned as we unveil the future of driving.</p>
        <a class="relative overflow-hidden group-hover:text-[red] mr-0 group-hover:pr-10 duration-[250ms] hover:!text-white hover:bg-[red] inline-flex font-jost-bold text-gray-500 rounded-md ring-1 ring-[red] mt-4 px-4 py-2 items-center cursor-pointer">
          <p class="uppercase tracking-wider text-[14px]">Read More</p>
          <svg class="absolute -right-3 group-hover:right-4 duration-[250ms] group-hover:animate-bounce-x" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7.94189L4.486 4.47089L1 0.999895" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M7 7.94189L10.486 4.47089L7 0.999895" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </a>
        
        <!-- <a class="group-hover:text-gray-500 duration-[250ms] hover:!text-[red] hover:!duration-0 inline-flex font-jost-bold text-gray-400 mt-4 items-center cursor-pointer">
          <p class="uppercase tracking-wider text-[14px] mr-3">Read More</p>
          <svg class="group-hover:animate-bounce-x" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 7.94189L4.486 4.47089L1 0.999895" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
            <path d="M7 7.94189L10.486 4.47089L7 0.999895" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
        </a> -->
      </div>
    </Card>
</template>