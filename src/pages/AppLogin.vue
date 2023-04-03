<script>

import axios from 'axios';
axios.defaults.withCredentials = true;

import { store } from '../store';
import { router } from '../router';


export default {
    name: 'AppLogin',
    data() {
        return {
            store,
            router,
            form: {
                email: null,
                password: null
            },
        }
    },
    methods: {
        handleLogin() {
            axios.get('http://localhost:8000/sanctum/csrf-cookie')
                .then((responseCookie) => {
                    console.log('Cookie ', responseCookie);
                    this.postLoginData()
                })
        },
        postLoginData() {
            axios.post('http://localhost:8000/login', {
                email: this.form.email,
                password: this.form.password
            })
                .then((responseLogin) => {
                    console.log('Risposta Login', responseLogin);
                    // this.getUser();
                    this.$emit('getUserEvent');
                    router.push('/home');
                }
                )
                .catch((response) => {
                    console.log('Errore:', response.response.data);
                    this.store.errors = response.response.data;
                })
        },
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

        <h1>LOGIN</h1>
        <form @submit.prevent="handleLogin">
            <div>
                <label for="email">Email</label>
                <input type="email" name="email" v-model="form.email">
            </div>

            <div>
                <label for="password">Password</label>
                <input type="password" name="password" v-model="form.password">
            </div>

            <button>Login</button>
        </form>

        <div>
            <h4>Dati:</h4>
            <p>Email: {{ form.email }}</p>
            <p>Password: {{ form.password }}</p>
        </div>
</template>

<style lang="scss" scoped>
</style>