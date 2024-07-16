<script setup lang="ts">
  import ContactInfoHeader from '../components/header/ContactInfoHeader.vue';
  import MainBanner from '../components/MainBanner.vue';
  import About from '../components/About.vue';
  import GoogleMap from '../components/GoogleMap.vue';
  import Footer from '../components/Footer.vue';
  import LatestPosts from '../components/LatestPosts.vue';
  import MainBannerCards from '../components/MainBannerCards.vue';
  import ReviewsList from '../components/ReviewsList.vue';
</script>

<template>
  <ContactInfoHeader />

  <main class="bg-zinc-100 text-zinc-800">
    <MainBanner />

    <div class="mx-auto px-8 md:px-10 2xl:px-16 max-w-lg sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg 2xl:max-w-screen-xl">
      <MainBannerCards />

      <About />

      <ReviewsList />

      <LatestPosts />
    </div>
    
    <GoogleMap class="-scroll-mt-96" id="map" />  
  </main>

  <Footer />
</template>
