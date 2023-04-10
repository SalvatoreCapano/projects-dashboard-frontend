<script>

// Components
import AppLinkButton from '../components/AppLinkButton.vue';
import AppActionButton from '../components/AppActionButton.vue';

// Utilities
import { router } from '../router';
import { store } from '../store';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
  name: 'AppWelcome',
  components: {
    AppLinkButton,
    AppActionButton
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
      <AppLinkButton :to="'/login'" :label="'go to login'" :type="'solid'" />
    </div> <!-- /row-->

    <div class="row" v-else>
      <AppLinkButton :to="'/dashboard'" :label="'go to dashboard'" :type="'solid'" />
      <AppActionButton :action="handleLogout" :label="'logout'" :type="'line'" />
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

  // Temp
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