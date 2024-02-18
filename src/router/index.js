import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {useAuth} from "@/store/auth.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        // {
        //     path: '/about',
        //     name: 'about',
        //     // route level code-splitting
        //     // this generates a separate chunk (About.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () => import('../views/AboutView.vue')
        // },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/auth/LoginView.vue'),
            meta: {requiresAuth: false, title: 'Login'}
        }, {
            path: '/register',
            name: 'register',
            component: () => import('../views/auth/RegisterView.vue'),
            meta: {requiresAuth: false, title: 'Register'}

        }, {
            path: '/feedback-view',
            name: 'feedback-view',
            component: () => import('../views/feedback/FeedBackView.vue'),
            meta: {requiresAuth: true, title: 'feed Backs'}
        }
        , {
            path: '/feedback-comment/:id',
            name: 'feedback-comment',
            component: () => import('../views/feedback/FeedBackComment.vue'),
            meta: {requiresAuth: true, title: 'Comments'}
        }, {
            path: '/add-feedback',
            name: 'add-feedback',
            component: () => import('../views/feedback/AddFeedBack.vue'),
            meta: {requiresAuth: true, title: 'Add Feed Back'}
        },
        {
            path: '/logout',
            name: 'logout',
            component: () => import('../views/auth/LoginView.vue'),
            meta: {requiresAuth: true, title: 'login'}
        },

    ]
});
let auth;
router.beforeEach((to, from, next) => {
    auth = useAuth();
    document.title = to.meta.title

    if (!auth.getAuth.token && to.meta.requiresAuth === true)
        next({path: "/login"})

    else if (to.path === '/logout')
        next({path: "/login"})

    //
    else if(auth.getAuth.token && to.meta.requiresAuth === false)
        next( "/feedback-view")
    else next();
})


export default router
