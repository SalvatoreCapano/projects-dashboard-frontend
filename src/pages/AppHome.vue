<script>

import axios from 'axios';
axios.defaults.withCredentials = true;

import { store } from '../store';
import { router } from '../router';

export default {
    name: 'AppHome',
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

        <h1>HOME</h1>

        <div>
            <h4>Dati:</h4>
        </div>

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