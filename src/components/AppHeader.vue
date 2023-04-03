<script>

// import axios from 'axios';
// axios.defaults.withCredentials = true;
import axios from 'axios';
import {store} from '../store';

export default {
  name: 'AppHeader',
  data() {
    return {
      store
    }
  },
  methods: {
    handleLogout() {
      console.log('Old USer', this.store.user.data);
      axios.post('http://localhost:8000/logout');
      this.store.user = null;
    }
  }
}
</script>

<template>
  <header>
    <div class="logoContainer">
      <img src="../../public/logo.png" alt="Logo">
    </div>

    <nav v-if="!store.user">
      <ul>
        <li>
          <router-link :to="'login'">login</router-link>
        </li>
        <li>register</li>
      </ul>
    </nav>

    <div class="authenticatedBox" v-else>
      <p>Welcome, {{ store.user.name }}</p>
      <button @click="handleLogout">logout</button>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  border: 2px solid green;
  margin-bottom: 2rem;
}
.logoContainer {
  height: 36px;

  >img {
    height: 100%;
  }
}

nav {
  ul {
    list-style: none;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    > li {
      border: 1px solid lightgreen;
      padding: 2px;
      color: white;
      cursor: pointer;

      &:hover {
        background-color: #303030;
      }
    }
  }
}

.authenticatedBox {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: white;
}
</style>