import { createApp } from 'vue'
import { router } from './router'

import { library } from '@fortawesome/fontawesome-svg-core'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

library.add(faChevronDown)

import App from './App.vue'

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')