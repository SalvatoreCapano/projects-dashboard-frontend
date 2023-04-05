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
        <li v-for="item in getList">
          <!--
                     <button :class="$route.fullPath == item.link ? 'active' : ''">
                    <font-awesome-icon :icon="`fa-solid fa-${item.icon}`" class="icon" v-if="item.icon" />
                    <router-link :to="item.link">{{ item.label }}</router-link>
                  </button> 
                -->
          <router-link :to="item.link" :class="$route.fullPath == item.link ? 'active' : ''">
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