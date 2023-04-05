<script>

export default {
  name: 'AppActionButton',
  data() {
    return {
    }
  },
  props: {
    action: Function,
    label: String,
    type: {
      type: String,
      default: 'solid'
    }
  }
}
</script>

<template>
  <button @click="this.action" :class="this.type">{{ this.label }}</button>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

button {
  background: none;
  @include customButton;
}
</style>