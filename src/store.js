import { reactive } from 'vue'

export const store = reactive({
  user: null,
  errors: [],
  menuOpen: false,
  overlayOpen: false,
  popupOpen: false,
  searchQuery: '',
  clear() {
    console.log('Clearing..');
    this.errors = [];
    this.menuOpen = false;
    this.overlayOpen = false;
    this.searchQuery = '';
  }
})