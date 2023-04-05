<script>
import AppHeader from '../components/AppHeader.vue'

import axios from 'axios';
axios.defaults.withCredentials = true;
import { store } from '../store';

export default {
  name: 'AppWelcome',
  components: {
    AppHeader
  },
  data() {
    return {
      store,
    }
  },
  mounted() {
    setTimeout(function () {
      store.clear();
    }, 2)
  }
}
</script>

<template>
  <AppHeader />

  <div class="container">
    <h1 class="mainTitle">welcome</h1>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100%;
  background-color: #fafafa;

  display: flex;
  justify-content: center;
  align-items: center;
}

.mainTitle {
  font-size: 4rem;
}
</style>