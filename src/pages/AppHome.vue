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
            // form: {
            //     email: null,
            //     password: null
            // },
        }
    },
    methods: {
        // handleLogin() {
        //     axios.get('http://localhost:8000/sanctum/csrf-cookie')
        //         .then((responseCookie) => {
        //             console.log('Cookie ', responseCookie);
        //             this.postLoginData()
        //         })
        // },
        // postLoginData() {
        //     axios.post('http://localhost:8000/login', {
        //         email: this.form.email,
        //         password: this.form.password
        //     })
        //         .then((responseLogin) => {
        //             console.log('Risposta Login', responseLogin);
        //             this.getUser();
        //             router.push('/home');
        //         }
        //         )
        // },
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
    <div class="container">
        <h1>HOME</h1>

        <div>
            <h4>Dati:</h4>
            <p>Email: {{ form.email }}</p>
            <p>Password: {{ form.password }}</p>
        </div>
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