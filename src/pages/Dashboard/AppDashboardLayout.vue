<script>

// Components
import AppSidebar from '../../components/AppSidebar.vue';
import AppDashboardHeader from '../../components/AppDashboardHeader.vue';
import AppPageBack from '../../components/AppPageBack.vue';
import AppNotificationPopup from '../../components/AppNotificationPopup.vue';

// Utilities
import { store } from '../../store';

export default {
    name: 'AppDashboardLayout',
    components: {
        AppSidebar,
        AppDashboardHeader,
        AppPageBack,
        AppNotificationPopup
    },
    data() {
        return {
            store
        }
    },
    props: {
        title: String,
        backTo: String,
        hasSearch: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<template>
    <div class="container dashboard" v-if="store.user">
        <AppSidebar />

        <main>
            <AppDashboardHeader @searchEvent="$emit('searchEvent')" v-if="this.hasSearch"/>
            <AppDashboardHeader v-else/>

            <AppPageBack :to="this.backTo" v-if="this.backTo"/>

            <h1 class="mainTitle" v-if="this.title">{{ this.title }}</h1>
            
            <slot></slot>
        </main>
    </div>

    <AppNotificationPopup v-if="store.popupOpen" :text="store.popup.text" :icon="store.popup.icon" :theme="store.popup.theme"
        :title="store.popup.title" />
</template>

<style lang="scss" scoped>

</style>