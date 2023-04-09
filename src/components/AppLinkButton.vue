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
    icon: String,
    type: {
      type: String,
      default: 'solid'
    }
  }
}
</script>

<template>
  <router-link :to="this.to" 
  :class="[
    this.type,
    ]">
    <font-awesome-icon :icon="`fa-solid fa-${this.icon}`" v-if="this.icon"/>
    <span v-if="this.label">{{ this.label }}</span>
  </router-link>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

a {
    @include customButton;
  @include flexRowGap (0.5rem);
}
</style>