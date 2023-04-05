<script>

// Components
import AppLinkButton from './AppLinkButton.vue';

// Utilities
import { router } from '../router';

export default {
  name: 'NavbarAuth',
  components: {
    AppLinkButton
  },
  data() {
    return {
      router,
      navLinks: [
        {
          label: 'login',
          name: 'login',
          type: 'line'
        },
        {
          label: 'register',
          name: 'register',
          type: 'solid'
        }
      ]
    }
  }
}
</script>

<template>
  <nav>
    <ul>
      <li v-for="item in navLinks" v-show="$route.name != item.name">
        <AppLinkButton :to="item.name" :label="item.label" :type="item.type"/>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

nav {
  >ul {
    list-style: none;
    @include flexRowGap(1rem);
  }
}
</style>