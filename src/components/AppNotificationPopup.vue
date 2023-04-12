<script>

// Utilities
import { store } from '../store';

export default {
  name: 'AppNotificationPopup',
  data() {
    return {
      store,
      timer: 5000
    }
  },
  props: {
    title: String,
    text: String,
    icon: String,
    theme: String
  },
  mounted() {
    const popup = document.querySelector('.popup');

    setTimeout(() => {
      popup.classList.add('open');
    }, 20)

    setTimeout(() => {
      popup.classList.remove('open');

      setTimeout(() => {
        this.store.popupOpen = false
      }, 600)

    }, this.timer)
  }
}
</script>

<template>
  <div class="popup">

    <h3 class="title">{{ this.title }}</h3>

    <div class="body">
      <p>{{ this.text }}</p>
      <font-awesome-icon :icon="`fa-solid fa-${this.icon}`" class="icon" v-if="this.icon" :class="this.theme"/>
    </div>

  </div>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

.popup {
  position: fixed;
  top: -110%;
  left: 50%;
  z-index: 40;

  width: 400px;
  box-shadow: 0px 10px 20px 1px #00000080;
  border-radius: $big-border-radius;

  border: 1px solid $dark-color-three;
  background-color: $light-color-one;

  transform: translateX(-50%);
  transition: all 0.5s;

  padding: 1rem;

  .body {
    @include flexRowSpaceBtwn;
    gap: 1rem;

    .icon {
      font-size: 1.75rem;
      &.success {
        color: $success-color-dark;
      }

      &.warning {
        color: $warning-color-dark;
      }

      &.danger {
        color: $danger-color-dark;
      }
    }
  }

  &.open {
    top: 1rem;
  }
}
</style>