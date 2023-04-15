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
            this.store.loadingWidth = 10;
            this.validateData();
        },
        validateData() {
            // Front End Validation
            console.log('Validating Login data...');
            let emailInput = document.getElementById('email');
            let passwordInput = document.getElementById('password');

            // Reset Form Validation
            this.store.errors = [];
            emailInput.classList.remove('invalid');
            passwordInput.classList.remove('invalid');

            // Email Validation
            if (!emailInput.value.toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
                this.store.errors.push({
                    message: 'your email is not valid'
                });
                emailInput.classList.add('invalid');
            }
            this.store.loadingWidth = 15;

            // Email Lenght
            if (emailInput.value.length == 0) {
                this.store.errors.push({
                    message: 'email field must be filled'
                });
                emailInput.classList.add('invalid');
            }
            else if (emailInput.value.length < 10) {
                this.store.errors.push({
                    message: 'email must be at least 10 characters'
                });
                emailInput.classList.add('invalid');
            }
            else if (emailInput.value.length > 64) {
                this.store.errors.push({
                    message: 'email cannot be longer than 64 characters'
                });
                emailInput.classList.add('invalid');
            }
            this.store.loadingWidth = 30;

            // Password Lenght
            if (passwordInput.value.length == 0) {
                this.store.errors.push({
                    message: 'password field must be filled'
                });
                passwordInput.classList.add('invalid');
            }
            else if (passwordInput.value.length < 10) {
                this.store.errors.push({
                    message: 'password must be at least 8 characters'
                });
                passwordInput.classList.add('invalid');
            }
            else if (passwordInput.value.length > 64) {
                this.store.errors.push({
                    message: 'password cannot be longer than 64 characters'
                });
                passwordInput.classList.add('invalid');
            }
            this.store.loadingWidth = 40;

            if (this.store.errors.length == 0) this.getCookie();
            else {
                console.log('Login Failed');
                this.store.loadingWidth = 100;
            }
        },
        getCookie() {
            // Richiesta Cookie CSRF
            axios.get('http://localhost:8000/sanctum/csrf-cookie')
                .then((response) => {
                    console.log('Cookie CSRF', response);
                    this.store.loadingWidth = 50;
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
                    this.store.loadingWidth = 100;
                })
        }
    },
    mounted() {
        document.title = 'Login';

        setTimeout(function () {
            store.clear();
        }, 2);
    }
}
</script>

<template>
    <div class="formContainer">
        <h1 class="mainTitle">login</h1>

        <form @submit.prevent="handleLogin">
            <div class="row">
                <div class="group large">
                    <label for="email">email</label>
                    <input type="text" id="email" name="email" placeholder="test@example.com" v-model="form.email"
                        maxlength="64">
                </div>
            </div>

            <div class="row">
                <div class="group large">
                    <label for="password">password</label>
                    <input type="password" id="password" name="password" placeholder="Your Password" v-model="form.password"
                        maxlength="64">
                </div>
            </div>

            <div class="row inline-spaced">
                <div class="group inline-center">
                    <label for="remember_me">remember me</label>
                    <input type="checkbox" id="remember_me" name="remember_me">
                </div>

                <div class="group">
                    <router-link class="customLink" :to="'recover-password'">forgot password?</router-link>
                </div>
            </div>

            <div class="row">
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
</style>