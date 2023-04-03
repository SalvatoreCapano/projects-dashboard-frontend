<script>
// Components
import AppHeader from './components/AppHeader.vue'
import AppError from './components/AppError.vue'

// Utilities
import axios from 'axios';
import { store } from './store';

axios.defaults.withCredentials = true;

export default {
  name: 'App',
  components: {
    AppHeader,
    AppError
  },
  data() {
    return {
      store,
    }
  },
  methods: {
    getUser() {
      axios.get('http://localhost:8000/api/user')
        .then((response) => {
          this.store.user = response.data;
          // router.push('/home');
        })
    }
  },
  mounted() {
    this.getUser();
  }
}
</script>

<template>
  <div class="wrapper">
    <AppHeader />

    <AppError v-if="store.errors"/>

    <main>
      <!-- <div class="container"> -->
        <router-view @getUserEvent="getUser"></router-view>
      <!-- </div> -->
    </main>

  </div> <!-- /wrapper-->
</template>

<style lang="scss">
@use './style/main.scss' as *;
@use './style/reset.scss' as *;

.wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100vh;

  >* {
    width: 100%;
  }

  main {
    flex-grow: 1;
  }
}
</style>