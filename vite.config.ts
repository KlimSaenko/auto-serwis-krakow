import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import tailwindMangle from 'unplugin-tailwindcss-mangle';

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    
    return {
		base: env.BASE_URL || '/',
		plugins: [
			vue(),
			vueJsx(),
			tailwindMangle.vite()
		],
		resolve: {
			alias: [
				{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
				{ find: '@car-brands', replacement: fileURLToPath(new URL('./public/car-brands', import.meta.url)) },
				{ find: '@icons', replacement: fileURLToPath(new URL('./public/icons', import.meta.url)) },
				{ find: '@config', replacement: fileURLToPath(new URL('./config', import.meta.url)) },
				{ find: '@helpers', replacement: fileURLToPath(new URL('./src/vue-helpers', import.meta.url)) }
			]
		},
		build: {
			assetsInlineLimit: 0
		}
    }
});
