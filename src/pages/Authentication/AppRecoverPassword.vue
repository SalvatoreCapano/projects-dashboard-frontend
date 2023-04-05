<script>

import axios from 'axios';
axios.defaults.withCredentials = true;

import { store } from '../../store';
import { router } from '../../router';

export default {
    name: 'AppRecoverPassword',
    data() {
        return {
            store,
            router,
            form: {
                email: null,
            },
            emailSent: false
        }
    },
    methods: {
        handlePswdRecovery() {
            this.postRecoveryData();
        },
        postRecoveryData() {
            axios.post('http://localhost:8000/forgot-password', {
                email: this.form.email
            })
                .then((response) => {
                    console.log('Risposta Forgot Password', response);
                    this.emailSent = true;
                    this.handleRedirect();
                }
                )
                .catch((response) => {
                    console.log('Errore:', response.response.data);
                    this.store.errors = response.response.data;
                })
        },
        handleRedirect() {
            setTimeout(function(){
                router.push('/login');
            }, 3000)
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
            <h1 class="mainTitle">recover password</h1>

            <form @submit.prevent="handlePswdRecovery">
                <div class="group large">
                    <label for="email">email</label>
                    <input type="email" id="email" name="email" placeholder="test@example.com" v-model="form.email" :disabled="this.emailSent">
                </div>

                <div class="group large" v-if="!emailSent">
                    <button class="solid">send recovery link</button>
                </div>
            </form>

            <div class="success" v-if="emailSent">
                We sent you an email with a reset link!
                <br>
                <span>You will be redirected to login page in a few seconds</span>
            </div>
        </div> <!-- /formContainer-->
    </div> <!-- /container-->
</template>

<style lang="scss" scoped>
@use '../../style/form.scss' as *;
@use '../../style/mixin.scss' as *;
@use '../../style/variables.scss' as *;

.container {
    @include largeContainer;
}

.success {
    text-align: center;
    font-size: 1.25rem;
    color: $color-two-dark;

    span {
        font-size: 1rem;
        color: $dark-color-one;
    }
}
</style>