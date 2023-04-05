<script>

// Components
import AppSidebar from '../components/AppSidebar.vue';
import AppDashboardContent from '../components/AppDashboardContent.vue';

// Utilities
import { store } from '../store';
import { router } from '../router';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: 'AppDashboard',
    components: {
        AppSidebar,
        AppDashboardContent
    },
    data() {
        return {
            store,
            router,
        }
    },
    methods: {
        getUser() {
            axios.get('http://localhost:8000/api/user')
                .then((responseUser) => {
                    this.store.user = responseUser.data;
                    console.log('User', responseUser.data);
                })
        },
    },
    mounted() {
        setTimeout(function () {
            store.clear();
        }, 2)
    }
}
</script>

<template>
    <div class="container">
        <AppSidebar v-if="store.user"/>

        <AppDashboardContent v-if="store.user"/>
    </div>
    <!--

                        <main>
                            <aside>
                                <ul>
                                    <li>
                                        <router-link :to="'dashboard/overview'">overview</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="'dashboard/admin/projects'">projects</router-link>
                                    </li>
                                    <li>
                                        <router-link :to="'dashboard/teams'">teams</router-link>
                                    </li>
                                </ul>
                            </aside>
                        </main> -->
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;

.container {
    padding: 1rem;
    height: 100%;

    display: flex;
    justify-content: center;
    gap: 1rem;

    background-color: $light-color-one;
}
</style>