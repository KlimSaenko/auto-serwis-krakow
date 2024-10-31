<script setup lang="ts">
	import MainBanner from '../components/MainBanner.vue';
	import About from '../components/About.vue';
	import GoogleMap from '../components/GoogleMap.vue';
	import LatestPosts from '../components/LatestPosts.vue';
	import MainBannerCards from '../components/MainBannerCards.vue';
	import ReviewsList from '../components/ReviewsList.vue';
	import BenefitsList from '../components/BenefitsList.vue';
</script>

<template>
	<div>
		<MainBanner />

		<div class="mx-auto px-4 sm:px-8 md:px-10 2xl:px-16 max-w-lg sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
			<MainBannerCards class="relative -top-24 md:-top-32 2xl:-top-40" />

			<About class="md:mt-8" />

			<BenefitsList class="mt-24 md:mt-40" />

			<ReviewsList class="mt-28 md:mt-36" />

			<LatestPosts class="mt-28 md:mt-36" />
		</div>
		
		<GoogleMap class="mt-24 md:mt-32" />
	</div>
</template>
