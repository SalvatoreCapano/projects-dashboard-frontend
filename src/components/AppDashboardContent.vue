<script>

// Components
// import AppLogo from './AppLogo.vue';
// import NavbarAuth from './NavbarAuth.vue';

// Utilities
import { router } from '../router';
import { store } from '../store';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
  name: 'AppDashboardContent',
  components: {
  },
  data() {
    return {
      store,
      router,
    }
  }
}
</script>

<template>
  <main>
    content dashboard
  </main>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

main {
  flex-grow: 1;
  background-color: lightskyblue;
  border-radius: 12px;

}
</style>