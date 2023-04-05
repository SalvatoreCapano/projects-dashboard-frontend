<script>

export default {
  name: 'AppLogo',
}
</script>

<template>
  <div class="logoContainer">
    <router-link :to="'/'">
      <img src="../../public/logo.png" alt="Logo">
    </router-link>
  </div> <!-- /logoContainer-->
</template>

<style lang="scss" scoped>
@use '../style/mixin.scss' as *;
.logoContainer {
  height: 48px;
  cursor: pointer;
  position: relative;

  a {
    display: inline-block;
    height: 100%;
    @include myOutline;
    
    img {
      display: block;
      height: 100%;
      isolation: isolate;
      z-index: 1;
      transition: transform 0.1s;
    }
  }

  &:hover {
    img {
      transform: rotate(-2deg);
    }
  }
}
</style>