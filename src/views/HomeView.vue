<script setup lang="ts">
  import ContactInfoHeader from '../components/header/ContactInfoHeader.vue';
  import MainBanner from '../components/MainBanner.vue';
  import About from '../components/About.vue';
  import GoogleMap from '../components/GoogleMap.vue';
  import Footer from '../components/Footer.vue';
  import LatestPosts from '../components/LatestPosts.vue';
  import MainBannerCards from '../components/MainBannerCards.vue';
</script>

<template>
  <ContactInfoHeader />

  <main class="bg-zinc-100 text-zinc-800">
    <MainBanner />

    <div class="mx-auto md:max-w-screen-md lg:max-w-screen-lg">
      <MainBannerCards />

      <About />

      <LatestPosts />
    </div>

    <GoogleMap id="map" />
  </main>

  <Footer />
</template>
