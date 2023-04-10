<script>

// Components
import AppButton from '../components/AppButton.vue';

// Utilities
import { router } from '../router';
import { store } from '../store';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
  name: 'AppWelcome',
  components: {
    AppButton
  },
  data() {
    return {
      store,
      router
    }
  },
  methods: {
    handleLogout() {
      axios.post('http://localhost:8000/logout');
      this.store.user = null;
      console.log('Logged Out')
      router.push('/');
    }
  },
  mounted() {
    document.title = 'Home';

    setTimeout(function () {
      store.clear();
    }, 2)
  }
}
</script>

<template>
  <div class="container">
    <div class="row">
      <h1 class="mainTitle" v-if="!store.user">welcome</h1>
      <h1 class="mainTitle" v-else>welcome back, {{ store.user.first_name }}</h1>
    </div> <!-- /row-->

    <div class="row" v-if="!store.user">
      <AppButton :to="'/login'" :label="'go to login'" :type="'solid'" :palette="'primary'" />
    </div> <!-- /row-->

    <div class="row" v-else>
      <AppButton :to="'/dashboard'" :label="'go to dashboard'" :type="'solid'" :palette="'primary'" />
      <AppButton :action="handleLogout" :label="'logout'" :type="'line'" :palette="'danger'" />
    </div> <!-- /row-->
  </div>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

.container {
  height: 100%;
  border-radius: $big-border-radius;
  background-color: #fafafa;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.mainTitle {
  font-size: 4rem;
}

.row:last-child {
  @include flexRowGap (1rem);
}
</style>