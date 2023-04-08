<script>

// Components
import AppSidebar from '../../../components/AppSidebar.vue';
import AppDashboardHeader from '../../../components/AppDashboardHeader.vue';

// Utilities
import { store } from '../../../store';
import { router } from '../../../router';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: 'AppTeam',
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
        setTimeout(function () {
            store.clear();
        }, 2)
    }
}
</script>

<template>
    <div class="container" v-if="store.user">
        <AppSidebar />

        <main>
            <AppDashboardHeader />
            TEAM
        </main>
    </div>
</template>

<style lang="scss" scoped>
@use '../../../style/variables.scss' as *;
@use '../../../style/mixin.scss' as *;

.container {
    height: 100%;
    
    @include flexRowGap (1rem);
    
    main {
        @include mainContent;
    }
}
</style>