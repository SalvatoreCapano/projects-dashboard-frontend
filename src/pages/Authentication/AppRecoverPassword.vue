<script>

// Components
import AppButton from '../../components/AppButton.vue';

// Utilities
import { store } from '../../store';
import { router } from '../../router';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
    name: 'AppRecoverPassword',
    components: {
        AppButton
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
        document.title = 'Recover Password';

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
            <div class="row">
                <div class="group large">
                    <label for="email">email</label>
                    <input type="email" id="email" name="email" placeholder="test@example.com" v-model="form.email"
                        :disabled="this.emailSent">
                </div>
            </div>

            <div class="row">
                <button class="solid" v-if="!emailSent">send recovery link</button>
            </div>

        </form>

        <div class="group row inline-center">
            <AppButton :to="'/login'" :label="'go to login'" :type="'line'" :palette="'primary'" />
            <AppButton :to="'/register'" :label="'go to register'" :type="'line'" :palette="'primary'" />
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
@use '../../style/mixin.scss' as *;

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