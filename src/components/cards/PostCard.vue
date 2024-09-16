<script setup lang="ts">
    import Card from './Card.vue';
    import { ref } from 'vue';

    const mouseHover = ref(false);
</script>

<template>
    <Card class="group transition ease-in-out md:hover:-translate-y-2 duration-[250ms] !p-0 md:hover:shadow-xl md:hover:shadow-black/25">
		<router-link :to="{ name: 'blog-post', params: { post: 'dodge-car' } }" @mouseenter="mouseHover = true" @mouseleave="mouseHover = false" class="relative overflow-hidden aspect-4/3 cursor-pointer">
			<div class="image-shadow">
				<img class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-active:scale-[1.08] md:group-hover:scale-[1.08]" src="https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
			</div>
			<div class="absolute text-white z-10 bottom-0 px-6 xl:px-7 pb-4">
				<h1 class="text-2xl font-jost-bold pl-2 border-l-[5px] border-[red] line-clamp-2">Dodge Car</h1>
				<p class="text-md font-jost mt-2 uppercase">MAY 11, 2024</p>
			</div>
		</router-link>
      
		<div class="m-6 xl:m-7 !mt-3 text-[1.1rem] text-zinc-800">
			<p class="font-jost text-zinc-500 leading-7 line-clamp-4 xl:line-clamp-5 mt-2">Revolutionizing the Road: Introducing the Next Generation of Electric Vehicles! Discover the latest advancements in eco-friendly transportation, promising sleek designs, extended battery life, and cutting-edge technology. Stay tuned as we unveil the future of driving.</p>

			<div class="mt-4 inline-flex">
				<router-link :to="{ name: 'blog-post', params: { post: 'dodge-car' } }" :aria-selected="mouseHover" class="flex text-zinc-500 group-hover:text-zinc-700 font-jost-medium cursor-pointer hover:!text-[red] max-md:text-zinc-700 aria-selected:!text-[red] items-baseline">
					<span>{{ $t('postCard.readMore') }}</span>
					<svg class="ml-2 md:group-hover:animate-bounce-x" width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M1 7.94189L4.486 4.47089L1 0.999895" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
						<path d="M7 7.94189L10.486 4.47089L7 0.999895" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
					</svg>
				</router-link>
			</div>
		</div>
    </Card>
</template>