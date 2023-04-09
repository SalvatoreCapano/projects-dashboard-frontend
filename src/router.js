import { createRouter, createWebHistory } from 'vue-router';
import { store } from './store'; 

import AppLogin from './pages/Authentication/AppLogin.vue';
import AppRegister from './pages/Authentication/AppRegister.vue';
import AppRecoverPassword from './pages/Authentication/AppRecoverPassword.vue';

import AppWelcome from './pages/AppWelcome.vue';
import AppDashboard from './pages/AppDashboard.vue';

import AppProject from './pages/Dashboard/Employee/AppProject.vue';
import AppTeam from './pages/Dashboard/Employee/AppTeam.vue';
import AppHistory from './pages/Dashboard/Employee/AppHistory.vue';


import AppProjectsIndex from './pages/Dashboard/Admin/AppProjectsIndex.vue';
import AppProjectCreate from './pages/Dashboard/Admin/AppProjectCreate.vue';
import AppProjectShow from './pages/Dashboard/Admin/AppProjectShow.vue';
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
            path: '/project',
            name: 'project',
            component: AppProject
        },
        {
            path: '/team',
            name: 'team',
            component: AppTeam
        },
        {
            path: '/history',
            name: 'history',
            component: AppHistory
        },


        {
            path: '/admin/projects',
            name: 'projects',
            component: AppProjectsIndex
        },
        {
            path: '/admin/projects/create',
            name: 'projects/create',
            component: AppProjectCreate
        },
        {
            path: '/admin/projects/:slug',
            name: 'projects/show',
            component: AppProjectShow
        },
    ]
});

// router.beforeEach(async (to, from) => {
//     if (to.name == 'dashboard' && !store.user && to.name !== 'welcome') {
//         return { name: 'welcome' }
//     }
// })

export { router };