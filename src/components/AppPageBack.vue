<script>

export default {
  name: 'AppPageBack',
  props: {
    to: String
  }
}
</script>

<template>
  <div class="pageBack">
    <router-link :to="this.to" class="customLink">
      <font-awesome-icon :icon="'fa-solid fa-chevron-left'" class="icon" />
      Back
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

</style>