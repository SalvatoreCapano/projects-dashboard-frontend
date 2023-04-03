<script>
// Components
import AppHeader from './components/AppHeader.vue'
import AppError from './components/AppError.vue'
import AppOverlay from './components/AppOverlay.vue'

// Utilities
import axios from 'axios';
import { store } from './store';
import { router } from './router';

axios.defaults.withCredentials = true;

export default {
  name: 'App',
  components: {
    AppHeader,
    AppError,
    AppOverlay,
    router
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
          router.push('/dashboard');
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

    <AppOverlay v-if="store.overlayOpen"/>

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