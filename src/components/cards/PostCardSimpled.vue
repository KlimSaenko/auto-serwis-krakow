<script setup lang="ts">
    
</script>

<template>
    <router-link :to="{ name: 'blog-post', params: { post: 'dodge-car' } }" class="md:p-4 rounded-2xl border border-transparent transition ease-in-out md:hover:border-gray-200 md:hover:-translate-y-2 duration-[250ms] overflow-hidden md:hover:shadow-xl active:shadow-xl">
      <div>
        <div class="overflow-hidden aspect-4/3 rounded-xl">
          <img class="h-full w-full object-cover object-center transition duration-200" src="https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
        </div>
        <div class="text-zinc-700 z-10 px-2 md:px-1 xl:px-2 py-2.5 !pb-0 md:py-2">
          <h1 class="text-2xl font-jost-bold line-clamp-3">Dodge Car</h1>
          <p class="text-md font-jost mt-1 uppercase">MAY 11, 2024</p>
        </div>
      </div>
    </router-link>
</template>