import { reactive } from 'vue'

export const store = reactive({
  user: null,
  errors: null,
  menuOpen: false,
  overlayOpen: false,
  // loadingPerc: 0
})