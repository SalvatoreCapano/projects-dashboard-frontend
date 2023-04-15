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


import AppProjectsIndex from './pages/Dashboard/Admin/Projects/AppProjectsIndex.vue';
import AppProjectCreate from './pages/Dashboard/Admin/Projects/AppProjectCreate.vue';
import AppProjectShow from './pages/Dashboard/Admin/Projects/AppProjectShow.vue';
import AppProjectEdit from './pages/Dashboard/Admin/Projects/AppProjectEdit.vue';
// import AppContacts from './pages/AppContacts.vue';

import AppUsersIndex from './pages/Dashboard/Admin/AppUsersIndex.vue';

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
            name: 'project-index-em',
            component: AppProject
        },
        {
            path: '/team',
            name: 'team-index-em',
            component: AppTeam
        },
        {
            path: '/history',
            name: 'history-index-em',
            component: AppHistory
        },
        {
            path: '/admin/projects',
            name: 'projects-index-ad',
            component: AppProjectsIndex
        },
        {
            path: '/admin/projects/create',
            name: 'projects-create-ad',
            component: AppProjectCreate
        },
        {
            path: '/admin/projects/:slug',
            name: 'projects-show-ad',
            component: AppProjectShow
        },
        {
            path: '/admin/project/edit/:slug',
            name: 'project-edit-ad',
            component: AppProjectEdit
        },



        {
            path: '/admin/employees',
            name: 'employees-index-ad',
            component: AppUsersIndex
        },
    ]
});

// router.beforeEach(async (to, from) => {
//     if (to.name == 'dashboard' && !store.user && to.name !== 'welcome') {
//         return { name: 'welcome' }
//     }
// })

export { router };