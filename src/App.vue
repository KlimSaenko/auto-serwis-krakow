<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import ContactInfoHeader from './components/header/ContactInfoHeader.vue';
  import Footer from './components/Footer.vue';
</script>

<template>
  <ContactInfoHeader />

  <RouterView />

  <Footer />
</template>
