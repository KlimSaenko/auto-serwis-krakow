import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ServicesView from '../views/ServicesView.vue';
import MediaView from '../views/MediaView.vue';
import BlogPostView from '../views/BlogPostView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      alias: '/home',
      component: HomeView
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesView
    },
    {
      path: '/media',
      children: [
        {
          path: '',
          name: 'media',
          component: MediaView
        },
        {
          path: '/blog/:post',
          name: 'blog-post',
          component: BlogPostView
        }
      ]
    }
  ]
});

export default router;
