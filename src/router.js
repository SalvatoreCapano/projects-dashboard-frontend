import { createRouter, createWebHistory } from 'vue-router';
import AppWelcome from './components/AppWelcome.vue';
import AppLogin from './components/AppLogin.vue';
import AppHome from './pages/AppHome.vue';
// import AppContacts from './pages/AppContacts.vue';
// import AppLogin from './pages/AppLogin.vue';
// import AppRegister from './pages/AppRegister.vue';
// import ProjectShow from './pages/ProjectShow.vue';

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
        // {
        //     path: '/register',
        //     name: 'register',
        //     component: AppRegister
        // },
        // {
        //     path: '/projects/:slug',
        //     name: 'projectShow',
        //     component: ProjectShow
        // },
    ]
});
export { router };