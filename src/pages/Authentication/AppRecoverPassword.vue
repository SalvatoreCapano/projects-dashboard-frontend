<script>

// Components
import AppLinkButton from '../../components/AppLinkButton.vue';

// Utilities
import { store } from '../../store';
import { router } from '../../router';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: 'AppRecoverPassword',
    components: {
        AppLinkButton
    },
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
                    // this.handleRedirect();
                }
                )
                .catch((response) => {
                    console.log('Errore Invio Email di Recupero Password:', response.response.data);
                    this.store.errors = response.response.data;
                })
        },
        handleRedirect() {
            setTimeout(function () {
                router.push('/login');
            }, 5000)
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
        <h1 class="mainTitle">recover password</h1>

        <form @submit.prevent="handlePswdRecovery">
            <div class="group large">
                <label for="email">email</label>
                <input type="email" id="email" name="email" placeholder="test@example.com" v-model="form.email"
                    :disabled="this.emailSent">
            </div>

            <div class="group large" v-if="!emailSent">
                <button class="solid">send recovery link</button>
            </div>
        </form>

        <div class="group row">
            <AppLinkButton :to="'/login'" :label="'go to login'" :type="'line'" />
            <AppLinkButton :to="'/register'" :label="'go to register'" :type="'line'" />
        </div>

        <div class="success" v-if="emailSent">
            We sent you an email with a reset link!
            <!-- <br>
            <span>You will be redirected to login page in a few seconds</span> -->
        </div>
    </div> <!-- /formContainer-->
</template>

<style lang="scss" scoped>
@use '../../style/form.scss' as *;
@use '../../style/variables.scss' as *;

.group.row {
    >* {
        margin-right: 1rem;
    }
}

.success {
    text-align: center;
    font-size: 1.25rem;
    color: $color-two-dark;
    margin-top: 2rem;

    span {
        font-size: 1rem;
        color: $dark-color-one;
    }
}
</style>