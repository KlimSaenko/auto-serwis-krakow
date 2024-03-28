import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  // base: process.env.VITE_BASE_URL,
  base: '/car-service/',
  plugins: [
    vue(),
    vueJsx()
  ],
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
      { find: '@logos', replacement: fileURLToPath(new URL('./public/logos', import.meta.url)) },
      { find: '@config', replacement: fileURLToPath(new URL('./config', import.meta.url)) }
    ]
  }
});
