<script>

// Components
import AppLogo from './AppLogo.vue';
import NavbarAuth from './NavbarAuth.vue';

// Utilities
import { router } from '../router';
import { store } from '../store';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
  name: 'AppHeader',
  components: {
    AppLogo,
    NavbarAuth
  },
  data() {
    return {
      store,
      router,
    }
  },
  methods: {
    handleLogout() {
      console.log('Old USer', this.store.user.data);
      axios.post('http://localhost:8000/logout');
      this.store.user = null;
      router.push('/');
      console.log('route', this.$route.name)
      // && (this.$route.name == 'welcome')
    }
  },
  computed: {
    getRole() {
      if (this.store.user.role == 'FE') return 'front end developer';
      else if (this.store.user.role == 'BE') return 'back end developer';
      else if (this.store.user.role == 'UID') return 'UI designer';
      else if (this.store.user.role == 'UXD') return 'UX designer';
    }
  }
}
</script>

<template>
  <header>
    <div class="container">

      <AppLogo />

      <NavbarAuth v-if="(!store.user)" />

      <div class="userControls" v-else @click="store.menuOpen = true, store.overlayOpen = true">
        <div class="info">
          <span class="name">{{ store.user.first_name }} {{ store.user.last_name }}</span>
          <span class="role">{{ getRole }}</span>
        </div>
        <font-awesome-icon icon="fa-solid fa-chevron-down" />
        <div class="menu" v-if="store.menuOpen">
          <ul>
            <li v-if="this.$route.name != 'dashboard'">
              <button @click="router.push('/dashboard')">
                dashboard
                <font-awesome-icon icon="fa-solid fa-chart-line" />
              </button>
            </li>
            <li v-if="this.$route.name != 'welcome'">
              <button @click="router.push('/')">
                home
                <font-awesome-icon icon="fa-solid fa-house" />
              </button>
            </li>
            <li>
              <button>
                settings
                <font-awesome-icon icon="fa-solid fa-gear" />
              </button>
            </li>
            <li>
              <button @click="handleLogout">
                logout
                <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket" />
              </button>
            </li>
          </ul>
        </div> <!-- /menu-->
      </div> <!-- /userControls-->

    </div> <!-- /container-->
  </header>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

.userControls {
  @include flexRowGap (1rem);
  cursor: pointer;
  position: relative;

  > .info {
    .name {
      font-size: 1rem;
      text-transform: capitalize;
    }
    
    .role {
      font-size: 0.8rem;
      text-transform: capitalize;
      color: gray;
      display: block;
      margin: 0;
    }
  }
  .menu {
    // display: none;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: lightblue;
    // padding: 5px;
    border-radius: 10px;
    z-index: 31;
    overflow: hidden;

    ul {
      list-style: none;
      margin-bottom: 0;
      padding: 6px 0;
      li {
        // background-color: green;
        
        button {
          display: inline-block;
          height: 100%;
          width: 100%;
          background: none;
          border: none;
          padding: 10px 16px;
          // border-radius: 5px;
          text-align: left;
          cursor: pointer;
          text-transform: capitalize;
        }

        &:hover {
          button {
            background-color: aliceblue;
          }
        }

        &:not(:last-child) {
          border-bottom: 1px solid $dark-color-one;
        }
      }
    }
  }
}

header {
  padding: 1rem 2rem;
  border-bottom: 2px solid $dark-color-one;
  background-color: $light-color-one;

  .container {
    @include flexRowSpaceBtwn;
    @include largeContainer;
  }
}
</style>