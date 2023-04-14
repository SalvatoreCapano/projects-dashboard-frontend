<script>

// Components
import AppMenu from './AppMenu.vue';

// Utilities
import { router } from '../router';
import { store } from '../store';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
  name: 'AppDashboardHeader',
  components: {
    AppMenu
  },
  data() {
    return {
      store,
      router,
      menuData: [
        {
          label: 'home',
          onClick: this.redirectHome,
          icon: 'house'
        },
        {
          label: 'settings',
          onClick: this.redirectHome,
          icon: 'gear'
        },
        {
          label: 'logout',
          onClick: this.handleLogout,
          icon: 'arrow-right-from-bracket'
        }
      ],
      searchbarRoutes: [
        'projects-index-ad', 'employees-index-ad'
      ]
    }
  },
  methods: {
    handleLogout() {
      axios.post('http://localhost:8000/logout');
      this.store.user = null;
      console.log('Logged Out')
      router.push('/');
    },
    redirectHome() {
      router.push('/');
    },
    toggleMenu() {
      store.menuOpen = !store.menuOpen;
      store.overlayOpen = !store.overlayOpen;
    }
  },
  computed: {
    getRole() {
      if (this.store.user.role == 'FE') return 'front end developer';
      else if (this.store.user.role == 'BE') return 'back end developer';
      else if (this.store.user.role == 'UID') return 'UI designer';
      else if (this.store.user.role == 'UXD') return 'UX designer';
    },
    getCurrentPage() {
      return this.$route.name;
    },
    getCurrentPath() {
      let path = this.$route.fullPath;

      if (path.charAt(0) == '/') path = path.slice(1);

      // if (path.includes('/')) path = path.replace('/', ' ');

      path = path.split('/');
      console.log ('Path', path);

      return path;
    }
  }
}
</script>

<template>
  <header>
    <div class="container">

      <div class="breadcumb">
        <span v-for="item in getCurrentPath">
          {{ item }}
        </span>
      </div>

      <div class="searchbar" v-if="searchbarRoutes.includes($route.name)">
        <input type="text" :placeholder="`Search in ${getCurrentPage}`" v-model="store.searchQuery">
        <!-- <input type="text" :placeholder="`Search in ${getCurrentPage}`" v-model="store.searchQuery" @keyup="$emit('searchEvent')"> -->
        <button>
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </button>
      </div>

      <div class="userControls" @click="toggleMenu()">
        <div class="info">
          <span class="name">{{ store.user.first_name }} {{ store.user.last_name }}</span>
          <span class="role">{{ getRole }}</span>
        </div>
        <font-awesome-icon icon="fa-solid fa-chevron-down" class="icon" :class="store.menuOpen ? 'rotated' : ''" />
        <transition name="slide-fade">
          <AppMenu v-if="store.menuOpen" :data="this.menuData" />
        </transition>
      </div> <!-- /userControls-->

    </div> <!-- /container-->
  </header>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

header {
  height: calc(2rem + 48px);
  padding: 1rem 0;
  border-bottom: 1px solid $dark-color-three;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: $light-color-one;
  margin-bottom: 1rem;
  z-index: 31;

  .container {
    @include flexRowSpaceBtwn;
    height: 100%;
    position: relative;
  }
}

.breadcumb {
  user-select: none;
  span {
    text-transform: capitalize;
    
    &:not(:last-child) {
      color: gray;
      &:after {
        content: ' / ';
      }
    }
  }
}

.searchbar {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 36px;
  display: flex;
  justify-content: center;

  border: 1px solid $dark-color-three;
  border-radius: $small-border-radius;

  input {
    flex-basis: 90%;
    padding: 6px 8px;
    border: none;
    background: none;

    border-top-left-radius: $small-border-radius;
    border-bottom-left-radius: $small-border-radius;

    &:focus {
      @include myOutline;
    }
  }

  button {
    height: 100%;
    flex-grow: 1;
    display: inline-block;
    border: none;
    background: none;
    cursor: pointer;
    color: white;
    background-color: $dark-color-three;

    border-top-right-radius: $small-border-radius;
    border-bottom-right-radius: $small-border-radius;

    &:focus {
      @include myOutline;
    }
  }
}

.userControls {
  @include flexRowGap (1rem);
  cursor: pointer;
  position: relative;

  >.info {
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

  .icon {
    transition: all 0.1s;
  }
}</style>