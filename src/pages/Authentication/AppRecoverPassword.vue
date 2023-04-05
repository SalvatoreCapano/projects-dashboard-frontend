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
        }
    },
    methods: {
        handlePswdRecovery() {
            this.postRecoveryData();
        },
        postRecoveryData() {
            // axios.post('http://localhost:8000/register', {
            //     email: this.form.email
            // })
            //     .then((response) => {
            //         console.log('Risposta Register', response);
            //         router.push('/welcome');
            //     }
            //     )
            //     .catch((response) => {
            //         console.log('Errore:', response.response.data);
            //         this.store.errors = response.response.data;
            //     })
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
            <h1 class="mainTitle">recover password</h1>

            <form @submit.prevent="handlePswdRecovery">
                <div class="group large">
                    <label for="email">email</label>
                    <input type="email" id="email" name="email" placeholder="test@example.com" v-model="form.email">
                </div>

                <div class="group large">
                    <button class="solid">send recovery link</button>
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
</style>