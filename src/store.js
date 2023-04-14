import { reactive } from 'vue'

export const store = reactive({
  user: null,
  errors: [],
  menuOpen: false,
  overlayOpen: false,
  popupOpen: false,
  searchQuery: '',
  popup: {
    title: '',
    text: '',
    icon: '',
    theme: '',
  },
  clear() {
    console.log('Clearing..');
    this.errors = [];
    this.menuOpen = false;
    this.overlayOpen = false;
    this.searchQuery = '';
    this.popup = {
      title: '',
      text: '',
      icon: '',
      theme: '',
    };
  }
})