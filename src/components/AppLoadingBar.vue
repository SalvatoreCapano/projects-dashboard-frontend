<script>

// Utilities
import { store } from '../store';

export default {
  name: 'AppLoadingBar',
  data() {
    return {
      store,
    }
  },
  computed: {
    setWidth() {
      if (this.store.loadingWidth == 100) {
        const self = this;
        setTimeout(function () {
          self.store.loadingWidth = 0;
        }, 200)
      }
      return `--loadingWidth: ${this.store.loadingWidth}%`;
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
  height: 4px;
  width: var(--loadingWidth);
  background-color: $color-one-dark;
  transition: width 0.15s;
}
</style>