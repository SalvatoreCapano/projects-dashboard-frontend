import { createRouter, createWebHistory } from 'vue-router';
import { store } from './store'; 

import AppLogin from './pages/AppLogin.vue';
import AppRegister from './pages/AppRegister.vue';
import AppWelcome from './pages/AppWelcome.vue';
import AppHome from './pages/AppHome.vue';
// import AppContacts from './pages/AppContacts.vue';
// import AppRegister from './pages/AppRegister.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'welcome',
            component: AppWelcome
        },
        {
            path: '/login',
            name: 'login',
            component: AppLogin
        },
        {
            path: '/home',
            name: 'home',
            component: AppHome
        },
        // {
        //     path: '/contacts',
        //     name: 'contacts',
        //     component: AppContacts
        // },
        // {
        //     path: '/login',
        //     name: 'login',
        //     component: AppLogin
        // },
        {
            path: '/register',
            name: 'register',
            component: AppRegister
        },
        // {
        //     path: '/projects/:slug',
        //     name: 'projectShow',
        //     component: ProjectShow
        // },
    ]
});

router.beforeEach(async (to, from) => {
    if (to.name == 'home' && !store.user && to.name !== 'welcome') {
        return { name: 'welcome' }
    }
})

export { router };