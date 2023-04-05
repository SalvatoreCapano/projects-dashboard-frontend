<script>
// Components
import AppLogo from './AppLogo.vue';
// import AppLinkButton from './AppLinkButton.vue';

import { store } from '../store';

export default {
  name: 'AppSidebar',
  components: {
    AppLogo,
    // AppLinkButton
  },
  data() {
    return {
      store,
      adminLinks: [
        {
          label: 'requests',
          name: 'request',
          icon: 'table-columns',
        },
        {
          label: 'projects',
          name: '/admin/projects',
          icon: 'diagram-project',
        },
        {
          label: 'employees',
          name: 'overview',
          icon: 'address-card',
        },
        {
          label: 'team',
          name: 'overview',
          icon: 'people-group',
        },
      ],
      employeeLinks: [
        {
          label: 'dashboard',
          link: '/dashboard',
          icon: 'gauge',
        },
        {
          label: 'project',
          link: '/project',
          icon: 'diagram-project',
        },
        {
          label: 'team',
          link: '/team',
          icon: 'people-group',
        },
        {
          label: 'history',
          link: '/history',
          icon: 'clock-rotate-left',
        },
      ]
    }
  },
  computed: {
    getList() {
      if (this.store.user.level == 'AD') return this.adminLinks;
      else if (this.store.user.level == 'EM') return this.employeeLinks;
    }
  }
}
</script>

<template>
  <aside class="sidebar">

    <AppLogo />

    <hr>

    <nav>
      <ul>
        <li v-for="item in getList" :class="$route.fullPath == item.link ? 'active' : ''">
          <font-awesome-icon :icon="`fa-solid fa-${item.icon}`" class="icon" v-if="item.icon" />
          <router-link :to="item.link">{{ item.label }}</router-link>
        </li>
      </ul>
    </nav>

  </aside>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

.sidebar {
  height: 100%;
  width: 240px;
  padding: 1rem;
  border-radius: $big-border-radius;
  background: linear-gradient(45deg, $dark-color-one, $dark-color-three);
}

.logoContainer {
  width: fit-content;
  margin: 0 auto;
}

hr {
  margin: 1rem 0;
  border-bottom: none;
  border-color: $light-color-two;
}

nav {
  ul {
    list-style: none;

    li {
      @include flexRowGap (10px);
      height: 42px;
      border-radius: $small-border-radius;
      margin-bottom: 5px;
      color: white;

      .icon {
        font-size: 1.25rem;
        width: 36px;
      }

      a {
        font-size: 1rem;
        color: currentColor;
        text-decoration: none;
        text-transform: capitalize;
        flex-grow: 1;
      }

      &:hover {
        background: linear-gradient(60deg, $color-one-dark 40%, $color-one-light);
      }

      &.active {
        background: linear-gradient(45deg, $color-one-dark, $color-one-light);
      }
    }
  }
}
</style>