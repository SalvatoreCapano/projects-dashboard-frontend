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
                password_confirmation: null,
                user_image: null
            },
        }
    },
    methods: {
        handleRegister() {
            this.postRegisterData();
        },
        postRegisterData() {
            let config = {
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const formData = new FormData();

            for (const item in this.form) {
                formData.append(`${item}`, this.form[item]);
            }

            console.log('Form Data', formData);

            axios.post('http://localhost:8000/register', formData
                , config)
                .then((responseRegister) => {
                    // console.log('Risposta Register', responseRegister);
                    this.$emit('getUserEvent');
                    router.push('/dashboard');
                }
                )
                .catch((response) => {
                    console.log('Errore:', response.response.data);
                    this.store.errors = response.response.data;
                })
        },
        addFile(fieldName, file) {
            this.form.user_image = file;
            // console.log('File Aggiunto', this.form.user_image);
        },
    },
    mounted() {
        document.title = 'Register';

        setTimeout(function () {
            store.clear();
        }, 2);
    }
}
</script>

<template>
    <div class="formContainer">
        <h1 class="mainTitle">register</h1>

        <form @submit.prevent="handleRegister">
            <div class="row inline-center">
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

            <div class="row">
                <div class="group large">
                    <label for="email">email</label>
                    <input type="email" id="email" name="email" placeholder="test@example.com" v-model="form.email">
                </div>
            </div>

            <div class="row">
                <div class="group large">
                    <label for="password">password</label>
                    <input type="password" id="password" name="password" placeholder="Your Password"
                        v-model="form.password">
                </div>
            </div>

            <div class="row">
                <div class="group large">
                    <label for="password_confirmation">password confirmation</label>
                    <input type="password" id="password_confirmation" name="password_confirmation"
                        placeholder="Confirm your Password" v-model="form.password_confirmation">
                </div>
            </div>

            <div class="row">
                <div class="group large">
                    <label for="user_image">user image</label>
                    <input name="user_image" id="user_image" type="file" accept="image/*"
                        @change="addFile($event.target.name, $event.target.files[0])">
                </div>
            </div>

            <div class="row">
                <div class="group inline-center">
                    <label for="remember_me">remember me</label>
                    <input type="checkbox" id="remember_me" name="remember_me">
                </div>
            </div>

            <div class="row">
                <button class="solid">register</button>
            </div>

        </form>

        <div class="group">
            <router-link class="customLink" :to="'/login'">already have an account? sign in</router-link>
        </div>
    </div> <!-- /formContainer-->
</template>

<style lang="scss" scoped>
@use '../../style/form.scss' as *;
@use '../../style/mixin.scss' as *;

// FirstName - LastName Inputs
.row.inline-center {
    .group {
        flex-grow: 1;
    }
}

// Remember Me Checkbox
.row {
    .group.inline-center {
        justify-content: flex-start;
    }
}

// .group.large:first-child {
//     @include flexRowGap (1.5rem);

//     >.group.small {
//         flex-grow: 1;
//     }
// }

// .group.row {
//     @include flexRowSpaceBtwn;
// }
</style>