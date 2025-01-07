import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router';
import { getConfigConst } from '@config/configValues';
import TransitionWaiter from '@/vue-helpers/transitionWaiter';
import ApiService from '@/vue-helpers/apiService';
import AdminInputListener from '@/vue-helpers/adminInputListener';
import { watch } from 'vue';
import type IBlogPost from '@/types/blogPost';

const HomeView = () => import('../views/HomeView.vue');
const ServicesView = () => import('../views/ServicesView.vue');
const MediaView = () => import('../views/MediaView.vue');
const BlogPostView = () => import('../views/BlogPostView.vue');
const AdminBlogPostView = () => import('../views/AdminBlogPostView.vue');
const CustomerServiceView = () => import('../views/CustomerServiceView.vue');
const NotFoundView = () => import('../views/NotFoundView.vue');

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
                            next({ name: 'not-found' });
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
                    component: BlogPostView,
                    beforeEnter: async (to, from, next) => {
                        if (await AdminInputListener.IsAuthorized.value){
                            next({ name: 'admin-blog-post', params: to.params });
                        } else if (await onBeforeEnterBlogPost(to, from, next)){
                            next();
                        } else {
                            next({ name: 'not-found' });
                        }
                    }
                },
                {
                    path: '/admin',
                    children: [
                        {
                            path: 'blog/create',
                            name: 'admin-blog-create',
                            component: AdminBlogPostView,
                            beforeEnter: async (to, from, next) => {
                                if (await AdminInputListener.IsAuthorized.value){
                                    to.meta.mode = 'create';
                                    next();
                                } else {
                                    next({ name: 'not-found' });
                                }
                            }
                        },
                        {
                            path: 'blog/:post',
                            name: 'admin-blog-post',
                            component: AdminBlogPostView,
                            beforeEnter: async (to, from, next) => {
                                if (!await AdminInputListener.IsAuthorized.value){
                                    next({ name: 'blog-post', params: to.params });
                                } else if (await onBeforeEnterBlogPost(to, from, next)){
                                    to.meta.mode = 'edit';
                                    next();
                                } else {
                                    next({ name: 'not-found' });
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundView
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

watch(AdminInputListener.IsAuthorized, async isAuthorized => {
    const result = await isAuthorized;
    const route = router.currentRoute.value;

    if (result && route.name === 'blog-post') {
        router.push({ name: 'admin-blog-post', params: route.params });
    } else if (!result && route.name === 'admin-blog-post') {
        router.push({ name: 'blog-post', params: route.params });
    }
});

async function onBeforeEnterBlogPost(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
    if (!to.params.post) {
        return false;
    }

    try {
        const postData = await ApiService.GetBlogPost(Array.isArray(to.params.post) ? to.params.post[0] : to.params.post);

        if (postData){
            to.meta.postData = postData as IBlogPost;
        } else {
            throw new Error('Incorect search results');
        }
    } catch (e) {
        console.error('Failed to fetch blog post', e);
        return false;
    }

    return true;
}

export default router;