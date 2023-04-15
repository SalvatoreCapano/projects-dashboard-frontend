<script>

// Components
import AppLoadingBar from './components/AppLoadingBar.vue';
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
    AppLoadingBar,
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
      this.store.loadingOpen = true;
      this.store.loadingWidth = 40;
      axios.get('http://localhost:8000/api/user')
        .then((response) => {
          this.store.loadingWidth = 100;
          this.store.user = response.data;

          router.push('/dashboard');
        })
        .catch((response) => {
          this.store.popup = { title: 'Oops there was an error !', text: 'An error occurred while getting user data. Please try again.', icon: 'xmark', theme: 'danger' };
          this.store.loadingWidth = 0;
          this.store.popupOpen = true;
          this.store.loadingOpen = false;
        })
    }
  },
  computed: {
    calcMainColor() {
      if ((this.$route.fullPath != '/') && (this.$route.fullPath != '/login') && (this.$route.fullPath != '/register') && (this.$route.fullPath != '/recover-password')) {
        return 'light';
      }
      else return 'dark';
    },
    calcEvent() {
      if (this.$route.name == 'login' || this.$route.name == 'register') return 'getUserEvent';
      else return null;
    }
  },
  mounted() {
    this.getUser();
  }
}
</script>

<template>
  <div class="wrapper">

    <transition name="slide-fade">
      <AppLoadingBar v-if="store.loadingOpen" />
    </transition>

    <AppError v-if="store.errors" />

    <main :class="calcMainColor">
      <!-- <router-view @getUserEvent="getUser"></router-view> -->
      <!-- @getUserEvent="($route.name == 'login' || $route.name == 'register') ? getUser() : ''" -->
      <router-view @[calcEvent]="getUser()"></router-view>
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
  >main {
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