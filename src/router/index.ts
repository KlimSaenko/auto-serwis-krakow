import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ServicesView from '../views/ServicesView.vue';
import MediaView from '../views/MediaView.vue';
import BlogPostView from '../views/BlogPostView.vue';
import CustomerServiceView from '../views/CustomerServiceView.vue';
import { getConfigConst } from '@/vue-helpers/configValues';
import TransitionWaiter from '@/vue-helpers/transitionWaiter';

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
                    component: CustomerServiceView,
                    beforeEnter: (to, from, next) => {
                        const services = Object.keys(getConfigConst('application.servicesTags') as {});
                        const name = Array.isArray(to.params.serviceName) ? to.params.serviceName[0] : to.params.serviceName;

                        if (services.includes(name)){
                            next();
                        } else {
                            next(false);
                        };
                    }
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
    ],
    async scrollBehavior(to, from, savedPosition) {

        await TransitionWaiter.Promise;
        
        const behavior: ScrollOptions['behavior'] = 'smooth';

        if (savedPosition) {
            return { ...savedPosition, behavior };
        } else {
            if (to.hash) {
                return { el: to.hash, behavior };
            }

            return { left: 0, top: 0 };
        }
    }
});

export default router;