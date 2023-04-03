<script>

import axios from 'axios';
axios.defaults.withCredentials = true;

import { store } from '../store';
import { router } from '../router';

export default {
    name: 'AppRegister',
    data() {
        return {
            store,
            router,
            form: {
                name: null,
                email: null,
                password: null,
                password_confirmation: null
            },
        }
    },
    methods: {
        handleRegister() {
            this.postRegisterData();
        },
        postRegisterData() {
            axios.post('http://localhost:8000/register', {
                name: this.form.name,
                email: this.form.email,
                password: this.form.password,
                password_confirmation: this.form.password_confirmation
            })
                .then((responseRegister) => {
                    console.log('Risposta Register', responseRegister);
                    // this.getUser();
                    this.$emit('getUserEvent');
                    router.push('/dashboard');
                }
                )
                .catch((response) => {
                    console.log('Errore:', response.response.data);
                    this.store.errors = response.response.data;
                })
        },
        // getUser() {
        //     axios.get('http://localhost:8000/api/user')
        //         .then((responseUser) => {
        //             this.store.user = responseUser.data;
        //             console.log('User', responseUser.data);
        //         })
        // }
    }
}
</script>

<template>
    <h1>REGISTER</h1>
    <form @submit.prevent="handleRegister">
        <div>
            <label for="name">Name</label>
            <input type="text" name="name" v-model="form.name">
        </div>

        <div>
            <label for="email">Email</label>
            <input type="email" name="email" v-model="form.email">
        </div>

        <div>
            <label for="password">Password</label>
            <input type="password" name="password" v-model="form.password">
        </div>

        <div>
            <label for="password">Conferma Password</label>
            <input type="password" name="password_confirmation" v-model="form.password_confirmation">
        </div>

        <button>Register</button>
    </form>

    <div>
        <h4>Dati:</h4>
        <p>Nome: {{ form.name }}</p>
        <p>Email: {{ form.email }}</p>
        <p>Password: {{ form.password }}</p>
    </div>
</template>

<style lang="scss" scoped></style>