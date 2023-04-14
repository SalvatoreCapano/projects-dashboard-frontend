<script>

// Components
import AppSidebar from '../components/AppSidebar.vue';
import AppDashboardHeader from '../components/AppDashboardHeader.vue';

// Utilities
import { store } from '../store';
import { router } from '../router';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: 'AppDashboard',
    components: {
        AppSidebar,
        AppDashboardHeader
    },
    data() {
        return {
            store,
            router,
        }
    },
    methods: {
    },
    mounted() {
        document.title = 'Dashboard';

        setTimeout(function () {
            store.clear();
        }, 2)
    }
}
</script>

<template>
    <div class="container dashboard" v-if="store.user">
        <AppSidebar />

        <main>
            <AppDashboardHeader />
            dashboard main
        </main>
    </div>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;
</style>