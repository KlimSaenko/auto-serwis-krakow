import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: env.VITE_BASE_URL,
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
  }
});
