<script>

export default {
  name: 'AppLinkButton',
  data() {
    return {
    }
  },
  props: {
    to: String,
    label: String,
    type: {
      type: String,
      default: 'solid'
    }
  }
}
</script>

<template>
  <router-link :to="this.to" :class="this.type">{{ this.label }}</router-link>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

a {
  font-size: 1rem;
  font-weight: 600;
  text-transform: capitalize;
  text-decoration: none;

  display: inline-block;
  padding: 8px 16px;
  border-radius: 10px;

  cursor: pointer;
  transition: all 0.05s;

  &.solid {
    color: $light-color-one;
    background: linear-gradient(45deg, $color-one-dark, $color-one-light);

    &:hover {
      background: linear-gradient(60deg, $color-one-dark 40%, $color-one-light);
    }
  }

  &.line {
    color: $color-one-dark;
    box-shadow: inset 0px 0px 0px 2px $color-one-dark;

    &:hover {
      background: linear-gradient(45deg, $color-one-dark, $color-one-light);
      color: $light-color-one;
      opacity: 0.75;
    }
  }
}
</style>