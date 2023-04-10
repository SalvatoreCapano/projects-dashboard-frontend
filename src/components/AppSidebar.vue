<script>
// Components
import AppLogo from './AppLogo.vue';

import { store } from '../store';

export default {
  name: 'AppSidebar',
  components: {
    AppLogo,
  },
  data() {
    return {
      store,
      adminLinks: [
        {
          label: 'dashboard',
          link: '/dashboard',
          icon: 'gauge',
        },
        {
          label: 'requests',
          link: '/requests',
          icon: 'table-columns',
        },
        {
          label: 'projects',
          link: '/admin/projects',
          icon: 'diagram-project',
        },
        {
          label: 'employees',
          link: '/admin/employees',
          icon: 'address-card',
        },
        {
          label: 'team',
          link: '/team',
          icon: 'people-group',
        },
        {
          label: 'types',
          link: '/admin/types',
          icon: 'file-powerpoint',
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
        <li v-for="item in getList">
          <router-link :to="item.link" :class="$route.fullPath.includes(item.link) ? 'active' : ''">
            <font-awesome-icon :icon="`fa-solid fa-${item.icon}`" class="icon" v-if="item.icon" />
            <span class="label">{{ item.label }}</span>
          </router-link>
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
  flex-shrink: 0;
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
      margin-bottom: 5px;

      >a {
        display: inline-block;
        width: 100%;
        height: 42px;
        @include flexRowGap (10px);

        color: white;
        font-size: 1rem;
        text-decoration: none;
        text-transform: capitalize;
        text-align: left;

        border-radius: $small-border-radius;
        @include myOutline;

        >.label {
          flex-grow: 1;
        }

        >.icon {
          font-size: 1.25rem;
          width: 36px;
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
}
</style>