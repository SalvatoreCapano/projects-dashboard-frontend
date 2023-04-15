import { reactive } from 'vue'

export const store = reactive({
  user: null,
  errors: [],
  menuOpen: false,
  overlayOpen: false,
  popupOpen: false,
  loadingOpen: false,
  loadingWidth: 0,
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