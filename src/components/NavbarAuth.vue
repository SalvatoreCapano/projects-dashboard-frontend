<script>

import AppLinkButton from './AppLinkButton.vue';

export default {
  name: 'NavbarAuth',
  components: {
    AppLinkButton
  },
  data() {
    return {
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
      <li v-for="item in navLinks">
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