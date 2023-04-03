<script>

// Utilities
import { store } from '../store';

export default {
  name: 'AppOverlay',
  data() {
    return {
        store
    }
  },
  methods: {
  }
}
</script>

<template>
    <div class="overlay" @click="store.overlayOpen = false, store.menuOpen = false"></div>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;
.overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    z-index: 30;

    border: 5px solid red;
    background-color: #00000080;
}
</style>