<script>

export default {
  name: 'AppButton',
  data() {
    return {
    }
  },
  props: {
    to: String,
    action: Function,
    label: String,
    icon: String,
    type: {
      type: String,
      default: 'solid'
    },
    palette: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<template>
  <!-- Link Button -->
  <router-link :to="this.to" v-if="this.to" :class="this.type" :palette="this.palette ?? ''">
    <font-awesome-icon :icon="`fa-solid fa-${this.icon}`" v-if="this.icon" />
    <span v-if="this.label">{{ this.label }}</span>
  </router-link>

  <!-- Action Button -->
  <button v-if="this.action" :class="this.type" :palette="this.palette ?? ''" @click="this.action">
    <font-awesome-icon :icon="`fa-solid fa-${this.icon}`" v-if="this.icon" />
    <span v-if="this.label">{{ this.label }}</span>
  </button>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

a,
button {
  @include flexRowGap (0.5rem);
  
  &[palette=primary] {
    @include customButton (primary);
  }

  &[palette=danger] {
    @include customButton (danger);
  }

  &[palette=warning] {
    @include customButton (warning);
  }
}
</style>