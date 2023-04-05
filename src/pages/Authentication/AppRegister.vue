<script>

import axios from 'axios';
axios.defaults.withCredentials = true;

import { store } from '../../store';
import { router } from '../../router';

export default {
    name: 'AppRegister',
    data() {
        return {
            store,
            router,
            form: {
                first_name: null,
                last_name: null,
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
                first_name: this.form.first_name,
                last_name: this.form.last_name,
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
    },
    created() {
        this.store.errors = null;
    }
}
</script>

<template>
    <div class="container">
        <div class="formContainer">
            <h1 class="mainTitle">register</h1>

            <form @submit.prevent="handleRegister">
                <div class="group large">
                    <div class="group small">
                        <label for="first_name">first name</label>
                        <input type="text" id="first_name" name="first_name" placeholder="Your first Name"
                            v-model="form.first_name">
                    </div>

                    <div class="group small">
                        <label for="last_name">last name</label>
                        <input type="text" id="last_name" name="last_name" placeholder="Your last Name"
                            v-model="form.last_name">
                    </div>
                </div>

                <div class="group large">
                    <label for="email">email</label>
                    <input type="email" id="email" name="email" placeholder="test@example.com" v-model="form.email">
                </div>

                <div class="group large">
                    <label for="password">password</label>
                    <input type="password" id="password" name="password" placeholder="Your Password"
                        v-model="form.password">
                </div>

                <div class="group large">
                    <label for="password_confirmation">password confirmation</label>
                    <input type="password" id="password_confirmation" name="password_confirmation"
                        placeholder="Confirm your Password" v-model="form.password_confirmation">
                </div>

                <!-- <div class="group row"> -->
                    <div class="group inline">
                        <label for="remember_me">remember me</label>
                        <input type="checkbox" id="remember_me" name="remember_me">
                    </div>

                    <!-- <div class="group small">
                        <router-link class="customLink" :to="'recover-password'">forgot password?</router-link>
                    </div> -->
                <!-- </div> -->

                <div class="group large">
                    <button class="solid">register</button>
                </div>
            </form>
        </div> <!-- /formContainer-->
    </div> <!-- /container-->
</template>

<style lang="scss" scoped>
@use '../../style/form.scss' as *;
@use '../../style/mixin.scss' as *;

.container {
    @include largeContainer;
}

.group.large:first-child {
    @include flexRowGap (1.5rem);

    >.group.small {
        flex-grow: 1;
    }
}

.group.row {
    @include flexRowSpaceBtwn;
}
</style>