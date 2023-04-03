<script>
import AppHeader from './components/AppHeader.vue'
import axios from 'axios';
import {store} from './store';
axios.defaults.withCredentials = true;

export default {
  name: 'App',
  components: {
    AppHeader
  },
  data() {
    return {
      store,
      // form: {
      //   email: null,
      //   password: null
      // },
    }
  },
  methods: {
    // handleLogin() {
    //   axios.get('http://localhost:8000/sanctum/csrf-cookie')
    //     .then((response) => {
    //       console.log('Cookie ', response);
    //       this.postLoginData()
    //     })
    // },
    // postLoginData() {
    //   axios.post('http://localhost:8000/login', {
    //     email: this.form.email,
    //     password: this.form.password
    //   })
    //     .then((response) => {
    //       console.log('Risposta Login', response);
    //       this.getUser();
    //     }
    //     )
    // },
    getUser() {
      axios.get('http://localhost:8000/api/user')
        .then((response) => {
          this.store.user = response.data;
        })
    }
  },
  mounted() {
    this.getUser();
  }
}
</script>

<template>

  <AppHeader/>

  <router-view></router-view>

  <!-- <form @submit.prevent="handleLogin">
    <div>
      <label for="email">Email</label>
      <input type="email" name="email" v-model="form.email">
    </div>

    <div>
      <label for="password">Password</label>
      <input type="password" name="password" v-model="form.password">
    </div>

    <button>Login</button>
  </form> -->

  <div v-if="this.store.user">
    <h4>Utente:</h4>
    <!-- <p>{{ user }}</p> -->
    <p>{{ this.store.user.name }}</p>
    <!-- <p>{{ user.email }}</p> -->
    <p>{{ this.store.user.id }}</p>
  </div>

  <div>
    <button @click="getUser">Get User</button>
    <div v-if="this.store.user">
      <p>{{ this.store.user.name }}</p>
      <p>{{ this.store.user.email }}</p>
      <p>{{ this.store.user.id }}</p>
    </div>
  </div>
</template>

<style lang="scss">
@use './style/main.scss' as *;
@use './style/reset.scss' as *;
</style>