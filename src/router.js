import { createRouter, createWebHistory } from 'vue-router';
import { store } from './store'; 

import AppLogin from './pages/Authentication/AppLogin.vue';
import AppRegister from './pages/Authentication/AppRegister.vue';
import AppRecoverPassword from './pages/Authentication/AppRecoverPassword.vue';
import AppWelcome from './pages/AppWelcome.vue';
import AppDashboard from './pages/AppDashboard.vue';
import AppProjectsIndex from './pages/Dashboard/Admin/AppProjectsIndex.vue';
// import AppContacts from './pages/AppContacts.vue';

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
            path: '/register',
            name: 'register',
            component: AppRegister
        },
        {
            path: '/recover-password',
            name: 'recover-password',
            component: AppRecoverPassword
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
    ]
});

// router.beforeEach(async (to, from) => {
//     if (to.name == 'dashboard' && !store.user && to.name !== 'welcome') {
//         return { name: 'welcome' }
//     }
// })

export { router };