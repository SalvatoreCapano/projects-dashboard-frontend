<script>

// Components
import AppSidebar from '../../../components/AppSidebar.vue';

// Utilities
import { store } from '../../../store';
import { router } from '../../../router';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: 'AppProject',
    components: {
        AppSidebar,
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
            PROJECT
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
        flex-grow: 1;
        background-color: $light-color-one;
        height: 100%;
        border-radius: $big-border-radius;
    }
}
</style>