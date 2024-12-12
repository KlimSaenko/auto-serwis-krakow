<script setup lang="ts">
  	import Gallery from '../components/Gallery.vue';
  	import Blog from '../components/Blog.vue';
	import { getConfigConst } from '@/vue-helpers/configValues';

	const socialMediaConfig = getConfigConst('application.socialMedia') as Object;
    const iconsPath = Object.values(import.meta.glob<string>('@icons/social/all.svg', { eager: true, import: 'default', query: '?url' }));
    
    const socialMediaList = Object.entries(socialMediaConfig)
							.filter(([_, socialMediaInfo]) => socialMediaInfo?.businessProfileLink)
							.map(([socialMediaName, socialMediaInfo]) => {
								return {
									name: socialMediaName,
									iconPath: iconsPath[0] + "#" + socialMediaName,
									info: socialMediaInfo
								};
							});
</script>

<template>
	<div class="pt-10 md:pt-12 pb-16 md:pb-20">
		<Gallery />

		<div class="mt-24 w-screen py-12 bg-zinc-300">
			<div class="flex flex-col px-3 mb-7 md:mb-10 justify-center text-center">
				<h2 class="text-[2.5rem] md:text-5xl font-jost-bold leading-[1.2] text-zinc-700 mb-4">{{ $t('media.socialMediaTitle') }}</h2>
				<p class="text-xl md:text-2xl font-jost text-zinc-500">
					{{ $t('media.followUs') }}
				</p>
			</div>

			<div class="font-jost flex flex-row flex-wrap gap-6 md:gap-14 justify-center">
				<div v-for="socialMedia of socialMediaList" :key="socialMedia.name" class="group relative rounded-full">
					<div class="p-4 overflow-hidden cursor-pointer">
						<svg width="42" height="42" class="text-zinc-600 md:text-zinc-600 md:group-hover:text-zinc-900 group-active:text-zinc-900 md:group-hover:scale-[1.3] group-active:scale-[1.3] duration-[250ms]">
							<use :href="socialMedia.iconPath" />
						</svg>
					</div>
					
					<div class="max-md:hidden absolute flex bottom-full opacity-0 left-1/2 -translate-x-1/2 w-max z-10 invisible md:group-hover:visible md:group-hover:opacity-100 md:group-hover:delay-300 duration-200 pointer-events-none">
						<p class="flex rounded-md bg-zinc-700 text-gray-200 px-3 py-1 max-w-64 mx-auto">
							{{ $t('blog.weOnSocial') }} <span class="first-letter:uppercase">&nbsp;{{ socialMedia.name }}</span>
						</p>
					</div>
				</div>
			</div>
		</div>

		<Blog class="mt-16 md:mt-24" />
	</div>
</template>