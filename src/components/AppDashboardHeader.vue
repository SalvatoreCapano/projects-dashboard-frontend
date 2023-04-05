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

      <div>
        pages / Dashboard
      </div>

      <div class="userControls" @click="store.menuOpen = true, store.overlayOpen = true">
        <div class="info">
          <span class="name">{{ store.user.first_name }} {{ store.user.last_name }}</span>
          <span class="role">{{ getRole }}</span>
        </div>
        <font-awesome-icon icon="fa-solid fa-chevron-down" class="icon" :class="store.menuOpen ? 'rotated' : ''" />
        <AppMenu v-if="store.menuOpen" :data="this.menuData" />
      </div> <!-- /userControls-->

    </div> <!-- /container-->
  </header>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

header {
  height: calc(2rem + 48px);
  padding: 1rem;
  border-bottom: 1px solid red;

  .container {
    @include flexRowSpaceBtwn;
    border: 1px solid green;
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
}
</style>