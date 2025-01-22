import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import tailwindMangle from 'unplugin-tailwindcss-mangle';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({ command, mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    
    return {
		base: env.BASE_URL || '/',
		plugins: [
			vue(),
			vueJsx(),
			viteStaticCopy({
				targets: [
					{
						src: 'config/constants.json',
						dest: '../config'
					},
					{
						src: 'server/index.php',
						dest: '../server'
					},
					{
						src: ['server/blog_posts', '.htaccess'],
						dest: '../'
					}
				]
			}),
			tailwindMangle.vite()
		],
		resolve: {
			extensions: ['.js', '.json', '.vue', '.ts'],
			alias: [
				{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
				{ find: '@car-brands', replacement: fileURLToPath(new URL('./public/car-brands', import.meta.url)) },
				{ find: '@icons', replacement: fileURLToPath(new URL('./public/icons', import.meta.url)) },
				{ find: '@config', replacement: fileURLToPath(new URL('./config', import.meta.url)) },
				{ find: '@helpers', replacement: fileURLToPath(new URL('./src/vue-helpers', import.meta.url)) }
			]
		},
		build: {
			outDir: "./dist/public",
			assetsInlineLimit: 0,
			rollupOptions: {
				output: {
					manualChunks: {
						'group-router': [
							'./src/views/AdminBlogPostView.vue',
							'./src/views/BlogPostView.vue',
							'./src/views/CustomerServiceView.vue',
							'./src/views/HomeView.vue',
							'./src/views/MediaView.vue',
							'./src/views/NotFoundView.vue',
							'./src/views/ServicesView.vue'
						]
					}
				}
			}
		}
    }
});
