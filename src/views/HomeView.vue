<script setup lang="ts">
  import MainBanner from '../components/MainBanner.vue';
  import About from '../components/About.vue';
  import GoogleMap from '../components/GoogleMap.vue';
  import LatestPosts from '../components/LatestPosts.vue';
  import MainBannerCards from '../components/MainBannerCards.vue';
  import ReviewsList from '../components/ReviewsList.vue';
</script>

<template>
  <div>
    <MainBanner />

    <div class="px-8 mx-auto md:px-10 2xl:px-16 max-w-lg sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
      <MainBannerCards />

      <About />

      <ReviewsList />

      <LatestPosts />
    </div>
    
    <GoogleMap />
  </div>
</template>
