<script>

// Components
import AppButton from './AppButton.vue';

// Utilities
import { store } from '../store';

export default {
  name: 'AppModal',
  components: {
    AppButton
  },
  data() {
    return {
      store,
    }
  },
  props: {
    title: String,
    message: String,
    action: Function,
    to: String
  },
  methods: {
    emitCloseModalEvent() {
      this.$emit('closeModalEvent');
    },
    emitDeleteProjectEvent() {
      this.$emit('deleteProjectEvent');
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="card">
      <h2 class="mainTitle">{{ this.title }}</h2>
      <p class="message">
        {{ this.message }}
        <br>
        This operation is irreversible.
      </p>
      <div class="actions">
        <AppButton :action="this.action" :label="'delete'" :icon="'trash-can'" :type="'solid'" :palette="'danger'" />
        <AppButton :action="emitCloseModalEvent" :label="'cancel'" :type="'line'" :palette="'warning'" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

.container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  z-index: 35;

  // border: 1px solid red;
  background-color: #00000070;

  .card {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    background-color: $light-color-one;
    border-radius: $big-border-radius;
    padding: 1rem;

    .message {
      margin-bottom: 2rem
    }

    .actions {
      @include flexRowGap(1rem);
    }
  }
}
</style>