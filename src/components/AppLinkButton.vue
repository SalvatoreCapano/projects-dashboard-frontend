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
  @include customButton;
}
</style>