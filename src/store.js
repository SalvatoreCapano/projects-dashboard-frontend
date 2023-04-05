import { reactive } from 'vue'

export const store = reactive({
  user: null,
  errors: null,
  menuOpen: false,
  overlayOpen: false,
  clear() {
    console.log('Clearing..');
    this.errors = null;
    this.menuOpen = false;
    this.overlayOpen = false;
    this.test = false;
  }
})