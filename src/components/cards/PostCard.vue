<script setup lang="ts">
	import Card from './Card.vue';
	import type { PropType } from 'vue';
    import type IBlogPost from '@/types/blogPost';

    defineProps({
        initContent: {
            type: Object as PropType<IBlogPost>,
            required: true
        }
    });
</script>

<template>
    <Card class="group transition ease-in-out md:hover:-translate-y-2 duration-[250ms] !p-0 md:hover:shadow-xl md:hover:shadow-black/25 active:shadow-xl active:shadow-black/25 cursor-pointer">
		<router-link :to="{ name: 'blog-post', params: { post: initContent.url } }">
			<div class="relative overflow-hidden aspect-4/3">
				<div class="image-shadow">
					<img class="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-active:scale-[1.08] md:group-hover:scale-[1.08]" src="https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
				</div>
				<div class="absolute text-white z-10 bottom-0 px-6 xl:px-7 pb-4">
					<h1 class="text-2xl font-jost-bold pl-2 border-l-[5px] border-[red] line-clamp-2 drop-shadow-lg">{{ initContent.title }}</h1>
					<p class="text-md font-jost mt-2 uppercase">{{ $d(new Date(initContent.timeUpdated ?? 0), 'short') }}</p>
				</div>
			</div>
      
			<div class="p-6 xl:p-7 !pt-5 text-[1.1rem] text-zinc-800">
				<p class="font-jost text-zinc-500 leading-7 line-clamp-4 xl:line-clamp-5">{{ initContent.previewText }}</p>

				<div class="mt-4 inline-flex">
					<div class="flex text-zinc-500 md:group-hover:text-[red] font-jost-medium items-baseline">
						<span>{{ $t('postCard.readMore') }}</span>
						<svg class="ml-2 md:group-hover:animate-bounce-x" width="12" height="10" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M1 7.94189L4.486 4.47089L1 0.999895" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
							<path d="M7 7.94189L10.486 4.47089L7 0.999895" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</div>
				</div>
			</div>
		</router-link>
    </Card>
</template>