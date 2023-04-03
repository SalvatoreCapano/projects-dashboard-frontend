<script>

import axios from 'axios';
axios.defaults.withCredentials = true;

import { store } from '../store';
import { router } from '../router';

export default {
    name: 'AppDashboard',
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
        }
    }
}
</script>

<template>
    <h1>Dashboard</h1>

    <main>
        <aside>
            <ul>
                <li>
                    <router-link :to="'dashboard/overview'">overview</router-link>
                </li>
                <li>
                    <router-link :to="'dashboard/projects'">projects</router-link>
                </li>
                <li>
                    <router-link :to="'dashboard/notifications'">notifications</router-link>
                </li>
                <li>
                    <router-link :to="'dashboard/teams'">teams</router-link>
                </li>
            </ul>
        </aside>
    </main>
</template>

<style lang="scss" scoped>
.container {
    max-width: 1360px;
    margin: 0 auto;
    text-align: center;

    padding: 1rem;
    border: 2px solid teal;
    color: white;
}
</style>