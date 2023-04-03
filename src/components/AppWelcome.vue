<script>

// import axios from 'axios';
// axios.defaults.withCredentials = true;
import axios from 'axios';
import {store} from '../store';

export default {
  name: 'AppWelcome',
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
  <h1>WELCOME</h1>
</template>

<style lang="scss" scoped>

</style>