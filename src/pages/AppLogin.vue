<script>

import axios from 'axios';
axios.defaults.withCredentials = true;

import { store } from '../store';
import { router } from '../router';
// import { nextTick } from 'vue'

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
            store.loadingPerc = 10;
            axios.get('http://localhost:8000/sanctum/csrf-cookie')
                .then((responseCookie) => {
                    console.log('Cookie ', responseCookie);
                    this.postLoginData()
                    store.loadingPerc = 30;

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
                    store.loadingPerc = 80;

                    // setTimeout(function(){

                    // nextTick(() => {
                    // router.push('/dashboard');
                    // console.log(show.value, content.value)
                    // })
                    // },1000)
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
    },
    created() {
        this.store.errors = null;
    }
}
</script>

<template>
    <div class="container">
        <div class="formContainer">
            <h1 class="mainTitle">login</h1>

            <form @submit.prevent="handleLogin">
                <div class="group">
                    <label for="email">email</label>
                    <input type="email" id="email" name="email" placeholder="test@example.com" v-model="form.email">
                </div>

                <div class="group">
                    <label for="password">password</label>
                    <input type="password" id="password" name="password" placeholder="Your Password"
                        v-model="form.password">
                </div>

                <div class="group row">
                    <div class="group small inline">
                        <label for="remember_me">remember me</label>
                        <input type="checkbox" id="remember_me" name="remember_me">
                    </div>

                    <div class="group small">
                        <router-link class="customLink" :to="'/'">forgot password?</router-link>
                    </div>
                </div>

                <div class="group large">
                    <button class="solid">login</button>
                </div>
            </form>
        </div> <!-- /formContainer-->
    </div> <!-- /container-->
</template>

<style lang="scss" scoped>
@use '../style/form.scss' as *;
@use '../style/mixin.scss' as *;

.container {
    @include largeContainer;
}

.group.row {
    @include flexRowSpaceBtwn;
}
</style>