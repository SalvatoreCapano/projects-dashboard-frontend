<script>

// Utilities
import axios from 'axios';
axios.defaults.withCredentials = true;
import { store } from '../../store';
import { router } from '../../router';

export default {
    name: 'AppLogin',
    data() {
        return {
            store,
            router,
            form: {
                email: null,
                password: null
            }
        }
    },
    methods: {
        handleLogin() {
            // Richiesta Cookie CSRF
            axios.get('http://localhost:8000/sanctum/csrf-cookie')
                .then((response) => {
                    console.log('Cookie CSRF', response);
                    this.postLoginData()
                })
                .catch((response) => {
                    console.log('Errore ottenimento Cookie', response);
                    this.store.errors = response.data;
                })
        },
        postLoginData() {
            axios.post('http://localhost:8000/login', {
                email: this.form.email,
                password: this.form.password
            })
                .then((response) => {
                    console.log('Risposta Login', response);
                    this.$emit('getUserEvent');
                }
                )
                .catch((response) => {
                    console.log('Errore Login', response.response.data);
                    this.store.errors = response.response.data;
                })
        }
    },
    mounted() {
        setTimeout(function () {
            store.clear();
        }, 2)
    }
}
</script>

<template>
    <div class="formContainer">
        <h1 class="mainTitle">login</h1>

        <form @submit.prevent="handleLogin">
            <div class="group">
                <label for="email">email</label>
                <input type="email" id="email" name="email" placeholder="test@example.com" v-model="form.email">
            </div>

            <div class="group">
                <label for="password">password</label>
                <input type="password" id="password" name="password" placeholder="Your Password" v-model="form.password">
            </div>

            <div class="group row">
                <div class="group small inline">
                    <label for="remember_me">remember me</label>
                    <input type="checkbox" id="remember_me" name="remember_me">
                </div>

                <div class="group small">
                    <router-link class="customLink" :to="'recover-password'">forgot password?</router-link>
                </div>
            </div>

            <div class="group large">
                <button class="solid">login</button>
            </div>

        </form>
        
        <div class="group">
            <router-link class="customLink" :to="'/register'">don't have an account? sign up</router-link>
        </div>
    </div> <!-- /formContainer-->
</template>

<style lang="scss" scoped>
@use '../../style/form.scss' as *;
@use '../../style/mixin.scss' as *;

.group.row {
    @include flexRowSpaceBtwn;
}
</style>