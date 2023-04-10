<script>

// Components
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
    AppError,
    AppOverlay
  },
  data() {
    return {
      store,
      router
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
  computed: { 
    calcMainColor() {
      if ((this.$route.fullPath != '/') && (this.$route.fullPath != '/login') && (this.$route.fullPath != '/register') && (this.$route.fullPath != '/recover-password')) {
        return 'light';
      }
      else return 'dark';
    }
  },
  mounted() {
    this.getUser();
  }
}
</script>

<template>
  <div class="wrapper">

    <AppError v-if="store.errors" />

    <main :class="calcMainColor">
      <router-view @getUserEvent="getUser"></router-view>
    </main>

    <transition name="fade">
      <AppOverlay v-if="store.overlayOpen" />
    </transition>

  </div> <!-- /wrapper-->
</template>

<style lang="scss">
@use './style/main.scss' as *;
@use './style/transitions.scss' as *;
@use './style/variables.scss' as *;
@use './style/reset.scss' as *;

.wrapper {
  > main {
    height: 100vh;
    padding: 1rem;
    &.light {
      background-color: $light-color-two;
    }
    &.dark {
      background-color: $dark-color-two;
    }
  }
}
</style>