<script>

// Utilities
import { router } from '../router';
import { store } from '../store';
import axios from 'axios';
axios.defaults.withCredentials = true;

export default {
  name: 'AppHeader',
  data() {
    return {
      store,
      router,
      navLinks: [
      {
          label: 'login',
          name: 'login',
        },
        {
          label: 'register',
          name: 'register',
        }
      ],
    }
  },
  methods: {
    handleLogout() {
      console.log('Old USer', this.store.user.data);
      axios.post('http://localhost:8000/logout');
      this.store.user = null;
      router.push('/');
      console.log('route', this.$route.name)
      // && (this.$route.name == 'welcome')
    }
  }
}
</script>

<template>
  <header>
    <div class="container">

      <div class="logoContainer">
        <router-link :to="'/'">
          <img src="../../public/logo.png" alt="Logo">
        </router-link>
      </div>

      <nav v-if="(!store.user)">
        <ul>
          <li v-for="item in navLinks">
            <router-link :to="item.name">{{ item.label }}</router-link>
          </li>
        </ul>
      </nav>

      <div class="userControls" v-else @click="store.menuOpen = true, store.overlayOpen = true">
        <div class="info">
          <span class="name">{{ store.user.name }}</span>
          <span class="role">Designer</span>
        </div>
        <font-awesome-icon icon="fa-solid fa-chevron-down" />
        <div class="menu" v-if="store.menuOpen">
          <ul>
            <li>
              <button @click="router.push('/dashboard')" v-if="this.$route.name != 'dashboard'">dashboard</button>
            </li>
            <li>
              <button @click="handleLogout">logout</button>
            </li>
          </ul>
        </div> <!-- /menu-->
      </div> <!-- /userControls-->

    </div> <!-- /container-->
  </header>
</template>

<style lang="scss" scoped>
@use '../style/variables.scss' as *;
@use '../style/mixin.scss' as *;

.userControls {
  @include flexRowGap (1rem);
  cursor: pointer;
  position: relative;

  > .info {
    .name {
      font-size: 1rem;
    }
    
    .role {
      font-size: 0.8rem;
      color: gray;
      display: block;
      margin: 0;
    }
  }
  .menu {
    // display: none;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: lightblue;
    padding: 5px;
    border-radius: 10px;
    z-index: 31;

    ul {
      list-style: none;
      margin-bottom: 0;
      li {
        // background-color: green;
        height: 36px;

        button {
          display: inline-block;
          height: 100%;
          width: 100%;
          background: none;
          border: none;
          padding: 4px;
          border-radius: 5px;
          display: inline-block;
          text-align: left;
          cursor: pointer;

        }

        &:hover {
          button {
            background-color: aliceblue;
          }
        }

        &:not(:last-child) {
          border-bottom: 1px solid $dark-color-one;
        }
      }
    }
  }
}

header {
  padding: 1rem 2rem;
  border-bottom: 2px solid $dark-color-one;
  background-color: $light-color-one;

  .container {
    @include flexRowSpaceBtwn;
    @include largeContainer;
  }
}



.logoContainer {
  height: 36px;
  cursor: pointer;
  position: relative;

  img {
    height: 100%;
    isolation: isolate;
    z-index: 1;
  }

}

nav {
  ul {
    list-style: none;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    // >li {
    //   border: 1px solid lightgreen;
    //   padding: 2px;
    //   color: white;
    //   cursor: pointer;

    //   &:hover {
    //     background-color: #303030;
    //   }
    // }
    li {
      // width: 100%;
      padding: 8px 16px;
      border-radius: 10px;
      border: none;
      background-color: #0c9ed7;
      // margin-top: 2.5rem;

      cursor: pointer;
      transition: background-color 0.05s;

      text-transform: capitalize;

      >* {
        font-weight: 600;
        color: #0f0f0f;
        text-decoration: none;
      }

      &:hover {
        background-color: #3cc8ff;
        color: white;
      }
    }
  }
}
</style>