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
          name: '/dashboard/admin/projects',
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
          label: 'overview',
          name: 'overview',
          icon: 'overview',
        },
        {
          label: 'project',
          name: 'overview',
          icon: 'overview',
        },
        {
          label: 'team',
          name: 'overview',
          icon: 'overview',
        },
        {
          label: 'history',
          name: 'overview',
          icon: 'overview',
        },
      ]
    }
  }
}
</script>

<template>
  <aside>
    <AppLogo />
    <hr>
    <nav>
      <ul v-if="store.user.level == 'AD'">
        <li v-for="item in adminLinks" :class="$route.name == item.name ? 'active' : ''">
          <font-awesome-icon :icon="`fa-solid fa-${item.icon}`" class="icon" v-if="item.icon"/>
          <router-link :to="item.name">{{ item.label }}</router-link>
          <!-- <AppLinkButton :to="'/'" :label="item.label" :type="'solid'"/> -->
        </li>
      </ul>

      <ul v-if="store.user.level == 'EM'">
        <li v-for="item in employeeLinks">
          <router-link :to="'/'">{{ item.label }}</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

nav {
  ul {
    list-style: none;
    li {
      // background-color: red;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 42px;
      border-radius: 8px;
      gap: 10px;
      margin-bottom: 5px;
      .icon {
        font-size: 1.25rem;
        width: 36px;
        // background-color: green;
        color: white;
      }
      a {
        flex-grow: 1;
        font-size: 1rem;
        color: white;
        text-decoration: none;
        text-transform: capitalize;

        // background-color: blue;
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

aside {
  background-color: lightgreen;
  height: 100%;
  width: 240px;
  border-radius: 12px;
  background: linear-gradient(45deg, $dark-color-one, $dark-color-two);
  padding: 1rem;
}

.logoContainer {
  width: fit-content;
  margin: 0 auto;
}

hr {
  margin: 1rem 0;
}
</style>