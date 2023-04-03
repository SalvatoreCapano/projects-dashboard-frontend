<script>

// import axios from 'axios';
// axios.defaults.withCredentials = true;
// import axios from 'axios';
import {store} from '../store';
// import { router } from '../router';

export default {
  name: 'AppError',
  data() {
    return {
      store
    }
  },
  methods: {
  }
}
</script>

<template>
  <div class="errorsContainer">
    <ul>
      <li v-for="error in store.errors">{{ error }}</li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.errorsContainer {
  color: red;
}
</style>