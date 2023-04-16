<script>

import { register } from 'swiper/element/bundle';
register();

export default {
  name: 'AppSlider',
  data() {
    return {
    }
  },
  props: {
    images: Array,
    // action: Function,
    // label: String,
    // icon: String,
    // type: {
    //   type: String,
    //   default: 'solid'
    // },
    // palette: {
    //   type: String,
    //   default: 'primary'
    // }
  }
}
</script>

<template>
  <swiper-container id="slider" :navigation="true" :pagination="true">
    <swiper-slide class="slide" v-for="image in this.images">
      <img :src="`http://localhost:8000/storage/public/images/${image.url}`" :alt="`Project #${image.project_id}`">
    </swiper-slide>
  </swiper-container>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

#slider {
  width: 100%;
  border-radius: $small-border-radius;
  height: 90%;

  --swiper-navigation-color: #d63a5c;
  --swiper-pagination-color: #d63a5c;
}

.slide {
  background-color: $dark-color-one;
  overflow: hidden;

  >img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
}
</style>