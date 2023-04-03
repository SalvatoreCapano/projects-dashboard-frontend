<script>

import axios from 'axios';
axios.defaults.withCredentials = true;

import { store } from '../store';
import { router } from '../router';


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
            axios.get('http://localhost:8000/sanctum/csrf-cookie')
                .then((responseCookie) => {
                    console.log('Cookie ', responseCookie);
                    this.postLoginData()
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
                    setTimeout(function(){
                        
                        router.push('/home');
                    },1500)
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
    }
}
</script>

<template>
    <div class="fullPage">
        <div class="box">
            <!-- only for background image -->
        </div>

        <div class="box">

            <header>
                <div class="row">
                    <div class="logoContainer">
                        <img src="../../public/logo.png" alt="Logo">
                    </div>

                    <button>
                        <router-link :to="'register'">register</router-link>
                    </button>
                </div>
            </header>

            <main>
                <h1 class="mainTitle">login</h1>

                <form @submit.prevent="handleLogin">
                    <div class="group">
                        <label for="email">email</label>
                        <input type="email" name="email" placeholder="test@example.com" v-model="form.email">
                    </div>

                    <div class="group">
                        <label for="password">password</label>
                        <input type="password" name="password" placeholder="Your Password" v-model="form.password">
                    </div>

                    <div class="group">
                        <button>login</button>
                    </div>
                </form>
            </main>

            <!-- <div>
                                    <h4>Dati:</h4>
                                    <p>Email: {{ form.email }}</p>
                                    <p>Password: {{ form.password }}</p>
                                </div> -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
.fullPage {
    display: flex;
    height: 100%;

    >.box:first-child {
        background: url('../../public/gradient01.jpg');

        flex-basis: 60%;
        border-right: 3px solid white;
    }

    >.box:last-child {
        background-color: #d5dae7;
        flex-basis: 40%;
        padding: 3rem 3.5rem;
    }
}

header {
    margin-bottom: 2rem;

    .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // background-color: red;

        .logoContainer {
            height: 24px;

            img {
                height: 100%;
                display: block;
            }
        }

        button {
            padding: 10px 20px;
            border-radius: 12px;
            border: none;
            background-color: #ffffff;
            cursor: pointer;
            transition: background-color 0.05s;

            >* {
                text-transform: capitalize;
                text-decoration: none;
                color: #0f0f0f;
                font-weight: 600;
            }

            &:hover {
                background-color: #3cc8ff;

                >* {
                    color: white;
                }
            }
        }
    }
}

form {
    .group {
        margin-bottom: 2rem;

        label {
            display: block;
            text-transform: capitalize;
        }

        input {
            width: 100%;
            padding: 10px;
            border-radius: 10px;
            border: none;
        }

        button {
            width: 100%;
            padding: 10px;
            border-radius: 10px;
            border: none;
            background-color: #0c9ed7;
            margin-top: 2.5rem;

            cursor: pointer;
            transition: background-color 0.05s;

            text-transform: capitalize;
            text-decoration: none;
            color: #0f0f0f;
            font-weight: 600;

            &:hover {
                background-color: #3cc8ff;
                color: white;
            }
        }
    }
}</style>