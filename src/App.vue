<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import ContactInfoHeader from './components/header/ContactInfoHeader.vue';
  import Footer from './components/Footer.vue';
</script>

<template>
  <ContactInfoHeader />

  <main class="bg-zinc-100 text-zinc-700">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>

  <Footer />
</template>
