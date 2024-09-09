import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ServicesView from '../views/ServicesView.vue';
import MediaView from '../views/MediaView.vue';
import BlogPostView from '../views/BlogPostView.vue';
import CustomerServiceView from '../views/CustomerServiceView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/home',
            name: 'home',
            alias: '/',
            component: HomeView
        },
        {
            path: '/services',
            children: [
                {
                    path: '',
                    name: 'services',
                    component: ServicesView
                },
                {
                    path: ':serviceName',
                    name: 'customer-service',
                    component: CustomerServiceView
                }
            ]
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
