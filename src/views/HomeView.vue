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

		<div class="px-8 mx-auto md:px-10 2xl:px-16 max-w-lg sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
			<MainBannerCards />

			<About class="mt-12" />

			<BenefitsList class="mt-36" />

			<ReviewsList class="mt-40" />

			<LatestPosts />
		</div>
		
		<GoogleMap class="mt-36" />
	</div>
</template>
