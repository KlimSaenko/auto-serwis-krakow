<script setup lang="ts">
    import Card from './Card.vue';
</script>

<template>
    <Card class="group transition ease-in-out md:hover:-translate-y-2 duration-[250ms] !p-0 hover:shadow-xl post-card">
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
        <p class="text-lg font-jost-light leading-7 xl:leading-8 line-clamp-4 mt-2">Revolutionizing the Road: Introducing the Next Generation of Electric Vehicles! Discover the latest advancements in eco-friendly transportation, promising sleek designs, extended battery life, and cutting-edge technology. Stay tuned as we unveil the future of driving.</p>
        <a class="overflow-hidden group-hover:text-[red] mr-0 group-hover:pr-10 max-md:pr-10 duration-[250ms] md:hover:!text-white md:hover:bg-[red] inline-flex font-jost-bold text-gray-500 rounded-md ring-1 ring-[red] mt-4 px-4 py-2 cursor-pointer max-md:!text-white max-md:bg-[red]">
          <p class="relative uppercase tracking-wider text-[14px]">Read More
            <svg class="absolute -right-7 bottom-0 top-0 my-auto md:group-hover:animate-bounce-x" width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 7.94189L4.486 4.47089L1 0.999895" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M7 7.94189L10.486 4.47089L7 0.999895" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </p>
        </a>
      </div>
    </Card>
</template>