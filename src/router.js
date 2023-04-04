import { createRouter, createWebHistory } from 'vue-router';
import { store } from './store'; 

import AppLogin from './pages/AppLogin.vue';
import AppRegister from './pages/AppRegister.vue';
import AppWelcome from './pages/AppWelcome.vue';
import AppDashboard from './pages/AppDashboard.vue';
import AppProjectsIndex from './pages/Dashboard/Admin/AppProjectsIndex.vue';
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
            path: '/dashboard',
            name: 'dashboard',
            component: AppDashboard
        },
        {
            path: '/dashboard/admin/projects',
            name: 'projects',
            component: AppProjectsIndex
        },
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
    ]
});

// router.beforeEach(async (to, from) => {
//     if (to.name == 'dashboard' && !store.user && to.name !== 'welcome') {
//         return { name: 'welcome' }
//     }
// })

export { router };