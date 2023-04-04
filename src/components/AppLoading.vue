<script>

// Utilities
import { store } from '../store';

export default {
  name: 'AppLoading',
  data() {
    return {
      store,
    }
  },
  computed: {
    setWidth() {
      if (this.store.loadingPerc == 100) {
        setTimeout(function () {
          this.store.loadingPerc = 0
        }, 100)
      }
      return `--loadingPerc: ${this.store.loadingPerc}%`;
    }
  }
}
</script>

<template>
  <div class="loading" :style="setWidth"></div>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

.loading {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  width: var(--loadingPerc);
  background-color: $color-one-dark;
  transition: width 0.1s;
}
</style>