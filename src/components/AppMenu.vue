<script>

import { store } from '../store';

export default {
  name: 'AppMenu',
  data() {
    return {
      store
    }
  },
  props: {
    data: Array
  }
}
</script>

<template>
  <div class="menu">
    <ul>
      <li v-for="item in this.data" @click="item.onClick">
        <button>
          <font-awesome-icon :icon="`fa-solid fa-${item.icon}`" class="icon"/>
          <span class="text">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

.menu {
  position: absolute;
  top: 100%;
  right: 0;
  padding: 5px;
  background-color: $light-color-two;
  border-radius: $big-border-radius;
  z-index: 31;

  ul {
    list-style: none;

    li {
      min-width: 120px;
      
      button {
        display: inline-block;
        height: 100%;
        width: 100%;
        padding: 4px 6px;

        background: none;
        border: none;
        cursor: pointer;
        transition: background-color 0.05s;

        font-size: 1rem;
        text-align: left;
        text-transform: capitalize;
        @include flexRowGap (6px);


        > .icon {
          width: 24px;
        }
        > .text {
          flex-grow: 1;
        }
      }

      &:hover {
        button {
          background-color: $light-color-one;
        }
      }

      &:first-child {
        button {
          border-top-right-radius: $small-border-radius;
          border-top-left-radius: $small-border-radius;
        }
      }

      &:last-child {
        button {
          border-bottom-right-radius: $small-border-radius;
          border-bottom-left-radius: $small-border-radius;
        }
      }
    }
  }
}
</style>