<script>

// Utilities
import { store } from '../store';

export default {
  name: 'AppTable',
  data() {
    return {
      store,
    }
  },
  props: {
    headers: Array,
    data: Array,
    action: Function
  },
  computed: {
  },

}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th v-for="header in this.headers" class="header">{{ header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in this.data" @click="this.action">
        <td v-for="record in item">{{ record }}</td>
        <!-- <td v-else>-</td> -->
      </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;
</style>